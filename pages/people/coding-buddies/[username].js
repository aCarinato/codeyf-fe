import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { people } from '../../../data/people';

function BuddyPage() {
  const router = useRouter();
  const { query } = router;
  const username = query.username;

  const [buddy, setBuddy] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filteredBuddy = people.filter((person) => {
      return person.username === username && person.isBuddy === true;
    });

    setBuddy(filteredBuddy[0]);
    setLoading(false);
  }, [username]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {buddy && buddy.username && (
            <Fragment>
              <h3>{buddy.username}</h3>
              <p>{buddy.shortDescription}</p>
              <br></br>
              <p>{buddy.longDescription}</p>
              <br></br>
              <p>{buddy.country}</p>
              <p>Languages:</p>
              <ul>
                {buddy.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
              <br></br>
              <p>Is learning or wants to learn:</p>
              <ul>
                {buddy.learning.map((learn, index) => (
                  <li key={index}>{learn}</li>
                ))}
              </ul>
              <br></br>
              <p>Skills:</p>
              <ul>
                {buddy.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default BuddyPage;
