// react / next
import Link from 'next/link';
// own components
// import UserRoute from '../../../../../components/routes/UserRoute';

function IndividualProject() {
  return (
    <>
      <h2>Create new individual project - Mentor seeks mentee</h2>
      <h3>Do you want to pick an assignment?</h3>
      <br></br>
      <div className="flex">
        <div>
          <Link href="/projects/individual/mentors/new/select-assignment">
            Yes, check out assignments
          </Link>
        </div>
        <div>
          <Link href="/projects/individual/mentors/new/self">No thanks</Link>
        </div>
      </div>
    </>
  );
}

export default IndividualProject;
