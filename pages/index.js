// react / next
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// own components
import SpinningLoader from '../components/UI/SpinningLoader';
import MySlider from '../components/UI/MySlider';
import BtnCTA from '../components/UI/BtnCTA';
// context
import { useMainContext } from '../context/Context';
// packages
import axios from 'axios';
import { Icon } from '@iconify/react';

function HomePage() {
  const { authState } = useMainContext();

  const router = useRouter();

  const [buddies, setBuddies] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [groups, setGroups] = useState([]);
  const [assignements, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [mentorsSeekStudents, setMentorsSeekStudents] = useState([]);

  // MESSAGING
  // const [showMsgForm, setShowMsgForm] = useState(false);
  // const [message, setMessage] = useState('');
  // const [recipient, setRecipient] = useState('');
  // const [successMsg, setSuccessMsg] = useState(false);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/mentors`
      );
      //   console.log(res.data);
      if (res.data.success) {
        // filter out current user
        if (authState && authState.email.length > 0) {
          // filter out current user
          const userEmail = authState.email;
          let allMentors = res.data.mentors;
          let filteredMentors = allMentors.filter(
            (mentor) => mentor.email !== userEmail
          );
          setMentors(filteredMentors);
        } else {
          setMentors(res.data.mentors);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBuddies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/buddies/limit`
      );

      if (res.data.success) {
        if (authState && authState.email.length > 0) {
          // filter out current user
          const userEmail = authState.email;
          let allBuddies = res.data.buddies;
          let filteredBuddies = allBuddies.filter(
            (buddy) => buddy.email !== userEmail
          );
          setBuddies(filteredBuddies);
        } else {
          setBuddies(res.data.buddies);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStudentsSeekingMentors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/individuals/students/limit`
      );

      if (res.data.success) {
        setStudents(res.data.students);
        // if (authState && authState.email.length > 0) {
        //   // filter out current user
        //   const userEmail = authState.email;
        //   let allStudents = res.data.students;
        //   let filteredStudents = allStudents.filter(
        //     (student) => student.email !== userEmail
        //   );
        //   setStudents(filteredStudents);
        // } else {
        //   setStudents(res.data.students);
        // }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMentorsSeekingStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/individuals/mentors/limit`
      );

      if (res.data.success) {
        setMentorsSeekStudents(res.data.mentors);

        // if (authState && authState.email.length > 0) {
        //   // filter out current user
        //   const userEmail = authState.email;
        //   let allMentors = res.data.mentors;
        //   let filteredMentors = allMentors.filter(
        //     (mentor) => mentor.email !== userEmail
        //   );
        //   setMentorsSeekStudents(filteredMentors);
        // } else {
        //   setMentorsSeekStudents(res.data.mentors);
        // }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuddies();
    fetchMentors();
    fetchStudentsSeekingMentors();
    fetchMentorsSeekingStudents();
  }, [authState && authState.email]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/limit`
      );
      setGroups(res.data.groups);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/assignments/limit`
      );
      setAssignments(res.data.assignments);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <Fragment>
      <h1>The Coding Community</h1>
      <br></br>
      <div className="flex flex-justify-space-between">
        <div>
          <h3 className="h4-header">Build your skill set.</h3>
          <h3 className="h4-header">
            Find projects and people to code with, mentor and learn from
          </h3>
        </div>
        <div>
          <BtnCTA
            label="start a project"
            classname="btn-dark"
            onCLickAction={() => {
              router.push('/new-project');
            }}
          />
        </div>
      </div>

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

      <br></br>
      <h3>
        Team Projects{' '}
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
        Individual Projects - Students seeking mentors{' '}
        <Link href={'/projects/coding-groups'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={students} type="group" />
      </div>
      <br></br>

      <h3>
        Individual Projects - Mentors seeking students{' '}
        <Link href={'/projects/coding-groups'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={mentorsSeekStudents} type="group" />
      </div>

      <br></br>
      <h3>
        Coding students{' '}
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
            // setShowMsgForm={setShowMsgForm}
            // setRecipient={setRecipient}
            // setSuccessMsg={setSuccessMsg}
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
            // setShowMsgForm={setShowMsgForm}
            // setRecipient={setRecipient}
            // setSuccessMsg={setSuccessMsg}
          />
        )}
      </div>
      <br></br>

      <br></br>
    </Fragment>
  );
}

export default HomePage;
