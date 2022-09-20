import Link from 'next/link';

function SignupConfirmPage() {
  return (
    <div>
      <div>
        <p>Congratulations, you successfully activated your account!</p>
        <p>Please login and complete your profile to enable all features.</p>
      </div>
      <Link href="/login">
        <p className="link-text">Go to profile</p>
      </Link>{' '}
    </div>
  );
}

export default SignupConfirmPage;
