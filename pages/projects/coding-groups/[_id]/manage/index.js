// next / react
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// libs
import axios from 'axios';
// components
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
import Link from 'next/link';
import UserRoute from '../../../../../components/routes/UserRoute';

function ManageGroupPage() {
  const router = useRouter();
  const { query } = router;
  const groupId = query._id;

  //   console.log(query);

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/${groupId}`
      );
      //   console.log(res);
      setGroup(res.data.group);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (groupId !== undefined && groupId.length > 0) {
      fetchGroup();
    }
  }, [groupId]);

  return (
    <UserRoute>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div>
          <h2>Manage Group - {group.name}</h2>
          <br></br>
          {!group.buddiesFilled ? (
            <p>
              <Link
                href={`/projects/coding-groups/${groupId}/manage/add-buddy`}
              >
                Add buddy
              </Link>
            </p>
          ) : (
            <p>Buddy positions filled</p>
          )}
          <br></br>
          {!group.mentorsFilled ? (
            <p>
              <Link
                href={`/projects/coding-groups/${groupId}/manage/add-mentor`}
              >
                Add mentor
              </Link>
            </p>
          ) : (
            <p>Mentor position filled</p>
          )}
          <br></br>
          <p>Join the group as a buddy</p>
          <br></br>
          <p>Join the group as a mentor</p>
          {/* <p>
            <Link
              href={`/projects/coding-groups/${groupId}/manage/pending-join-reqs`}
            >
              Pending join requests
            </Link>
          </p> */}
        </div>
      )}
    </UserRoute>
  );
}

export default ManageGroupPage;
