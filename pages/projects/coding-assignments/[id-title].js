// react/next
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { people } from '../../../data/people';
// own components
import Rating from '../../../components/UI/Rating';
import BtnCTA from '../../../components/UI/BtnCTA';
// libs
import axios from 'axios';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../../context/Context';

function AssignementScreen() {
  const { mobileView } = useMainContext();

  const router = useRouter();
  const { query } = router;

  const queryVal = query['id-title'];
  let assignmentID;
  if (queryVal) {
    assignmentID = queryVal.split('-')[0];
  }

  const [assignement, setAssignement] = useState({});
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(false);

  const [teamConfigurationIsValid, setTeamConfigurationIsValid] =
    useState(null);

  const [stepsIsValid, setStepsIsValid] = useState(null);

  // console.log(query['id-title']);
  const fetchAssignement = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/assignments/${assignmentID}`
    );
    // console.log(res);
    if (res.data.success) {
      setAssignement(res.data.assignment);
    }

    setLoading(false);
  };

  const fetchCreator = () => {
    if (assignement && assignement !== {}) {
      const selectedPerson = people.filter(
        (person) => person.id === assignement.createdBy
      );
      setCreator(selectedPerson[0]);
    }
  };

  useEffect(() => {
    if (assignmentID !== undefined && assignmentID.length > 0) {
      fetchAssignement();
    }
  }, [assignmentID]);

  // console.log(assignement);

  useEffect(() => {
    fetchCreator();
  }, [assignement]);

  const checkTeamConfigurationIsValid = () => {
    if (assignement.idealTeam.length === 1) {
      if (
        assignement.idealTeam[0].nPeople !== '' &&
        assignement.idealTeam[0].role !== ''
      ) {
        setTeamConfigurationIsValid(true);
      } else {
        setTeamConfigurationIsValid(false);
      }
    } else {
      setTeamConfigurationIsValid(true);
    }
  };

  // console.log(assignement.steps[0].tasks);
  const checkStepsIsValid = () => {
    if (assignement.steps.length === 1) {
      // console.log(
      //   `assignement.steps.length === 1: ${assignement.steps.length === 1}`
      // );
      // console.log(`assignement.steps[0].tasks: ${assignement.steps[0]}`);
      if (assignement.steps[0].tasks.length > 0) {
        setStepsIsValid(true);
      } else {
        setStepsIsValid(false);
      }
    } else {
      setStepsIsValid(true);
    }
  };

  useEffect(() => {
    if (assignement && assignement.idealTeam && assignement.steps) {
      checkTeamConfigurationIsValid();
      checkStepsIsValid();
    }
  }, [assignement]);

  return (
    assignement &&
    assignement.name && (
      <Fragment>
        <div className="flex flex-justify-space-between">
          <div>
            <div className="flex">
              {assignement && (
                <div className="id-img-container">
                  <img
                    className="card-img"
                    src={
                      assignement.picture &&
                      assignement.picture.url &&
                      assignement.picture.url !== ''
                        ? assignement.picture.url
                        : '/img/default-task.png'
                    }
                  />
                </div>
              )}
              <h2 className={mobileView ? 'padding-2rem-tb' : 'padding-2rem'}>
                {assignement.name}
              </h2>
            </div>

            {/* <p>
              created by:{' '}
              <Link
                href={`/people/coding-mentors/${assignement.createdBy.username}`}
              >
                {assignement.createdBy.username}
              </Link>
            </p> */}
          </div>

          <div>
            <div className="center-text">
              <BtnCTA
                label="pick assignment"
                classname="btn-dark"
                onCLickAction={() => {}}
              />
            </div>
            <br></br>

            <Link href={`/projects/coding-assignments`}>
              <p className="link-text font-12">
                <Icon icon="material-symbols:arrow-back" /> back to assignments
              </p>
            </Link>
          </div>
        </div>
        <br></br>
        <div className="flex flex-justify-space-between">
          <div>
            <h4 className="headers">Description:</h4>
            <p>{assignement.headline}</p>
          </div>
        </div>
        <br></br>
        <div>
          <h4 className="headers">Details</h4>
          <p className="text-newline description">{assignement.description}</p>
        </div>
        <br></br>
        <h4 className="headers">
          Functionalities required for successful completion
        </h4>
        <ul>
          {assignement.requirements.map((item) => (
            <li key={item._id} className="list-completion">
              <Icon icon="material-symbols:check-circle" /> {item.label}
            </li>
          ))}
        </ul>
        <br></br>
        <div className="flex">
          <div className={!mobileView && 'width-50'}>
            <h4 className="headers">
              Main topics <Icon icon="icon-park-outline:topic" />
            </h4>
            <div className="flex flex-justify-flex-start padding-2rem-r">
              {assignement.topics.map((item) => (
                <div key={item._id} className={`tech-span`}>
                  <div className="tag-div">o</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={!mobileView && 'width-50'}>
            <h4 className="headers">
              Tech stack <Icon icon="bi:stack" />
            </h4>
            <div className="flex flex-justify-flex-start padding-2rem-r">
              {assignement.learning.map((item) => (
                <div key={item._id} className={`tech-span`}>
                  <div className="tag-div">o</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br></br>
        <div className="flex flex-justify-space-between">
          <div>
            <h4 className="headers">
              Difficulty{' '}
              {assignement.difficulty === '0' ? (
                <>
                  <Icon icon="carbon:skill-level-basic" />
                </>
              ) : assignement.difficulty === '1' ? (
                <>
                  <Icon icon="carbon:skill-level-intermediate" />
                </>
              ) : (
                <>
                  <Icon icon="carbon:skill-level-advanced" />
                </>
              )}
            </h4>
            <p>
              {assignement.difficulty === '0' ? (
                <>beginner</>
              ) : assignement.difficulty === '1' ? (
                <>intermediate</>
              ) : (
                <>advanced</>
              )}
            </p>
          </div>
          {assignement.completionTime && (
            <div>
              <h4 className="headers">
                Approx. completion time{' '}
                <Icon icon="mdi:clipboard-text-date-outline" />
              </h4>
              <p>
                {assignement.completionTime < 7
                  ? `${assignement.completionTime} days (a couple of hours each day)`
                  : `${Math.ceil(
                      assignement.completionTime / 7
                    )} weeks (a couple of hours each day)`}
              </p>
            </div>
          )}
          <div>
            <h4 className="headers">Max. number of participants:</h4>
            <p>{assignement.maxTeamMemebers}</p>
          </div>
        </div>

        {assignement.repo && assignement.repo.length > 0 && (
          <>
            <br></br>
            <div>
              <h4>Source code</h4>
              <p>
                <a href={assignement.repo} target="_blank">
                  link
                </a>
              </p>
            </div>
          </>
        )}
        <br></br>
        {assignement.resources && assignement.resources.length > 0 && (
          <>
            <h4 className="headers">Resources</h4>
            <ul>
              {assignement.resources.map((resource) => (
                <li className="list-completion" key={resource.idx}>
                  <Link href={`${resource.link}`}>
                    <p>
                      <Icon icon="ic:baseline-menu-book" />{' '}
                      <span className="link-text">{resource.name}</span>
                    </p>
                  </Link>{' '}
                </li>
              ))}
            </ul>
          </>
        )}

        <br></br>
        {teamConfigurationIsValid && (
          <>
            <h4 className="headers">
              Possible team configuration (not mandatory)
            </h4>
            <table className="id-table">
              <thead>
                <tr>
                  <th>
                    role id <Icon icon="tabler:id" />
                  </th>
                  <th>
                    N. people <Icon icon="fluent:people-24-filled" />
                  </th>
                  <th>
                    main tasks <Icon icon="fluent-mdl2:process-meta-task" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignement.idealTeam.map((item) => (
                  <tr key={item._id}>
                    <td>{item.idx}</td>
                    <td>{item.nPeople}</td>
                    <td>{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
          </>
        )}

        {stepsIsValid && (
          <>
            <h4 className="headers">
              Possible steps for completion (not mandatory)
            </h4>
            <table className="id-table">
              <thead>
                <tr>
                  <th>
                    Step Number <Icon icon="icons8:cat-footprint" />
                  </th>
                  <th>
                    Role id <Icon icon="tabler:id" />
                  </th>
                  <th>
                    Tasks <Icon icon="fluent-mdl2:process-meta-task" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignement.steps.map((step) =>
                  step.tasks.map((task) => (
                    <tr key={task.roleId}>
                      {step.tasks.indexOf(task) === 0 && (
                        // <td rowSpan={assignement.maxParticipants.toString()}>
                        <td rowSpan={step.tasks.length}>{step.n}</td>
                      )}
                      <td>{task.roleId}</td>
                      <td>
                        <p className="text-newline">{task.roleTasks}</p>
                        {/* <ul>
                      {task.roleTasks.map((taskName, index) => (
                        <li key={index}>{taskName}</li>
                      ))}
                    </ul> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
        {/* <br></br>
        <div>
          <h4>GitHub repo (completed code):</h4>
          <p>
            <a href={`${assignement.repo}`}>{assignement.repo}</a>{' '}
          </p>
        </div>
        <br></br>
        <div>
          <h4>Resources:</h4>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {assignement.resources.map((resource) => (
                <tr key={resource._id}>
                  <td>{resource.type}</td>
                  <td>
                    <a href={`${resource.link}`}>{resource.name}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br> */}
        {/* <div>
          <h4>Reviews</h4>
          {assignement.reviews.map((review) => (
            <div key={review._id}>
              <div className="flex flex-justify-space-between">
                <p>
                  User id {review.createdBy} on {review.createdAt}
                </p>
                <Rating value={review.rating} />
              </div>

              <p>{review.comment}</p>
              <br></br>
            </div>
          ))}
        </div> */}
        <br></br>
      </Fragment>
    )
  );
}

export default AssignementScreen;
