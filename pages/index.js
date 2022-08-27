import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { people } from '../data/people';
import { groups } from '../data/groups';
import MySlider from '../components/UI/MySlider';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../context/Context';

function HomePage() {
  const { peoples, setPeople } = useMainContext();

  useEffect(() => {
    setPeople(people);
    // console.log(peoples);
  }, []);

  return (
    <Fragment>
      <h1>The Coding Community</h1>
      <h4>Find projects and people to code with, mentor and learn from</h4>
      {/* <div>{JSON.stringify(peoples)}</div> */}
      <br></br>
      <br></br>
      <h3>
        Coding buddies{' '}
        <Link href={'/people/coding-buddies'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={people} type="buddy" />
      </div>
      <br></br>
      <h3>
        Mentors{' '}
        <Link href={'/people/coding-mentors'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={people} type="mentor" />
      </div>
      <br></br>
      <h3>
        Groups{' '}
        <Link href={'/coding-groups'}>
          <a className="light-link">
            <Icon icon="akar-icons:arrow-right" /> View all
          </a>
        </Link>
      </h3>
      <div className="overflower">
        <MySlider array={groups} type="group" />
      </div>
    </Fragment>
  );
}

export default HomePage;
