import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import avatarImage from "../../assets/avatar.jpg";
import { ActiveSingle } from "../../features/Slices/ActiveSingleSlice";

const Friends = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [friends, setFriends] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const db = getDatabase();
  const dispatch = useDispatch();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().senderId ||
          user.uid === item.val().receiverId
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(frndArr);
    });
  }, [db, user.uid]);

  const handleSingleChat = (data) => {
    if (user.uid === data.receiverId) {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.currentProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.currentProfile,
        })
      );
    } else {
      console.log("sender");

      dispatch(
        ActiveSingle({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
    }
  };

  return (
    <>
      <div className="shadow-md rounded-md bg-white p-5 h-[700px] overflow-y-auto">
        <h1 className="font-fontBold text-black text-xl">All Friends</h1>
        {friends?.map((item) => (
          <div
            className="flex items-center justify-between mt-3 hover:bg-[#efefef] px-4 py-2 rounded-md transition-all ease-linear duration-100 cursor-pointer"
            key={item.id}
            onClick={() => handleSingleChat(item)}
          >
            <div className="flex items-center gap-x-2">
              <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden">
                {user.uid === item.receiverId ? (
                  <img
                    src={item.currentProfile || avatarImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.receiverProfile || avatarImage}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="font-fontRegular text-black text-lg">
                {user.uid === item.senderId
                  ? item.receiverName
                  : item.senderName}
              </h3>
            </div>
            {location.pathname == "/" && (
              <button
                onClick={() => {
                  navigate("/message");
                }}
                className="px-4 py-2 font-fontRegular bg-[#6CD0FB] text-white rounded-md"
              >
                Message
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
