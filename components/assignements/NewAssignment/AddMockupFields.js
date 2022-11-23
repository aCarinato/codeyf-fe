function AddMockupFields(props) {
  const { mockups, setMockups } = props;
  return (
    <div>
      <p className="form-label">Mockups</p>
      <div className="flex">
        <div className="center-text">#</div>
        <div className="center-text">Caption</div>
        <div className="center-text">image</div>
        <div className="center-text">
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

      <div className="flex">
        <div className="center-text">1</div>
        <div className="center-text ">
          <input
            className="width-80"
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
        <div className="center-text">A</div>
      </div>

      {mockups.map(
        (item, index) =>
          item.idx !== '0' && (
            <div className="flex" key={item.idx}>
              <div className="center-text">{index + 1}</div>
              <div className="center-text ">
                <input
                  className="width-80"
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
              <div className="center-text">A</div>
              <div className="center-text">
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
