import React from 'react';
import Link from "next/link";
import { useState } from 'react';


const TransactionsCard = () => {

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Welcome Bonus!',
            time: '12:20',
            message: 'We are thrilled to have you with us. To celebrate your joining, we have credited a welcome bonus of 25 USDT.',
            imgSrc: '/assets/images/header/tether.png'
        },
        {
            id: 2,
            title: 'Welcome Bonus!',
            time: '12:20',
            message: 'We are thrilled to have you with us. To celebrate your joining, we have credited a welcome bonus of 25 USDT.',
            imgSrc: '/assets/images/header/tether.png'
        },
        {
            id: 3,
            title: 'Welcome Bonus!',
            time: '12:20',
            message: 'We are thrilled to have you with us. To celebrate your joining, we have credited a welcome bonus of 25 USDT.',
            imgSrc: '/assets/images/header/tether.png'
        },
        {
            id: 4,
            title: 'Welcome Bonus!',
            time: '12:20',
            message: 'We are thrilled to have you with us. To celebrate your joining, we have credited a welcome bonus of 25 USDT.',
            imgSrc: '/assets/images/header/tether.png'
        },

    ]);

    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    // State to manage the visibility of notifications
  const [showNotifications, setShowNotifications] = useState(true);
  const [showAll, setShowAll] = useState(false); // State to toggle list visibility

  // Function to handle the trash button click
  const handleTrashClick = () => {
    setShowNotifications(false); // Hide the notifications list
  };

    // Function to handle "Read All" button click
    const handleReadAllClick = () => {
        setShowAll(true); // Show the full list of notifications
      };

    return (
        <>
            <div className="notif_trans">
                <div className="notif_day">
                    Today
                    <button type="button" className="btn trash_btn" onClick={handleTrashClick}>
                        <img src="/assets/images/header/trash.png" className="img-fluid" />
                    </button>
                </div>
                {showNotifications && (
                <ul className='notif_tplis'>
                    {(showAll ? notifications : notifications.slice(0, 2)).map((notification) => (                      
                        <li key={notification.id}>
                            <div className='not_cur'>
                                <img src={notification.imgSrc} className='img-fluid' alt="notification" />
                            </div>
                            <div className='not_curdes'>
                                <h5>{notification.title}</h5>
                                <h6>{notification.time}</h6>
                                <p>{notification.message}</p>
                            </div>
                            <button
                                type="button"
                                className="btn clos_not1"
                                onClick={() => removeNotification(notification.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
                 )}

                 <ul className='notif_action d-flex justify-content-end flex-wrap gap-2'>
                    <li>
                        <button type='button' className='btn trash_btn1' onClick={handleTrashClick}>Delete All</button>
                    </li>
                    <li>
                        <button type='button' className='btn btn-action text-white' onClick={handleReadAllClick}>Read All</button>
                    </li>
                 </ul>

            </div>

        </>
    );
};

export default TransactionsCard;
