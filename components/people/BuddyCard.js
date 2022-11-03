// next / react
import { useRouter } from 'next/router';
import Link from 'next/link';
// own components
import BtnCTA from '../UI/BtnCTA';
// packages
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/Context';

function BuddyCard(props) {
  const {
    userId,
    username,
    handle,
    description,
    country,
    learning,
    profilePic,
    // setShowMsgForm,
    // setRecipient,
    // setSuccessMsg,
  } = props;

  const { authState, socket, addChat, chats, setChats } = useMainContext();

  // const router = useRouter();

  // const addChat = () => {

  //   if (authState && authState.email.length > 0) {
  //     // console.log(user);
  //     const alreadyInChat =
  //       chats.length > 0 &&
  //       chats.filter((chat) => chat.messagesWith === userId).length > 0;

  //     if (alreadyInChat) {
  //       return router.push(`/my-profile/messages?message=${userId}`);
  //     }
  //     //
  //     else {
  //       const newChat = {
  //         messagesWith: userId,
  //         username: username,
  //         lastMessage: '',
  //         date: Date.now(),
  //       };

  //       setChats((prev) => [newChat, ...prev]);

  //       return router.push(
  //         `/my-profile/messages?message=${userId}`,
  //         undefined,
  //         {
  //           shallow: true,
  //         }
  //       );

  //       //   return router.push(`/messages?message=${user._id}`);
  //     }
  //   } else {
  //     router.push('/login');
  //   }
  // };

  return (
    <div className="main-card-container">
      <div className="card-header">
        <div className="card-img-container">
          <img
            className="card-img"
            src={
              profilePic && profilePic.url && profilePic.url !== ''
                ? profilePic.url
                : '/img/default-pic.png'
            }
          />
        </div>
        <div className="card-header-username-country">
          {/* <div> */}
          <p className="card-header-username">{username}</p>
          {/* <p>{username}</p> */}
          <p className="card-header-country">{country}</p>
        </div>
      </div>

      <p className="card-description">{description}</p>

      <p className="card-learning">Is learning / wants to learn:</p>
      <div className="tech-span-box">
        {learning.slice(0, 6).map((item) => (
          <span
            className={`tech-span tech-span---${item.label}`}
            key={item._id}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <div className="card-footer-profile">
          <Link href={`/people/coding-buddies/${handle}`}>
            <a className="main-link">
              View Profile <Icon icon="bx:user" />
            </a>
          </Link>
        </div>
        <div className="card-footer-message">
          <BtnCTA
            label="message"
            onCLickAction={() => addChat(userId, username)}
            icon={true}
            iconType="ant-design:message-outlined"
          />
        </div>
      </div>
    </div>
  );
}

export default BuddyCard;
