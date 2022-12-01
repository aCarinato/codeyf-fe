// react / next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import UserRoute from '../../../../../components/routes/UserRoute';
import CheckRequirementCard from '../../../../../components/groups/manage/CheckRequirementCard';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../../context/Context';

function CompletionPage() {
  const { authState } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);
  //   console.log(group);
  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      //   console.log(res);
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

  //   Fetch the completion status for the current project
  const checkCompletion = async (idx) => {
    // update the field 'met' for the requirement with selected idx
    try {
      const groupId = group._id;
      const requirementId = idx;
      //   console.log(`groupId: ${groupId}, requirementId: ${requirementId}`);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/groups/group/check-requirement`,
        { groupId, requirementId },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      fetchGroup();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          <h2>Completion</h2>
          {group.proposedAssignment &&
            group.proposedAssignment.requirements.length > 0 && (
              <ul className="no-bullets">
                {group.requirements.map((requirement) => (
                  <li key={requirement.idx}>
                    <CheckRequirementCard
                      requirement={requirement}
                      checkCompletion={() => checkCompletion(requirement.idx)}
                    />
                  </li>
                ))}
              </ul>
            )}
        </>
      )}
    </UserRoute>
  );
}

export default CompletionPage;
