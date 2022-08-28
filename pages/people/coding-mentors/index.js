import { people } from '../../../data/people';
// own components
import MentorCard from '../../../components/people/MentorCard';
import MentorFilter from '../../../components/people/MentorFilter';
// react
import { Fragment, useEffect, useState } from 'react';

function CodingMentorsScreen() {
  const mentors = people.filter((person) => person.isMentor);

  const [filteredMentors, setFilteredMentors] = useState([]);
  useEffect(() => {
    // setPeople(people);
    setFilteredMentors(mentors);
  }, []);

  return (
    // <div className="grid grid---4cols">
    <Fragment>
      <div className="grid grid---2cols-15-85">
        <div>
          <MentorFilter
            buddies={mentors}
            setFilteredBuddies={setFilteredMentors}
          />
        </div>
        <div className="flex">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              username={mentor.username}
              description={mentor.shortDescription}
              country={mentor.country}
              teaching={mentor.teaching}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default CodingMentorsScreen;
