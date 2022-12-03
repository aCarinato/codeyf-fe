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

function CreateGroupPage() {
  const { authState, currentUser } = useMainContext();
  // clear the assignment when group created
  const [pickedAssignmentId, setPickedAssignmentId] = useState('');
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(false);
  const [nBuddies, setNBuddies] = useState('');
  const [deadline, setDeadline] = useState('');
  const [organiserIsBuddy, setOrganiserIsBuddy] = useState(null);
  const [organiserIsMentor, setOrganiserIsMentor] = useState(false);
  const [mentorRequired, setMentorRequired] = useState(null);
  const [picture, setPicture] = useState({});

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

  //   console.log(assignment);

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
    }
  };

  const toggleOrganiserIsMentor = (e) => {
    // console.log(e.target.value);
    if (e.target.value === '1') {
      setOrganiserIsMentor(true);
    }
    if (e.target.value === '2') {
      setOrganiserIsMentor(false);
    }
  };

  //   THIS SHOULD BECOME A HELPER FUNCTION
  const createGroup = async () => {
    // verify correct inputs
    let inputIsValid = false;
    // if the organiser is neither a buddy or a mentor
    if (
      (organiserIsBuddy === null || !organiserIsBuddy) &&
      (organiserIsMentor === null || !organiserIsMentor)
    ) {
      console.log('ti ga da essar buddy / mentor o tutti do');
      return;
    }

    if (
      organiserIsBuddy === null ||
      ((mentorRequired === null || mentorRequired) &&
        organiserIsMentor === null)
    ) {
      inputIsValid = false;
    } else {
      inputIsValid = true;
    }
    // add field to each requirement
    // const requirements =assignment.requirements.map(item => ({...item, met:false}))
    const requirements = assignment.requirements.map((element) => {
      return { ...element, met: false };
    });

    // the total number of people should be > 1 ie at least 2! It can be 2 buddies or 1 buddy 1 mentor. CHECK THAT TOO
    // THE ABOVE IS JUST A BASIC INPUT VALIDATION !! - MUST BE IMPROVED
    // console.log(inputIsValid);
    if (inputIsValid) {
      const newGroup = {
        organiser: '',
        name: assignment.name,
        description: assignment.headline,
        deadline,
        nBuddies,
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
        <>
          <div className="flex">
            <h2>Project based on "{assignment.name}"</h2>
            <Link href="/projects/coding-groups/new/select-assignment">
              go back
            </Link>
          </div>
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

          <NumberInput
            required={true}
            label={`Max number of buddies (this assignment allows for max ${assignment.maxTeamMemebers} but it's possible to choose less)`}
            min="1"
            placeholder={assignment.maxTeamMemebers}
            max={assignment.maxTeamMemebers}
            value={nBuddies}
            onChange={(e) => setNBuddies(e.target.value)}
          />
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
            label="Do you want to participate as buddy? (you can participate as a buddy, as a mentor or both)"
            options={yesOrNoOptions}
            name="organiser-is-buddy"
            onChange={toggleOrganiserIsBuddy}
          />
          <br></br>
          <RadioBox
            required={true}
            label="Mentor required?"
            options={yesOrNoOptions}
            name="mentor-required"
            onChange={toggleMentorRequired}
          />
          <br></br>
          {mentorRequired && currentUser.isMentor && (
            <RadioBox
              required={true}
              label="Do you want to mentor the group? (you can participate as a buddy, as a mentor or both)"
              options={yesOrNoOptions}
              name="organiser-is-mentor"
              onChange={toggleOrganiserIsMentor}
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
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
        </>
      )}
    </>
  );
}

export default CreateGroupPage;
