import Modal from '../UI/Modal';
import IndividualFilter from './IndividualFilter';
import BtnCTA from '../UI/BtnCTA';

function IndividualFilterMobile(props) {
  const {
    stackCheckedIndex,
    setStackCheckedIndex,
    topicsCheckedIndex,
    setTopicsCheckedIndex,
    filterIndividuals,
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
              filterIndividuals();
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
          <IndividualFilter
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

export default IndividualFilterMobile;
