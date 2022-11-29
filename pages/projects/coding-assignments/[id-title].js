// react/next
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { assignements } from '../../../data/assignements';
import { people } from '../../../data/people';
// own components
import Rating from '../../../components/UI/Rating';
// libs
import axios from 'axios';

function AssignementScreen() {
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

  // console.log(query['id-title']);
  const fetchAssignement = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/assignments/${assignmentID}`
    );
    console.log(res);
    setAssignement(res.data.assignment);
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

  return (
    assignement &&
    assignement.name && (
      <Fragment>
        <div className="flex flex-justify-space-between">
          <h2>{assignement.name}</h2>
          {creator && creator.username && (
            <p>
              posted by:{' '}
              <Link href={`/people/coding-buddies/${creator.username}`}>
                <a>{creator.username}</a>
              </Link>
            </p>
          )}
        </div>
        <br></br>
        <div className="flex flex-justify-space-between">
          <div>
            <h4>Description:</h4>
            <p>{assignement.headline}</p>
          </div>
          <div>
            <h4>Difficulty:</h4>
            <p>
              {assignement.difficulty === '0'
                ? 'Beginner'
                : assignement.difficulty === '1'
                ? 'Intermediate'
                : 'Advanced'}
            </p>
          </div>
          <div>
            <h4>Max. number of participants:</h4>
            <p>{assignement.maxTeamMemebers}</p>
          </div>
        </div>
        <br></br>
        <div>
          <h4>Details</h4>
          <p className="text-newline">{assignement.description}</p>
        </div>
        <br></br>
        <h4>Functionalities required for successful completion</h4>
        <ul>
          {assignement.requirements.map((item) => (
            <li key={item._id}>{item.label}</li>
          ))}
        </ul>
        <br></br>
        <h4>Tech stack:</h4>
        <div className="flex flex-justify-flex-start">
          {assignement.learning.map((item) => (
            <span key={item._id} className={`tech-span`}>
              {item.label}
            </span>
          ))}
        </div>
        <br></br>
        <h4>Main topics:</h4>
        <div className="flex flex-justify-flex-start">
          {assignement.topics.map((item) => (
            <span key={item._id} className={`tech-span`}>
              {item.label}
            </span>
          ))}
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
        <h4>Possible team configuration (not mandatory)</h4>
        <table>
          <thead>
            <tr>
              <th>Role id</th>
              <th>N. people</th>
              <th>Tasks</th>
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
        <h4>Possible steps for completion (not mandatory)</h4>
        <table>
          <thead>
            <tr>
              <th>Step Number</th>
              <th>Role id</th>
              <th>Tasks</th>
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
