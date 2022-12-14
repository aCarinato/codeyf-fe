import Modal from '../UI/Modal';
import AssignementFilter from './AssignementFilter';
import BtnCTA from '../UI/BtnCTA';

function AssignementFilterMobile(props) {
  const {
    difficultyCheckedIndex,
    setDifficultyCheckedIndex,
    participantsCheckedIndex,
    setParticipantsCheckedIndex,
    stackCheckedIndex,
    setStackCheckedIndex,
    topicsCheckedIndex,
    setTopicsCheckedIndex,
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
            difficultyCheckedIndex={difficultyCheckedIndex}
            setDifficultyCheckedIndex={setDifficultyCheckedIndex}
            participantsCheckedIndex={participantsCheckedIndex}
            setParticipantsCheckedIndex={setParticipantsCheckedIndex}
            stackCheckedIndex={stackCheckedIndex}
            setStackCheckedIndex={setStackCheckedIndex}
            topicsCheckedIndex={topicsCheckedIndex}
            setTopicsCheckedIndex={setTopicsCheckedIndex}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AssignementFilterMobile;
