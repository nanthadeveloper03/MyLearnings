"use client";
import { useEffect, useState } from "react";
// import Link from "next/link";
import { useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { encryptText, decryptText } from "../../../util/conceal";
import { formatDate } from "@/util/common";
import withAuth from '@/util/withAuth';
import { useHover } from "@/util/hoverContext";
import { toast } from "react-toastify";
import { apiRequest } from "@/hooks/apiCall";

const ToggleSection = () => {
  const CHAT_SOCKET_URL = process.env.NEXT_PUBLIC_CHAT_SOCKET_API_BASE_URL;
  const CHAT_API = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL;
  const authSelector = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  // const [files, setFiles] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [error, setError] = useState('');
  const [maintanence, setMaintanence] = useState({});


  const [socketConnection, setSocketConnection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [findStatus, setFindStatus] = useState(null);
  const [lockDetails, setLockDetails] = useState('');
  const chatBoxRef = useRef(null);
  const { isHovered } = useHover();
  const [settings, setSettings] = useState({ maintenanceStatus: 0, maintenanceTxt: '' })




  useEffect(() => {
    if (isHovered) {
      setIsVisible(false)
      setIsChatExpanded(false)
    }

  }, [isHovered])
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
        socket.emit('joinRoom', chatId);
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
            getChatMessage();
          }
        });
        socket.on("chatEnded", (data) => {
          if (data) {
            getChatMessage();
            setFindStatus(3);
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
    
    if (isVisible) {
      
      getChatMessage();
    }
  }, [isVisible]);

  useEffect(() => {
    if (process.env.CHAT_SOCKET_CONNECTION !== "Disable") {
      if (socketConnection != null && authenticated) {
        chatmessageSocket();
      }
    }
  }, [socketConnection]);
  const chatmessageSocket = () => {
    socketConnection.emit('joinRoom', chatId);
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
    socketConnection.on("chatMessageOneList", (responceMsg) => {
      setChatId(responceMsg.chatId);
      const messageContent = responceMsg.messageContent;

      if (Array.isArray(messageContent) && messageContent.length > 0) {
        setChatMessages((prevMessages = []) => {
          // Add all new messages directly to the state
          return [...prevMessages, ...messageContent];
        });
      }
    });

    // Clean up on component unmount
    return () => {
      socketConnection.off("chatMessageReceiver");
    };
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
    // const encryptedData = encryptText(JSON.stringify(postForm));
    // const data = { payload: encryptedData };
    try {
      const chatRep = await axios.post(
        `${hostUrl}/userApi/chatList`,
        postForm,
        config
      );
      if (chatRep.status) {
        setLockDetails(chatRep.data.data.userDet?.chatMsg?.lockUser[0])
        setFindStatus(chatRep.data.data?.userDet?.chatMsg?.status);
        setChatMessages(chatRep.data.data?.userDet?.chatMsg?.messageContent);
        setChatId(chatRep.data.data.userDet.chatMsg.chatId);
      } else {
        setChatMessages();
        setChatId();
      }
    } catch (error) {
      if (error?.response?.data) {
        setMaintanence(error.response?.data.response)
      }
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
      chatId: chatId,
      senderType: "user",
      senderName: authSelector?.user?.name,
      senderEmail: authSelector?.user?.email
    };
    if (socketConnection != null && authenticated) {
      socketConnection.emit("endChatMsg", postForm);
      setMessage("");
      socketConnection.on("chatEnded", (data) => {
        if (data) {
          getChatMessage();
          setFindStatus(3);
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
  function formatDate1(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  }




  // Example usage

  const sendMessage = async () => {
    if (message.trim() === '') {
      setError('Please enter a valid message.');
      toast.dismiss()
      toast.error('Please enter a message')
      toast.dismiss()
      toast.error('Enter Message...')
      return;
    }

    // let upload;
    // if(files?.length > 0) upload = await fileUploadData();

    if (message) {
      const messageData = {
        senderType: "user",
        wsToken: authSelector?.user?.wsToken,
        messageType: "text",
        senderName: authSelector?.user?.name,
        messageContent: message,
        chatId: chatId
        // files: upload ? upload : []
      };
      if (socketConnection != null && authenticated) {
        socketConnection.emit("newMessage", messageData);
        setMessage("");
      }

      //setFiles([]);
    }
  };
  const [content, setContent] = useState([]);
  useEffect(() => {
    if (isVisible) {
    getContentMessage();
    }
  }, [isVisible]);

  async function getContentMessage() {
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
    // const encryptedData = encryptText(JSON.stringify(postForm));
    // const data = { payload: encryptedData };
    try {
      const response = await axios.post(
        `${hostUrl}/userApi/chatMessage`,
        postForm,
        config
      );

      if (response.status) {
        setContent(response.data.data);

      } else {

      }
    } catch (error) {
      console.log("getChatMessage error: ", error);
    }
  }


  const handleChangeStatus = async () => {
    const hostUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET_API_BASE_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${authSelector?.user?.accessToken}`,
      },
    };
    const postForm = {
      wsToken: authSelector?.user?.wsToken,
      chatId: chatId
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
  const handleMessageChange = (e) => {
    const value = e.target.value;
    // Check if the input contains any letters
    if (value === '') {
      setError('Please enter a valid message.');
      setMessage('');
    } else {
      setError(''); // Clear the error if input is valid
      setMessage(value); // Update the message state
    }

  };


  // Function to close the chatbox
  const handleEndChat1 = () => {
    setIsVisible(false);
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
                  onClick={handleEndChat1}
                >
                  <img
                    src="/assets/images/support/minimize.png"
                    className="img-fluid"
                  />
                </button>
              </h4>
            </div>
            {settings.maintenanceStatus == 1 ?
            <>
            <div>
              <p>{settings.maintenanceTxt}</p>
            </div>
            </>:
            <div className="card-body">
              <div className="chatbox">
                <div className="chatuserbk d-flex align-items-center justify-content-between">
                  <span className="chat_user">
                    <img
                      src={user && user.profileImg || "/assets/images/avt/user.png"}
                      className="chatuser"
                    />
                    <span className='uname_ct'>
                      {user && user.name}
                    </span>
                    {/* <span className='uname_id'>
                    {user && user.country}
                    </span> */}

                  </span>
                  {maintanence.liveChatMaintenance===1 ?
                "":  
                  <span className="chat_end">
                    {findStatus === 1 &&
                      <button
                        type="button"
                        className="btn btn-chat1"
                        onClick={handleEndChat}
                      >
                        End Chat
                      </button>
                    }
                  </span>
                }
                </div>
                {maintanence.liveChatMaintenance===1 ?
                
          <h6>{maintanence.liveChatMaintenanceMessage}</h6>
                
                : 
                
                <div
                className="chatbox-messages anim_scoll"
                id="chatbox-messages"
                ref={chatBoxRef}
              >
                {content.map((msg, index) => {
                  return (
                    <div key={index} className='message user-message'>
                      {msg.message}
                    </div>
                  );
                })}


                {chatMessages?.map((msg, index) => {
                  return (
                    <div key={index}>
                      {msg.senderType === "user" && (
                        <div className="w-100 disp_inblock">
                          <div className="message bot-message">
                            <span className="mb-0">{msg.message}</span>
                            <span className="timertx">
                              {formatDate(msg.timestamp, 'MMM Do YYYY, h:mm a')}
                              {/* {formatDate1(msg.timestamp, "H:MM a")} */}
                            </span>
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
                            <span className="timertx">
                            {formatDate(msg.timestamp, 'MMM Do YYYY, h:mm a')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
                }
                {findStatus === 3 && (
                  <div className="end_ch1">
                    <div className="chat-session-ended-message  ">
                      <p className="text-center ">
                        "Chat has ended. Thank you for reaching out!"
                      </p>
                    </div>
                    <div className="d-flex justify-content-center start_chat">
                      <button
                        className="btn btn-chat1 mt-1"
                        onClick={() => {
                          handleChangeStatus();
                        }}
                      >
                        Start New Chat
                      </button>
                    </div>
                  </div>
                )}


{maintanence.liveChatMaintenance===1 ? "":

<>
                {findStatus !== 3 && (
                  <div className="chatbox-input-area">
                    {/* <input type="text" id="chat-input" placeholder="Type a reply..." /> */}
                    {/* <input 
                      type="text" 
                      id="chat-input" 
                      placeholder="Type a reply..." 
                      value={message}
                      onChange={handleMessageChange}
                      //onChange={(e) => {setMessage(e.target.value)}}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      /> */}

                    <textarea
                      id="chat-input"
                      placeholder="Write a Message..."
                      value={message}
                      onChange={handleMessageChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          if (message.trim() === "") {
                            e.preventDefault(); // Prevent new line if the message is empty
                          } else {
                            sendMessage(); // Send message if there is content
                            e.preventDefault(); // Prevent default new line behavior
                          }
                        }
                      }}
                      className="form-control1"

                    />

                    <button id="send-btn" className="d-flex gap-2 justify-content-center" onChange={handleMessageChange} onClick={sendMessage}>
                      <a className="mic">
                        <img src="/assets/images/support/send.png" className="img-fluid" />
                      </a>
                    </button>

                    {/* {error && <span className="error-message">{error}</span>} */}
                    {/* <button id="send-btn" className="d-flex gap-2 justify-content-center">
                        <a href="#" className="mic">
                          <img src="/assets/images/support/mic.png" className="img-fluid" />
                        </a>
                        <a href="#" className="pin" onClick={handlePinClick}>
                          <img src="/assets/images/support/pin.png" className="img-fluid" />
                        </a>
                      </button> */}
                    {/* Hidden file input */}
                    {/* <input 
                        type="file" 
                        multiple
                        ref={fileInputRef} 
                        // value={selectedFileName}
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      /> */}
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
                </>
}

              </div>
            </div>
}
          </div>
        </div>
      )}
    </section>
  );
}
export default withAuth(ToggleSection) 