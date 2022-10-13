import Link from 'next/link';
// own components
import BtnCTA from '../UI/BtnCTA';

function MentorRequestCard(props) {
  const {
    id,
    username,
    handle,
    companyJob,
    yearsExperience,
    linkedin,
    teaching,
    approveRequest,
    rejectRequest,
  } = props;
  return (
    <div className="main-card-container">
      <p>{username}</p>
      <br></br>
      <p>{companyJob ? 'Company job' : 'self-taught'}</p>
      <p>Years of experience: {yearsExperience}</p>
      <p>
        <a href={linkedin} target="_blank">
          linkedin profile
        </a>{' '}
      </p>
      <br></br>
      <Link href={`/people/coding-buddies/${handle}`}>
        <a className="main-link">View Profile</a>
      </Link>
      <div className="tech-span-box">
        {teaching.slice(0, 6).map((item) => (
          <span className={`tech-span`} key={item._id}>
            {item.label}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <div className="card-footer-message">
          <BtnCTA
            label="Approve"
            onCLickAction={() => {
              approveRequest(id);
            }}
          />
        </div>
        <div className="card-footer-message">
          <BtnCTA
            label="Reject"
            classname="btn-dark-sm"
            onCLickAction={() => {
              rejectRequest(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MentorRequestCard;
