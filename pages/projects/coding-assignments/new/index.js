// react / next
import { useState } from 'react';
// own compoentns
import TextInput from '../../../../components/UI/form/TextInput';
import TextArea from '../../../../components/UI/form/TextArea';
import OneColAddField from '../../../../components/UI/form/OneColAddField';
import AddMockupFields from '../../../../components/assignements/NewAssignment/AddMockupFields';
import AddIdealTeamFields from '../../../../components/assignements/NewAssignment/AddIdealTeamFields';
import AddStepsFields from '../../../../components/assignements/NewAssignment/AddStepsFields';
// import UserRoute from '../../../../components/routes/UserRoute';

function CreateNewAssignmentPage() {
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState([{ idx: '0', label: '' }]);
  const [mockups, setMockups] = useState([
    { idx: '0', caption: '', img_url: '' },
  ]);
  const [idealTeam, setIdealTeam] = useState([
    { idx: '0', nPeople: 0, role: '' },
  ]);
  const [steps, setSteps] = useState([{ idx: '1', n: '1', tasks: [] }]);
  //   new assignment
  const [success, setSuccess] = useState(false);

  //   console.log(mockups);

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
      <AddMockupFields mockups={mockups} setMockups={setMockups} />
      <br></br>
      <OneColAddField
        label="requirements"
        values={requirements}
        setValues={setRequirements}
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
