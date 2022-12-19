// react / next
import { useState } from 'react';
// own components
import UserRoute from '../../../../components/routes/UserRoute';
import TextInput from '../../../../components/UI/form/TextInput';
import TextArea from '../../../../components/UI/form/TextArea';
import RadioBox from '../../../../components/UI/form/RadioBox';
import CompletionTime from '../../../../components/assignements/NewAssignment/CompletionTime';
import ImgUploader from '../../../../components/UI/form/ImgUploader';
import Select from '../../../../components/UI/form/Select';
import Selections from '../../../../components/UI/form/Selections';
import OneColAddField from '../../../../components/UI/form/OneColAddField';
import AddMockupFields from '../../../../components/assignements/NewAssignment/AddMockupFields';
import AddIdealTeamFields from '../../../../components/assignements/NewAssignment/AddIdealTeamFields';
import AddStepsFields from '../../../../components/assignements/NewAssignment/AddStepsFields';
import AddResources from '../../../../components/assignements/NewAssignment/AddResources';
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
import Link from 'next/link';
import { useRouter } from 'next/router';

function CreateNewAssignmentPage() {
  const { authState, currentUser } = useMainContext();

  const router = useRouter();

  // console.log(currentUser);
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [picture, setPicture] = useState({});
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
      // type: '',
      upvotes: 0,
    },
  ]);
  //   new assignment
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // console.log(completionTime);

  // input touched
  // const [requirementsTouched, setRequirementsTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [headlineTouched, setHeadlineTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [difficultyTouched, setDifficultyTouched] = useState(false);
  const [topicsTouched, setTopicsTouched] = useState(false);
  const [learningTouched, setLearningTouched] = useState(false);
  const [maxTeamMemebersTouched, setMaxTeamMemebersTouched] = useState(false);
  const [requirementsTouched, setRequirementsTouched] = useState([
    { idx: '0', isTouched: false },
  ]);
  const [completionTimeTouched, setCompletionTimeTouched] = useState(false);
  // console.log(requirementsTouched);

  const nameIsValid = name.trim() !== '';
  const headlineIsValid = headline.trim() !== '';
  const descriptionIsValid = description.trim() !== '';
  const difficultyIsValid = difficulty !== '';
  const maxTeamMemebersIsValid = maxTeamMemebers > 0 && maxTeamMemebers < 11;
  const topicsIsValid = topics.length > 0;
  const learningIsValid = learning.length > 0;
  const completionTimeIsValid = completionTime > 0;

  const nameIsInvalid = !nameIsValid && nameTouched;
  const headlineIsInvalid = !headlineIsValid && headlineTouched;
  const descriptionIsInvalid = !descriptionIsValid && descriptionTouched;
  const topicsIsInvalid = !topicsIsValid && topicsTouched;
  const learningIsInvalid = !learningIsValid && learningTouched;
  const difficultyIsInvalid = !difficultyIsValid && difficultyTouched;
  const maxTeamMemebersIsInvalid =
    !maxTeamMemebersIsValid && maxTeamMemebersTouched;

  const completionTimeIsInvalid =
    !completionTimeIsValid && completionTimeTouched;

  const requirementsIsValid = requirements
    .map((requirement) => requirement.label)
    .every((item) => item.length > 0);

  // const requirementsIsInvalid = !requirementsIsValid;

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

  let formIsValid;
  if (
    nameIsValid &&
    headlineIsValid &&
    descriptionIsValid &&
    difficultyIsValid &&
    maxTeamMemebersIsValid &&
    topicsIsValid &&
    learningIsValid &&
    requirementsIsValid &&
    completionTimeIsValid
  )
    formIsValid = true;

  // console.log(`formIsValid: ${formIsValid}`);

  const createAssignment = async () => {
    if (currentUser !== null && currentUser.isMentor) {
      setNameTouched(true);
      setHeadlineTouched(true);
      setDescriptionTouched(true);
      setDifficultyTouched(true);
      setTopicsTouched(true);
      setLearningTouched(true);
      setMaxTeamMemebersTouched(true);
      setRequirementsTouched((prev) =>
        prev.map((req) => {
          return { ...req, isTouched: true };
        })
      );
      setCompletionTimeTouched(true);

      let updatedResources;
      if (
        resources.length === 1 &&
        (resources[0].name === '' || resources[0].link === '')
      ) {
        // no requirements were input
        updatedResources = [];
      } else {
        updatedResources = resources;
      }

      if (formIsValid) {
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
          resources: updatedResources,
          picture,
          // isPublic: true,
        };

        // console.log(newAssignment);

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
          // console.log(res);
          if (res.data.success) setSuccess(true);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setError(true);
    }
  };

  // if (authState && authState.token && authState.token.length > 0) {
  //   // VALIDATIONS
  //   // 1) Total number of people from roles must be <= max n participants
  // } else {
  //   router.push('/login');
  // }

  const successMsg = (
    <div>
      <p>New assignment successfully created!</p>
      <p onClick={() => setSuccess(false)}>Create new assignment</p>
      {/* <Link href={`/projects/coding-groups/${newGroupId}`}>
        Go to the group page
      </Link> */}
    </div>
  );

  // console.log(`currentUser.isMentor: ${currentUser && currentUser.isMentor}`);

  return (
    <>
      {success ? (
        successMsg
      ) : (
        <div className="creation-form-layout">
          <h2>Create a new Assignment</h2>
          <br></br>
          <br></br>
          <h3>Mandatory fields</h3>
          <hr></hr>
          <br></br>
          <TextInput
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
          <TextInput
            required={true}
            label="Headline (max 32 characters)"
            value={headline}
            maxLength={32}
            onChange={(e) => setHeadline(e.target.value)}
            onBlur={() => setHeadlineTouched(true)}
            isInvalid={headlineIsInvalid}
            errorMsg={`Enter a non empty value`}
          />
          <br></br>
          <TextArea
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
          <RadioBox
            required={true}
            label="Difficulty"
            options={allDifficulty}
            name="difficulty"
            onChange={(e) => {
              setDifficultyTouched(true);
              setDifficulty(e.target.value);
            }}
            isInvalid={difficultyIsInvalid}
            errorMsg={`Select an option`}
          />
          <br></br>
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
            <br></br>
          </div>

          <br></br>

          <br></br>
          <label className="form-label">
            Requirements for successful completion <sup>*</sup>
          </label>
          <OneColAddField
            label="requirements"
            values={requirements}
            setValues={setRequirements}
            touched={requirementsTouched}
            setTouched={setRequirementsTouched}
          />
          <br></br>
          <RadioBox
            required={true}
            label="Max number of team members"
            options={allParticipants}
            name="max-team-size"
            onChange={(e) => {
              setMaxTeamMemebersTouched(true);
              setMaxTeamMemebers(e.target.value);
            }}
            isInvalid={maxTeamMemebersIsInvalid}
            errorMsg={`Select an option`}
          />
          <br></br>
          <CompletionTime
            setCompletionTime={setCompletionTime}
            setCompletionTimeTouched={setCompletionTimeTouched}
            completionTimeIsInvalid={completionTimeIsInvalid}
          />
          <br></br>
          <h3>Optional fields</h3>
          <br></br>
          <p>
            Although optional, these can be very useful tips and indications to
            give students more background and help with the assignment
            completion!
          </p>
          <hr></hr>
          <br></br>
          <AddMockupFields mockups={mockups} setMockups={setMockups} />
          <br></br>
          <AddResources resources={resources} setResources={setResources} />
          <br></br>
          <TextInput
            required={false}
            label="Source code (link to repository)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
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
          <br></br>
          <BtnCTA
            label="create assignment"
            classname="btn-dark"
            onCLickAction={createAssignment}
            // disabled={formIsValid !== true ? true : false}
          />
          <br></br>
          <br></br>
          <br></br>
        </div>
      )}
      {error && (
        <div>
          <p>
            You need to be a mentor in order to make an assignment that other
            people can use for their individual or team projects
          </p>
          <br></br>
          <p>
            You can still create a project to work on individually or with a
            team. To do so{' '}
            <Link href="/projects/coding-groups/new/self">click here</Link>.
          </p>
          <br></br>
          <p>
            If you do not have an account{' '}
            <Link href="login">create account</Link>
          </p>
        </div>
      )}
    </>
  );
}

export default CreateNewAssignmentPage;
