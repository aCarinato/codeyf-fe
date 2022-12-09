import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
// context
import { useMainContext } from '../context/Context';

function TeamTypePage() {
  const { currentUser } = useMainContext();

  const router = useRouter();

  const [buddyOrMentor, setBuddyOrMentor] = useState(null);
  const [individualOrTeam, setIndividualOrTeam] = useState(null);
  const [existingOrNewTeam, setExistingOrNewTeam] = useState(null);
  const [assignmentType, setAssignmentType] = useState(null);

  return (
    <div>
      <h3>Do you want to work on a project as a student or mentor?</h3>
      {/* <p>Even as a mentor you can still participate to the project</p> */}
      <br></br>
      <div className="flex">
        <div className="pointer" onClick={() => setBuddyOrMentor('buddy')}>
          <p className={buddyOrMentor === 'buddy' ? 'bold' : ''}>Student</p>
        </div>
        <div className="pointer" onClick={() => setBuddyOrMentor('mentor')}>
          <p className={buddyOrMentor === 'mentor' ? 'bold' : ''}>Mentor</p>
        </div>
      </div>
      <br></br>
      {buddyOrMentor && (
        <>
          {' '}
          {buddyOrMentor === 'buddy' ? (
            <h3>Do you want to work on an individual project or in a team?</h3>
          ) : (
            <h3>Do you want to mentor a single student or a team?</h3>
          )}
          <br></br>
          <div className="flex">
            <div
              className="pointer"
              onClick={() => {
                // setIndividualOrTeam('individual');
                router.push('/projects/individual/');
              }}
            >
              <p className={individualOrTeam === 'individual' ? 'bold' : ''}>
                Individual
              </p>
            </div>
            <div
              className="pointer"
              onClick={() => setIndividualOrTeam('team')}
            >
              <p className={individualOrTeam === 'team' ? 'bold' : ''}>Team</p>
            </div>
          </div>
        </>
      )}
      {individualOrTeam === 'individual' && buddyOrMentor === 'mentor' && (
        <div>FINISH - Go on select buddies that are looking for a mentor</div>
      )}
      {buddyOrMentor === 'buddy' && individualOrTeam === 'individual' && (
        <>
          <br></br>
          <h3>Do you want to pick an existing assignment for your project?</h3>
        </>
      )}
      {/* {buddyOrMentor === 'buddy' && individualOrTeam === 'team'  } */}
      {individualOrTeam === 'team' && (
        <>
          <br></br>
          <h3>Do you want to work with an existing team?</h3>
          <br></br>
          <div className="flex">
            <div
              className="pointer"
              onClick={() => {
                setExistingOrNewTeam('existing');
                router.push('/projects/coding-groups/');
              }}
            >
              Yes, check out teams
            </div>
            <div
              className="pointer"
              onClick={() => {
                setExistingOrNewTeam('new');
                router.push('/projects/coding-groups/new');
              }}
            >
              No thanks, I will make a new team
            </div>
          </div>
        </>
      )}
      {/* {individualOrTeam === 'individual' && buddyOrMentor === 'buddy' && (
        <>
          <br></br>
          <h3>Do you want to work with an existing team?</h3>
          <br></br>
          <div className="flex">
            <div
              className="pointer"
              onClick={() => {
                setExistingOrNewTeam('existing');
                router.push('/projects/coding-groups/');
              }}
            >
              Yes, check out teams
            </div>
            <div
              className="pointer"
              onClick={() => {
                setExistingOrNewTeam('new');
                router.push('/projects/coding-groups/new');
              }}
            >
              No thanks, I will make a new team
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default TeamTypePage;
