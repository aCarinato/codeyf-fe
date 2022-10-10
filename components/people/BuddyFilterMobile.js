import Modal from '../UI/Modal';
import BuddyFilter from './BuddyFilter';
import BtnCTA from '../UI/BtnCTA';

function BuddyFilterMobile(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
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
          <BuddyFilter
            country={country}
            setCountry={setCountry}
            language={language}
            setLanguage={setLanguage}
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

export default BuddyFilterMobile;
