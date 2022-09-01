import Modal from '../../UI/Modal';
import MentorFilterMobileOptions from './MentorFilterMobileOptions';
import BtnCTA from '../../UI/BtnCTA';

function MentorFilterMobile(props) {
  const {
    country,
    setCountry,
    language,
    setLanguage,
    teachingCheckedIndex,
    setTeachingCheckedIndex,
    teachingCheckedNames,
    setTeachingCheckedNames,
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
          <MentorFilterMobileOptions
            country={country}
            setCountry={setCountry}
            language={language}
            setLanguage={setLanguage}
            teachingCheckedIndex={teachingCheckedIndex}
            setTeachingCheckedIndex={setTeachingCheckedIndex}
            teachingCheckedNames={teachingCheckedNames}
            setTeachingCheckedNames={setTeachingCheckedNames}
            skillsCheckedIndex={skillsCheckedIndex}
            setSkillsCheckedIndex={setSkillsCheckedIndex}
          />
        </div>
        <div> </div>
      </div>
    </Modal>
  );
}

export default MentorFilterMobile;
