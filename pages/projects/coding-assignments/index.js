// next / react
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// own components
import AssignementCard from '../../../components/assignements/AssignementCard';
import BtnCTA from '../../../components/UI/BtnCTA';
import AssignementFilter from '../../../components/assignements/AssignementFilter';
import AssignementFilterMobile from '../../../components/assignements/AssignementFilterMobile';
// own functions
import { functFilterAssignements } from '../../../lib/helper/assignements/filterFunction';
// import { averageRate } from '../../../lib/helper/reviewFunctions';
// data
import { assignements } from '../../../data/assignements';
import { allDifficulty } from '../../../data/assignements/allDifficulty';
import { allParticipants } from '../../../data/assignements/allParticipants';
import { allStack } from '../../../data/assignements/allStack';
// context
import { useMainContext } from '../../../context/Context';

function AssignmentsScreen() {
  const { mobileView } = useMainContext();
  const router = useRouter();
  const [filteredAssignements, setFilteredAssignements] = useState([]);

  // FILTER
  const [difficultyCheckedIndex, setDifficultyCheckedIndex] = useState([]);
  const [participantsCheckedIndex, setParticipantsCheckedIndex] = useState([]);
  const [stackCheckedIndex, setStackCheckedIndex] = useState([]);
  // mobile filter
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setFilteredAssignements(assignements);
  }, []);

  useEffect(() => {
    if (!mobileView) {
      functFilterAssignements(
        assignements,
        difficultyCheckedIndex,
        participantsCheckedIndex,
        stackCheckedIndex,
        setFilteredAssignements
      );
    }
  }, [difficultyCheckedIndex, participantsCheckedIndex, stackCheckedIndex]);

  const mobileFilterAssignements = () => {
    functFilterAssignements(
      assignements,
      difficultyCheckedIndex,
      participantsCheckedIndex,
      stackCheckedIndex,
      setFilteredAssignements
    );
  };

  return (
    <Fragment>
      <div>
        <h1>Coding Assignments</h1>
        <h4 className="h4-header">To build alone or with other learners</h4>
        <br></br>
      </div>
      <br></br>
      {showFilter && (
        <AssignementFilterMobile
          allDifficulty={allDifficulty}
          difficultyCheckedIndex={difficultyCheckedIndex}
          setDifficultyCheckedIndex={setDifficultyCheckedIndex}
          allParticipants={allParticipants}
          participantsCheckedIndex={participantsCheckedIndex}
          setParticipantsCheckedIndex={setParticipantsCheckedIndex}
          allStack={allStack}
          stackCheckedIndex={stackCheckedIndex}
          setStackCheckedIndex={setStackCheckedIndex}
          mobileFilterAssignements={mobileFilterAssignements}
          onClose={() => setShowFilter(false)}
        />
      )}
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && (
          <div>
            <AssignementFilter
              allDifficulty={allDifficulty}
              difficultyCheckedIndex={difficultyCheckedIndex}
              setDifficultyCheckedIndex={setDifficultyCheckedIndex}
              allParticipants={allParticipants}
              participantsCheckedIndex={participantsCheckedIndex}
              setParticipantsCheckedIndex={setParticipantsCheckedIndex}
              allStack={allStack}
              stackCheckedIndex={stackCheckedIndex}
              setStackCheckedIndex={setStackCheckedIndex}
            />
          </div>
        )}
        <div>
          <div
            className={
              mobileView
                ? 'flex flex-justify-center'
                : 'flex flex-justify-space-between'
            }
          >
            {!mobileView && <div></div>}
            <BtnCTA
              label="Add New Assignment"
              classname="btn-dark"
              onCLickAction={() =>
                router.push('/projects/coding-assignments/create-assignment')
              }
            />
          </div>
          <br></br>
          <div className="flex">
            {mobileView && (
              <BtnCTA
                label="filter assignments"
                classname="btn-light-big"
                onCLickAction={() => setShowFilter(true)}
                icon={true}
                iconType="ci:filter-outline"
              />
            )}
            {filteredAssignements.map((assignement) => (
              <AssignementCard
                key={assignement._id}
                id={assignement._id}
                title={assignement.title}
                description={assignement.shortDescription}
                difficulty={assignement.difficulty.label}
                maxParticipants={assignement.maxParticipants.label}
                stack={assignement.stack}
                reviews={assignement.reviews}
              />
            ))}{' '}
            <div className="white-card"></div>
            <div className="white-card"></div>
            <div className="white-card"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AssignmentsScreen;
