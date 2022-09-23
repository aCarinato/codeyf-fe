import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
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
        // router.push('/login/activate/confirm');
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
      {state.error !== '' ? (
        <div>
          <p className="submit-error-msg">{state.error}</p>
          <br></br>
          <p className="link-text">
            <Link href="/login">Go to registration page</Link>
          </p>
        </div>
      ) : (
        <Fragment>
          {state.success !== '' ? (
            <div>
              <p className="submit-success-msg">
                Congratulations, you successfully activated your account!
              </p>
              <br></br>
              <p className="submit-success-msg">
                Please login and complete your profile to enable all features.
              </p>
              <br></br>
              <Link href="/login">
                <p className="link-text">Go to profile</p>
              </Link>{' '}
            </div>
          ) : (
            <Fragment>
              <h2>Hi {state.username}, activate your account!</h2>
              <br></br>
              <BtnCTA
                classname="btn-dark"
                label={state.buttonText}
                onCLickAction={submit}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default ActivateAccount;
