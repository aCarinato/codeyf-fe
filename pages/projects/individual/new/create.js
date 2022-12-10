// react / next
import Link from 'next/link';
import { useEffect, useState } from 'react';
// own components
import UserRoute from '../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import TextInput from '../../../../components/UI/form/TextInput';
import TextArea from '../../../../components/UI/form/TextArea';
import NumberInput from '../../../../components/UI/form/NumberInput';
import RadioBox from '../../../../components/UI/form/RadioBox';
import Selections from '../../../../components/UI/form/Selections';
import BtnCTA from '../../../../components/UI/BtnCTA';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function CreateIndividualPage() {
  const { authState, currentUser, setCurrentUser } = useMainContext();

  const getCurrentUser = async () => {
    try {
      // console.log('Executing getCurrentUser()');
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (data.ok) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      //   router.push('/login');
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) getCurrentUser();
  }, [authState && authState.token]);

  // clear the assignment when group created
  const [pickedAssignmentId, setPickedAssignmentId] = useState('');
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(false);
  // const [nBuddies, setNBuddies] = useState('');
  const [deadline, setDeadline] = useState('');
  const [organiserIsBuddy, setOrganiserIsBuddy] = useState(null);
  const [organiserIsMentor, setOrganiserIsMentor] = useState(null);
  const [mentorRequired, setMentorRequired] = useState(null);
  const [picture, setPicture] = useState({});

  // input touched
  const [organiserIsBuddyTouched, setOrganiserIsBuddyTouched] = useState(false);
  const [mentorRequiredTouched, setMentorRequiredTouched] = useState(false);
  const [organiserIsMentorTouched, setOrganiserIsMentorTouched] =
    useState(false);

  //   new group
  const [success, setSuccess] = useState(false);
  const [newGroupId, setNewGroupId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('selected-assignment') !== null) {
        setPickedAssignmentId(localStorage.getItem('selected-assignment'));
      }
    }
  }, []);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // REMOVE THE COOKIE ON PAGE CHANGE!!!

  const fetchAssignement = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/assignments/${pickedAssignmentId}`
      );
      // console.log(res);
      if (res.data.success) {
        setAssignment(res.data.assignment);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pickedAssignmentId !== undefined && pickedAssignmentId.length > 0) {
      fetchAssignement();
    }
  }, [pickedAssignmentId]);

  // date setting
  useEffect(() => {
    if (assignment.completionTime && assignment.completionTime > 0) {
      const today = new Date();
      const nDaysToAdd = assignment.completionTime;
      const newDateTimestamp = today.setDate(today.getDate() + nDaysToAdd); //takes care of changing month if necessary
      //   const minDate = new Date(newDateTimestamp);
      //   setDeadline(minDate.toISOString().split('T')[0]);

      const minDate = new Date(newDateTimestamp).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setDeadline(minDate);
    }
  }, [assignment.completionTime]);

  // toggle functions
  const yesOrNoOptions = [
    { value: 1, label: 'Yes' },
    { value: 2, label: 'No' },
    // { value: 3, label: 'Nice to have but not mandatory' },
  ];

  const toggleOrganiserIsBuddy = (e) => {
    setOrganiserIsBuddyTouched(true);
    // console.log(e.target.value);
    if (e.target.value === '1') {
      setOrganiserIsBuddy(true);
    }
    if (e.target.value === '2') {
      setOrganiserIsBuddy(false);
    }
  };

  const toggleMentorRequired = (e) => {
    // console.log(e.target.value);
    if (e.target.value === '1') {
      setMentorRequired(true);
    }
    if (e.target.value === '2') {
      setMentorRequired(false);
      // setOrganiserIsMentor(false);
    }
  };

  const toggleOrganiserIsMentor = (e) => {
    setOrganiserIsMentorTouched(true);
    // console.log(e.target.value);
    if (e.target.value === '1') {
      setOrganiserIsMentor(true);
    }
    if (e.target.value === '2') {
      setOrganiserIsMentor(false);
    }
  };

  // CHECK INPUT VALIDITY
  const organiserIsBuddyIsValid =
    (organiserIsBuddy && !organiserIsMentor) ||
    (!organiserIsBuddy && organiserIsBuddy !== null && organiserIsMentor);
  const organiserIsBuddyIsInvalid =
    !organiserIsBuddyIsValid && organiserIsBuddyTouched;

  const mentorRequiredIsValid = mentorRequired !== null;
  const mentorRequiredIsInvalid =
    !mentorRequiredIsValid && mentorRequiredTouched;

  const organiserIsMentorIsValid =
    (organiserIsBuddy && organiserIsMentor !== null && !organiserIsMentor) ||
    (!organiserIsBuddy && organiserIsMentor);
  const organiserIsMentorIsInvalid =
    !organiserIsMentorIsValid && organiserIsMentorTouched;

  let formIsValid;
  if (
    organiserIsBuddyIsValid &&
    mentorRequiredIsValid &&
    organiserIsMentorIsValid
  )
    formIsValid = true;
  // console.log(`organiserIsBuddy: ${organiserIsBuddy}`);
  // console.log(`organiserIsMentor: ${organiserIsMentor}`);
  // console.log(formIsValid);

  const createGroup = async () => {
    if (authState && authState.token && authState.token.length > 0) {
      setOrganiserIsBuddyTouched(true);
      setOrganiserIsMentorTouched(true);
      setMentorRequiredTouched(true);

      // add field to each requirement
      const requirements = assignment.requirements.map((element) => {
        return { ...element, met: false };
      });

      if (formIsValid) {
        const newGroup = {
          organiser: '',
          name: assignment.name,
          description: assignment.headline,
          deadline,
          nBuddies: 1,
          buddies: [],
          //   buddiesFilled: { type: Boolean, default: false },
          mentorRequired,
          //   nMentorsRequired: { type: Number, default: 1 },
          mentors: [],
          //   mentorsFilled: { type: Boolean, default: false },
          topics: assignment.topics,
          learning: assignment.learning,
          picture,
          hasProposedAssignment: true,
          proposedAssignment: pickedAssignmentId,
          requirements,
          approvals: [],
        };
        // console.log(newGroup);
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/groups/new`,
            { organiserIsBuddy, organiserIsMentor, newGroup },
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          // console.log(res.data.success);
          if (res.data.success) {
            setSuccess(true);
            setNewGroupId(res.data.newGroupId);
          } else {
            setSuccess(false);
            console.log('An error occurred');
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('some input is invalid');
      }
    } else {
      router.push('/login');
    }
  };

  const successMsg = (
    <div>
      <p>New group successfully created!</p>
      <Link href={`/projects/coding-groups/${newGroupId}`}>
        Go to the group page
      </Link>
    </div>
  );

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : success ? (
        successMsg
      ) : (
        <div className="creation-form-layout">
          <div className="flex flex-justify-space-between ">
            <h2>Project based on "{assignment.name}"</h2>
            <Link href="/projects/coding-groups/new/select-assignment">
              go back
            </Link>
          </div>
          <br></br>
          <p>
            NOTE: if you want to add the project to your history once it is
            completed you will need a mentor review.
          </p>
          <br></br>
          <TextInput
            required={false}
            label="Name"
            value={assignment.name}
            onChange={() => {}}
            disabled={true}
          />
          <br></br>
          <TextInput
            required={false}
            label="Description"
            value={assignment.headline}
            onChange={() => {}}
            disabled={true}
          />
          <br></br>
          <TextArea
            required={false}
            label="Details"
            maxLength="79"
            nRows="2"
            nCols="50"
            value={assignment.description}
            disabled={true}
            onChange={() => {}}
          />
          <br></br>
          {assignment.requirements && (
            <>
              <h4>Functionalities required for successful completion</h4>
              <ul>
                {assignment.requirements.map((item) => (
                  <li key={item._id}>{item.label}</li>
                ))}
              </ul>
              <br></br>
            </>
          )}
          <br></br>
          {assignment.completionTime && assignment.completionTime > 0 && (
            <>
              <TextInput
                required={false}
                label="Deadline (assuming couple of hours a day, every day)"
                value={deadline}
                onChange={() => {}}
                disabled={true}
              />
              <br></br>
            </>
          )}
          <br></br>
          <RadioBox
            required={true}
            label="Do you want to participate as a student?"
            name="organiser-is-buddy"
            options={yesOrNoOptions}
            onChange={toggleOrganiserIsBuddy}
            isInvalid={organiserIsBuddyIsInvalid}
            errorMsg={`You have to participate either as a student or as a mentor`}
          />
          <br></br>
          <RadioBox
            required={true}
            label="Mentor required?"
            options={yesOrNoOptions}
            name="mentor-required"
            onChange={toggleMentorRequired}
            isInvalid={mentorRequiredIsInvalid}
            errorMsg={`Select an option`}
          />
          <br></br>
          {mentorRequired && currentUser && currentUser.isMentor && (
            <RadioBox
              required={true}
              label="Do you want to mentor the student? (you can participate either as a student or as a mentor)"
              options={yesOrNoOptions}
              name="organiser-is-mentor"
              onChange={toggleOrganiserIsMentor}
              isInvalid={organiserIsMentorIsInvalid}
              errorMsg={`You have to participate either as a student or as a mentor`}
            />
          )}
          <br></br>
          {assignment.topics && assignment.topics.length > 0 && (
            <div>
              <label className="myform-label bold">Topics</label>
              <Selections selections={assignment.topics} disabled={true} />
            </div>
          )}
          <br></br>
          {assignment.learning && assignment.learning.length > 0 && (
            <div>
              <label className="myform-label bold">Tech stack</label>
              <Selections selections={assignment.learning} disabled={true} />
            </div>
          )}
          <br></br>
          <div>
            <BtnCTA
              classname="btn-dark"
              label="create"
              onCLickAction={createGroup}
              // disabled={formIsValid !== true ? true : false}
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      )}
    </>
  );
}

export default CreateIndividualPage;
