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

function BuddyPage() {
  const router = useRouter();
  const { query } = router;
  const username = query.username;

  const [buddy, setBuddy] = useState(null);
  const [loading, setLoading] = useState(false);

  // current
  const [currentGroups, setCurrentGroups] = useState([]);
  const [currentAssignments, setCurrentAssignments] = useState([]);
  // past
  const [pastGroups, setPastGroups] = useState([]);
  const [pastAssignments, setPastAssignments] = useState([]);

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
    const filteredBuddy = people.filter((person) => {
      return person.username === username && person.isBuddy === true;
    });

    setBuddy(filteredBuddy[0]);
    fetchCurrentGroups();
    fetchCurrentAssignments();
    fetchPastGroups();
    fetchPastAssignments();
    setLoading(false);
  }, [buddy, username]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {buddy && buddy.username && (
            <Fragment>
              <div className="flex flex-justify-space-between">
                <div>
                  <h3>{buddy.username}</h3>
                  <p>{buddy.shortDescription}</p>
                </div>
                <div className="flex">
                  <p>
                    <Icon icon="clarity:map-marker-line" /> {buddy.country}
                  </p>
                  <div>
                    <Icon icon="clarity:language-solid" />{' '}
                    {buddy.languages.map((language, index) => (
                      <span key={index}>{language} </span>
                    ))}
                  </div>
                </div>
              </div>
              <br></br>
              <p>{buddy.longDescription}</p>
              <br></br>
              <h4>Is learning or wants to learn:</h4>
              <div className="tech-span-box-left">
                {buddy.learning.map((item, index) => (
                  <span className={`tech-span tech-span---${item}`} key={index}>
                    {item}
                  </span>
                ))}
              </div>

              <br></br>
              <h4>Skills:</h4>
              <ul>
                {buddy.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <br></br>
              {(buddy.verifiedTechSkills.length > 0 ||
                buddy.verifiedTopics.length > 0) && (
                <h3>CODEYFUL EXPERIENCE</h3>
              )}
              <br></br>
              {buddy.verifiedTechSkills.length > 0 && (
                <div>
                  <h4>Verified tech skills</h4>
                  {buddy.verifiedTechSkills.map((item) => (
                    <div key={item._id}>
                      <label>{item.main}</label>
                      <div>
                        {item.sub.map((subitem) => (
                          <span key={subitem}>{subitem}, </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <br></br>
              {buddy.verifiedTopics.length > 0 && (
                <div>
                  <h4>Verified topics</h4>
                  <div>
                    {buddy.verifiedTopics.map((item) => (
                      <span key={item._id}>{item.label}, </span>
                    ))}
                  </div>
                </div>
              )}
              <br></br>
              {(buddy.activeGroups.length > 0 ||
                buddy.activeAssignments.length > 0) && (
                <Fragment>
                  <h3>CURRENT ACTIVITY</h3>
                  <br></br>
                </Fragment>
              )}
              {buddy.activeGroups.length > 0 && (
                <Fragment>
                  <h4>current groups</h4>
                  <div className="flex flex-justify-flex-start">
                    {currentGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        id={group.id}
                        name={group.name}
                        description={group.description}
                        techStack={group.learning}
                        nBuddies={group.nBuddies}
                        buddies={group.buddies}
                        proposedProject={group.proposedProject}
                      />
                    ))}
                  </div>
                  <br></br>
                </Fragment>
              )}
              {buddy.activeAssignments.length > 0 && (
                <Fragment>
                  <h4>current assignments</h4>
                  <div className="flex flex-justify-flex-start">
                    {currentAssignments.map((assignement) => (
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
                    ))}
                  </div>
                  <br></br>
                </Fragment>
              )}
              <br></br>
              {(buddy.pastGroups.length > 0 ||
                buddy.pastAssignments.length > 0) && (
                <Fragment>
                  <h3>PAST ACTIVITY</h3>
                  <br></br>
                </Fragment>
              )}
              {buddy.pastGroups.length > 0 && (
                <Fragment>
                  <h4>past groups</h4>
                  <div className="flex flex-justify-flex-start">
                    {pastGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        id={group.id}
                        name={group.name}
                        description={group.description}
                        techStack={group.learning}
                        nBuddies={group.nBuddies}
                        buddies={group.buddies}
                        proposedProject={group.proposedProject}
                      />
                    ))}
                  </div>
                  <br></br>
                </Fragment>
              )}
              {buddy.pastAssignments.length > 0 && (
                <Fragment>
                  <h4>past assignments</h4>
                  <div className="flex flex-justify-flex-start">
                    {pastAssignments.map((assignement) => (
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
                    ))}
                  </div>
                  <br></br>
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default BuddyPage;
