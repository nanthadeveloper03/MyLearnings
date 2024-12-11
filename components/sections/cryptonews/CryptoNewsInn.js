import React, { useEffect, useState } from 'react';
import YouTubeEmbed from '@/components/youtube/YouTubeEmbed';
import Link from "next/link";
import { apiRequest } from '@/hooks/apiCall';
import ReactPlayer from 'react-player';
import { formatDate } from '@/util/common';
const CryptoNewsInn = () => {
    const [newsList, setNewsList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [loader, setLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12
    async function initLoad() {
        setIsLoading(true)
        try {
            const response = await apiRequest('/news/newsContentlist', { page: currentPage, limit: itemsPerPage })
            console.log(response, "RESPONCE");

            if (response?.status) {
                setNewsList(response?.data?.list)
                setTotalCount(response?.data?.totalCount)
                setLoader(false)
            }
        } catch (error) {
            console.error(error);
        }finally{
        setIsLoading(false)

        }
    }

    useEffect(() => {
        initLoad()
    }, [currentPage])


    const newsData = newsList || [];

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
    console.log(newsData, "NEWSDATA");

    return (
        <>
            <section className="blg_sc1">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="block-text1 text-center">
                            <h3 className="finter fw600 black8">Crypto News</h3>
                        </div>
                        {newsData.length > 0 ?
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-sm-12 col-12">
                                    <div className="row">
                                        {newsData.map((data, index) => (

                                            <div key={data} className="col-md-4 col-sm-6">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        {/* <YouTubeEmbed videoId={data.videoLink} />   */}
                                                        {data.uploadType == "image" ?
                                                            <img src={data.newsImage} width={40} height={40} /> :

                                                            <ReactPlayer
                                                                url={data.videoLink}
                                                                controls={true}
                                                                width='100%'
                                                                height='100%'
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
                                                    <div className="cm_acnt1">
                                                        <h4>{data.newsTitle}</h4>
                                                        {/* <p>{formatDate(data.updatedAt, 'MMMM Do YYYY, h:mm a')}
                                                    <Link href="#" className="float-end">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                            <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                        </svg>
                                                    </Link>
                                                </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}




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
                                    {/* <div className="row cm_pag1">
                                        <ul className="pagination justify-content-center text-center">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>

                                    </div> */}

                                </div>
                            </div> :
                            <>
{isLoading ? 
    <div className="row justify-content-center">
    <div className="col-md-10 col-sm-12 rsp_w100">
        <h6 className="fw600 text-center" style={{ marginTop: '7%' }}>
            <span>Loading...</span>
        </h6>
    </div>
</div>


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

                        }

                    </div>
                </div>
            </section>
        </>
    );
};

export default CryptoNewsInn;
