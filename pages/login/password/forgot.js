import { useState } from 'react';
// own components
import MyForm from '../../../components/UI/MyForm';
// packages
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const forgotPasswordFormFields = [
    {
      type: 'input',
      label: 'Your email',
      id: 'email',
      inputType: 'email',
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
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
        `${process.env.NEXT_PUBLIC_API}/auth/forgot-password`,
        { email }
      );

      // console.log(res);

      setEmail('');

      if (res.data.error) {
        // console.log(res.data.error);
        setError(res.data.error);
      }

      if (res.data.success) {
        // router.push('/login/confirmation-email');
        setSuccess(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="center-text">
      <p>
        Please type the email address you have registered with to receive the
        link for password reset.
      </p>
      <br></br>
      <MyForm
        formFields={forgotPasswordFormFields}
        labelCTA="send link"
        formSubmit={(e) => submit(e)}
        error=""
      />
      <br></br>
      {success !== '' && <p className="submit-success-msg">{success}</p>}
      {error !== '' && <p className="submit-error-msg">{error}</p>}
    </div>
  );
}

export default ForgotPasswordPage;
