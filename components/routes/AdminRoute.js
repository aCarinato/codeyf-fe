import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SpinningLoader from '../UI/SpinningLoader';
import { useMainContext } from '../../context/Context';

function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  // const { locale } = router;
  const { authState } = useMainContext();

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/admin/current-admin`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(data);
      if (data.ok) {
        setOk(true);
      }
    } catch (err) {
      console.log(err);
      //   router.push('/login');
    }
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) getCurrentUser();
  }, [authState && authState.token]);

  // useEffect(() => {
  //   if (authState && authState.token) {
  //     getCurrentUser();
  //   }
  // }, [authState && authState.token]);

  process.browser &&
    authState === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? <SpinningLoader /> : <>{children}</>;
}

export default AdminRoute;
