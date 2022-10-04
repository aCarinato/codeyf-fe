// react next
import { useRouter } from 'next/router';
import Link from 'next/link';
// context
import { useMainContext } from '../../../context/Context';
// own components
import UserRoute from '../../../components/routes/UserRoute';
import BtnCTA from '../../../components/UI/BtnCTA';
// packages
import { Icon } from '@iconify/react';
import axios from 'axios';

function SettingsPage() {
  const { authState, userLogout } = useMainContext();

  const router = useRouter();

  const deleteHandler = async () => {
    const answer = window.confirm(
      'Are you sure you want to delete your account?'
    );

    if (!answer) return;
    // logout()

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/user/delete-profile`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(res.data);
      userLogout();
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="flex flex-justify-space-between">
        <h3>Account settings</h3>
        <Link href="/my-profile">
          <p className="link-text">
            <Icon icon="akar-icons:arrow-back" /> back to my account
          </p>
        </Link>
      </div>
      <br></br>
      <div className="flex flex-justify-space-between">
        <Link href="/my-profile/settings/edit-profile">
          <p className="link-text">
            edit profile <Icon icon="clarity:note-edit-line" />
          </p>
        </Link>
      </div>
      <br></br>
      <div className="flex flex-justify-space-between">
        <p>logout</p>
        <div>
          <BtnCTA
            classname="btn-light"
            label="Logout"
            onCLickAction={() => userLogout()}
          />
        </div>
      </div>
      <br></br>
      <div className="flex flex-justify-space-between">
        <p>delete my account</p>
        <div>
          <BtnCTA
            classname="btn-light"
            label="Delete"
            onCLickAction={deleteHandler}
          />
        </div>
      </div>
    </UserRoute>
  );
}

export default SettingsPage;
