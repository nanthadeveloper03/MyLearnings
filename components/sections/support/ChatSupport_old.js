"use client";
import { useEffect, useState } from "react";
// import Link from "next/link";
import { useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { encryptText, decryptText } from "../../../util/conceal";
import { formatDate } from "@/util/common";

export default function ToggleSection() {
  const CHAT_SOCKET_URL = process.env.NEXT_PUBLIC_CHAT_SOCKET_API_BASE_URL;
  const CHAT_API = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL;
  const authSelector = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState("");
  // const [files, setFiles] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const [socketConnection, setSocketConnection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [findStatus, setFindStatus] = useState(null);
  const [lockDetails,setLockDetails] = useState('');

  useEffect(() => {
    if (process.env.CHAT_SOCKET_CONNECTION !== "Disable") {
      let socket;
      if (!socketConnection) {
        socket = socketIOClient(CHAT_SOCKET_URL, {
          transports: ["websocket"],
          auth: {
            senderType: "user",
            wsToken: authSelector?.user?.wsToken,
          },
          extraHeaders: {
            Authorization: `Bearer ${authSelector?.user?.accessToken}`,
          },
        });

        socket.on("connect", () => {
          setSocketConnection(socket);
          setAuthenticated(true);
        });

        // Handle connection errors
        socket.on("connect_error", (err) => {
          console.error("Socket connection error:", err);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
          setSocketConnection(null);
          setAuthenticated(false);
        });

        socket.on("adminchatMessageReceiver", (responceMsg) => {
          const messageContent = responceMsg[0]?.messageContent;
          if (Array.isArray(messageContent) && messageContent.length > 0) {
            setChatMessages((prevMessages) => {
              const newMessages = messageContent.filter(
                (newMsg) =>
                  !prevMessages.some((prevMsg) => prevMsg._id === newMsg._id)
              );
              return [...prevMessages, ...newMessages];
            });
          }
        });
        socket.on("chatEnded", (data)=>{
          if(data){
            getChatMessage();
          }
      });

        
      }

      return () => {
        if (socketConnection) {
          socketConnection.disconnect();
          console.log("Socket disconnected on unmount");
        }
      };
    }
  }, [socketConnection, authSelector]);

  useEffect(() => {
    getChatMessage();
  }, []);

  useEffect(() => {
    if (process.env.CHAT_SOCKET_CONNECTION !== "Disable") {
      if (socketConnection != null && authenticated) {
        chatmessageSocket();
      }
    }
  }, [socketConnection]);
  const chatmessageSocket = () => {
    socketConnection.emit("joinRoom", chatId);
    socketConnection.on("chatMessageList", (responceMsg) => {
      setChatId(responceMsg.chatId);
      const messageContent = responceMsg.messageContent;
      if (Array.isArray(messageContent) && messageContent.length > 0) {
        setChatMessages((prevMessages) => {
          const newMessages = messageContent.filter(
            (newMsg) =>
              !prevMessages.some((prevMsg) => prevMsg._id === newMsg._id)
          );

          // Add only non-duplicate messages to the state
          return [...prevMessages, ...newMessages];
        });
      }
    });

    // Clean up on component unmount
    return () => {
      socketConnection.off("chatMessageReceiver");
    };
  };

  async function getChatMessage() {
    const hostUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET_API_BASE_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${authSelector?.user?.accessToken}`,
      },
    };
    // Adding wsToken to the request data
    const postForm = {
      wsToken: authSelector?.user?.wsToken,
    };
    const encryptedData = encryptText(JSON.stringify(postForm));
    const data = { payload: encryptedData };
    try {
      const chatRep = await axios.post(
        `${hostUrl}/userApi/chatList`,
        data,
        config
      );
      if (chatRep.status) {
        setLockDetails(chatRep.data.data.userDet?.chatMsg?.lockUser[0])
        setFindStatus(chatRep.data.data.userDet.chatMsg.status);
        setChatMessages(chatRep.data.data.userDet.chatMsg.messageContent);
        setChatId(chatRep.data.data.userDet.chatMsg.chatId);
      } else {
        setChatMessages();
        setChatId();
      }
    } catch (error) {
      console.log("getChatMessage error: ", error);
    }
  }

  const handlePinClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    // if (files.length > 0) {
    //   const filesData = Array.from(files).map((file) => {
    //     return new Promise((resolve) => {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         resolve({
    //           fileName: file.name,
    //           fileBuffer: reader.result,
    //           fileType: file.type,
    //         });
    //       };
    //       reader.readAsArrayBuffer(file);
    //     });
    //   });

    //   // Emit all files at once as a batch
    //   Promise.all(filesData).then((files) => {
    //     console.log("files===============", files);

    //     // if(socketConnection != null && authenticated) socketConnection.emit("fileUpload", { files });
    //   });
    // }
  };

  const handleFileChange = (e) => {
    // let files = e.target.files;
    // if (files.length > 0) {
    //   setFiles(files); // Set all selected files
    // }
    // if (files.length > 1) {
    //   setSelectedFileName(`${files.length} files selected`); // Display count for multiple files
    // } else if (files.length === 1) {
    //   setSelectedFileName(files[0].name); // Extract and display the filename
    // } else {
    //   setSelectedFileName(''); // Clear placeholder if no file selected
    // }
    // fileInputRef.current.value = '';
  };

  // const fileUploadData = () => {
  //   if (files.length > 0) {
  //     const filesData = Array.from(files).map((file) => {
  //       return new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           resolve({
  //             fileName: file.name,
  //             fileBuffer: reader.result,
  //             fileType: file.type,
  //           });
  //         };
  //         reader.readAsArrayBuffer(file); // Read the file as an array buffer
  //       });
  //     });

  //     // Emit all files as a batch
  //     return Promise.all(filesData).then((files) => {
  //       console.log("Uploaded files:", files);
  //       setFiles(files);
  //       // if(socketConnection != null && authenticated) socketConnection.emit("fileUpload", { files });
  //       return files;
  //     });
  //   } else {
  //     return null
  //   }
  // };
  // 2024-10-22T04:03:11.880Z;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsChatExpanded(!isChatExpanded);
  };

  const handleEndChat = () => {
    const postForm = {
      chatId:chatId
    };
    if (socketConnection != null && authenticated) {
      socketConnection.emit("endChatMsg", postForm);
      setMessage("");
      socketConnection.on("chatEnded", (data)=>{
        if(data){
          getChatMessage();
        }
      })
    }
  };

  // const sendMessage = async () => {
  //   const uploadedFiles = await fileUploadData(); // Wait for file upload data

  //   if (message || uploadedFiles?.length > 0) {
  //     const messageData = {
  //       senderType: 'user',
  //       messageType: (uploadedFiles?.length > 0) ? 'file' : 'text',
  //       messageContent: message,
  //       files: uploadedFiles || null
  //     };

  //     console.log("Sending message:", messageData);

  //     // if (socketConnection != null && authenticated) socketConnection.emit('newMessage', messageData);

  //     setMessage('');
  //     setFiles([]); // Reset files after sending
  //   }
  // };

  const sendMessage = async () => {
    // let upload;
    // if(files?.length > 0) upload = await fileUploadData();

    if (message) {
      const messageData = {
        senderType: "user",
        wsToken: authSelector?.user?.wsToken,
        messageType: "text",
        senderName: authSelector?.user?.name,
        messageContent: message,
        // files: upload ? upload : []
      };

      if (socketConnection != null && authenticated) {
        socketConnection.emit("newMessage", messageData);
        setMessage("");
      }

      //setFiles([]);
    }
  };

  const handleChangeStatus = async ()=>{
    const hostUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET_API_BASE_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${authSelector?.user?.accessToken}`,
      },
    };
    const postForm = {
      wsToken: authSelector?.user?.wsToken, 
      chatId:chatId
    };
    //const encryptedData = encryptText(JSON.stringify(postForm));
    // const data = { payload: encryptedData };
    try {
      const chatRep = await axios.post(
        `${hostUrl}/userApi/status`,
        postForm,
        config
      );
      if (chatRep.status) {
        getChatMessage()
      } else {
      }
    } catch (error) {
      console.log("getChatMessage error: ", error);
    } 
  };

  return (
    <section className="chatsupport">
      <span className="position-fixed" onClick={toggleVisibility}>
        {isChatExpanded ? (
          <span className="aft_chat">
            <img src="/assets/images/support/arrow.png" className="img-fluid" />
          </span>
        ) : (
          <span className="bef_chat">
            <img
              src="/assets/images/support/supportchat.png"
              className="img-fluid"
            />
            <span className="sup_tx">Support</span>
          </span>
        )}
      </span>

      {/* Conditional rendering of the chatbox */}
      {isVisible && (
        <div className="chatbox__sec">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center text-white">
                Online Support
                <button
                  type="button"
                  className="btn btn-arr"
                  onClick={handleEndChat}
                >
                  <img
                    src="/assets/images/support/minimize.png"
                    className="img-fluid"
                  />
                </button>
              </h4>
            </div>
            <div className="card-body">
              <div className="chatbox">
                <div className="chatuserbk d-flex align-items-center justify-content-between">
                  <span className="chat_user">
                    <img
                      src="/assets/images/support/chatuser.png"
                      className="chatuser"
                    />
                    {lockDetails && lockDetails.status=== 1 &&
                    <>
                       <span className="uname_ct">{lockDetails.adminName}</span>
                       <span className="uname_id">{lockDetails._id}</span>
                    </>
                    }
                     {lockDetails && lockDetails.status=== 0 &&
                    <>
                      <span className='uname_ct'>
                    User_Name
                    </span>
                    <span className='uname_id'>
                    #UP30884
                    </span>
                    
                    </>
}
                 
                  </span>
                  <span className="chat_end">
                    <button
                      type="button"
                      className="btn btn-chat1"
                      onClick={handleEndChat}
                    >
                      End Chat
                    </button>
                  </span>
                </div>
                <div
                  className="chatbox-messages anim_scoll"
                  id="chatbox-messages"
                >
                  <div className="message user-message">
                    Hi there - I am pro, your bot assistant, always here to
                    serve you!
                    <span className="timertx">
                      {formatDate(new Date(), "H:MM A")}
                    </span>
                  </div>
                  <div className="message user-message">
                    Ultrapro Customer Support respond to messages in the
                    official Ultrapro group only but never contact in private
                    message out of official Ultrapro group channel. Treat any
                    private messages like from TG as scams and ignore suspicious
                    activities.
                    <span className="timertx">
                      {formatDate(new Date(), "H:MM A")}
                    </span>
                  </div>
                  {/* <div className="message float-start pt-2">
                    <ul className='d-flex flex-wrap'>
                      <li><Link href="#">Crypto Withdraw</Link></li>
                      <li><Link href="#">Crypto deposit</Link></li>
                      <li><Link href="#">Fiat deposit & Wiithdraw</Link></li>
                      <li><Link href="#">P2P related</Link></li>
                      <li><Link href="#">KYC Related</Link></li>
                    </ul>
                    
                  </div>
                  <div className='w-100 disp_inblock'>
                  <div className="message bot-message">Crypto Withdraw

                  <div className='timertx'>11:14 AM</div>
                  </div>
                  </div>
                  <div className='w-100 disp_inblock'>
                  <button className="btn btn-chat d-flex gap-1" type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                </button>
                  </div>
                  <div className='w-100 full_msg'>
                  <div className='timertx'>11:14 AM</div>
                  </div>

                  <div className="message user-message text_user">
                    <div className='chat_big'>
                      <img src='/assets/images/support/bigim.png' className='img-fluid' />                      
                    </div>
                    <p>This is a message sent by the business. You can customise it to with a ton of variants!</p>
                    <div className='timertx'>11:14 AM</div>                  
                  </div>

                  <div className='w-100 disp_inblock'>
                  <div className="message bot-message end_user">
                  <div className='chat_big'>
                      <img src='/assets/images/support/bigim1.png' className='img-fluid' />                      
                    </div>


                  <div className='timertx'>11:14 AM</div>
                  </div>
                  </div>

                  <div className='w-100 disp_inblock'>
                  <div className="message bot-message end_user_grp">
                  <ul className="row list-unstyled g-1 user_grplis p-0">
                  <li className="col-6 p-1">
                    <img src="/assets/images/support/smallim1.png" alt="Icon 1" className="img-fluid" />
                  </li>
                  <li className="col-6 p-1">
                    <img src="/assets/images/support/smallim2.png" alt="Icon 2" className="img-fluid" />
                  </li>
                  <li className="col-6 p-1">
                    <img src="/assets/images/support/smallim3.png" alt="Icon 3" className="img-fluid" />
                  </li>
                  <li className="col-6 p-1">
                    <div className='mask_im position-relative d-flex align-items-center justify-content-center'>
                    <img src="/assets/images/support/smallim4.png" alt="Icon 4" className="img-fluid" />
                    <span className='im_count'>+5</span>
                    </div>
                  </li>
                </ul>
                  <div className='timertx'>11:14 AM</div>
                  </div>
                  </div> */}
                  {chatMessages?.map((msg, index) => {
                    return (
                      <div key={index}>
                        {msg.senderType === "user" && (
                          <div className="w-100 disp_inblock">
                            <div className="message bot-message">
                              <span className="mb-0">{msg.message}</span>
                              <div className="timertx">
                                {formatDate(msg.timestamp, "H:MM a")}
                              </div>
                            </div>
                          </div>
                        )}
                        {msg.senderType === "agent" && (
                          <div className="w-100 disp_inblock">
                            <div className="message user-message">
                              <p className="mb-0">{msg.message}</p>
                              {/* <span style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px', display: 'block', textAlign: 'right' }}>
                                  {formatDate(msg.timestamp)}
                                </span> */}
                              <div className="timertx">
                                {formatDate(msg.timestamp, "H:MM a")}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>
                  {findStatus === 3 &&(
                      <>
                       <div className="chat-session-ended-message  ">
                        <p className="text-center ">
                          Your chat session has ended. If you wish to continue
                          the conversation from where you left,
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                      <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleChangeStatus();
                      }}
                    >
                      Click Here
                    </button>
                    </div>
                      </> 
                    )}

{findStatus !== 3 && (
                  <div className="chatbox-input-area">
                      {/* <input type="text" id="chat-input" placeholder="Type a reply..." /> */}
                      <input 
                      type="text" 
                      id="chat-input" 
                      placeholder="Type a reply..." 
                      value={message}
                      // onChange={handleMessage}
                      onChange={(e) => {setMessage(e.target.value)}}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      />

                      <button id="send-btn" className="d-flex gap-2 justify-content-center">
                        <a href="#" className="mic">
                          <img src="/assets/images/support/mic.png" className="img-fluid" />
                        </a>
                        <a href="#" className="pin" onClick={handlePinClick}>
                          <img src="/assets/images/support/pin.png" className="img-fluid" />
                        </a>
                      </button>

                      {/* Hidden file input */}
                      <input 
                        type="file" 
                        multiple
                        ref={fileInputRef} 
                        // value={selectedFileName}
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      />
                      {/* <input
                        type="text"
                         value={selectedFileName} // Display selected file names here
                        readOnly
                        placeholder="Select files"
                        // onClick={() => fileInputRef.current.click()} // Open file picker on click
                        style={{ cursor: "pointer" }}
                      /> */}
                      {/* <input type="file" multiple onChange={handleFileChange} onKeyPress={(e) => e.key === "Enter" && sendMessage()} /> */}
                </div>
)}

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}