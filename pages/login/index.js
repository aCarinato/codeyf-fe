import { Fragment, useRef, useState } from 'react';
// own component
import MyForm from '../../components/UI/MyForm';
// libraries
import axios from 'axios';
import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();

  const [loginMode, setLoginMode] = useState(true);

  const loginFormFields = [
    {
      type: 'input',
      label: 'email',
      id: 'email',
      inputType: 'email',
      // ref: passwordInputRef,
      // defaultValue:
      //   'Descriptive name like "Learning <program>", "Beginner <program>", etc.',
      //   placeholder: 'user@email.com',
    },
    {
      type: 'input',
      label: 'password',
      id: 'password',
      inputType: 'password',
      // ref: passwordInputRef,
      // defaultValue:
      //   'Descriptive name like "Learning <program>", "Beginner <program>", etc.',
      //   placeholder: 'user@email.com',
    },
  ];

  // SIGNUP
  // const [showForm, setShowForm] = useState(true);
  // const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signupFormFields = [
    {
      type: 'input',
      label: 'username',
      id: 'username',
      inputType: 'text',
      ref: usernameInputRef,
    },
    {
      type: 'input',
      label: 'email',
      id: 'email',
      inputType: 'email',
      ref: emailInputRef,
    },
    {
      type: 'input',
      label: 'password',
      id: 'password',
      inputType: 'password',
      ref: passwordInputRef,
    },
    {
      type: 'input',
      label: 'confirm password',
      id: 'confirm-password',
      inputType: 'password',
      ref: confirmPasswordInputRef,
    },
  ];

  const signup = async (e) => {
    e.preventDefault();

    setError(null);
    // setShowSuccess(false);

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const signupUser = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/signup`,
        signupUser
      );

      // console.log(res);

      if (res.data.error) {
        // setShowError(true);
        // setError(res.data.error);
        console.log(res.data.error);
        setError(res.data.error);
      }

      console.log(res);

      if (res.data.success) {
        router.push('/login/confirmation-email');
        // setShowForm(false);
        // setShowSuccess(true);
        // login()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {loginMode ? (
        <MyForm
          formFields={loginFormFields}
          labelCTA="login"
          formSubmit={() => {}}
          error=""
        />
      ) : (
        <MyForm
          formFields={signupFormFields}
          labelCTA="signup"
          formSubmit={(e) => signup(e)}
          error=""
        />
      )}

      {error && <div className="center-text submit-error-msg">{error}</div>}

      <Fragment>
        {loginMode ? (
          <div className="center-text">
            <br></br>
            <p>
              Do not have an account?{' '}
              <span
                className="link-text"
                onClick={() => setLoginMode((prevState) => !prevState)}
              >
                Create account
              </span>
            </p>
          </div>
        ) : (
          <div className="center-text">
            <br></br>
            <p>
              Already have an account?{' '}
              <span
                className="link-text"
                onClick={() => setLoginMode((prevState) => !prevState)}
              >
                Login to your account
              </span>
            </p>
          </div>
        )}
      </Fragment>

      {/* {showSuccess && (
        <div>
          Success! To activate your account check your email and follow the
          instructions there provided.{' '}
        </div>
      )} */}
    </Fragment>
  );
}

export default LoginPage;
