import classes from './AddResources.module.css';

function AddResources(props) {
  const { resources, setResources } = props;
  // console.log(resources);
  return (
    <div>
      <p className="form-label">Resources</p>
      <div className={classes['box-0']}>
        <div className={classes['number-col']}>#</div>
        <div className={classes['name-col']}>Name</div>
        <div className={classes['img-col']}>link</div>
        <div className={classes['btn-col']}>
          <button
            className="btn-circle"
            onClick={() =>
              setResources((prev) => {
                let currentID = prev.length;
                const ids = prev.map((item) => Number(item.idx));
                if (ids.includes(currentID))
                  currentID = (Math.max(...ids) + 1).toString();
                const newResource = {
                  idx: currentID.toString(),
                  name: '',
                  link: '',
                  upvotes: 0,
                };
                return [...prev, newResource];
              })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className={classes['box-0']}>
        <div className={classes['number-col']}>1</div>
        <div className={classes['name-col']}>
          <input
            className={classes['text-input']}
            type="text"
            id="0"
            onChange={(e) =>
              setResources((prev) => {
                const index = prev.map((elem) => elem.idx).indexOf('0');
                if (index !== -1) {
                  prev[index].name = e.target.value;
                }
                return [...prev];
              })
            }
          />
        </div>
        <div className={classes['img-col']}>
          <input
            className={classes['text-input']}
            type="text"
            id="0"
            onChange={(e) =>
              setResources((prev) => {
                const index = prev.map((elem) => elem.idx).indexOf('0');
                if (index !== -1) {
                  prev[index].link = e.target.value;
                }
                return [...prev];
              })
            }
          />
        </div>
        <div className={classes['btn-col']}></div>
      </div>

      {resources.map(
        (item, index) =>
          item.idx !== '0' && (
            <div className={classes['box-0']} key={item.idx}>
              <div className={classes['number-col']}>{index + 1}</div>
              <div className={classes['name-col']}>
                <input
                  className={classes['text-input']}
                  type="text"
                  // ------------------------- //
                  // CHECK CAREFULLY THIS ID!!
                  id={item.idx}
                  // value=''
                  onChange={(e) =>
                    setResources((prev) => {
                      const index = prev
                        .map((elem) => elem.idx)
                        .indexOf(item.idx);
                      if (index !== -1) {
                        prev[index].name = e.target.value;
                      }
                      return [...prev];
                    })
                  }
                />
              </div>
              <div className={classes['img-col']}>
                {' '}
                <input
                  className={classes['text-input']}
                  type="text"
                  id="0"
                  onChange={(e) =>
                    setResources((prev) => {
                      const index = prev
                        .map((elem) => elem.idx)
                        .indexOf(item.idx);
                      if (index !== -1) {
                        prev[index].link = e.target.value;
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
                    setResources((prev) => {
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

export default AddResources;
