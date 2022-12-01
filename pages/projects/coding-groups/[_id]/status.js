import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import CheckRequirementCard from '../../../../components/groups/manage/CheckRequirementCard';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function StatusPage() {
  const { authState } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      // console.log(res);
      setGroup(res.data.group);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (groupId !== undefined && groupId.length > 0) {
      fetchGroup();
    }
  }, [groupId]);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div>
          <h2>Completion</h2>
          {group.proposedAssignment &&
            group.proposedAssignment.requirements.length > 0 && (
              <ul className="no-bullets">
                {group.requirements.map((requirement) => (
                  <li key={requirement.idx}>
                    <CheckRequirementCard
                      requirement={requirement}
                      checkCompletion={() => {}}
                    />
                  </li>
                ))}
              </ul>
            )}
          {group &&
            group.organiser &&
            group.organiser._id === authState.userId && (
              <p>
                <Link
                  href={`/projects/coding-groups/${groupId}/manage/completion`}
                >
                  Manage completion status
                </Link>
              </p>
            )}
        </div>
      )}
    </>
  );
}

export default StatusPage;
