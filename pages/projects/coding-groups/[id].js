import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { groups } from '../../../data/groups';
import { people } from '../../../data/people';

import MentorCard from '../../../components/people/MentorCard';
import BuddyCard from '../../../components/people/BuddyCard';
import BtnCTA from '../../../components/UI/BtnCTA';

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
  let availableSpots;
  if (group && group !== [] && participants) {
    availableSpots = group.nBuddies - participants.length - 1;

    if (availableSpots > 0) {
      availabilityStatus = (
        <div>
          <p className="card-group-available">
            {availableSpots} more spots available!
          </p>
          <BtnCTA classname="btn-dark" label="Join Group" />
        </div>
      );
      //   console.log(availabilityStatus);
    } else {
      availabilityStatus = (
        <p className="card-group-unavailable">Group filled</p>
      );
    }
  }

  // let mentorAvailabilityStatus
  // if (group && group.mentorRequired === 'yes' ) {
  //   if ()
  // }

  useEffect(() => {
    fetchGroup();
    fetchPeople();
  }, [id, group]);

  return group && group.name ? (
    <Fragment>
      <div className="flex flex-justify-space-between">
        <h2>{group.name}</h2>
        <div className="flex">
          {availableSpots > 0 ? (
            <BtnCTA classname="btn-dark" label="Join Group" />
          ) : (
            availabilityStatus
          )}
          {group.mentorRequired === 'yes' && mentors.length === 0 && (
            <BtnCTA classname="btn-light-big" label="Mentor Group" />
          )}
        </div>
      </div>
      <br></br>
      <div>
        <h4>Description:</h4>
        <p>{group.description}</p>
      </div>
      <br></br>
      <div>
        <h4>Number of spots:</h4>
        <p>{group.nBuddies}</p>
      </div>

      <br></br>

      <div className="grid grid---2cols-20-80">
        <div>
          <h4>Organiser:</h4>
          <br></br>
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
          {group.mentorRequired === 'yes' && (
            <div>
              <h4>Mentor</h4>
              <br></br>
              {mentors && mentors.length > 0 ? (
                <div>
                  {mentors.map((mentor, index) => (
                    <MentorCard
                      key={index}
                      username={mentor.username}
                      description={mentor.shortDescription}
                      country={mentor.country}
                      teaching={mentor.teaching}
                    />
                  ))}
                  <br></br>
                  <p className="card-group-unavailable">
                    Mentor position filled
                  </p>
                </div>
              ) : (
                <div>
                  <p className="card-group-available">
                    Mentor position available!
                  </p>
                  <br></br>
                  <BtnCTA classname="btn-light-big" label="Mentor Group" />
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {participants && participants.length > 0 && (
            <div>
              <h4>Coding buddies</h4>
              <br></br>
              <div className="flex flex-justify-flex-start">
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
                <div>{availabilityStatus}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  ) : (
    <div>Loading...</div>
  );
}

export default GroupIDPage;
