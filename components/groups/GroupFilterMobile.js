import Modal from '../UI/Modal';
import GroupFilter from './GroupFilter';
import BtnCTA from '../UI/BtnCTA';

function GroupFilterMobile(props) {
  const {
    mentorCheckedIndex,
    setMentorCheckedIndex,
    participantsCheckedIndex,
    setParticipantsCheckedIndex,
    stackCheckedIndex,
    setStackCheckedIndex,
    topicsCheckedIndex,
    setTopicsCheckedIndex,
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
          <GroupFilter
            mentorCheckedIndex={mentorCheckedIndex}
            setMentorCheckedIndex={setMentorCheckedIndex}
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

export default GroupFilterMobile;
