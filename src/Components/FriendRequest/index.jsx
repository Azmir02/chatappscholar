import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatarImage from "../../assets/avatar.jpg";

const FriendRequest = () => {
  const [friendReqList, setFriendReqList] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();

  // show request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let frndReq = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().receiverId) {
          frndReq.push({ ...item.val(), id: item.key });
        }
      });
      setFriendReqList(frndReq);
    });
  }, [db, user.uid]);

  console.log(friendReqList);
  // accept request
  const handleAccept = (data) => {
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendRequest/" + data.id));
    });
  };

  // reject
  const handleReject = (data) => {
    remove(ref(db, "friendRequest/" + data.id));
  };

  return (
    <>
      <div className="shadow-md rounded-md bg-white p-5 h-[700px] overflow-y-auto">
        <h1 className="font-fontBold text-black text-xl">Friend Request</h1>
        {friendReqList?.map((item) => (
          <div className="flex items-center justify-between mt-3" key={item.id}>
            <div className="flex items-center gap-x-2">
              <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden">
                <img
                  src={item.currentProfile || avatarImage}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-fontRegular text-black text-lg">
                {item.senderName}
              </h3>
            </div>
            <div className="flex items-center gap-x-2">
              <button
                className="px-4 py-2 font-fontRegular bg-[#6CD0FB] text-white rounded-md"
                onClick={() => handleAccept(item)}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 font-fontRegular bg-[#D34A4A] text-white rounded-md"
                onClick={() => handleReject(item)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FriendRequest;
