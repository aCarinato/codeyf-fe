// react / next
import { useState } from 'react';
// own components
import UserRoute from '../../../../components/routes/UserRoute';
import TextInput from '../../../../components/UI/form/TextInput';
import TextArea from '../../../../components/UI/form/TextArea';
import RadioBox from '../../../../components/UI/form/RadioBox';
import CompletionTime from '../../../../components/assignements/NewAssignment/CompletionTime';
import Select from '../../../../components/UI/form/Select';
import Selections from '../../../../components/UI/form/Selections';
import OneColAddField from '../../../../components/UI/form/OneColAddField';
import AddMockupFields from '../../../../components/assignements/NewAssignment/AddMockupFields';
import AddIdealTeamFields from '../../../../components/assignements/NewAssignment/AddIdealTeamFields';
import AddStepsFields from '../../../../components/assignements/NewAssignment/AddStepsFields';
import BtnCTA from '../../../../components/UI/BtnCTA';
// data
import { allParticipants } from '../../../../data/assignements/allParticipants';
import { allDifficulty } from '../../../../data/assignements/allDifficulty';
import { allTopics } from '../../../../data/allTopics';
import { allTechStacks } from '../../../../data/allTechStacks';
// import UserRoute from '../../../../components/routes/UserRoute';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function CreateNewAssignmentPage() {
  const { authState } = useMainContext();

  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [completionTime, setCompletionTime] = useState('');
  const [repo, setRepo] = useState('');
  const [topics, setTopics] = useState([]);
  const [learning, setLearning] = useState([]);
  const [requirements, setRequirements] = useState([{ idx: '0', label: '' }]);
  const [mockups, setMockups] = useState([
    { idx: '0', caption: '', img_url: '' },
  ]);
  const [maxTeamMemebers, setMaxTeamMemebers] = useState(null);
  const [idealTeam, setIdealTeam] = useState([
    { idx: '0', nPeople: 0, role: '' },
  ]);
  const [steps, setSteps] = useState([{ idx: '1', n: '1', tasks: [] }]);
  const [resources, setResources] = useState([
    {
      idx: '0',
      name: '',
      link: '',
      type: '',
      upvotes: '',
    },
  ]);
  //   new assignment
  const [success, setSuccess] = useState(false);

  // console.log(completionTime);

  const createAssignment = async () => {
    // VALIDATIONS
    // 1) Total number of people from roles must be <= max n participants

    const newAssignment = {
      name,
      headline,
      description,
      difficulty,
      completionTime,
      repo,
      topics,
      learning,
      requirements,
      mockups,
      maxTeamMemebers,
      idealTeam,
      steps,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/assignments/new`,
        { newAssignment },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const successMsg = (
    <div>
      <p>New assignment successfully created!</p>
      <p onClick={() => setSuccess(false)}>Create new assignment</p>
      {/* <Link href={`/projects/coding-groups/${newGroupId}`}>
        Go to the group page
      </Link> */}
    </div>
  );

  return (
    <UserRoute>
      {success ? (
        successMsg
      ) : (
        <>
          <h2>Create a new Assignment</h2>
          <br></br>
          <BtnCTA label="create" onCLickAction={createAssignment} />
          <br></br>
          <TextInput
            required={true}
            label="Name (max 30 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br></br>
          <TextInput
            required={true}
            label="Headline (max 40 characters)"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <br></br>
          <TextArea
            required={true}
            label="short description (max 80 characters)"
            maxLength="1000"
            nRows="5"
            nCols="100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <TextInput
            required={true}
            label="Source code (link to repository)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <br></br>
          <RadioBox
            required={true}
            label="Difficulty"
            options={allDifficulty}
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <br></br>
          <CompletionTime setCompletionTime={setCompletionTime} />
          <br></br>
          <Select
            required={true}
            label="Topics"
            name="topics"
            options={allTopics}
            onChange={(e) => {
              if (e.target.value !== 'null-value') {
                // console.log(e.target.value);
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
          />
          <Selections selections={topics} setSelections={setTopics} />
          <br></br>
          <Select
            required={true}
            label="Techs involved"
            name="techs"
            options={allTechStacks}
            onChange={(e) => {
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
          />
          <Selections selections={learning} setSelections={setLearning} />
          <br></br>
          <AddMockupFields mockups={mockups} setMockups={setMockups} />
          <br></br>
          <OneColAddField
            label="requirements"
            values={requirements}
            setValues={setRequirements}
          />
          <br></br>
          <RadioBox
            required={true}
            label="Max number of team members"
            options={allParticipants}
            name="max-team-size"
            onChange={(e) => setMaxTeamMemebers(e.target.value)}
          />
          <br></br>
          <AddIdealTeamFields
            idealTeam={idealTeam}
            setIdealTeam={setIdealTeam}
            setSteps={setSteps}
          />
          <br></br>
          <AddStepsFields
            steps={steps}
            setSteps={setSteps}
            idealTeam={idealTeam}
          />
        </>
      )}
    </UserRoute>
  );
}

export default CreateNewAssignmentPage;
