import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import MyForm from '../../../components/UI/MyForm';
// packages
import axios from 'axios';

function ResetPasswordPage() {
  const router = useRouter();
  const { query } = router;
  const resetPasswordLink = query.id;

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [newPasswordTouched, setNewPasswordTouched] = useState(null);
  const [confirmNewPasswordTouched, setConfirmNewPasswordTouched] =
    useState(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // CHECKING VALIDITY
  // password
  const newPasswordIsValid =
    newPassword.trim() !== '' && newPassword.length > 7;
  const newPasswordIsInvalid = !newPasswordIsValid && newPasswordTouched;
  // enteredConfirmPasswordTouched;

  // confirm password
  const confirmNewPasswordIsValid =
    confirmNewPassword === newPassword && newPassword.length > 7;
  const confirmNewPasswordIsInvalid =
    !confirmNewPasswordIsValid && confirmNewPasswordTouched;

  //   console.log(resetPasswordLink);

  const resetPasswordFormFields = [
    {
      type: 'input',
      label: 'New password',
      id: 'password',
      inputType: 'password',
      value: newPassword,
      inputIsInvalid: newPasswordIsInvalid,
      inputErrorMsg: 'Longer than 7 characters',
      onChange: (e) => {
        setNewPassword(e.target.value);
        setSuccess('');
        setError('');
      },
      onBlur: () => setNewPasswordTouched(true),
    },
    {
      type: 'input',
      label: 'Confirm new password',
      id: 'confirm-password',
      inputType: 'password',
      value: confirmNewPassword,
      inputIsInvalid: confirmNewPasswordIsInvalid,
      inputErrorMsg: 'Password does not match',
      onChange: (e) => {
        setConfirmNewPassword(e.target.value);
        setSuccess('');
        setError('');
      },
      onBlur: () => setConfirmNewPasswordTouched(true),
    },
  ];

  // FORM VALIDITY
  let formIsValid;

  if (newPasswordIsValid && confirmNewPasswordIsValid) formIsValid = true;

  const submit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError('');

    if (!formIsValid) {
      return;
    } else {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/auth/reset-password`,
          { resetPasswordLink, newPassword }
        );

        // console.log(res);

        //   setEmail('');

        if (res.data.error) {
          console.log(res.data.error);
          setError(res.data.error);
        }

        if (res.data.success) {
          setSuccess(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <MyForm
        formFields={resetPasswordFormFields}
        labelCTA="reset password"
        formSubmit={(e) => submit(e)}
        error=""
      />
      <br></br>
      {success && (
        <div className="center-text">
          <p className="submit-success-msg">
            Password reset successful! You can now{' '}
            <Link href="/login">
              <span className="link-text">login</span>
            </Link>{' '}
            with the new password
          </p>
        </div>
      )}
      {error !== '' && <p className="submit-error-msg">{error}</p>}
    </div>
  );
}

export default ResetPasswordPage;
