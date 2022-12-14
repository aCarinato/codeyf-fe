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
      <div className="card-description">{description}</div>
      {/* <br></br> */}
      {/* <p className="card-learning">Topics:</p>
      <div className="tech-span-box">
        {topics.slice(0, 2).map((item) => (
          <div key={item._id} className={`tech-span tech-span---${item.label}`}>
            <div className="tag-div">o</div>
            <span>{item.label}</span>
          </div>
        ))}
        {topics.length > 2 && (
          <div className={`tech-span`}>
            <div className="tag-div">o</div>
            <span>more...</span>
          </div>
        )}
      </div> */}
      <p className="card-learning">Tech stack:</p>
      <div className="tech-span-box">
        {stack.slice(0, 4).map((item) => (
          <div key={item._id} className={`tech-span tech-span---${item.label}`}>
            <div className="tag-div">o</div>
            <span>{item.label}</span>
          </div>
        ))}
        {stack.length > 4 && (
          <div className={`tech-span`}>
            <div className="tag-div">o</div>
            <span>more...</span>
          </div>
        )}
      </div>
      <div className="flex">
        <div className={classes['div-45']}>
          Up to {maxParticipants} participants
        </div>
        <div className={classes['div-45']}>
          {difficulty === '0'
            ? 'Beginner'
            : difficulty === '1'
            ? 'Intermediate'
            : 'Advanced'}
        </div>
      </div>
      <div className="card-footer">
        {/* <div className="card-footer-profile"> */}
        <Link href={`/projects/coding-assignments/${id}-${title}`}>
          {/* <a className="main-link"> */}
          <div className="card-footer-profile">
            View Assignment <Icon icon="fluent:task-list-ltr-20-filled" />
          </div>
          {/* </a> */}
        </Link>
        {/* </div> */}
        {/* <div>
          {average} <Icon icon="ant-design:star-filled" />
        </div> */}
      </div>
    </div>
  );
}

export default AssignementCard;
