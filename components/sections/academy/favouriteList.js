'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '@/hooks/apiCall';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";
import { showNotification } from '@/util/common';

export default function FavouriteList() {
    const router = useRouter()
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(false)
    const [favList, setFavList] = useState([])
    const [academyList, setAcademyList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const itemsPerPage = 12

    const maxLength = 120
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedId, setIsExpandedId] = useState(false);
    const toggleExpansion = (id) => {
        setIsExpanded(!isExpanded);
        setIsExpandedId(id)
    };

    async function initLoad() {
        try {
            const response = await apiRequest('/academics/favourites', { page: currentPage, limit: itemsPerPage })
            if (response?.status) {
                setAcademyList(response?.data?.list)
                setTotalCount(response?.data?.totalCount)
                setFavList(response?.data?.fav)
                setLoader(false)

                const scrollPosition = document.body.scrollHeight * (10 / 100);
                window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoading(true)
            initLoad()
        } else {
            //showNotification(false, 'Kindly login and continue.')
            router.push('/login')
        }
    }, [currentPage, isAuthenticated])

    const academyData = academyList || [];

    const handlePageClick = (page) => {
        if (page != currentPage) {
            setLoader(true)
            setCurrentPage(page);
        }
        const scrollPosition = document.body.scrollHeight * (10 / 100);
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

    console.log(totalCount, '=======', itemsPerPage)
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''} cursor-pointer`} onClick={(e) => { e.preventDefault(); handlePageClick(i); }}>
                    <a className="page-link">
                        {i}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    };

    const addFav = async (sessionId, favourite) => {

        try {
            setLoader(true)

            if (!isAuthenticated) {
                router.push('/login')
            }

            const response = await apiRequest('/academics/addRemoveFav', { sessionId: sessionId, favourite: favourite })

            if (response?.status) {
                initLoad()
                setLoader(false)
            }

        } catch (error) {

            console.error(error);
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {academyData.length > 0 ?

                <>
                    <div className={`row ${(loader) ? 'loading' : ''} `}>
                        {academyData.map(function (academy, index) {

                            const displayContent = academy.sessionDescription.length > maxLength
                                ? (isExpanded && academy.sessionId === isExpandedId
                                    ? academy.sessionDescription
                                    : academy.sessionDescription.slice(0, maxLength) + '...')
                                : academy.sessionDescription;

                            return (<div className="col-md-4 col-sm-6" key={index} id={'card-#' + index}>
                                <div className="cm_acard2">
                                    <div className="cm_acim2">
                                        {academy.videoHandler == 0 ?
                                            <img src={academy.sessionImage} width={'100%'} height={'250px'} /> :
                                            <ReactPlayer
                                                url={academy.sessionYoutubeLink}
                                                controls={true}
                                                width="100%"
                                                height="250px"
                                            />
                                        }

                                    </div>
                                    <div className="cm_acnt2">
                                        <h4> {academy.sessionName}

                                            {favList.includes(academy.sessionId) ?

                                                <>
                                                    <button type="button" className="float-end btn fav_btn" onClick={() => addFav(academy.sessionId, 0)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height={14} width={15} fill="#FF8300">
                                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                        </svg>
                                                    </button>
                                                </>

                                                :

                                                <button type="button" className="float-end btn fav_btn" onClick={() => addFav(academy.sessionId, 1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height={14} width={15}>
                                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                    </svg>
                                                </button>
                                            }


                                        </h4>
                                        <p>{displayContent} {academy.sessionDescription.length > maxLength && <span onClick={() => toggleExpansion(academy.sessionId)} className='text-primary cursor-pointer mx-2'> {isExpanded && academy.sessionId == isExpandedId ? 'Show Less' : 'Show More'} </span>} </p>
                                    </div>
                                </div>
                            </div>)
                        })}

                    </div>

                    {totalPages > 1 &&
                        <div className="row cm_pag1">
                            <ul className="pagination justify-content-center text-center">

                                <li className={`page-item ${(currentPage - 1) == 0 ? 'disabled' : ''} `}>
                                    <a className="page-link" aria-label="Previous" onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) handlePageClick(currentPage - 1);
                                    }}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>

                                {renderPageNumbers()}

                                <li className={`page-item ${currentPage == totalPages ? 'disabled' : ''} `}>
                                    <a className="page-link" aria-label="Next" onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) handlePageClick(currentPage + 1);
                                    }}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    }
                </>

                :

                <div className="row justify-content-center">
                    <div className="col-md-10 col-sm-12 rsp_w100">
                        <h6 className="fw600 text-center" style={{ marginTop: '7%' }}>
                            <span>No data found.</span>
                        </h6>
                    </div>
                </div>
            }

        </>
    )
}