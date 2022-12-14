import classes from './AddMockupFields.module.css';

function AddMockupFields(props) {
  const { mockups, setMockups } = props;
  return (
    <div>
      <p className="form-label">Mockups</p>
      <div className={classes['box-0']}>
        <div className={classes['number-col']}>#</div>
        <div className={classes['caption-col']}>Caption</div>
        <div className={classes['img-col']}>image</div>
        <div className={classes['btn-col']}>
          <button
            className="btn-circle"
            onClick={() =>
              setMockups((prev) => {
                let currentID = prev.length;
                const ids = prev.map((item) => Number(item.idx));
                if (ids.includes(currentID))
                  currentID = (Math.max(...ids) + 1).toString();
                const newMockup = {
                  idx: currentID.toString(),
                  caption: '',
                  img_url: '',
                };
                return [...prev, newMockup];
              })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className={classes['box-0']}>
        <div className={classes['number-col']}>1</div>
        <div className={classes['caption-col']}>
          <input
            className={classes['text-input']}
            type="text"
            id="0"
            onChange={(e) =>
              setMockups((prev) => {
                const index = prev.map((elem) => elem.idx).indexOf('0');
                if (index !== -1) {
                  prev[index].caption = e.target.value;
                }
                return [...prev];
              })
            }
          />
        </div>
        <div className={classes['img-col']}>A</div>
        <div className={classes['btn-col']}></div>
      </div>

      {mockups.map(
        (item, index) =>
          item.idx !== '0' && (
            <div className={classes['box-0']} key={item.idx}>
              <div className={classes['number-col']}>{index + 1}</div>
              <div className={classes['caption-col']}>
                <input
                  className={classes['text-input']}
                  type="text"
                  // ------------------------- //
                  // CHECK CAREFULLY THIS ID!!
                  id={item.idx}
                  // value=''
                  onChange={(e) =>
                    setMockups((prev) => {
                      const index = prev
                        .map((elem) => elem.idx)
                        .indexOf(item.idx);
                      if (index !== -1) {
                        prev[index].caption = e.target.value;
                      }
                      return [...prev];
                    })
                  }
                />
              </div>
              <div className={classes['img-col']}>A</div>
              <div className={classes['btn-col']}>
                <button
                  className="btn-circle"
                  onClick={() =>
                    setMockups((prev) => {
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

export default AddMockupFields;
