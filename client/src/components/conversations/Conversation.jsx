// import React from 'react'
// import './conversation.css'

// function Conversations({conversation}) {
//   return (
//     <div className="conversation">
//       <img
//         className="conversationImg"
//         src= "logo192.png"
//         // {
//         //   user?.profilePicture
//         //     ? PF + user.profilePicture
//         //     : PF + "person/noAvatar.png"
//         // }
//         alt=""
//       />
//       <span className="conversationName">
//         John Doe
//         {/* {user?.username} */}
//         </span>
//     </div>
//   )
// }

// export default Conversations

import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}