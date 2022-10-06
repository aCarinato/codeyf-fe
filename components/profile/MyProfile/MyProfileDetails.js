// packages
import { Icon } from '@iconify/react';
import { Fragment } from 'react';

function MyProfileDetails(props) {
  const {
    username,
    shortDescription,
    longDescription,
    country,
    languages,
    isBuddy,
    currentlyAvailableAsBuddy,
    isMentor,
    currentlyAvailableAsMentor,
    topics,
    learning,
    skillsLevel,
    companyJob,
    linkedin,
    yearsExperience,
    teaching,
  } = props;
  return (
    <div>
      <div className="center-text">IMG</div>
      <div className="flex flex-justify-space-between">
        <div>
          <h3>{username}</h3>
          <p>{shortDescription}</p>
        </div>

        <div className="flex">
          <p>
            <Icon icon="clarity:map-marker-line" /> {country}
          </p>
          <div>
            <Icon icon="clarity:language-solid" />{' '}
            {languages.map((language) => (
              <span key={language._id}>{language.code} </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        {longDescription.length > 0 && (
          <Fragment>
            <br></br>
            <h5>More about me</h5>
            <p>{longDescription}</p>
          </Fragment>
        )}
      </div>
      <br></br>
      <h5>Roles and availability</h5>
      {isBuddy && (
        <div>
          <p>
            Coding buddy{' '}
            {currentlyAvailableAsBuddy ? (
              <span className="availability-msg">- currently available</span>
            ) : (
              <span className="unavailability-msg">
                - currently unavailable
              </span>
            )}{' '}
          </p>
          <br></br>
        </div>
      )}
      {isMentor && (
        <div>
          <p>
            Mentor{' '}
            {currentlyAvailableAsMentor ? (
              <span className="availability-msg">- currently available</span>
            ) : (
              <span className="unavailability-msg">
                - currently unavailable
              </span>
            )}{' '}
          </p>
          <br></br>
        </div>
      )}
      <div>
        <h5>Topics of interest</h5>
        {topics.map((topic) => (
          <p key={topic._id}>{topic.label}</p>
        ))}
        <br></br>
      </div>
      <div>
        <h5>Is learning / wants to learn</h5>
        {learning.map((item) => (
          <p key={item._id}>{item.label}</p>
        ))}
        <br></br>
      </div>
      <div>
        <h5>Skills</h5>
        {skillsLevel.map((item) => (
          <p key={item._id}>{item.label}</p>
        ))}
        <br></br>
      </div>
      {isMentor && (
        <div>
          <hr></hr>
          <br></br>
          <h4>Mentoring profile</h4>
          <br></br>
          <p>{yearsExperience} years of experience in programming</p>
          <br></br>
          <h5>Developer role</h5>
          {companyJob ? (
            <p>Is or has been employed as a developer in a company</p>
          ) : (
            <p>Self taught, no experience in a company role</p>
          )}

          {linkedin.length > 0 && (
            <Fragment>
              <br></br>
              <h5>
                <a href={linkedin}>Linkedin profile</a>
              </h5>
            </Fragment>
          )}
          <br></br>
          <h5>Mentoring topics and stacks</h5>
          {teaching.map((item) => (
            <p key={item._id}>{item.label}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProfileDetails;
