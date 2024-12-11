'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '@/hooks/apiCall';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";
import Link from 'next/link';

export default function AcademyList() {
    const router = useRouter()
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedId, setIsExpandedId] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(false)
    const [favList, setFavList] = useState([])
    const [academyList, setAcademyList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const itemsPerPage = 12
    const maxLength = 120

    const toggleExpansion = (id) => {
        setIsExpanded(!isExpanded);
        setIsExpandedId(id)
    };

    const [playingVideo, setPlayingVideo] = useState(null);

    const handlePlay = (value) => {
        setPlayingVideo(value)
    }

    async function initLoad() {
        try {
            const response = await apiRequest('/academics/list', { page: currentPage, limit: itemsPerPage })
            if (response?.status) {
                setAcademyList(response?.data?.list)
                setTotalCount(response?.data?.totalCount)
                setFavList(response?.data?.fav)
                setLoader(false)
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        initLoad()
    }, [currentPage])

    const academyData = academyList || [];

    const handlePageClick = (page) => {

        if (page != currentPage) {
            setLoader(true)
            setCurrentPage(page);
        }
        const scrollPosition = document.body.scrollHeight * (10 / 100);
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

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
                if (favourite == 1) {
                    favList.push(sessionId)
                } else {
                    const index = favList.indexOf(sessionId);
                    if (index > -1) {
                        favList.splice(index, 1);
                    }
                }

                setFavList(favList)
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

                            return (<div className="col-md-4 col-sm-6" key={index}>
                                <div className="cm_acard2">
                                    <div className="cm_acim2">
                                        {academy.videoHandler == 0 ?
                                            <img src={academy.sessionImage} width={'100%'} height={'250px'} /> :
                                            <ReactPlayer
                                                url={academy.sessionYoutubeLink}
                                                controls={true}
                                                width='100%'
                                                height='100%'
                                                playing={playingVideo === `video${index}`}
                                                onPlay={() => handlePlay(`video${index}`)}
                                                config={{
                                                    file: {
                                                        attributes: {
                                                            controlsList: 'nodownload',
                                                        },
                                                    },
                                                }}
                                            />
                                        }

                                    </div>
                                    <div className="cm_acnt2">
                                        <h3> {academy.sessionName}

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
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512"><path fill="#FF8300" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>
                                                </button>
                                            }


                                        </h3>
                                        <p>{displayContent} {academy.sessionDescription.length > maxLength && <span onClick={() => toggleExpansion(academy.sessionId)} className='text-primary cursor-pointer mx-2'> {isExpanded && academy.sessionId == isExpandedId ? 'Show Less' : 'Show More'} </span>} </p>
                                    </div>
                                </div>
                            </div>)
                        })}

                    </div>

                    {totalPages && totalPages > 1 &&
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