// react/next
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { assignements } from '../../../data/assignements';
import { people } from '../../../data/people';

function AssignementScreen() {
  const router = useRouter();
  const { query } = router;

  const queryVal = query['id-title'];
  let postID;
  if (queryVal) {
    postID = queryVal.split('-')[0];
  }

  const [assignement, setAssignement] = useState({});
  const [creator, setCreator] = useState(null);

  // console.log(query['id-title']);
  const fetchAssignement = () => {
    const selectedAssignement = assignements.filter(
      (assignement) => assignement._id === postID
    )[0];
    setAssignement(selectedAssignement);
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
    fetchAssignement();
  }, [postID]);

  useEffect(() => {
    fetchCreator();
  }, [assignement]);

  return (
    assignement &&
    assignement.title && (
      <Fragment>
        <br></br>
        <div className="flex flex-justify-space-between">
          <h2>{assignement.title}</h2>
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
            <p>{assignement.description}</p>
          </div>
          <div>
            <h4>Difficulty:</h4>
            <p>{assignement.difficulty}</p>
          </div>
          <div>
            <h4>Max. number of participants:</h4>
            <p>{assignement.maxParticipants}</p>
          </div>
        </div>
        <br></br>
        <div>
          <h4>Details</h4>
          <p>{assignement.details}</p>
        </div>
        <br></br>
        <h4>Functionalities required for successful completion</h4>
        <ul>
          {assignement.goals.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <br></br>
        <h4>Tech stack:</h4>
        <div className="flex flex-justify-flex-start">
          {assignement.stack.map((item, index) => (
            <span key={index} className={`tech-span`}>
              {item}
            </span>
          ))}
        </div>
        <br></br>
        <h4>Skills involved:</h4>
        <div className="flex flex-justify-flex-start">
          {assignement.skills.map((item, index) => (
            <span key={index} className={`tech-span`}>
              {item}
            </span>
          ))}
        </div>
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
            {assignement.idealConfig.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.n}</td>
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
            {assignement.steps.map((item) =>
              item.tasks.map((task) => (
                <tr key={task.participantId}>
                  {item.tasks.indexOf(task) === 0 && (
                    <td rowSpan={assignement.maxParticipants.toString()}>
                      {item.n}
                    </td>
                  )}
                  <td>{task.participantId}</td>
                  <td>
                    <ul>
                      {task.names.map((taskName, index) => (
                        <li key={index}>{taskName}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br></br>
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
                {/* <th>Name</th> */}
                <th>Type</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {assignement.resources.map((resource) => (
                <tr key={resource._id}>
                  {/* <td>{resource.name}</td> */}
                  <td>{resource.type}</td>
                  <td>
                    <a href={`${resource.link}`}>{resource.link}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <h4>Comments</h4>
        </div>
        <br></br>
      </Fragment>
    )
  );
}

export default AssignementScreen;
