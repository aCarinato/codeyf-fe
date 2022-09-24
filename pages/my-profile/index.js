// own components
import UserRoute from '../../components/routes/UserRoute';
import BtnCTA from '../../components/UI/BtnCTA';
// context
import { useMainContext } from '../../context/Context';

function MyProfile() {
  const { userLogout } = useMainContext();

  return (
    <UserRoute>
      <div>
        <h2>MyProfile</h2>
        <br></br>
        <div>
          <BtnCTA
            classname="btn-dark"
            label="Logout"
            onCLickAction={() => userLogout()}
          />
        </div>
      </div>
    </UserRoute>
  );
}

export default MyProfile;
