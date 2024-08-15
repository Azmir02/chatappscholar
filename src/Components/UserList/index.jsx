import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../svg/AddFriend";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import avatarImage from "../../assets/avatar.jpg";

const UserLists = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [users, setUsers] = useState([]);

  const storage = getStorage();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((userList) => {
        if (user.uid !== userList.key) {
          getDownloadURL(Ref(storage, userList.key))
            .then((downloadURL) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  return (
    <>
      <div className="px-8 pt-3 bg-[#FBFBFB] h-[700px]">
        <h1 className="font-fontBold text-black text-xl">All Users</h1>

        {users.map((item) => (
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-x-2">
              <div className="w-12 h-12 rounded-full  overflow-hidden">
                <img
                  src={item.photoURL || avatarImage}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-fontRegular text-black text-lg">
                {item.username}
              </h3>
            </div>
            <div className="text-black cursor-pointer">
              <AddFriendIcon />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserLists;
