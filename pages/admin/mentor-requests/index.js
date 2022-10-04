// packages
import axios from 'axios';
// react / next
import { useEffect, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';
// own components
import AdminRoute from '../../../components/routes/AdminRoute';
import MentorRequestCard from '../../../components/admin/MentorRequestCard';

function MentorRequestsPage() {
  const { authState } = useMainContext();

  const [requests, setRequests] = useState([]);

  const fetchPendingMentors = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin/mentor-approval`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      if (data.success) setRequests(data.users);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) fetchPendingMentors();
  }, [authState && authState.token]);

  const approveRequest = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/admin/approve-mentor-req`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      console.log(res);

      fetchPendingMentors();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/admin/reject-mentor-req`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      console.log(res);

      fetchPendingMentors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <h3>Mentor Requests waiting for approval</h3>
      <br></br>
      <div className="flex">
        {requests.map((request) => (
          <MentorRequestCard
            key={request._id}
            id={request._id}
            username={request.username}
            companyJob={request.companyJob}
            yearsExperience={request.yearsExperience}
            linkedin={request.linkedin}
            teaching={request.teaching}
            approveRequest={approveRequest}
            rejectRequest={rejectRequest}
          />
        ))}
      </div>
    </AdminRoute>
  );
}

export default MentorRequestsPage;
