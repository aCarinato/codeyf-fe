import classes from './ApprovalsCard.module.css';

function ApprovalsCard(props) {
  const { participant, approved } = props;
  return (
    <div className={classes['box-0']}>
      <div className={classes['username']}>{participant.username}</div>
      <div className={classes['status']}>
        <p>status</p>
        <p>{approved ? 'Approved' : 'Not yet approved'}</p>
      </div>
      {!approved && <div className={classes['message']}>Send message</div>}
    </div>
  );
}

export default ApprovalsCard;
