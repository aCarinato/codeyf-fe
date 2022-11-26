import Link from 'next/link';
import { Icon } from '@iconify/react';
import classes from './AssignementCard.module.css';
// own function
import { averageRate } from '../../lib/helper/reviewFunctions';

function AssignementCard(props) {
  const {
    id,
    title,
    description,
    difficulty,
    maxParticipants,
    stack,
    reviews,
  } = props;

  // const average = averageRate(reviews);

  return (
    <div className="main-card-container">
      {' '}
      <div className="card-group-header">
        <h4>{title}</h4>
      </div>
      <div>{description}</div>
      <br></br>
      <p className="card-learning">Tech stack:</p>
      <div className="tech-span-box">
        {stack.slice(0, 7).map((item) => (
          <span
            key={item._id}
            className={`tech-span tech-span---${item.label}`}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex">
        <div className={classes['div-45']}>
          Max {maxParticipants} participants
        </div>
        <div className={classes['div-45']}>{difficulty}</div>
      </div>
      <div className="card-footer">
        <div className="card-footer-profile">
          <Link href={`/projects/coding-assignments/${id}-${title}`}>
            <a className="main-link">
              View Assignment <Icon icon="fluent:task-list-ltr-20-filled" />
            </a>
          </Link>
        </div>
        {/* <div>
          {average} <Icon icon="ant-design:star-filled" />
        </div> */}
      </div>
    </div>
  );
}

export default AssignementCard;
