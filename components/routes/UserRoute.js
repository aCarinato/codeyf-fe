// react / next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// packages
import axios from 'axios';
// own components
import SpinningLoader from '../UI/SpinningLoader';
// context
import { useMainContext } from '../../context/Context';

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  // const { locale } = router;
  const { authState, setCurrentUser } = useMainContext();

  useEffect(() => {
    // let cancel = false;

    const getCurrentUser = async () => {
      try {
        console.log('Executing getCurrentUser()');
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        if (data.ok) {
          setOk(true);
          setCurrentUser(data.user);
        }
      } catch (err) {
        //   router.push('/login');
        console.log(err);
      }
    };

    if (authState && authState.token.length > 0) getCurrentUser();

    // REDIRECT USER IF ALREADY LOGGED IN
    if (authState && authState.token.length === 0) router.push('/login');
    // return () => {
    //   cancel = true;
    // };
  }, [authState && authState.token]);

  //   process.browser &&
  //     authState === null &&
  //     setTimeout(() => {
  //       getCurrentUser();
  //     }, 1000);

  return !ok ? <SpinningLoader /> : <>{children}</>;
};

export default UserRoute;
