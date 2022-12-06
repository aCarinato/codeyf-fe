function AddIdealTeamFields(props) {
  const { idealTeam, setIdealTeam, setSteps } = props;

  // console.log(idealTeam);

  return (
    <div>
      <p className="form-label">Ideal team</p>
      <div className="grid grid---4cols-10305010 margin-6auto">
        <div className="center-text">#</div>
        <div className="center-text">N. people</div>
        <div className="center-text">Role name</div>
        <div className="center-text">
          <button
            className="btn-circle"
            onClick={() =>
              setIdealTeam((prev) => {
                let id = prev.length;
                // console.log(`id: ${id}`);
                const ids = prev.map((itm) => Number(itm.idx));
                // console.log(`ids: ${ids}`);
                // console.log(`ids.includes(id): ${ids.includes(id)}`);
                if (ids.includes(id))
                  id = (Math.max(...ids) + Number(1)).toString();
                return [...prev, { idx: id, nPeople: 0, role: '' }];
              })
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="grid grid---4cols-10305010 margin-6auto">
        <div className="center-text">0</div>
        <div className="center-text">
          <input
            className="width-25"
            type="number"
            min="1"
            max="10"
            placeholder="1"
            onChange={(e) => {
              setIdealTeam((prev) => {
                const index = prev.map((item) => item.idx).indexOf('0');
                prev[index].nPeople = e.target.value;
                return [...prev];
              });
            }}
          />
        </div>
        <div className="center-text">
          <input
            className="width-80"
            type="text"
            onChange={(e) => {
              setIdealTeam((prev) => {
                const index = prev.map((item) => item.idx).indexOf('0');
                prev[index].role = e.target.value;
                return [...prev];
              });
            }}
          />
        </div>
      </div>

      {idealTeam.map(
        (item, index) =>
          item.idx !== '0' && (
            <div
              key={item.idx}
              className="grid grid---4cols-10305010 margin-6auto"
            >
              <div className="center-text">{index}</div>
              <div className="center-text">
                <input
                  className="width-25"
                  type="number"
                  min="1"
                  placeholder="1"
                  onChange={(e) =>
                    setIdealTeam((prev) => {
                      const index = prev
                        .map((item) => item.idx)
                        .indexOf(item.idx);
                      prev[index].nPeople = e.target.value;
                      return [...prev];
                    })
                  }
                />
              </div>
              <div className="center-text">
                <input
                  className="width-80"
                  type="text"
                  onChange={(e) => {
                    setIdealTeam((prev) => {
                      const index = prev
                        .map((item) => item.idx)
                        .indexOf(item.idx);
                      prev[index].role = e.target.value;
                      return [...prev];
                    });
                  }}
                />
              </div>
              <div className="center-text">
                <button
                  className="btn-circle"
                  onClick={() => {
                    setIdealTeam((prev) => {
                      const index = prev
                        .map((elem) => elem.idx)
                        .indexOf(item.idx);
                      prev.splice(index, 1);
                      return [...prev];
                    });

                    setSteps((prev) => {
                      prev.map((elem) => {
                        const roleIndex = elem.tasks
                          .map((task) => task.roleId)
                          .indexOf(item.idx);
                        elem.tasks.splice(roleIndex, 1);
                      });
                      return [...prev];
                    });
                  }}
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

export default AddIdealTeamFields;
