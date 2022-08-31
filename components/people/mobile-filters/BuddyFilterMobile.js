import Modal from '../../UI/Modal';
import BuddyFilterMobileOptions from './BuddyFilterMobileOptions';
import BtnCTA from '../../UI/BtnCTA';

function BuddyFilterMobile(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    learningCheckedIndex,
    setLearningCheckedIndex,
    learningCheckedNames,
    setLearningCheckedNames,
    skillsCheckedIndex,
    setSkillsCheckedIndex,
    filterBuddies,
    onClose,
    // country,
    // setCountry,
    // language,
    // setLanguage,
    // learning,
    // setLearning,
    // skills,
    // setSkills,

    // buddies,
    // setFilteredBuddies,
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
          <BuddyFilterMobileOptions
            country={country}
            setCountry={setCountry}
            language={language}
            setLanguage={setLanguage}
            learningCheckedIndex={learningCheckedIndex}
            setLearningCheckedIndex={setLearningCheckedIndex}
            learningCheckedNames={learningCheckedNames}
            setLearningCheckedNames={setLearningCheckedNames}
            skillsCheckedIndex={skillsCheckedIndex}
            setSkillsCheckedIndex={setSkillsCheckedIndex}
          />
        </div>
        <div> </div>
      </div>
    </Modal>
  );
}

export default BuddyFilterMobile;
