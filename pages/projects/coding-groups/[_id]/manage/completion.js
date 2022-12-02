// react / next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import UserRoute from '../../../../../components/routes/UserRoute';
import CheckRequirementCard from '../../../../../components/groups/manage/CheckRequirementCard';
import ApprovalsCard from '../../../../../components/groups/manage/ApprovalsCard';
import BtnCTA from '../../../../../components/UI/BtnCTA';
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
  const [allRequirementsMet, setAllRequirementsMet] = useState(null);
  const [allMemebersApproved, setAllMemebersApproved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  // console.log(group);
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
  const markCompletion = async (idx) => {
    // update the field 'met' for the requirement with selected idx
    if (group.organiser._id === authState.userId) {
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
    } else {
      console.log('Not authorised');
    }
  };

  //   check if all tasks are marked as completed
  const checkCompletion = () => {
    setAllRequirementsMet(
      group.requirements
        .map((requirement) => requirement.met)
        .every((val) => val === true)
    );
  };

  //   check if all team members have approved
  const checkApprovals = () => {
    setAllMemebersApproved(
      group.approvals
        .map((approval) => approval.approved)
        .every((val) => val === true)
    );
  };

  useEffect(() => {
    if (group && group.requirements && group.requirements.length > 0) {
      checkCompletion();
      checkApprovals();
    }
  }, [group.requirements]);

  const closeGroup = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/groups/group/close`,
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      if (res.data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
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
          <h2>Project Completion</h2>
          <br></br>
          <h4>Check the tasks completed</h4>
          {group.proposedAssignment &&
            group.proposedAssignment.requirements.length > 0 && (
              <ul className="no-bullets">
                {group.requirements.map((requirement) => (
                  <li key={requirement.idx}>
                    <CheckRequirementCard
                      requirement={requirement}
                      checkCompletion={() => markCompletion(requirement.idx)}
                    />
                  </li>
                ))}
              </ul>
            )}
          <br></br>
          {allRequirementsMet && (
            <>
              <h4>Confirmation from other team members</h4>
              <ul>
                {group.approvals.map((approval) => (
                  <ApprovalsCard
                    key={approval.participant._id}
                    participant={approval.participant}
                    approved={approval.approved}
                  />
                ))}
              </ul>
            </>
          )}
          {allMemebersApproved && !group.isClosed && !success && (
            <div>
              <p>All members approved! You can close the project</p>

              <BtnCTA label="close team" onCLickAction={closeGroup} />
            </div>
          )}
          {success && <div>Team successfully closed</div>}
          {success === false && (
            <div>Something went wrong when closing the team</div>
          )}
        </>
      )}
    </UserRoute>
  );
}

export default CompletionPage;
