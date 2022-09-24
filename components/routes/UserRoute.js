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
  const { authState } = useMainContext();

  useEffect(() => {
    // let cancel = false;
    if (authState && authState.token.length > 0) getCurrentUser();

    // REDIRECT USER IF ALREADY LOGGED IN
    if (authState && authState.token.length === 0) router.push('/login');
    // return () => {
    //   cancel = true;
    // };
  }, [authState && authState.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (data.ok) setOk(true);
    } catch (err) {
      //   router.push('/login');
      console.log(err);
    }
  };

  //   process.browser &&
  //     authState === null &&
  //     setTimeout(() => {
  //       getCurrentUser();
  //     }, 1000);

  return !ok ? <SpinningLoader /> : <>{children}</>;
};

export default UserRoute;
