// react / next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// own components
// import UserRoute from '../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import CardSelector from '../../../../../components/UI/CardSelector';
import AssignementCard from '../../../../../components/assignements/AssignementCard';
// libs
import axios from 'axios';
import BtnCTA from '../../../../../components/UI/BtnCTA';

function SelectIndividualAssignmentPage() {
  const router = useRouter();

  const [assignements, setAssignments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [selectedId, setSelectedId] = useState('');

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/assignments/`
      );
      if (res.data.success) {
        setAssignments(res.data.assignments);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const selectAssignment = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-assignment', selectedId);
    }

    // setPickedAssignmentId(selectedId);
    router.push('/projects/individual/mentors/new/create');
  };

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <h3>Pick an assignment</h3>
          <div className="flex">
            {assignements.length > 0 ? (
              assignements.map((assignement) => (
                <CardSelector
                  key={assignement._id}
                  card={
                    <AssignementCard
                      id={assignement._id}
                      title={assignement.name}
                      description={assignement.headline}
                      difficulty={assignement.difficulty}
                      maxParticipants={assignement.maxTeamMemebers}
                      stack={assignement.learning}
                      reviews={assignement.reviews}
                    />
                  }
                  btn={
                    <BtnCTA
                      classname="btn-light-big"
                      label="Select"
                      onCLickAction={selectAssignment}
                    />
                  }
                  itemId={assignement._id}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              ))
            ) : (
              <p>
                No assignments found for the filters applied. Please select
                different search parameters.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SelectIndividualAssignmentPage;
