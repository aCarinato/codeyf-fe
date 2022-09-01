import Modal from '../../UI/Modal';
import GroupFilterMobileOptions from './GroupFilterMobileOptions';
import BtnCTA from '../../UI/BtnCTA';

function GroupFilterMobile(props) {
  const {
    allNumbersOfParticipants,
    nParticipantsCheckedIndex,
    setNParticipantsCheckedIndex,
    //
    allMentorWantedSelections,
    mentorCheckedIndex,
    setMentorCheckedIndex,
    //
    allMentorFoundSelections,
    mentorFoundCheckedIndex,
    setMentorFoundCheckedIndex,
    //
    allLearning,
    learningCheckedIndex,
    setLearningCheckedIndex,
    //
    filterGroups,
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
              filterGroups();
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
          <GroupFilterMobileOptions
            allNumbersOfParticipants={allNumbersOfParticipants}
            nParticipantsCheckedIndex={nParticipantsCheckedIndex}
            setNParticipantsCheckedIndex={setNParticipantsCheckedIndex}
            //
            allMentorWantedSelections={allMentorWantedSelections}
            mentorCheckedIndex={mentorCheckedIndex}
            setMentorCheckedIndex={setMentorCheckedIndex}
            //
            allMentorFoundSelections={allMentorFoundSelections}
            mentorFoundCheckedIndex={mentorFoundCheckedIndex}
            setMentorFoundCheckedIndex={setMentorFoundCheckedIndex}
            //
            allLearning={allLearning}
            learningCheckedIndex={learningCheckedIndex}
            setLearningCheckedIndex={setLearningCheckedIndex}
          />
        </div>
      </div>
    </Modal>
  );
}

export default GroupFilterMobile;
