import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// own components
import TextInput from '../../../../components/UI/form/TextInput';
import NumberInput from '../../../../components/UI/form/NumberInput';
import TextArea from '../../../../components/UI/form/TextArea';
import ImgUploader from '../../../../components/UI/form/ImgUploader';
import RadioBox from '../../../../components/UI/form/RadioBox';
import Select from '../../../../components/UI/form/Select';
import Selections from '../../../../components/UI/form/Selections';
import BtnCTA from '../../../../components/UI/BtnCTA';
import UserRoute from '../../../../components/routes/UserRoute';
// data
import { allTopics } from '../../../../data/allTopics';
import { allTechStacks } from '../../../../data/allTechStacks';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function SelfAssignmentPage() {
  const { authState } = useMainContext();

  //   const router = useRouter()

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nBuddies, setNBuddies] = useState('');
  const [mentorRequired, setMentorRequired] = useState(false);
  const [topics, setTopics] = useState([]);
  const [learning, setLearning] = useState([]);
  const [picture, setPicture] = useState({});

  //   new group
  const [success, setSuccess] = useState(false);
  const [newGroupId, setNewGrouId] = useState('');

  //   useEffect(() => {
  //     if (success) router.push()
  //   }, [success])

  // toggle functions
  const mentorRequiredOptions = [
    { value: 1, label: 'Yes' },
    { value: 2, label: 'No' },
    // { value: 3, label: 'Nice to have but not mandatory' },
  ];

  const toggleMentorRequired = (e) => {
    // console.log(e.target.value);
    if (e.target.value === '1') {
      setMentorRequired(true);
    }
    if (e.target.value === '2') {
      setMentorRequired(false);
    }
  };

  const uploadPicture = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    console.log([...formData]);
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

  const createGroup = async () => {
    const newGroup = {
      organiser: '',
      name,
      description,
      nBuddies,
      buddies: [],
      //   buddiesFilled: { type: Boolean, default: false },
      mentorRequired,
      //   nMentorsRequired: { type: Number, default: 1 },
      mentors: [],
      //   mentorsFilled: { type: Boolean, default: false },
      topics,
      learning,
      picture,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/groups/new`,
        newGroup,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(res.data.success);
      if (res.data.success) {
        setSuccess(true);
        setNewGrouId(res.data.newGroupId);
      } else {
        setSuccess(false);
        console.log('An error occurred');
      }
    } catch (err) {
      console.log(err);
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
    <UserRoute>
      {success ? (
        successMsg
      ) : (
        <>
          <div className="flex">
            <h2>Self Assignment</h2>
            <Link href="/projects/coding-groups/new/">go back</Link>
          </div>
          <br></br>
          <TextInput
            required={true}
            label="Name (max 40 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br></br>
          <TextArea
            required={true}
            label="short description (max 80 characters)"
            maxLength="79"
            nRows="2"
            nCols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <ImgUploader img={picture} uploadImg={uploadPicture} />
          <br></br>
          <NumberInput
            required={true}
            label="Total number of buddies (including yourself)"
            min="1"
            value={nBuddies}
            onChange={(e) => setNBuddies(e.target.value)}
          />
          <br></br>
          <br></br>
          <RadioBox
            required={true}
            label="Mentor required?"
            options={mentorRequiredOptions}
            name="mentor-required"
            onChange={toggleMentorRequired}
          />
          <br></br>
          <Select
            required={true}
            label="Topics"
            name="topics"
            options={allTopics}
            onChange={(e) =>
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
              })
            }
          />
          <Selections selections={topics} setSelections={setTopics} />
          <br></br>
          <Select
            required={true}
            label="Techs involved"
            name="techs"
            options={allTechStacks}
            onChange={(e) =>
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
              })
            }
          />
          <Selections selections={learning} setSelections={setLearning} />
          <br></br>
          <div>
            <BtnCTA
              classname="btn-dark"
              label="create group"
              onCLickAction={createGroup}
            />
          </div>
        </>
      )}
    </UserRoute>
  );
}

export default SelfAssignmentPage;

// This is the paradox working perfectly: lot of time spent reading human design and
// this and that, standing and preaching about rights, equality and this and that.
// At the end you are just a moody narcissistic maybe insecure maybe traumatised unable or
// unwilling to have a normal conversation with another human being.
// And this is basic education that somebody should have thought you: then you either feel entitled or are lazy.
// Both are not good and you should be aware of it.
// And no, don't try to even think this is not appropriate.
// It is a reflection of your behaviour so you are responsible for this. Garbage out garbage back in.
// Now you can let go of this too if you want
