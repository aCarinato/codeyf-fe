import classes from './BtnCircle.module.css';

function BtnCircle(props) {
  const { label } = props;
  return <button className={classes['btn-circle']}>{label}</button>;
}

export default BtnCircle;
