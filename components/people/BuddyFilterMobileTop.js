import Modal from '../UI/Modal';
import BuddyFilterTop from './BuddyFilterTop';
import BtnCTA from '../UI/BtnCTA';

function BuddyFilterMobileTop(props) {
  const {
    learningCheckedIndex,
    setLearningCheckedIndex,
    skillsCheckedIndex,
    setSkillsCheckedIndex,
    filterBuddies,
    onClose,
  } = props;
  return (
    <Modal onClose={onClose}>
      <div className="mobile-filter-body">
        <div className="mobile-filter-header">
          <BtnCTA
            label="APPLY FILTERS"
            classname="btn-light-big"
            onCLickAction={() => {
              filterBuddies();
              onClose();
            }}
            icon={true}
            iconType="ci:filter-outline"
          />
          <div className="mobile-filter-close" onClick={onClose}>
            X
          </div>
        </div>
        <div>
          <BuddyFilterTop
            learningCheckedIndex={learningCheckedIndex}
            setLearningCheckedIndex={setLearningCheckedIndex}
            skillsCheckedIndex={skillsCheckedIndex}
            setSkillsCheckedIndex={setSkillsCheckedIndex}
          />
        </div>
      </div>
    </Modal>
  );
}

export default BuddyFilterMobileTop;
