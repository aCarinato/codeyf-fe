import { Fragment, useState } from 'react';
import MyForm from '../../components/UI/MyForm';

function LoginPage() {
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
  const signupFormFields = [
    {
      type: 'input',
      label: 'username',
      id: 'username',
      inputType: 'text',
    },
    {
      type: 'input',
      label: 'email',
      id: 'email',
      inputType: 'email',
    },
    {
      type: 'input',
      label: 'password',
      id: 'password',
      inputType: 'password',
    },
  ];

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
          formSubmit={() => {}}
          error=""
        />
      )}

      {loginMode ? (
        <div>
          {' '}
          Do not have an account?{' '}
          <span onClick={() => setLoginMode((prevState) => !prevState)}>
            Create account
          </span>
        </div>
      ) : (
        <div>
          {' '}
          Already have an account?{' '}
          <span onClick={() => setLoginMode((prevState) => !prevState)}>
            Login to your account
          </span>
        </div>
      )}
    </Fragment>
  );
}

export default LoginPage;
