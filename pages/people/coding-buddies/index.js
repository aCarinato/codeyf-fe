import { people } from '../../../data/people';
// own components
import BuddyCard from '../../../components/people/BuddyCard';
import BuddyFilter from '../../../components/people/BuddyFilter';
import { Fragment, useEffect, useState } from 'react';
// context
// import { useMainContext } from '../../context/Context';

function CodingBuddiesScreen() {
  // const { peoples } = useMainContext();
  const buddies = people.filter((buddy) => buddy.isBuddy);
  const [filteredBuddies, setFilteredBuddies] = useState([]);

  useEffect(() => {
    setFilteredBuddies(buddies);
  }, []);

  return (
    <Fragment>
      {/* <div>{JSON.stringify(filteredBuddies)}</div> */}
      <div className="grid grid---2cols-30-70">
        <div>
          <BuddyFilter
            buddies={buddies}
            setFilteredBuddies={setFilteredBuddies}
          />
        </div>

        <div className="flex">
          {filteredBuddies.map((buddy) => (
            <BuddyCard
              key={buddy.id}
              username={buddy.username}
              description={buddy.shortDescription}
              country={buddy.country}
              learning={buddy.learning}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default CodingBuddiesScreen;
