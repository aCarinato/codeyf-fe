// next / react
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// own components
import SpinningLoader from '../../../components/UI/SpinningLoader';
import AssignementCard from '../../../components/assignements/AssignementCard';
import BtnCTA from '../../../components/UI/BtnCTA';
import AssignementFilter from '../../../components/assignements/AssignementFilter';
import AssignementFilterMobile from '../../../components/assignements/AssignementFilterMobile';
// own functions
import { filterAssignements } from '../../../lib/helper/assignements/filterFunction';
// import { averageRate } from '../../../lib/helper/reviewFunctions';
// context
import { useMainContext } from '../../../context/Context';
// libs
import axios from 'axios';

function AssignmentsScreen() {
  const { mobileView } = useMainContext();
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignements, setFilteredAssignements] = useState([]);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [difficultyCheckedIndex, setDifficultyCheckedIndex] = useState([]);
  const [participantsCheckedIndex, setParticipantsCheckedIndex] = useState([]);
  const [stackCheckedIndex, setStackCheckedIndex] = useState([]);
  const [topicsCheckedIndex, setTopicsCheckedIndex] = useState([]);
  // mobile filter
  const [showFilter, setShowFilter] = useState(false);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/assignments/`
      );
      if (res.data.success) {
        setAssignments(res.data.assignments);
        setFilteredAssignements(res.data.assignments);
      }
      setLoading(false);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(assignments);

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (!mobileView) {
      filterAssignements(
        assignments,
        difficultyCheckedIndex,
        participantsCheckedIndex,
        stackCheckedIndex,
        topicsCheckedIndex,
        setFilteredAssignements
      );
    }
  }, [
    difficultyCheckedIndex,
    participantsCheckedIndex,
    stackCheckedIndex,
    topicsCheckedIndex,
  ]);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <div>
            <h1>Coding Assignments</h1>
            <h4 className="h4-header">To build alone or with other learners</h4>
            <br></br>
          </div>
          <br></br>
          {showFilter && (
            <AssignementFilterMobile
              difficultyCheckedIndex={difficultyCheckedIndex}
              setDifficultyCheckedIndex={setDifficultyCheckedIndex}
              participantsCheckedIndex={participantsCheckedIndex}
              setParticipantsCheckedIndex={setParticipantsCheckedIndex}
              stackCheckedIndex={stackCheckedIndex}
              setStackCheckedIndex={setStackCheckedIndex}
              topicsCheckedIndex={topicsCheckedIndex}
              setTopicsCheckedIndex={setTopicsCheckedIndex}
              mobileFilterAssignements={() =>
                filterAssignements(
                  assignments,
                  difficultyCheckedIndex,
                  participantsCheckedIndex,
                  stackCheckedIndex,
                  topicsCheckedIndex,
                  setFilteredAssignements
                )
              }
              onClose={() => setShowFilter(false)}
            />
          )}
          <div className={mobileView ? 'grid' : `grid grid---2cols-20-80`}>
            {!mobileView && (
              <div>
                <AssignementFilter
                  difficultyCheckedIndex={difficultyCheckedIndex}
                  setDifficultyCheckedIndex={setDifficultyCheckedIndex}
                  participantsCheckedIndex={participantsCheckedIndex}
                  setParticipantsCheckedIndex={setParticipantsCheckedIndex}
                  stackCheckedIndex={stackCheckedIndex}
                  setStackCheckedIndex={setStackCheckedIndex}
                  topicsCheckedIndex={topicsCheckedIndex}
                  setTopicsCheckedIndex={setTopicsCheckedIndex}
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
                    router.push('/projects/coding-assignments/new')
                  }
                />
              </div>
              {/* <br></br> */}
              <div className="flex gap-12 padding-12rem">
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
                    title={assignement.name}
                    description={assignement.headline}
                    difficulty={assignement.difficulty}
                    maxParticipants={assignement.maxTeamMemebers}
                    stack={assignement.learning}
                    picture={assignement.picture}
                    reviews={assignement.reviews}
                  />
                ))}{' '}
                <div className="white-card"></div>
                <div className="white-card"></div>
                <div className="white-card"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AssignmentsScreen;
