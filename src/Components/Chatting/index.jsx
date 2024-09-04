import React, { useEffect, useRef, useState } from "react";
import { EmojiIcon } from "../../svg/Emoji";
import { GalleryIcon } from "../../svg/Gallery";
import { useSelector } from "react-redux";
import avatarImage from "/image/avatar.jpg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { formatDistance } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref as Ref,
  uploadBytesResumable,
} from "firebase/storage";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
  const user = useSelector((user) => user.login.loggedIn);
  const [messages, setMessages] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const db = getDatabase();
  const storage = getStorage();
  const chooseFile = useRef(null);
  const scrollRef = useRef(null);

  const handleSendMessage = () => {
    if (!messages.trim()) {
      alert("Please type a message before sending.");
      return;
    }
    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiveName: singleFriend.name,
        whoReceiveId: singleFriend.id,
        message: messages,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMessages("");
      });
    }
  };

  // Get messages
  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      let singleMessageArray = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whoSendId &&
            item.val().whoReceiveId === singleFriend.id) ||
          (user.uid === item.val().whoReceiveId &&
            item.val().whoSendId === singleFriend.id)
        ) {
          singleMessageArray.push(item.val());
        }
      });
      setAllMessages(singleMessageArray);
    });
  }, [singleFriend?.id]);

  const handleEmojiSelect = ({ emoji }) => {
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages + emoji;
      return updatedMessages;
    });
  };
  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0];
    if (!imgFile) return;

    // Validate image type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(imgFile.type)) {
      alert("Only JPG and PNG files are allowed.");
      return;
    }

    // Validate image size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (imgFile.size > maxSize) {
      alert("Image size exceeds 2MB. Please upload a smaller image.");
      return;
    }

    const storagePath = `conversation/${user.displayName}/sendImageMessage/${imgFile.name}`;
    const storageTask = Ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageTask, imgFile);

    setIsUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMessage")), {
            whoSendName: user.displayName,
            whoSendId: user.uid,
            whoReceiveName: singleFriend.name,
            whoReceiveId: singleFriend.id,
            message: messages,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessages("");
            setIsUploading(false);
            setUploadProgress(0);
          });
        });
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allMessages]);

  const handleSendButton = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="w-full bg-white">
        <div className="py-4 bg-[#dfdfdf] px-6">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={singleFriend?.profile || avatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-fontRegular text-black">
                {singleFriend?.name || "Please select your friend for chatting"}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${
            isUploading ? "h-[500px]" : "h-[530px]"
          }  bg-[#FBFBFB] px-6 py-3 overflow-y-auto`}
        >
          {singleFriend?.status === "single"
            ? allMessages.map((item, i) => (
                <div key={i} ref={scrollRef}>
                  {item.whoSendId === user.uid ? (
                    <div className="">
                      {item.image ? (
                        <div className="w-[60%] ml-auto overflow-hidden text-right">
                          <img
                            src={item.image}
                            alt="image"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <span className="mt-2 text-sm text-slate-500">
                            {" "}
                            {formatDistance(item.date, new Date(), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      ) : (
                        <div className="mt-3 w-[60%] ml-auto flex flex-col items-end">
                          <p className="text-white font-fontRegular text-sm bg-slate-500 py-2 px-4 rounded-md inline-block">
                            {item.message}
                          </p>
                          <span className="mt-2 text-sm text-slate-500">
                            {formatDistance(item.date, new Date(), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : item.image ? (
                    <div className="w-[60%] mr-auto overflow-hidden my-3">
                      <img
                        src={item.image}
                        alt="image"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <span className="mt-2 text-sm text-slate-500">
                        {" "}
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="w-[60%] mr-auto my-3 flex flex-col items-start">
                      <p className="text-black font-fontRegular text-sm bg-[#efefef] py-2 px-4 rounded-md inline-block">
                        {item.message}
                      </p>
                      <span className="mt-2 text-sm text-slate-500">
                        {" "}
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : ""}
        </div>
        <div className="bg-[#F5F5F5] py-4">
          <div>
            <div className="flex items-center justify-center gap-x-3 bg-white w-[532px] rounded-md mx-auto py-3">
              <div className="flex items-center gap-x-2 w-[15%]">
                <div className="relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => setEmojiShow((prev) => !prev)}
                  >
                    <EmojiIcon />
                  </div>
                  {emojiShow && (
                    <div className="absolute bottom-8 -left-5">
                      <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </div>
                  )}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => chooseFile.current.click()}
                >
                  <GalleryIcon />
                </div>
                <input
                  ref={chooseFile}
                  hidden
                  type="file"
                  accept=".jpg, .png"
                  onChange={handleImageUpload}
                />
              </div>
              <input
                placeholder="Type something"
                className="w-[60%] outline-none"
                onChange={(e) => setMessages(e.target.value)}
                value={messages}
                onKeyUp={handleSendButton}
              />
              <button
                className="w-[15%] text-white bg-blue-500 py-3 rounded-md bg-primary"
                onClick={handleSendMessage}
                disabled={isUploading}
              >
                Send
              </button>
            </div>
            <div className="px-5">
              {isUploading && (
                <div className="bg-[#F5F5F5] py-2">
                  <div className="w-[532px] mx-auto bg-gray-200 rounded-full">
                    <div
                      className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress.toFixed(2)}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
