import classes from './SwitchTab.module.css';

function SwitchTab(props) {
  const { studentsActive, setStudentsActive } = props;

  //   const clickStudentsTab = () => {
  //     setStudentsActive(true);
  //   };

  return (
    <div className="flex">
      <div
        className="width-50 center-text"
        onClick={() => setStudentsActive(true)}
      >
        <div
          className={
            studentsActive ? classes['selected-tab'] : classes['unselected-tab']
          }
        >
          Students seeking mentors
        </div>
      </div>
      <div
        className="width-50 center-text"
        onClick={() => setStudentsActive(false)}
      >
        <div
          className={
            !studentsActive
              ? classes['selected-tab']
              : classes['unselected-tab']
          }
        >
          Mentors seeking students
        </div>
      </div>
    </div>
  );
}

export default SwitchTab;
