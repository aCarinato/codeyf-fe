// react / next
import { useState } from 'react';
// own compoentns
import TextInput from '../../../../components/UI/form/TextInput';
import TextArea from '../../../../components/UI/form/TextArea';
import OneColAddField from '../../../../components/UI/form/OneColAddField';
import UserRoute from '../../../../components/routes/UserRoute';

function CreateNewAssignmentPage() {
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState([{ idx: '0', label: '' }]);
  const [mockups, setMockups] = useState([
    { idx: '0', caption: '', img_url: '' },
  ]);
  //   new assignment
  const [success, setSuccess] = useState(false);

  //   console.log(requirements);

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
      <OneColAddField
        label="requirements"
        values={requirements}
        setValues={setRequirements}
      />
      <br></br>
      <div>
        <p className="form-label">Mockups</p>
        <div className="flex">
          <div className="center-text">#</div>
          <div className="center-text">Caption</div>
          <div className="center-text">image</div>
          <div className="center-text">
            <button
              className="btn-circle"
              onClick={() =>
                setMockups((prev) => {
                  let currentID = prev.length;
                  const ids = prev.map((item) => Number(item.idx));
                  if (ids.includes(currentID))
                    currentID = (Math.max(...ids) + 1).toString();
                  const newMockup = {
                    idx: currentID.toString(),
                    caption: '',
                    img_url: '',
                  };
                  return [...prev, newMockup];
                })
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewAssignmentPage;
