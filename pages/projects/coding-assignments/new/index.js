// react / next
import { useState } from 'react';
// own compoentns
import TextInput from '../../../../components/UI/form/TextInput';
import TextArea from '../../../../components/UI/form/TextArea';
import RadioBox from '../../../../components/UI/form/RadioBox';
import Select from '../../../../components/UI/form/Select';
import Selections from '../../../../components/UI/form/Selections';
import OneColAddField from '../../../../components/UI/form/OneColAddField';
import AddMockupFields from '../../../../components/assignements/NewAssignment/AddMockupFields';
import AddIdealTeamFields from '../../../../components/assignements/NewAssignment/AddIdealTeamFields';
import AddStepsFields from '../../../../components/assignements/NewAssignment/AddStepsFields';
// data
import { allParticipants } from '../../../../data/assignements/allParticipants';
import { allDifficulty } from '../../../../data/assignements/allDifficulty';
import { allTopics } from '../../../../data/allTopics';
import { allTechStacks } from '../../../../data/allTechStacks';
// import UserRoute from '../../../../components/routes/UserRoute';

function CreateNewAssignmentPage() {
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
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

  //   console.log(topics);

  return (
    <>
      <h2>Create a new Assignment</h2>
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
        maxLength="79"
        nRows="2"
        nCols="50"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        label="Max number of team memebers"
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
      <AddStepsFields steps={steps} setSteps={setSteps} idealTeam={idealTeam} />
    </>
  );
}

export default CreateNewAssignmentPage;
