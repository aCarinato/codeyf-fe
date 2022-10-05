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

function MentorProfilePage() {
  const router = useRouter();
  const { query } = router;
  const username = query.username;

  const [mentor, setMentor] = useState(null);
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
        `${process.env.NEXT_PUBLIC_API}/people/mentor/${username}`
      );
      setMentor(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrentGroups = () => {
    if (
      mentor !== null &&
      mentor !== undefined &&
      mentor.activeGroups &&
      mentor.activeGroups.length > 0
    ) {
      const mentopringGroups = mentor.activeGroups.filter(
        (group) => group.mentoring === true
      );

      const selectedCurrentGroups = groups.filter((group) =>
        mentopringGroups.map((item) => item._id).includes(group.id)
      );
      setCurrentGroups(selectedCurrentGroups);
    }
  };

  const fetchPastGroups = () => {
    if (
      mentor !== null &&
      mentor !== undefined &&
      mentor.pastGroups &&
      mentor.pastGroups.length > 0
    ) {
      const buddyingGroups = mentor.pastGroups.filter(
        (group) => group.buddying === true
      );

      const selectedPastGroups = groups.filter((group) =>
        buddyingGroups.map((item) => item._id).includes(group.id)
      );
      setPastGroups(selectedPastGroups);
    }
  };

  useEffect(() => {
    setLoading(true);
    // const filteredMentor = people.filter((person) => {
    //   return person.username === username && person.isMentor === true;
    // });

    fetchUser();
    // setMentor(filteredMentor[0]);
    fetchCurrentGroups();
    fetchPastGroups();
    setLoading(false);
  }, [mentor, username]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {mentor && mentor.username && (
            <Fragment>
              <div className="flex flex-justify-space-between">
                <div>
                  <h3>{mentor.username}</h3>
                  <p>{mentor.shortDescription}</p>
                </div>
                <div className="flex">
                  <p>
                    <Icon icon="clarity:map-marker-line" /> {mentor.country}
                  </p>
                  <div>
                    <Icon icon="clarity:language-solid" />{' '}
                    {mentor.languages.map((language) => (
                      <span key={language._id}>{language.code} </span>
                    ))}
                  </div>
                </div>
              </div>
              <br></br>
              <p>{mentor.longDescription}</p>
              <br></br>
              <h4>Is teaching:</h4>
              <div className="tech-span-box-left">
                {mentor.teaching.map((item) => (
                  <span
                    className={`tech-span tech-span---${item}`}
                    key={item._id}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              <br></br>
              <h4>Skills:</h4>
              <ul>
                {mentor.skillsLevel.map((skill) => (
                  <li key={skill._id}>{skill.label}</li>
                ))}
              </ul>
              <br></br>
              <br></br>
              {((mentor.activeGroups && mentor.activeGroups.length > 0) ||
                (mentor.activeAssignments &&
                  mentor.activeAssignments.length > 0)) && (
                <Fragment>
                  <h3>CURRENT ACTIVITY</h3>
                  <br></br>
                </Fragment>
              )}
              {mentor.activeGroups && mentor.activeGroups.length > 0 && (
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
              <br></br>
              {((mentor.pastGroups && mentor.pastGroups.length > 0) ||
                (mentor.pastAssignments &&
                  mentor.pastAssignments.length > 0)) && (
                <Fragment>
                  <h3>PAST ACTIVITY</h3>
                  <br></br>
                </Fragment>
              )}
              {mentor.pastGroups && mentor.pastGroups.length > 0 && (
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
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default MentorProfilePage;
