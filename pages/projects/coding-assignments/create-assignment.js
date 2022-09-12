import { Fragment, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import parse from 'html-react-parser';
// import dynamic from 'next/dynamic';
// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
//   { ssr: false }
// );
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// data
import { allDifficulty } from '../../../data/assignements/allDifficulty';
import { allParticipants } from '../../../data/assignements/allParticipants';
import { allStack } from '../../../data/assignements/allStack';
import { allTopics } from '../../../data/allTopics';
// own components
import BtnCTA from '../../../components/UI/BtnCTA';

function CreateAssignementScreen() {
  // const [testSteps, setTestSteps] = useState([{ _id: '0', n: '0', tasks: [] }]);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [goals, setGoals] = useState([{ _id: '0', label: '' }]);
  const [difficulty, setDifficulty] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [idealConfig, setIdealConfig] = useState([
    { _id: '0', n: 0, role: '' },
  ]);
  const [stack, setStack] = useState([]);
  const [topics, setTopics] = useState([]);
  const [steps, setSteps] = useState([{ _id: '1', n: '1', tasks: [] }]);
  const [resources, setResources] = useState([
    {
      _id: '0',
      details: '',
      link: '',
      type: '',
      upvotes: '',
    },
  ]);

  // INPUT VALIDATION
  // title
  // const [enteredTitle, setEnteredTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const enteredTitleIsValid = title.trim() !== '';
  const titleIsInvalid = !enteredTitleIsValid && titleTouched;

  let formIsValid;

  if (enteredTitleIsValid) formIsValid = true;

  // QUILLL
  const { quill, quillRef } = useQuill();
  const [quillFullDescription, setQuillFullDescription] = useState('');

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setQuillFullDescription(quill.root.innerHTML);
      });
    }
  }, [quill]);

  // RESOURCES
  const addInputResource = () => {
    const tempInputResources = [...resources];

    let currentID = tempInputResources.length;
    const ids = tempInputResources.map((item) => Number(item._id));
    if (ids.includes(currentID)) currentID = (Math.max(...ids) + 1).toString();
    tempInputResources.push({
      _id: currentID,
      details: '',
      link: '',
      type: '',
      upvotes: '',
    });
    setResources(tempInputResources);
  };

  const removeResource = (id) => {
    const tempInputResources = [...resources];
    const index = tempInputResources.map((e) => e._id).indexOf(id);
    tempInputResources.splice(index, 1);
    setResources(tempInputResources);
  };

  const handleChangeResource = (e, id) => {
    const tempInputResources = [...resources];
    tempInputResources[id].label = e.target.value;
    setResources(tempInputResources);
  };

  // GOALS
  const addInputGoal = () => {
    const tempInputGoals = [...goals];

    let currentID = tempInputGoals.length;
    const ids = tempInputGoals.map((item) => Number(item._id));
    if (ids.includes(currentID)) currentID = (Math.max(...ids) + 1).toString();
    tempInputGoals.push({ _id: currentID, label: '' });
    setGoals(tempInputGoals);
  };

  const removeGoal = (id) => {
    const tempInputGoals = [...goals];
    const index = tempInputGoals.map((e) => e._id).indexOf(id);
    tempInputGoals.splice(index, 1);
    setGoals(tempInputGoals);
  };

  const handleChangeGoal = (e, id) => {
    const tempInputGoals = [...goals];
    tempInputGoals[id].label = e.target.value;
    setGoals(tempInputGoals);
  };

  // steps

  const handleChangeSteps = (e, roleID, stepID) => {
    const tempInputStep = [...steps];
    const stepIndex = tempInputStep.map((item) => item._id).indexOf(stepID);

    if (tempInputStep[stepIndex].tasks.length === 0) {
      // console.log('tasks is empty array []');
      tempInputStep[stepIndex].tasks.push({
        participantId: roleID,
        names: [e.target.value],
      });
      // console.log(tempInputStep);
    } else {
      // find the task for the right roleID
      // console.log('tasks IS NOT AN empty array');
      const roleIndex = tempInputStep[stepIndex].tasks
        .map((item) => item.participantId)
        .indexOf(roleID);

      // console.log(roleIndex);

      if (roleIndex === -1) {
        // console.log('The array wasn not empty but this roleID was not present');
        tempInputStep[stepIndex].tasks.push({
          participantId: roleID,
          names: [e.target.value],
        });
      } else {
        // console.log(tempInputStep[stepIndex].tasks[roleID]);
        tempInputStep[stepIndex].tasks[roleID].names = [e.target.value];
        // console.log(tempInputStep);
      }
    }
    setSteps(tempInputStep);
  };

  const removeStep = (stepID) => {
    const tempInputStep = [...steps];
    const stepIndex = tempInputStep.map((item) => item._id).indexOf(stepID);
    tempInputStep.splice(stepIndex, 1);

    // const testSteps = tempInputStep.map((step) => ({
    //   ...step,
    //   _id: tempInputStep.map((item) => item._id).indexOf(step._id),
    // }));

    setSteps(tempInputStep);
  };

  const addInputStep = () => {
    const tempInputStep = [...steps];
    let currentID = tempInputStep.length;
    const ids = tempInputStep.map((item) => Number(item._id));
    if (ids.includes(currentID)) currentID = (Math.max(...ids) + 1).toString();
    tempInputStep.push({ _id: currentID, n: currentID, tasks: [] });

    // const stepIndex = tempInputStep.map((item) => item._id).indexOf(stepID);

    // const testSteps = tempInputStep.map((step) => ({
    //   ...step,
    //   _id: tempInputStep.map((item) => item._id).indexOf(step._id),
    // }));

    setSteps(tempInputStep);
  };

  // ideal team
  const addInputRole = () => {
    const tempInputRole = [...idealConfig];
    let _id = tempInputRole.length.toString();
    const ids = tempInputRole.map((item) => Number(item._id));
    // console.log('MAX IS: ' + Math.max(...ids));
    // console.log('MAX + 1 IS: ' + Number(Math.max(...ids) + Number(1)));
    if (ids.includes(_id)) _id = (Math.max(...ids) + Number(1)).toString();

    tempInputRole.push({ _id: _id, n: 0, role: '' });

    setIdealConfig(tempInputRole);
  };
  // console.log(idealConfig);
  const removeRole = (id) => {
    const tempInputRole = [...idealConfig];
    const index = tempInputRole.map((e) => e._id).indexOf(id);
    tempInputRole.splice(index, 1);
    setIdealConfig(tempInputRole);

    // remove roleID from the steps
    // loopt through the steps and remove all roleID from 'tasks'
    const tempInputStep = [...steps];

    tempInputStep.map((item) => {
      const participantIndex = item.tasks
        .map((t) => t.participantId)
        .indexOf(id);
      item.tasks.splice(participantIndex, 1);
    });
    setSteps(tempInputStep);
  };

  const handleChangeRole = (e, id, type) => {
    const tempInputRole = [...idealConfig];
    const index = tempInputRole.map((item) => item._id).indexOf(id);

    if (type === 'n') {
      tempInputRole[index].n = e.target.value;
    }

    if (type === 'role') {
      tempInputRole[index].role = e.target.value;
    }
    setIdealConfig(tempInputRole);
  };

  // stack
  const handleChangeStack = (id, label) => {
    const tempStack = [...stack];
    const index = tempStack.map((e) => e._id).indexOf(id);

    if (index === -1) {
      tempStack.push({ _id: id, label: label });
    } else {
      tempStack.splice(index, 1);
    }
    setStack(tempStack);
  };

  // topics
  const handleChangeTopics = (id, label) => {
    const tempTopics = [...topics];
    const index = tempTopics.map((e) => e._id).indexOf(id);

    if (index === -1) {
      tempTopics.push({ _id: id, label: label });
    } else {
      tempTopics.splice(index, 1);
    }

    setTopics(tempTopics);
  };

  const handleSubmit = () => {
    setTitleTouched(true);

    if (!formIsValid) {
      return;
    } else {
      const body = {
        title,
        shortDescription,
        fullDescription: quillFullDescription,
        difficulty,
        maxParticipants: participants,
        idealConfig,
        stack,
        topics,
        goals,
        steps,
        resources,
      };

      console.log(body);
    }
  };

  return (
    <Fragment>
      {/* <div>{parse(quillFullDescription)}</div> */}
      <div className="grid grid--2cols">
        <div>
          <div className="flex-column">
            <label className="form-label" htmlFor="title">
              Title:
            </label>
            <input
              className={titleIsInvalid ? 'input-invalid' : ''}
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTitleTouched(true)}
              // minLength="4"
              // maxLength="8"
              // size="10"
            />
            {titleIsInvalid && (
              <p className="input-error-msg">Insert value for title</p>
            )}
          </div>
          <br></br>
          <div className="flex-column">
            <label className="form-label" htmlFor="shortDescription">
              Short description (max 30):
            </label>
            <textarea
              type="text"
              id="shortDescription"
              name="shortDescription"
              maxLength="30"
              rows="2"
              cols="33"
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>
          <br></br>
          <div className="flex-column">
            <div>
              <label className="form-label" htmlFor="fullDescription">
                Full description:
              </label>
              <div style={{ height: 100 }}>
                <div ref={quillRef} />
              </div>
              <div style={{ height: 70 }}></div>
            </div>
            {/* <textarea
              type="text"
              id="fullDescription"
              name="fullDescription"
              rows="10"
              cols="33"
              onChange={(e) => setFullDescription(e.target.value)}
            /> */}
          </div>
          <br></br>
          <fieldset>
            <legend>Difficulty:</legend>
            {allDifficulty.map((item) => (
              <div key={item._id}>
                <input
                  type="radio"
                  id={item._id}
                  name="difficulty"
                  value={item.label}
                  onChange={() => setDifficulty(item)}
                />
                <label htmlFor={item.label}>{item.label}</label>
              </div>
            ))}
          </fieldset>
          <br></br>
          <fieldset>
            <legend>Tech stack</legend>
            {allStack.map((item) => (
              <div key={item._id}>
                <input
                  type="checkbox"
                  name={item.label}
                  value={item.label}
                  onChange={() => handleChangeStack(item._id, item.label)}
                />
                <label>{item.label}</label>
              </div>
            ))}
          </fieldset>
          <br></br>
          <fieldset>
            <legend>Main topics</legend>
            {allTopics.map((item) => (
              <div key={item._id}>
                <input
                  type="checkbox"
                  name={item.label}
                  value={item.label}
                  onChange={() => handleChangeTopics(item._id, item.label)}
                />
                <label>{item.label}</label>
              </div>
            ))}
          </fieldset>
        </div>

        {/* second column in the grid */}
        <div>
          <fieldset>
            <legend>Max. number of participants:</legend>
            {allParticipants.map((item) => (
              <div key={item._id}>
                <input
                  type="radio"
                  id={item._id}
                  name="participants"
                  value={item.label}
                  onChange={() => setParticipants(item)}
                />
                <label htmlFor={item.label}>{item.label}</label>
              </div>
            ))}
          </fieldset>
          <br></br>
          {/* IDEAL TEAM */}
          <div>
            <p className="form-label">Ideal team</p>
            <div className="grid grid---4cols-10305010 margin-6auto">
              <div className="center-text">#</div>
              <div className="center-text">N. people</div>
              <div className="center-text">Role</div>
              <div className="center-text">
                <button className="btn-circle" onClick={addInputRole}>
                  +
                </button>
              </div>
            </div>
            <div className="grid grid---4cols-10305010 margin-6auto">
              <div className="center-text">0</div>
              <div className="center-text">
                <input
                  className="width-25"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="1"
                  onChange={(e) => handleChangeRole(e, '0', 'n')}
                />
              </div>
              <div className="center-text">
                <input
                  className="width-80"
                  type="text"
                  onChange={(e) => handleChangeRole(e, '0', 'role')}
                />
              </div>
            </div>

            {idealConfig.map(
              (item, index) =>
                item._id !== '0' && (
                  <Fragment key={item._id}>
                    <div className="grid grid---4cols-10305010 margin-6auto">
                      {/* <div className="center-text">{item._id}</div> */}
                      <div className="center-text">{index}</div>
                      <div className="center-text">
                        <input
                          className="width-25"
                          type="number"
                          min="1"
                          placeholder="1"
                          onChange={(e) => handleChangeRole(e, item._id, 'n')}
                        />
                      </div>
                      <div className="center-text">
                        <input
                          className="width-80"
                          type="text"
                          onChange={(e) =>
                            handleChangeRole(e, item._id, 'role')
                          }
                        />
                      </div>
                      <div className="center-text">
                        <button
                          className="btn-circle"
                          onClick={() => removeRole(item._id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </Fragment>
                )
            )}
          </div>
          <br></br>

          <div>
            <p className="form-label">Steps for completion</p>
            <div className="grid grid---4cols-10305010">
              <div className="center-text">#</div>
              <div className="center-text">Role</div>
              <div className="center-text">Tasks</div>
              <div className="center-text">
                <button className="btn-circle" onClick={addInputStep}>
                  +
                </button>
              </div>
            </div>

            <div className="grid grid---4cols-10305010 margin-6auto">
              {idealConfig.map((item, index) => (
                <Fragment key={item._id}>
                  <div className="center-text">
                    {index === 0 ? (
                      <div className="center-text">1</div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="center-text">
                    <p>{item.role}</p>
                  </div>
                  <div className="center-text">
                    <textarea
                      className="width-80"
                      type="text"
                      rows="2"
                      // cols="25"
                      onChange={(e) => handleChangeSteps(e, item._id, '1')}
                    />
                  </div>
                  <div></div>
                </Fragment>
              ))}
            </div>
            {/* <br></br> */}
            <hr></hr>
            {/* <br></br> */}

            {steps.map(
              (step, stepIdx) =>
                step._id !== '1' && (
                  <Fragment key={step._id}>
                    <div className="grid grid---4cols-10305010 margin-6auto">
                      {idealConfig.map((item, index) => (
                        <Fragment key={item._id}>
                          {index === 0 ? (
                            // <div className="center-text">{step._id}</div>
                            <div className="center-text">{stepIdx + 1}</div>
                          ) : (
                            <div></div>
                          )}
                          <div className="center-text">
                            <p>{item.role}</p>
                          </div>
                          <div className="center-text">
                            <textarea
                              type="text"
                              rows="2"
                              className="width-80"
                              // cols="25"
                              onChange={(e) =>
                                handleChangeSteps(e, item._id, '1')
                              }
                            />
                          </div>
                          {index === 0 ? (
                            <div className="center-text">
                              <button
                                className="btn-circle"
                                onClick={() => removeStep(step._id)}
                              >
                                -
                              </button>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </Fragment>
                      ))}
                    </div>
                    {/* <br></br> */}
                    <hr></hr>
                    {/* <br></br> */}
                  </Fragment>
                )
            )}
          </div>
          <br></br>
          <br></br>
          <div>
            <p className="form-label">Requirements for successful completion</p>
            <div className="grid grid---3cols-108010 margin-6auto">
              <div className="center-text">#</div>
              <div className="center-text">goal</div>
              <div className="center-text">
                <button className="btn-circle" onClick={addInputGoal}>
                  +
                </button>
              </div>
            </div>
            <div className="grid grid---3cols-108010 margin-6auto">
              <div className="center-text">1</div>
              <div className="center-text ">
                <input
                  className="width-80"
                  type="text"
                  id="0"
                  // value=''
                  onChange={(e) => handleChangeGoal(e, '0')}
                />
              </div>
              <div className="center-text"></div>
            </div>

            {goals.map(
              (item, index) =>
                item._id !== '0' && (
                  <div
                    className="grid grid---3cols-108010 margin-6auto"
                    key={item._id}
                  >
                    <div className="center-text">{index + 1}</div>
                    <div className="center-text ">
                      <input
                        className="width-80"
                        type="text"
                        id="0"
                        // value=''
                        onChange={(e) => handleChangeGoal(e, '0')}
                      />
                    </div>
                    <div className="center-text">
                      <button
                        className="btn-circle"
                        onClick={() => removeGoal(item._id)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
          <br></br>
          <br></br>
          <div>
            <p className="form-label">Resources</p>
            <div className="grid grid---3cols-108010 margin-6auto">
              <div className="center-text">#</div>
              <div className="center-text">link</div>
              <div className="center-text">
                <button className="btn-circle" onClick={addInputResource}>
                  +
                </button>
              </div>
            </div>
            <div className="grid grid---3cols-108010 margin-6auto">
              <div className="center-text">1</div>
              <div className="center-text">
                {' '}
                <input
                  className="width-80"
                  type="text"
                  id="0"
                  // value=''
                  onChange={(e) => handleChangeResource(e, '0')}
                />
              </div>
              <div className="center-text"></div>
            </div>
            {resources.map(
              (item, index) =>
                item._id !== '0' && (
                  <div
                    className="grid grid---3cols-108010 margin-6auto"
                    key={item._id}
                  >
                    <div className="center-text">{index + 1}</div>
                    <div className="center-text ">
                      <input
                        className="width-80"
                        type="text"
                        id="0"
                        onChange={(e) => handleChangeResource(e, '0')}
                      />
                    </div>
                    <div className="center-text">
                      <button
                        className="btn-circle"
                        onClick={() => removeResource(item._id)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <br></br>
      <br></br>

      <div>
        {' '}
        <BtnCTA
          classname="btn-dark"
          label="Create Assignment"
          onCLickAction={handleSubmit}
        />
      </div>
    </Fragment>
  );
}

export default CreateAssignementScreen;
