'use client';
import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';

const videoData = [
    {
        videoId: "FR0V3iSHB3I",
        userim: "/assets/images/videos/logo.png",
        title: "Driving Success: The Growth of UPRO",
    },
    {
        videoId: "7ZPA4bXS3CE",
        userim: "/assets/images/videos/logo.png",
        title: "Explore the Benefits of Our Minimal Staking Plan!",
    },
    {
        videoId: "7WOpEvg_yho",
        userim: "/assets/images/videos/logo.png",
        title: "Discover about Reward Claims & Flexible Staking Benefits",
    },
    {
        videoId: "On4Qj91Jj9s",
        userim: "/assets/images/videos/logo.png",
        title: "Guide to Syncing MetaMask with Ultrapro Blockchain",
    }
];

const VideosList = () => {
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

export default VideosList;
