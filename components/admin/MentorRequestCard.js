import Link from 'next/link';
// own components
import BtnCTA from '../UI/BtnCTA';

function MentorRequestCard(props) {
  const {
    id,
    username,
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
      <Link href={`/people/coding-mentors/${username}`}>
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
// Capisco la tua buona fede e buone intenzioni, però facilitone e presuntuoso ai tuoi occhi che in quel momento si sentivano offesi, intendiamoci.
// Senso di offesa a cui hai reagito con insulti. A cui non ho risposto perchè conosco le tue buone intenzioni e per l'importanza della nostra amicizia che dunque tratto con extra cautela.
// Offesa che da parte mia non c'è mai stata. Anche perchè non ho detto di non voler MAI usare nessun tipo di protezione e scarponi.
// Potrei addirittura dire che sei tu facilitone e presuntuoso a considerare me come tale.
// Magari sarebbe utile spiegarsi a voce un giorno perchè penso ci sia qualcosa da chiarire, i messaggi hanno già fatto abbastanza danni.
// Ovviamente anche da parte mia non vi è intenzione di  però le cose vanno anche dette
export default MentorRequestCard;
