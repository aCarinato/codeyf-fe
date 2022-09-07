import Modal from '../UI/Modal';
import AssignementFilter from './AssignementFilter';
import BtnCTA from '../UI/BtnCTA';

function AssignementFilterMobile(props) {
  const {
    allDifficulty,
    difficultyCheckedIndex,
    setDifficultyCheckedIndex,
    allParticipants,
    participantsCheckedIndex,
    setParticipantsCheckedIndex,
    allStack,
    stackCheckedIndex,
    setStackCheckedIndex,
    mobileFilterAssignements,
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
              mobileFilterAssignements();
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
          <AssignementFilter
            allDifficulty={allDifficulty}
            difficultyCheckedIndex={difficultyCheckedIndex}
            setDifficultyCheckedIndex={setDifficultyCheckedIndex}
            allParticipants={allParticipants}
            participantsCheckedIndex={participantsCheckedIndex}
            setParticipantsCheckedIndex={setParticipantsCheckedIndex}
            allStack={allStack}
            stackCheckedIndex={stackCheckedIndex}
            setStackCheckedIndex={setStackCheckedIndex}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AssignementFilterMobile;
