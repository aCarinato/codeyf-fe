// react / next
import { useState } from 'react';
// packages
import axios from 'axios';
// own components
import AdminRoute from '../../../components/routes/AdminRoute';
import MyForm from '../../../components/UI/MyForm';
import BtnCTA from '../../../components/UI/BtnCTA';
// context
import { useMainContext } from '../../../context/Context';

function CreateUserPage() {
  const { authState } = useMainContext();

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [submittedUsernameIsValid, setSubmittedUsernameIsValid] =
    useState(true);
  const [submittedEmailIsValid, setSubmittedEmailIsValid] = useState(true);

  const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  // submit error
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const createUserFormFields = [
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
  ];

  // FORM VALIDITY
  let signupFormIsValid;

  if (enteredUsernameIsValid && enteredEmailIsValid && enteredPasswordIsValid)
    signupFormIsValid = true;

  const createUserHandler = async (e) => {
    e.preventDefault();

    setEnteredUsernameTouched(true);
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    setSubmittedUsernameIsValid(true);
    setSubmittedEmailIsValid(true);

    if (!signupFormIsValid) {
      return;
    } else {
      let handle = enteredUsername.replace(/ /g, '');

      const signupUser = {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        handle,
      };

      //   console.log(signupUser);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/admin/create-user`,
          signupUser,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (res.data.success) {
          setSuccess(true);
        } else {
          setError('Something went wrong');
        }
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const successMsg = (
    <div>
      <p>User created!</p>
      <br></br>
      <BtnCTA label="create new user" onCLickAction={() => setSuccess(false)} />
    </div>
  );

  return (
    <AdminRoute>
      <h3>Create New User</h3>
      {success ? (
        successMsg
      ) : (
        <div>
          <MyForm
            formFields={createUserFormFields}
            labelCTA="create new user"
            formSubmit={(e) => createUserHandler(e)}
            error=""
          />
        </div>
      )}
    </AdminRoute>
  );
}

export default CreateUserPage;
