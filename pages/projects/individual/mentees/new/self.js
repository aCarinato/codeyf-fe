import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// own components
import TextInput from '../../../../../components/UI/form/TextInput';
import NumberInput from '../../../../../components/UI/form/NumberInput';
import DateInput from '../../../../../components/UI/form/DateInput';
import TextArea from '../../../../../components/UI/form/TextArea';
import ImgUploader from '../../../../../components/UI/form/ImgUploader';
import RadioBox from '../../../../../components/UI/form/RadioBox';
import Select from '../../../../../components/UI/form/Select';
import Selections from '../../../../../components/UI/form/Selections';
import BtnCTA from '../../../../../components/UI/BtnCTA';
// import UserRoute from '../../../../components/routes/UserRoute';
import OneColAddField from '../../../../../components/UI/form/OneColAddField';
// data
import { allTopics } from '../../../../../data/allTopics';
import { allTechStacks } from '../../../../../data/allTechStacks';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../../context/Context';

function IndividualSelfProjectPage() {
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

  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  //   const [organiserIsBuddy, setOrganiserIsBuddy] = useState(null);
  //   const [organiserIsMentor, setOrganiserIsMentor] = useState(null);
  const [mentorRequired, setMentorRequired] = useState(null);
  const [topics, setTopics] = useState([]);
  const [learning, setLearning] = useState([]);
  const [picture, setPicture] = useState({});
  const [requirements, setRequirements] = useState([
    { idx: '0', label: '', met: false },
  ]);

  //   new group created
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [newGroupId, setNewGroupId] = useState('');

  // input touched
  const [nameTouched, setNameTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  // const [nBuddiesTouched, setNBuddiesTouched] = useState(false);
  const [deadlineTouched, setDeadlineTouched] = useState(false);

  //   const [organiserIsBuddyTouched, setOrganiserIsBuddyTouched] = useState(false);
  const [mentorRequiredTouched, setMentorRequiredTouched] = useState(false);
  //   const [organiserIsMentorTouched, setOrganiserIsMentorTouched] =
  // useState(false);

  const [topicsTouched, setTopicsTouched] = useState(false);
  const [learningTouched, setLearningTouched] = useState(false);

  const [requirementsTouched, setRequirementsTouched] = useState([
    { idx: '0', isTouched: false },
  ]);

  // input validity
  const nameIsValid = name.trim() !== '';
  const nameIsInvalid = !nameIsValid && nameTouched;

  const descriptionIsValid = description.trim() !== '';
  const descriptionIsInvalid = !descriptionIsValid && descriptionTouched;

  const deadlineIsValid = deadline.trim() !== '';
  const deadlineIsInvalid = !deadlineIsValid && deadlineTouched;

  //   const organiserIsBuddyIsValid =
  //     (organiserIsBuddy && !organiserIsMentor) ||
  //     (!organiserIsBuddy && organiserIsBuddy !== null && organiserIsMentor);
  //   const organiserIsBuddyIsInvalid =
  //     !organiserIsBuddyIsValid && organiserIsBuddyTouched;

  const mentorRequiredIsValid = mentorRequired !== null;
  const mentorRequiredIsInvalid =
    !mentorRequiredIsValid && mentorRequiredTouched;

  //   const organiserIsMentorIsValid =
  //     (organiserIsBuddy && organiserIsMentor !== null && !organiserIsMentor) ||
  //     (!organiserIsBuddy && organiserIsMentor);
  //   const organiserIsMentorIsInvalid =
  //     !organiserIsMentorIsValid && organiserIsMentorTouched;

  const topicsIsValid = topics.length > 0;
  const topicsIsInvalid = !topicsIsValid && topicsTouched;

  const learningIsValid = learning.length > 0;
  const learningIsInvalid = !learningIsValid && learningTouched;

  const requirementsIsValid = requirements
    .map((requirement) => requirement.label)
    .every((item) => item.length > 0);

  // toggle functions
  const yesOrNoOptions = [
    { value: 1, label: 'Yes' },
    { value: 2, label: 'No' },
    // { value: 3, label: 'Nice to have but not mandatory' },
  ];

  //   const toggleOrganiserIsBuddy = (e) => {
  //     setOrganiserIsBuddyTouched(true);
  //     // console.log(e.target.value);
  //     if (e.target.value === '1') {
  //       setOrganiserIsBuddy(true);
  //     }
  //     if (e.target.value === '2') {
  //       setOrganiserIsBuddy(false);
  //     }
  //   };

  const toggleMentorRequired = (e) => {
    // console.log(e.target.value);
    if (e.target.value === '1') {
      setMentorRequired(true);
    }
    if (e.target.value === '2') {
      setMentorRequired(false);
    }
  };

  //   const toggleOrganiserIsMentor = (e) => {
  //     // console.log(e.target.value);
  //     setOrganiserIsMentorTouched(true);
  //     if (e.target.value === '1') {
  //       setOrganiserIsMentor(true);
  //     }
  //     if (e.target.value === '2') {
  //       setOrganiserIsMentor(false);
  //     }
  //   };

  let formIsValid;
  if (
    // nameIsValid &&
    // descriptionIsValid &&
    // deadlineIsValid &&
    // topicsIsValid &&
    // learningIsValid
    nameIsValid &&
    descriptionIsValid &&
    deadlineIsValid &&
    // organiserIsBuddyIsValid &&
    mentorRequiredIsValid &&
    // organiserIsMentorIsValid &&
    topicsIsValid &&
    learningIsValid
    // requirementsIsValid &&
  )
    formIsValid = true;

  // console.log(`formIsValid; ${formIsValid}`);

  const createIndividualProject = async () => {
    if (authState && authState.token && authState.token.length > 0) {
      setNameTouched(true);
      setDescriptionTouched(true);
      setDeadlineTouched(true);
      //   setOrganiserIsBuddyTouched(true);
      //   setOrganiserIsMentorTouched(true);
      setMentorRequiredTouched(true);
      setTopicsTouched(true);
      setLearningTouched(true);

      // setRequirementsTouched((prev) =>
      //   prev.map((req) => {
      //     return { ...req, isTouched: true };
      //   })
      // );

      // this should be if requierements is valid
      let updatedRequirements;
      if (requirements.length === 1 && requirements[0].label === '') {
        // no requirements were input
        updatedRequirements = [];
      } else {
        updatedRequirements = requirements;
        // requirements.map((element) => {
        //   return { ...element, met: false };
        // });
      }

      if (formIsValid) {
        const newGroup = {
          organiser: '',
          name,
          description,
          deadline,
          nBuddies: 1,
          buddies: [],
          //   buddiesFilled: { type: Boolean, default: false },
          mentorRequired,
          //   nMentorsRequired: { type: Number, default: 1 },
          mentors: [],
          //   mentorsFilled: { type: Boolean, default: false },
          topics,
          learning,
          picture,
          requirements: updatedRequirements,
        };
        // console.log(newGroup);

        if (formIsValid) {
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API}/groups/new`,
              { organiserIsBuddy: true, organiserIsMentor: false, newGroup },
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
              // setSuccess(false);
              setError('An error occurred');
              console.log('An error occurred');
            }
          } catch (err) {
            console.log(err);
          }
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

  const uploadPicture = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    // console.log([...formData]);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/upload-image`,
        formData
      );
      // console.log('uploaded image => ', data);
      setPicture({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // date setting
  const today = new Date();
  const nDaysToAdd = 1;
  const newDateTimestamp = today.setDate(today.getDate() + nDaysToAdd); //takes care of changing month if necessary
  const minDate = new Date(newDateTimestamp);
  const minDateISO = minDate.toISOString().split('T')[0];

  return (
    <>
      {success ? (
        successMsg
      ) : (
        <div className="creation-form-layout">
          <div className="flex">
            <h2>Individual student project</h2>
            <Link href="/projects/individual/">go back</Link>
          </div>
          <br></br>
          <p>
            NOTE: if you want to add the project to your history once it is
            completed you will need a mentor review. This doesn't mean you will
            necessarily need a mentor during project execution, but at the end.
          </p>
          <br></br>
          <h3>Mandatory fields</h3>
          <br></br>
          <TextInput
            // disabled={authState && authState.token.length > 0 ? false : true}
            required={true}
            label="Name (max 30 characters)"
            value={name}
            maxLength={30}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            isInvalid={nameIsInvalid}
            errorMsg={`Enter a non empty value`}
          />
          <br></br>
          <TextArea
            // disabled={authState && authState.token.length > 0 ? false : true}
            required={true}
            label="description"
            nRows="5"
            nCols="100"
            value={description}
            maxLength={1000}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setDescriptionTouched(true)}
            isInvalid={descriptionIsInvalid}
            errorMsg={`Enter a non empty value`}
          />
          <br></br>
          <ImgUploader img={picture} uploadImg={uploadPicture} />
          <br></br>
          <DateInput
            required={true}
            label="(Estimated) deadline"
            min={minDateISO}
            value={deadline}
            onChange={(e) => {
              setDeadlineTouched(true);
              setDeadline(e.target.value);
            }}
            isInvalid={deadlineIsInvalid}
            errorMsg={`Select a date`}
          />
          {/* <br></br> */}
          {/* <RadioBox
            required={true}
            label="Do you want to participate as student?"
            options={yesOrNoOptions}
            name="organiser-is-buddy"
            onChange={toggleOrganiserIsBuddy}
            isInvalid={organiserIsBuddyIsInvalid}
            errorMsg={`You have to participate either as a student or as a mentor`}
          /> */}
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
          {/* {mentorRequired && currentUser && currentUser.isMentor && (
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
          <br></br> */}

          <div className="flex flex-justify-space-between">
            <Select
              required={true}
              label="Topics"
              name="topics"
              options={allTopics}
              onChange={(e) => {
                setTopicsTouched(true);
                if (e.target.value !== 'null-value') {
                  setTopics((prev) => {
                    let idx = topics
                      .map((topic) => topic._id)
                      .indexOf(e.target.value);
                    if (idx === -1) {
                      let newTopic = allTopics.filter(
                        (topic) => topic._id === e.target.value
                      )[0];
                      return [...prev, newTopic];
                    } else {
                      return prev;
                    }
                  });
                }
              }}
              isInvalid={topicsIsInvalid}
              errorMsg={`Select at least one option`}
            />
            <Selections selections={topics} setSelections={setTopics} />
          </div>
          <br></br>
          <div className="flex flex-justify-space-between">
            <Select
              required={true}
              label="Techs involved"
              name="techs"
              options={allTechStacks}
              onChange={(e) => {
                setLearningTouched(true);
                if (e.target.value !== 'null-value') {
                  setLearning((prev) => {
                    let idx = learning
                      .map((learn) => learn._id)
                      .indexOf(e.target.value);
                    if (idx === -1) {
                      let newLearn = allTechStacks.filter(
                        (learn) => learn._id === e.target.value
                      )[0];
                      return [...prev, newLearn];
                    } else {
                      return prev;
                    }
                  });
                }
              }}
              isInvalid={learningIsInvalid}
              errorMsg={`Select at least one option`}
            />
            <Selections selections={learning} setSelections={setLearning} />
          </div>
          <br></br>
          <h3>Optional fields</h3>
          <br></br>
          <label className="form-label">
            Requirements for success completion
          </label>
          <OneColAddField
            label="requirements"
            values={requirements}
            setValues={setRequirements}
            touched={requirementsTouched}
            setTouched={setRequirementsTouched}
            required={false}
          />
          <br></br>
          <div>
            <BtnCTA
              classname="btn-dark"
              label="create project"
              onCLickAction={createIndividualProject}
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

export default IndividualSelfProjectPage;
