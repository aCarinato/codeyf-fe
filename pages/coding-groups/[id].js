import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { groups } from '../../data/groups';
import { people } from '../../data/people';

import MentorCard from '../../components/people/MentorCard';
import BuddyCard from '../../components/people/BuddyCard';
import BtnCTA from '../../components/UI/BtnCTA';

function GroupIDPage() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const [group, setGroup] = useState([]);
  const [organiser, setOrganiser] = useState('');
  const [participants, setParticipants] = useState([]);
  const [mentors, setMentors] = useState([]);

  const fetchGroup = () => {
    const selectedGroup = groups.filter((group) => group.id === id)[0];
    setGroup(selectedGroup);
  };

  const fetchPeople = () => {
    if (group && group !== []) {
      //   console.log(group);
      const selectedOrganiser = people.filter(
        (person) => person.id === group.organiser
      )[0];

      setOrganiser(selectedOrganiser);

      if (group.buddies && group.buddies.length > 0) {
        const selectedParticipants = group.buddies.map(
          (buddy) => people.filter((person) => person.id === buddy)[0]
        );
        setParticipants(selectedParticipants);
      }

      //   console.log(group.mento)
      if (group.mentorRequired) {
        if (group.mentors && group.mentors.length > 0) {
          const selectedMentors = group.mentors.map(
            (mentor) => people.filter((person) => person.id === mentor)[0]
          );
          setMentors(selectedMentors);
        }
      }

      //   const selectedParticipants = people.filter(person => person.id === group.buddies)
    }
  };

  let availabilityStatus;
  if (group && group !== [] && participants) {
    const availableSpots = group.nBuddies - participants.length - 1;

    if (availableSpots > 0) {
      availabilityStatus = (
        <div>
          <p>Still {availableSpots} spots available!</p>
          <br></br>
          <BtnCTA label="Join the group" />
        </div>
      );
      //   console.log(availabilityStatus);
    } else {
      availabilityStatus = <p>Group filled</p>;
    }
  }

  useEffect(() => {
    fetchGroup();
    fetchPeople();
  }, [id, group]);

  return group && group.name ? (
    <Fragment>
      <div>Group {group.name}</div>
      <br></br>
      <div>Description: {group.description}</div>
      <br></br>
      <p>Number of spots: {group.nBuddies}</p>
      <br></br>
      <div>Organiser:</div>
      {organiser && organiser.username && (
        <div className="grid grid---4cols">
          <BuddyCard
            username={organiser.username}
            description={organiser.shortDescription}
            country={organiser.country}
            learning={organiser.learning}
          />
        </div>
      )}
      <br></br>
      {participants && participants.length > 0 && (
        <div>
          <p>Participants</p>
          <br></br>
          <div className="grid grid---4cols">
            {' '}
            {participants.map((participant, index) => (
              <BuddyCard
                key={index}
                username={participant.username}
                description={participant.shortDescription}
                country={participant.country}
                learning={participant.learning}
              />
            ))}
          </div>
          <br></br>
          {availabilityStatus}
        </div>
      )}
      <br></br>
      {group.mentorRequired && (
        <div>
          <p>Mentors</p>
          {mentors && mentors.length > 0 ? (
            <div className="grid grid---4cols">
              {mentors.map((mentor, index) => (
                <MentorCard
                  key={index}
                  username={mentor.username}
                  description={mentor.shortDescription}
                  country={mentor.country}
                  teaching={mentor.teaching}
                />
              ))}
            </div>
          ) : (
            <div>
              <p>1 spot available as a mentor!</p>
              <br></br>
              <BtnCTA label="Mentor the group" />
            </div>
          )}
        </div>
      )}
    </Fragment>
  ) : (
    <div>Loading...</div>
  );
}

export default GroupIDPage;
