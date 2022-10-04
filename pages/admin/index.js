import Link from 'next/link';
// own components
import AdminRoute from '../../components/routes/AdminRoute';
// context
// import { useMainContext } from '../../context/Context';

function AdminPage() {
  return (
    <AdminRoute>
      <Link href="admin/create-user">
        <p className="link-text">create new user</p>
      </Link>
      <br></br>
      <Link href="admin/mentor-requests">
        <p className="link-text">mentor requests</p>
      </Link>
    </AdminRoute>
  );
}

export default AdminPage;
