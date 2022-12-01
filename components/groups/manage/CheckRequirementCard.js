// react / next
import { useEffect, useState } from 'react';
// styles
import classes from './CheckRequirementCard.module.css';
// libs
// import axios from 'axios';

function CheckRequirementCard(props) {
  const { requirement, checkCompletion } = props;
  const [isSelected, setIsSelected] = useState(null);

  useEffect(() => {
    if (requirement.met) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [requirement.met]);
  //   console.log(isSelected);

  return (
    <div className={classes['box-0']}>
      <div className={classes['requirement-label']}>{requirement.label}</div>
      <div className={classes['check-box']}>
        <div onClick={checkCompletion} className={classes['requirement-check']}>
          <div className={isSelected ? classes.selected : ''}></div>
        </div>
      </div>
      {/* <div className={!isSelected ? classes['tick-invisible'] : ''}>X</div> */}
    </div>
  );
}

export default CheckRequirementCard;
