import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// own component
import MyForm from '../../components/UI/MyForm';
// libraries
import axios from 'axios';
import parse from 'html-react-parser';
// context
import { useMainContext } from '../../context/Context';

function LoginPage() {
  const { authState, userLogin } = useMainContext();

  const router = useRouter();

  const [loginMode, setLoginMode] = useState(true);

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const [submittedUsernameIsValid, setSubmittedUsernameIsValid] =
    useState(true);
  const [submittedEmailIsValid, setSubmittedEmailIsValid] = useState(true);

  const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [enteredConfirmPasswordTouched, setEnteredConfirmPasswordTouched] =
    useState(false);

  // CHECKING INPUT VALIDITY
  // username
  const enteredUsernameIsValid =
    enteredUsername.trim() !== '' && submittedUsernameIsValid;
  const usernameIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched;

  // email
  const enteredEmailIsValid =
    enteredEmail.trim() !== '' &&
    enteredEmail.includes('@') &&
    submittedEmailIsValid;
  const emailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // password
  const enteredPasswordIsValid =
    enteredPassword.trim() !== '' && enteredPassword.length > 7;
  const passwordIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;
  // enteredConfirmPasswordTouched;

  // confirm password
  const enteredConfirmPasswordIsValid =
    enteredConfirmPassword === enteredPassword;
  const confirmPasswordIsInvalid =
    !enteredConfirmPasswordIsValid && enteredConfirmPasswordTouched;

  // submit error
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ---------- //
  //    LOGIN   //
  // ---------- //
  const loginFormFields = [
    {
      type: 'input',
      label: 'email',
      id: 'email',
      inputType: 'email',
      value: enteredEmail,
      inputIsInvalid: emailIsInvalid,
      inputErrorMsg: 'Please enter a valid address',
      onChange: (e) => {
        setEnteredEmail(e.target.value);
        setError(null);
      },
      onBlur: (e) => setEnteredEmailTouched(true),
    },
    {
      type: 'input',
      label: 'password',
      id: 'password',
      inputType: 'password',
      value: enteredPassword,
      inputIsInvalid: passwordIsInvalid,
      inputErrorMsg: 'Longer than 7 characters',
      onChange: (e) => {
        setEnteredPassword(e.target.value);
        setError(null);
      },
      onBlur: (e) => setEnteredPasswordTouched(true),
      // ref: passwordInputRef,
      // defaultValue:
      //   'Descriptive name like "Learning <program>", "Beginner <program>", etc.',
      //   placeholder: 'user@email.com',
    },
  ];

  // FORM VALIDITY
  let loginFormIsValid;
  if (enteredEmailIsValid && enteredPasswordIsValid) loginFormIsValid = true;

  const loginHandler = async (e) => {
    e.preventDefault();
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    setSuccess(null);
    setError(null);

    if (!loginFormIsValid) {
      return;
    } else {
      const loginUser = {
        email: enteredEmail,
        password: enteredPassword,
      };

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/login`,
          loginUser
        );

        // console.log(res);

        if (res.data.error) {
          // console.log(res.data.error);
          setError(res.data.error);
        }

        if (res.data.success) {
          userLogin(
            res.data.loginUser.username,
            res.data.loginUser.email,
            res.data.loginUser.token,
            res.data.loginUser.isAdmin
          );

          setEnteredEmail('');
          setEnteredPassword('');
          setEnteredEmailTouched(false);
          setEnteredPasswordTouched(false);
          // console.log('SUCCESFULLY LOGGED IN');
          // router.push('/login/confirmation-email');

          // setShowForm(false);
          // setShowSuccess(true);
          // login()
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ---------- //
  //   SIGNUP   //
  // ---------- //

  // const usernameErrorMsg = setSubmittedUsernameIsValid ? '' : ''

  const signupFormFields = [
    {
      type: 'input',
      label: 'username',
      id: 'username',
      inputType: 'text',
      value: enteredUsername,
      inputIsInvalid: usernameIsInvalid,
      inputErrorMsg: submittedUsernameIsValid
        ? 'Username must be at least 1 character'
        : error,
      onChange: (e) => {
        setEnteredUsername(e.target.value);
        setSubmittedUsernameIsValid(true);
        setError(null);
      },
      onBlur: (e) => {
        setEnteredUsernameTouched(true);
      },
      // ref: usernameInputRef,
    },
    {
      type: 'input',
      label: 'email',
      id: 'email',
      inputType: 'email',
      value: enteredEmail,
      inputIsInvalid: emailIsInvalid,
      inputErrorMsg: submittedEmailIsValid ? 'Invalid email' : error,
      onChange: (e) => {
        setEnteredEmail(e.target.value);
        setSubmittedEmailIsValid(true);
        setError(null);
      },
      onBlur: (e) => setEnteredEmailTouched(true),
      // ref: emailInputRef,
    },
    {
      type: 'input',
      label: 'password',
      id: 'password',
      inputType: 'password',
      value: enteredPassword,
      inputIsInvalid: passwordIsInvalid,
      inputErrorMsg: 'Longer than 7 characters',
      onChange: (e) => {
        setEnteredPassword(e.target.value);
        setError(null);
      },
      onBlur: (e) => setEnteredPasswordTouched(true),
      // ref: passwordInputRef,
    },
    {
      type: 'input',
      label: 'confirm password',
      id: 'confirm-password',
      inputType: 'password',
      value: enteredConfirmPassword,
      inputIsInvalid: confirmPasswordIsInvalid,
      inputErrorMsg: 'Passwords do not match',
      onChange: (e) => {
        setEnteredConfirmPassword(e.target.value);
        setError(null);
      },
      onBlur: (e) => setEnteredConfirmPasswordTouched(true),
      // ref: confirmPasswordInputRef,
    },
  ];

  // FORM VALIDITY
  let signupFormIsValid;

  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  )
    signupFormIsValid = true;

  const signupHandler = async (e) => {
    e.preventDefault();
    setEnteredUsernameTouched(true);
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);
    setEnteredConfirmPasswordTouched(true);

    setSubmittedUsernameIsValid(true);
    setSubmittedEmailIsValid(true);

    setSuccess(null);
    setError(null);
    // setShowSuccess(false);

    // const enteredUsername = usernameInputRef.current.value;
    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;

    if (!signupFormIsValid) {
      return;
    } else {
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
          // console.log(res.data.error);
          if (res.data.errorType === 'username')
            setSubmittedUsernameIsValid(false);

          if (res.data.errorType === 'email') setSubmittedEmailIsValid(false);

          setError(res.data.error);
        }

        // console.log(res);

        if (res.data.success) {
          setSuccess(res.data.message);

          setEnteredUsername('');
          setEnteredEmail('');
          setEnteredPassword('');
          setEnteredConfirmPassword('');
          setEnteredUsernameTouched(false);
          setEnteredEmailTouched(false);
          setEnteredPasswordTouched(false);
          setEnteredConfirmPasswordTouched(false);

          setSubmittedUsernameIsValid(true);
          setSubmittedEmailIsValid(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // REDIRECT USER IF ALREADY LOGGED IN
  if (authState && authState.token.length > 0) router.push('/my-profile');

  return (
    <Fragment>
      {loginMode ? (
        <MyForm
          formFields={loginFormFields}
          labelCTA="login"
          formSubmit={(e) => loginHandler(e)}
          error=""
        />
      ) : (
        <MyForm
          formFields={signupFormFields}
          labelCTA="sign me up"
          formSubmit={(e) => signupHandler(e)}
          error=""
        />
      )}

      {error && submittedUsernameIsValid && submittedEmailIsValid && (
        <div className="center-text submit-error-msg">{error}</div>
      )}

      <Fragment>
        {loginMode ? (
          <div className="center-text">
            <br></br>
            <p>
              <span
                className="link-text"
                onClick={() => router.push('/login/password/forgot')}
              >
                Forgot password?
              </span>
            </p>
            <br></br>
            <p>
              Do not have an account?{' '}
              <span
                className="link-text"
                onClick={() => {
                  setSuccess(null);
                  setError(null);
                  setEnteredUsername('');
                  setEnteredEmail('');
                  setEnteredPassword('');
                  setEnteredConfirmPassword('');
                  setEnteredUsernameTouched(false);
                  setEnteredEmailTouched(false);
                  setEnteredPasswordTouched(false);
                  setEnteredConfirmPasswordTouched(false);
                  setLoginMode((prevState) => !prevState);
                }}
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
                onClick={() => {
                  setSuccess(null);
                  setError(null);
                  setEnteredUsername('');
                  setEnteredEmail('');
                  setEnteredPassword('');
                  setEnteredConfirmPassword('');
                  setEnteredUsernameTouched(false);
                  setEnteredEmailTouched(false);
                  setEnteredPasswordTouched(false);
                  setEnteredConfirmPasswordTouched(false);
                  setLoginMode((prevState) => !prevState);
                }}
              >
                Login to your account
              </span>
            </p>
          </div>
        )}
      </Fragment>

      {!loginMode && success && parse(success)}
      {/* {error && <p className="submit-error-msg">{error}</p>} */}

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
