import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// packages
import jwt from 'jsonwebtoken';
import axios from 'axios';
// own components
import BtnCTA from '../../../components/UI/BtnCTA';
import Link from 'next/link';

function ActivateAccount() {
  const router = useRouter();
  const { query } = router;
  const token = query.id;

  const [state, setState] = useState({
    username: '',
    token: '',
    buttonText: 'Activate account',
    success: '',
    error: '',
  });

  //   const { username, token, buttonText, success, error } = state;

  useEffect(() => {
    // let token = router.query.id;
    if (token) {
      const { username } = jwt.decode(token);
      setState({ ...state, username, token });
    }
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/signup/activate`,
        { token }
      );
      setState({
        ...state,
        // username: '',
        // token: '',
        buttonText: 'Activating',
        // success: res.data.message,
      });
      if (res.data.success) {
        console.log(res);
        setState({
          ...state,
          // username: '',
          // token: '',
          buttonText: 'Activated',
          success: res.data.success,
        });
        // login(
        //   res.data.newUser.username,
        //   res.data.newUser.email,
        //   res.data.newUser.token,
        //   res.data.newUser.isAdmin
        // );
        router.push('/login/activate/confirm');
      }
      //   if (res.data)
    } catch (err) {
      //   console.log(err);
      //   console.log(err.response.data.error);
      setState({
        ...state,
        // username: '',
        // token: '',
        buttonText: 'Activate account',
        error: err.response.data.error,
      });
    }
  };

  return (
    <div>
      <h1>Hi {state.username}, activate your account!</h1>
      <br></br>
      {/* {state.success && (
        <div>
          <p>
            Congratulations {state.username}, you successfully activated your
            account!
          </p>
          <p>Please login and complete the registration to enable all features.</p>
        </div>
      )} */}
      {state.error !== '' ? (
        <div>
          <p className="submit-error-msg">{state.error}</p>
          <br></br>
          <p className="link-text">
            <Link href="/login">Go to register</Link>
          </p>
        </div>
      ) : (
        <BtnCTA
          classname="btn-dark"
          label={state.buttonText}
          onCLickAction={submit}
        />
      )}

      {/* <button onClick={submit}>ACTIVATE</button> */}
    </div>
  );
}

export default ActivateAccount;
