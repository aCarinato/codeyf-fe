// next / react
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import DMCard from '../../../../components/message/direct-message/DMCard';
import BtnCTA from '../../../../components/UI/BtnCTA';
// packages
import axios from 'axios';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../../../context/Context';

function ConversationIdPage() {
  const { authState } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const _id = query._id;

  const [conversation, setConversation] = useState({});
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const fetchConversation = async () => {
    try {
      if (_id) {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/message/render-conversation/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        console.log(res.data);
        if (res.data.success) {
          setConversation(res.data.conversation);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [_id, authState]);

  const sendMessage = async () => {
    try {
      setLoading(true);
      const conversationId = _id;

      let recipientId;
      if (conversation.firstUser.username === authState.username)
        recipientId = conversation.secondUser._id;

      if (conversation.secondUser.username === authState.username)
        recipientId = conversation.firstUser._id;

      const newMsg = {
        conversationId,
        recipientId,
        newMessage,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/message/send-dm-msg`,
        newMsg,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        // console.log('SULCESSO!');
        setNewMessage('');
        fetchConversation();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link href="/my-profile/notifications">
        <p className="link-text">
          <Icon icon="akar-icons:arrow-back" /> Back to conversations page
        </p>
      </Link>
      <br></br>
      {loading ? (
        <SpinningLoader />
      ) : (
        <Fragment>
          {conversation &&
            conversation.messages &&
            conversation.messages.map((message) => (
              <DMCard
                key={message._id}
                from={message.from.username}
                text={message.content}
              />
            ))}
          <br></br>
          <div>
            <div>
              <label className="myform-label">Your message</label>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div>
              <BtnCTA label="send message" onCLickAction={sendMessage} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default ConversationIdPage;
