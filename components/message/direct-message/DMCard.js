import classes from './DMCard.module.css';
// context
import { useMainContext } from '../../../context/Context';

function DMCard(props) {
  const { authState } = useMainContext();
  const { from, text } = props;
  //   console.log(authState.username === from);
  return (
    <div className={classes.container}>
      <div
        className={
          authState && authState.username === from
            ? classes.sender
            : classes.receiver
        }
      >
        <p>
          <span className="bold">{from}</span> wrote
        </p>
        <br></br>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default DMCard;
