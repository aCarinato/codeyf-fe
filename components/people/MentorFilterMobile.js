import Modal from '../UI/Modal';
import MentorFilter from './MentorFilter';
import BtnCTA from '../UI/BtnCTA';

function MentorFilterMobile(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    teachingCheckedIndex,
    setTeachingCheckedIndex,
    skillsCheckedIndex,
    setSkillsCheckedIndex,
    filterMentors,
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
              filterMentors();
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
          <MentorFilter
            country={country}
            setCountry={setCountry}
            language={language}
            setLanguage={setLanguage}
            teachingCheckedIndex={teachingCheckedIndex}
            setTeachingCheckedIndex={setTeachingCheckedIndex}
            skillsCheckedIndex={skillsCheckedIndex}
            setSkillsCheckedIndex={setSkillsCheckedIndex}
          />
        </div>
      </div>
    </Modal>
  );
}

export default MentorFilterMobile;
