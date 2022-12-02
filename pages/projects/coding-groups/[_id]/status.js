import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import CheckRequirementCard from '../../../../components/groups/manage/CheckRequirementCard';
import BtnCTA from '../../../../components/UI/BtnCTA';
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

  const [eitherBuddyOrMentor, setEitherBuddyOrMentor] = useState(null);
  const [allRequirementsMet, setAllRequirementsMet] = useState(null);
  const [hasAlreadyApproved, setHasAlreadyApproved] = useState(null);

  const [success, setSuccess] = useState(null);

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

  const isCurrentUserInGroup = () => {
    if (group && group.organiser && group.organiser._id !== authState.userId) {
      const isBuddy = group.buddies
        .map((buddy) => buddy._id)
        .includes(authState.userId);

      const isMentor = group.mentors
        .map((mentor) => mentor._id)
        .includes(authState.userId);

      const condition = isBuddy || isMentor;
      setEitherBuddyOrMentor(condition);
      // console.log(`isBuddy: ${isBuddy}`);
      // console.log(`isMentor: ${isMentor}`);
    }
  };

  const alreadyApproved = () => {
    if (group && group.organiser && group.organiser._id !== authState.userId) {
      const idx = group.approvals
        .map((item) => item.participant._id)
        .indexOf(authState.userId);

      setHasAlreadyApproved(group.approvals[idx].approved);
    }
  };

  useEffect(() => {
    if (groupId !== undefined && groupId.length > 0) {
      isCurrentUserInGroup();
      alreadyApproved();
    }
  }, [groupId, group]);
  // console.log(`eitherBuddyOrMentor: ${eitherBuddyOrMentor}`);

  //   check if all tasks are marked as completed
  const checkCompletion = () => {
    setAllRequirementsMet(
      group.requirements
        .map((requirement) => requirement.met)
        .every((val) => val === true)
    );
  };

  useEffect(() => {
    if (group && group.requirements && group.requirements.length > 0)
      checkCompletion();
  }, [group.requirements]);

  const approveCompletion = async () => {
    try {
      const groupId = group._id;
      //   console.log(`groupId: ${groupId}, requirementId: ${requirementId}`);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/groups/group/approve-completion`,
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
            group.organiser._id === authState.userId &&
            !group.isClosed && (
              <p>
                <Link
                  href={`/projects/coding-groups/${groupId}/manage/completion`}
                >
                  Manage completion status
                </Link>
              </p>
            )}
          {eitherBuddyOrMentor &&
            allRequirementsMet &&
            !success &&
            !hasAlreadyApproved && (
              <div>
                <br></br>
                <div>
                  <BtnCTA label={'Approve'} onCLickAction={approveCompletion} />
                </div>
              </div>
            )}
          {success && <div>Approved!</div>}
          {success === false && <div>Some error occurred</div>}
          {!group.isClosed && hasAlreadyApproved && <div>Already approved</div>}
        </div>
      )}
    </>
  );
}

export default StatusPage;
