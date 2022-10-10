import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { people } from '../../../data/people';
import { groups } from '../../../data/groups';
import { assignements } from '../../../data/assignements';
// libraries
import { Icon } from '@iconify/react';
import axios from 'axios';
// own components
import GroupCard from '../../../components/groups/GroupCard';
import AssignementCard from '../../../components/assignements/AssignementCard';
import BtnCTA from '../../../components/UI/BtnCTA';
import MyProfileDetails from '../../../components/profile/MyProfile/MyProfileDetails';

function BuddyPage() {
  const router = useRouter();
  const { query } = router;
  const handle = query.handle;

  const [buddy, setBuddy] = useState(null);
  const [loading, setLoading] = useState(false);

  // current
  const [currentGroups, setCurrentGroups] = useState([]);
  const [currentAssignments, setCurrentAssignments] = useState([]);
  // past
  const [pastGroups, setPastGroups] = useState([]);
  const [pastAssignments, setPastAssignments] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/student/${handle}`
      );
      // console.log(res.data.user);
      if (res.data.success) {
        setBuddy(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrentGroups = () => {
    if (
      buddy !== null &&
      buddy !== undefined &&
      buddy.activeGroups &&
      buddy.activeGroups.length > 0
    ) {
      const buddyingGroups = buddy.activeGroups.filter(
        (group) => group.buddying === true
      );

      const selectedCurrentGroups = groups.filter((group) =>
        buddyingGroups.map((item) => item._id).includes(group.id)
      );
      setCurrentGroups(selectedCurrentGroups);
    }
  };

  const fetchCurrentAssignments = () => {
    if (
      buddy !== null &&
      buddy !== undefined &&
      buddy.activeAssignments &&
      buddy.activeAssignments.length > 0
    ) {
      const selectedCurrentAssignments = assignements.filter((assignement) =>
        buddy.activeAssignments
          .map((item) => item._id)
          .includes(assignement._id)
      );
      setCurrentAssignments(selectedCurrentAssignments);
    }
  };

  const fetchPastGroups = () => {
    if (
      buddy !== null &&
      buddy !== undefined &&
      buddy.pastGroups &&
      buddy.pastGroups.length > 0
    ) {
      const buddyingGroups = buddy.pastGroups.filter(
        (group) => group.buddying === true
      );

      const selectedPastGroups = groups.filter((group) =>
        buddyingGroups.map((item) => item._id).includes(group.id)
      );
      setPastGroups(selectedPastGroups);
    }
  };

  const fetchPastAssignments = () => {
    if (
      buddy !== null &&
      buddy !== undefined &&
      buddy.pastAssignments &&
      buddy.pastAssignments.length > 0
    ) {
      const selectedPastAssignments = assignements.filter((assignement) =>
        buddy.pastAssignments.map((item) => item._id).includes(assignement._id)
      );
      setPastAssignments(selectedPastAssignments);
    }
  };

  useEffect(() => {
    setLoading(true);
    // const filteredBuddy = people.filter((person) => {
    //   return person.username === username && person.isBuddy === true;
    // });

    fetchUser();

    // setBuddy(filteredBuddy[0]);
    fetchCurrentGroups();
    fetchCurrentAssignments();
    fetchPastGroups();
    fetchPastAssignments();
    setLoading(false);
  }, [buddy, handle]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {buddy && buddy.handle && (
            <Fragment>
              <div className="right-text padding-2rem">
                <BtnCTA
                  label="Message"
                  onCLickAction={() => {}}
                  icon={true}
                  iconType="ant-design:message-outlined"
                />
              </div>
              <MyProfileDetails
                username={buddy.username}
                shortDescription={buddy.shortDescription}
                longDescription={buddy.longDescription}
                country={buddy.country}
                languages={buddy.languages}
                profilePic={buddy.profilePic}
                github={buddy.github}
                isBuddy={buddy.isBuddy}
                currentlyAvailableAsBuddy={buddy.currentlyAvailableAsBuddy}
                mentorPendingApproval={buddy.mentorPendingApproval}
                isMentor={buddy.isMentor}
                currentlyAvailableAsMentor={buddy.currentlyAvailableAsMentor}
                topics={buddy.topics}
                learning={buddy.learning}
                skillsLevel={buddy.skillsLevel}
                companyJob={buddy.companyJob}
                linkedin={buddy.linkedin}
                yearsExperience={buddy.yearsExperience}
                teaching={buddy.teaching}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default BuddyPage;
