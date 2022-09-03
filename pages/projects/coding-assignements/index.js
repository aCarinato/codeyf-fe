// next / react
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// own components
import AssignementCard from '../../../components/assignements/AssignementCard';
import BtnCTA from '../../../components/UI/BtnCTA';
// own functions
// import { averageRate } from '../../../lib/helper/reviewFunctions';
// data
import { assignements } from '../../../data/assignements';
// context
import { useMainContext } from '../../../context/Context';

function AssignmentsScreen() {
  const { mobileView } = useMainContext();
  const router = useRouter();
  const [filteredAssignements, setFilteredAssignements] = useState([]);

  useEffect(() => {
    setFilteredAssignements(assignements);
  }, []);

  return (
    <Fragment>
      <div>
        <h1>Coding Assignements</h1>
        <h4 className="h4-header">To build alone or with other learners</h4>
        <br></br>
      </div>
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && <div>FILTER</div>}
        <div
          className={
            mobileView
              ? 'flex flex-justify-center'
              : 'flex flex-justify-space-between'
          }
        >
          {!mobileView && <div></div>}
          <BtnCTA
            label="Add New Assignement"
            classname="btn-dark"
            onCLickAction={() =>
              router.push('/projects/coding-assignements/create-assignement')
            }
          />
        </div>
        <br></br>
        <div className="flex">
          {filteredAssignements.map((assignement) => (
            <AssignementCard
              key={assignement._id}
              id={assignement._id}
              title={assignement.title}
              description={assignement.description}
              difficulty={assignement.difficulty}
              maxParticipants={assignement.maxParticipants}
              stack={assignement.stack}
              reviews={assignement.reviews}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default AssignmentsScreen;
