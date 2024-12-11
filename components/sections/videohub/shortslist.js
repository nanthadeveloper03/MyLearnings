'use client';
import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';

const videoData = [
    {
        videoId: "7ZPA4bXS3CE",
        userim: "/assets/images/videos/logo.png",
        title: "3 Types of Crypto and how it works?",
    },
    {
        videoId: "On4Qj91Jj9s",
        userim: "/assets/images/videos/logo.png",
        title: "Growth of Coins (BTC, ETH, BNB)",
    }
];

const ShortsList = () => {
    return (
        <div className="row">
            {videoData.map((video, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                    <div className="cm_acard2">
                        <div className="cm_acim2">
                            <YouTubeEmbed videoId={video.videoId} />
                        </div>
                        <div className="cm_acnt2">
                            <h4>
                                <img src={video.userim} alt='user' className='img-fluid' />
                                {video.title}                                
                            </h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShortsList;
