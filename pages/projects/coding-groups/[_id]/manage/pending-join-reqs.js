import axios from 'axios';
// next / react
import { useEffect } from 'react';
// context
import { useMainContext } from '../../../../../context/Context';

function PendingJoinReqsPage() {
  const { authState } = useMainContext();

  const fetchPendingJoinReqs = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups//group/pending-join-reqs`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token && authState.token.length > 0) {
      fetchPendingJoinReqs();
    }
  }, [authState]);

  return <div>Pending Join Reqs Page</div>;
}

export default PendingJoinReqsPage;
