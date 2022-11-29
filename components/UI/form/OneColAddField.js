import classes from './OneColAddField.module.css';

function OneColAddField(props) {
  const { label, values, setValues } = props;
  return (
    <div>
      <p className="form-label">Requirements for successful completion</p>
      <div className={classes['box-0']}>
        <div className={classes['number-col']}>#</div>
        <div className={classes['text-input-col']}>{label}</div>
        <div className={classes['btn-col']}>
          <button
            className="btn-circle"
            onClick={() =>
              setValues((prev) => {
                let currentID = prev.length;
                const ids = prev.map((item) => Number(item.idx));
                if (ids.includes(currentID))
                  currentID = (Math.max(...ids) + 1).toString();
                const newValue = {
                  idx: currentID.toString(),
                  label: '',
                };
                return [...prev, newValue];
              })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className={classes['box-0']}>
        <div className={classes['number-col']}>1</div>
        <div className={classes['text-input-col']}>
          <input
            className={classes['text-input']}
            type="text"
            id="0"
            onChange={(e) =>
              setValues((prev) => {
                const index = prev.map((elem) => elem.idx).indexOf('0');
                if (index !== -1) {
                  prev[index].label = e.target.value;
                }
                return [...prev];
              })
            }
          />
        </div>
        <div className={classes['btn-col']}></div>
      </div>

      {values.map(
        (item, index) =>
          item.idx !== '0' && (
            <div className={classes['box-0']} key={item.idx}>
              <div className={classes['number-col']}>{index + 1}</div>
              <div className={classes['text-input-col']}>
                <input
                  className={classes['text-input']}
                  type="text"
                  // ------------------------- //
                  // CHECK CAREFULLY THIS ID!!
                  id={item.idx}
                  // value=''
                  onChange={(e) =>
                    setValues((prev) => {
                      const index = prev
                        .map((elem) => elem.idx)
                        .indexOf(item.idx);
                      if (index !== -1) {
                        prev[index].label = e.target.value;
                      }
                      return [...prev];
                    })
                  }
                />
              </div>
              <div className={classes['btn-col']}>
                <button
                  className="btn-circle"
                  onClick={() =>
                    setValues((prev) => {
                      const index = prev
                        .map((elem) => elem.idx)
                        .indexOf(item.idx);
                      prev.splice(index, 1);
                      return [...prev];
                    })
                  }
                >
                  -
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default OneColAddField;
