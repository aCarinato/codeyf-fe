import Link from 'next/link';
// own compoents
import UserRoute from '../../../../components/routes/UserRoute';

function NewGroupPage() {
  return (
    <>
      <h2>Create new group</h2>
      <h3>Do you want to pick an assignment?</h3>
      <br></br>
      <div className="flex">
        <div>
          <Link href="/projects/coding-groups/new/select-assignment">
            Yes, check out assignments
          </Link>
        </div>
        <div>
          <Link href="/projects/coding-groups/new/self">No thanks</Link>
        </div>
      </div>
    </>
  );
}

export default NewGroupPage;
