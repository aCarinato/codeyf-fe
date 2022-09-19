import classes from './GroupCard.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import BtnCTA from '../UI/BtnCTA';

function GroupCard(props) {
  const {
    id,
    name,
    techStack,
    nBuddies,
    buddies,
    mode = 'viewer',
    status,
  } = props;
  //   const techStack = group.techStack;
  let availabilityStatus;

  const availableSpots = nBuddies - buddies.length - 1;

  if (availableSpots > 0) {
    availabilityStatus = (
      <p className="card-group-available">
        {availableSpots} more spots available!
      </p>
    );
  } else {
    availabilityStatus = <p className="card-group-unavailable">Group filled</p>;
  }

  return (
    <div className="main-card-container">
      <div className="card-group-header">
        <h4>{name}</h4>
      </div>

      {/* <p>{description}</p> */}
      <p className="card-learning">Group topics:</p>
      <div className="tech-span-box">
        {techStack.slice(0, 7).map((item, index) => (
          <span key={index} className={`tech-span tech-span---${item}`}>
            {item}
          </span>
        ))}
      </div>
      <p>Max {nBuddies} participants</p>
      {availabilityStatus}
      <div className="card-footer">
        {mode === 'viewer' ? (
          <>
            <div className="card-footer-profile">
              <Link href={`/projects/coding-groups/${id}`}>
                <a className="main-link">
                  View Group <Icon icon="akar-icons:people-group" />
                </a>
              </Link>
            </div>
            <div className="card-footer-message">
              <BtnCTA
                label="Message"
                onCLickAction={() => {}}
                icon={true}
                iconType="ant-design:message-outlined"
              />
            </div>
          </>
        ) : (
          <>
            {status === 'draft' && (
              <div className="card-footer-profile">
                <Link href={`/projects/coding-groups/${id}/edit`}>
                  <a className="main-link">
                    Edit <Icon icon="akar-icons:edit" />
                  </a>
                </Link>
              </div>
            )}
            {status === 'active' && (
              <div className="card-footer-profile">
                <Link href={`/projects/coding-groups/${id}/manage`}>
                  <a className="main-link">
                    Mark completion <Icon icon="fa6-solid:trophy" />
                  </a>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GroupCard;
