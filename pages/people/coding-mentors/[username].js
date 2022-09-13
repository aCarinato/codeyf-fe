import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { people } from '../../../data/people';
import { groups } from '../../../data/groups';
import { assignements } from '../../../data/assignements';
// libraries
import { Icon } from '@iconify/react';
// own components
import GroupCard from '../../../components/groups/GroupCard';
import AssignementCard from '../../../components/assignements/AssignementCard';

function MentorProfilePage() {
  const router = useRouter();
  const { query } = router;
  const username = query.username;

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filteredMentor = people.filter((person) => {
      return person.username === username && person.isMentor === true;
    });

    setMentor(filteredMentor[0]);
    setLoading(false);
  }, [mentor, username]);
  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {mentor && mentor.username && <Fragment>{mentor.username}</Fragment>}
        </Fragment>
      )}
    </Fragment>
  );
}

export default MentorProfilePage;
