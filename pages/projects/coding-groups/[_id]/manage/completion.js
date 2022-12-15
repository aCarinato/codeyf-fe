// react / next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// components
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import UserRoute from '../../../../../components/routes/UserRoute';
import CheckRequirementCard from '../../../../../components/groups/manage/CheckRequirementCard';
import ApprovalsCard from '../../../../../components/groups/manage/ApprovalsCard';
import BtnCTA from '../../../../../components/UI/BtnCTA';
// libs
import axios from 'axios';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../../../../context/Context';

function CompletionPage() {
  const { authState } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  const [group, setGroup] = useState({});

  const [organiserOnly, setOrganiserOnly] = useState(null);
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

  // check if there is only the organiser in the team
  const isOrganiserOnly = () => {
    // check the buddies
    const buddies = group.buddies.filter(
      (buddy) => buddy._id !== group.organiser._id
    );
    const mentors = group.mentors.filter(
      (mentor) => mentor._id !== group.organiser._id
    );

    setOrganiserOnly(!(buddies.length > 0 || mentors.length > 0));
  };

  useEffect(() => {
    if (group && group.buddies && group.mentors) isOrganiserOnly();
  }, [group]);

  // console.log(`organiserOnly: ${organiserOnly}`);

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
    if (group.requirements.length === 0) {
      setAllRequirementsMet(true);
    } else {
      setAllRequirementsMet(
        group.requirements
          .map((requirement) => requirement.met)
          .every((val) => val === true)
      );
    }
  };

  //   check if all team members have approved
  const checkApprovals = () => {
    if (group.approvals.length > 0) {
      // in theory this means in the group there is not only the organiser
      setAllMemebersApproved(
        group.approvals
          .map((approval) => approval.approved)
          .every((val) => val === true)
      );
    } else {
      setAllMemebersApproved(false);
    }
  };

  useEffect(() => {
    if (group && group.requirements) {
      checkCompletion();
      checkApprovals();
    }
  }, [group.requirements]);

  // console.log(allRequirementsMet);

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
      ) : organiserOnly ? (
        <div>
          <p>Still no other participants in this team:</p>
          {group.requirements.length > 0 ? (
            <p>
              it will be possible to mark the criteria for completion once there
              are other participants who can review and approve
            </p>
          ) : (
            <p>
              to add this project to the history you need the approval of other
              team memebers.
            </p>
          )}
          <br></br>
          <p>
            To add other team members go to{' '}
            <Link href={`/projects/coding-groups/${groupId}/manage/`}>
              manage team project
            </Link>{' '}
          </p>
        </div>
      ) : (
        <>
          <h2>Project Completion</h2>
          <br></br>
          {group.requirements && group.requirements.length > 0 && (
            <>
              <h4>Check the tasks completed</h4>
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
            </>
          )}
          {group.requirements && group.requirements.length === 0 && (
            <>
              <p>No project requirements to be marked as completed</p>
            </>
          )}
          <br></br>
          {allRequirementsMet && (
            <>
              {group.approvals.length > 0 ? (
                <>
                  <h4>
                    Confirmation from other team members to{' '}
                    {group.requirements.length > 0 && (
                      <span>mark requirements as completed and</span>
                    )}{' '}
                    close the project
                  </h4>
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
              ) : (
                <>
                  <h4>No other participants in this team project yet</h4>
                  <p>
                    To close the group you need confirmation of successful
                    completion from at least another participant (a buddy or a
                    mentor).
                  </p>
                  <br></br>
                  <p>
                    To add a participant, go to{' '}
                    <span>
                      <Link href={`/projects/coding-groups/${groupId}/manage/`}>
                        manage team project
                      </Link>
                    </span>
                  </p>
                </>
              )}
            </>
          )}
          {allRequirementsMet &&
            allMemebersApproved &&
            !group.isClosed &&
            !success && (
              <div>
                <p>
                  <Icon icon="fluent-mdl2:waitlist-confirm-mirrored" /> All
                  members approved! You can close the project
                </p>

                <BtnCTA label="close team" onCLickAction={closeGroup} />
              </div>
            )}
          {success && (
            <div>
              Team successfully closed! You can now find it in your{' '}
              <Link href="/my-profile/projects/teams">team projects page</Link>
            </div>
          )}
          {success === false && (
            <div>Something went wrong when closing the team</div>
          )}
        </>
      )}
    </UserRoute>
  );
}

export default CompletionPage;
