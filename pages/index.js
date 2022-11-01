import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// import { people } from '../data/people';
import { groups } from '../data/groups';
import { assignements } from '../data/assignements';
// own components
import SpinningLoader from '../components/UI/SpinningLoader';
import MySlider from '../components/UI/MySlider';
import MessageForm from '../components/message/MessageForm';
// context
import { useMainContext } from '../context/Context';
// packages
import axios from 'axios';
import { Icon } from '@iconify/react';
import io from 'socket.io-client';

function HomePage() {
  const { authState } = useMainContext();

  //   SOCKET
  // const socket = useRef();

  // useEffect(() => {
  //   if (!socket.current) {
  //     socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
  //   }

  //   if (socket.current) {
  //     // console.log(authState);
  //     if (authState && authState.token.length > 0) {
  //       socket.current.emit('join', { userId: authState.username });
  //     }
  //   }
  // }, [authState && authState.token]);

  const [buddies, setBuddies] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  // MESSAGING
  const [showMsgForm, setShowMsgForm] = useState(false);
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      let userEmail = '';
      if (authState && authState.email && authState.email.length > 0) {
        userEmail = authState.email;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/people/mentors`,
        { userEmail }
      );
      //   console.log(res.data);
      if (res.data.success) {
        setMentors(res.data.mentors);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBuddies = async () => {
    try {
      setLoading(true);

      let userEmail = '';
      if (authState && authState.email && authState.email.length > 0) {
        userEmail = authState.email;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/people/buddies`,
        { userEmail }
      );
      if (res.data.success) {
        setBuddies(res.data.buddies);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuddies();
    fetchMentors();
  }, []);

  const closeModal = () => {
    setShowMsgForm(false);
  };

  const handleStartConversation = async () => {
    // console.log(recipient);
    // console.log(message);
    try {
      // setLoading(true);
      const newMsg = {
        recipient,
        message,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/message/start-conversation`,
        newMsg,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res);
      if (res.data.success) {
        // console.log('SULCESSO!');
        setMessage('');
        setSuccessMsg(true);
      }
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <h1>The Coding Community</h1>
      <h4 className="h4-header">
        Build your skill set. Find projects and people to code with, mentor and
        learn from
      </h4>
      <br></br>
      <br></br>
      <h3>
        Coding buddies{' '}
        <Link href={'/people/coding-buddies'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        {loading ? (
          <SpinningLoader />
        ) : (
          <MySlider
            array={buddies}
            type="buddy"
            setShowMsgForm={setShowMsgForm}
            setRecipient={setRecipient}
            setSuccessMsg={setSuccessMsg}
          />
        )}
      </div>
      <br></br>
      <br></br>
      <h3>
        Mentors{' '}
        <Link href={'/people/coding-mentors'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        {loading ? (
          <SpinningLoader />
        ) : (
          <MySlider
            array={mentors}
            type="mentor"
            setShowMsgForm={setShowMsgForm}
            setRecipient={setRecipient}
            setSuccessMsg={setSuccessMsg}
          />
        )}
      </div>
      <br></br>
      <br></br>
      <h3>
        Groups{' '}
        <Link href={'/projects/coding-groups'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={groups} type="group" />
      </div>
      <br></br>
      <br></br>
      <h3>
        Assignements{' '}
        <Link href={'/projects/coding-assignments'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={assignements} type="assignement" />
      </div>

      {showMsgForm && (
        <MessageForm
          onClose={closeModal}
          setShowMsgForm={setShowMsgForm}
          message={message}
          setMessage={setMessage}
          setRecipient={setRecipient}
          handleStartConversation={handleStartConversation}
          successMsg={successMsg}
        />
      )}
    </Fragment>
  );
}

export default HomePage;
