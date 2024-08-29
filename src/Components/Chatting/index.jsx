import React, { useEffect, useState } from "react";
import { EmojiIcon } from "../../svg/Emoji";
import { GalleryIcon } from "../../svg/Gallery";
import demoMedia from "../../assets/demomedia.jpg";
import { useSelector } from "react-redux";
import avatarImage from "../../assets/avatar.jpg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { formatDistance } from "date-fns";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
  const user = useSelector((user) => user.login.loggedIn);
  const [messages, setMessages] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const db = getDatabase();

  const handleSendMessage = () => {
    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiveName: singleFriend.name,
        whoReceiveId: singleFriend.id,
        message: messages,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
      }).then(() => {
        setMessages("");
      });
    }
  };

  // get messages
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

  return (
    <>
      <div className="w-full bg-white">
        <div className="py-4 bg-[#dfdfdf] px-6">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={singleFriend.profile || avatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-fontRegular text-black">
                {singleFriend.name || "Please select your friend for chatting"}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[530px] bg-[#FBFBFB] px-6 py-3 overflow-y-auto">
          {singleFriend?.status === "single"
            ? allMessages.map((item, i) => (
                <div key={i}>
                  {item.whoSendId === user.uid ? (
                    <div className="w-[60%] ml-auto flex flex-col items-end">
                      <p className="text-white font-fontRegular text-sm bg-slate-500 py-2 px-4 rounded-md inline-block">
                        {item.message}
                      </p>
                      <span className="mt-2 text-sm text-slate-500">
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="w-[60%] mr-auto my-3  flex flex-col items-start">
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
          {/* sender message */}
          {/* <div className="w-[60%] ml-auto">
            <p className="text-white font-fontRegular text-sm bg-slate-500 py-2 px-4 rounded-md inline-block">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
              voluptatibus eligendi ipsam unde praesentium ducimus nobis odio!
              Nesciunt repellendus tempore nihil distinctio odit est odio optio
              rem magni iste aspernatur sit laborum ipsa facilis autem,
              excepturi, perspiciatis perferendis ad recusandae pariatur
              adipisci cupiditate vitae! Incidunt fugit veritatis consequatur
              ipsa, aspernatur itaque ea deleniti ad excepturi reiciendis
              magnam, consequuntur voluptates ipsam velit magni molestiae quam!
              Dolorem aliquid mollitia qui distinctio excepturi ipsa quia
              adipisci vel est velit quis accusantium quod nemo incidunt
              consectetur asperiores consequatur rem minus, error, a enim, iste
              eum! Mollitia tempora tenetur consequuntur natus. Officia, laborum
              fuga? Facere doloremque tenetur voluptatum laudantium nesciunt, id
              dolorum unde voluptate. Exercitationem, fuga. Est quisquam maxime,
              quis nesciunt dolorem magni atque laboriosam?
            </p>
          </div> */}
          {/* reciever message */}
          {/* <div className="w-[60%] mr-auto my-3">
            <p className="text-black font-fontRegular text-sm bg-[#efefef] py-2 px-4 rounded-md inline-block">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
              voluptatibus eligendi ipsam unde praesentium ducimus nobis odio!
              Nesciunt repellendus tempore nihil distinctio odit est odio optio
              rem magni iste aspernatur sit laborum ipsa facilis autem,
              excepturi, perspiciatis perferendis ad recusandae pariatur
              adipisci cupiditate vitae! Incidunt fugit veritatis consequatur
              ipsa, aspernatur itaque ea deleniti ad excepturi reiciendis
              magnam, consequuntur voluptates ipsam velit magni molestiae quam!
              Dolorem aliquid mollitia qui distinctio excepturi ipsa quia
              adipisci vel est velit quis accusantium quod nemo incidunt
              consectetur asperiores consequatur rem minus, error, a enim, iste
              eum! Mollitia tempora tenetur consequuntur natus. Officia, laborum
              fuga? Facere doloremque tenetur voluptatum laudantium nesciunt, id
              dolorum unde voluptate. Exercitationem, fuga. Est quisquam maxime,
              quis nesciunt dolorem magni atque laboriosam?
            </p>
          </div> */}
          {/* sender message */}
          {/* <div className="w-[60%] ml-auto overflow-hidden">
            <img
              src={demoMedia}
              alt="cat"
              className="w-full h-full object-cover rounded-md"
            />
          </div> */}
          {/* reciever message */}
          {/* <div className="w-[60%] mr-auto overflow-hidden my-3">
            <img
              src={demoMedia}
              alt="cat"
              className="w-full h-full object-cover rounded-md"
            />
          </div> */}
        </div>
        <div className=" bg-[#F5F5F5] py-4">
          <div className="bg-white w-[532px] rounded-md mx-auto py-3 flex items-center justify-center gap-x-3">
            <div className="flex items-center gap-x-2 w-[15%]">
              <EmojiIcon />
              <GalleryIcon />
            </div>
            <input
              placeholder="type something"
              className="w-[60%] outline-none"
              onChange={(e) => setMessages(e.target.value)}
              value={messages}
            />
            <div className="w-[15%]">
              <button
                className="bg-[#4A81D3] px-4 py-2 rounded-md font-fontRegular text-sm text-white"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
