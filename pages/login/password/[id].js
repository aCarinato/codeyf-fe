import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// own components
import MyForm from '../../../components/UI/MyForm';
// packages
import axios from 'axios';

function ResetPasswordPage() {
  const router = useRouter();
  const { query } = router;
  const resetPasswordLink = query.id;

  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  //   console.log(resetPasswordLink);

  const resetPasswordFormFields = [
    {
      type: 'input',
      label: 'New password',
      id: 'password',
      inputType: 'password',
      // value: { email },
      onChange: (e) => {
        setNewPassword(e.target.value);
        setSuccess('');
        setError('');
      },
    },
  ];

  const submit = async (e) => {
    e.preventDefault();

    setSuccess('');
    setError('');

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/auth/reset-password`,
        { resetPasswordLink, newPassword }
      );

      console.log(res);

      //   setEmail('');

      if (res.data.error) {
        console.log(res.data.error);
        setError(res.data.error);
      }

      if (res.data.success) {
        setSuccess(res.data.message);
      }
    } catch (err) {
      console.log(err);
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
      {success !== '' && <p>{success}</p>}
      {error !== '' && <p className="submit-error-msg">{error}</p>}
    </div>
  );
}

export default ResetPasswordPage;
