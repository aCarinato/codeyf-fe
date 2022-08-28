import Link from 'next/link';
import BtnCTA from '../UI/BtnCTA';
import { Icon } from '@iconify/react';

function BuddyCard(props) {
  const { username, description, country, learning } = props;
  return (
    <div className="main-card-container">
      <div className="card-header">
        <div className="card-img-container">
          <img className="card-img" src="/img/pizza.png" />
        </div>
        <div className="card-header-username-country">
          {/* <div> */}
          <p className="card-header-username">{username}</p>
          {/* <p>{username}</p> */}
          <p className="card-header-country">{country}</p>
        </div>
      </div>

      <p className="card-description">{description}</p>

      <p className="card-learning">Is learning / wants to learn:</p>
      <div className="tech-span-box">
        {learning.slice(0, 6).map((item, index) => (
          <span className={`tech-span tech-span---${item}`} key={index}>
            {item}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <div className="card-footer-profile">
          <Link href={`/people/coding-buddies/${username}`}>
            <a className="main-link">
              View Profile <Icon icon="bx:user" />
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
      </div>
    </div>
  );
}

export default BuddyCard;
