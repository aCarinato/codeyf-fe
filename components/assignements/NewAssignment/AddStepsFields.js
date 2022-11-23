import { Fragment } from 'react';

function AddStepsFields(props) {
  const { steps, setSteps, idealTeam } = props;

  const handleChangeSteps = (e, roleID, stepID) => {
    // ATTENTION WITH roleId that is saved as a number in tasks (participantId)
    // roleId is a number
    setSteps((prev) => {
      const stepIndex = prev.map((item) => item.idx).indexOf(stepID);
      //   console.log(`prev[stepIndex].tasks: ${JSON.stringify(prev[stepIndex])}`);
      //   console.log(
      //     `prev[stepIndex].tasks.length === 0: ${
      //       prev[stepIndex].tasks.length === 0
      //     }`
      //   );
      if (prev[stepIndex].tasks.length === 0) {
        prev[stepIndex].tasks.push({
          roleId: roleID,
          roleTasks: e.target.value,
        });
      } else {
        const roleIndex = prev[stepIndex].tasks
          .map((item) => item.roleId)
          .indexOf(roleID);

        if (roleIndex === -1) {
          // console.log('The array wasn not empty but this roleID was not present');
          prev[stepIndex].tasks.push({
            roleId: roleID,
            roleTasks: e.target.value,
          });
        } else {
          // console.log(tempInputStep[stepIndex].tasks[roleID]);
          prev[stepIndex].tasks[roleID].roleTasks = e.target.value;
        }
      }
      return [...prev];
    });
  };

  //   console.log(steps);

  return (
    <div>
      <p className="form-label">Steps for completion</p>
      <div className="grid grid---4cols-10305010">
        <div className="center-text">#</div>
        <div className="center-text">Role</div>
        <div className="center-text">Tasks</div>
        <div className="center-text">
          <button
            className="btn-circle"
            onClick={() =>
              setSteps((prev) => {
                let currentID = prev.length;
                const ids = prev.map((item) => Number(item.idx));
                if (ids.includes(currentID))
                  currentID = (Math.max(...ids) + 1).toString();
                return [...prev, { idx: currentID, n: currentID, tasks: [] }];
              })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="grid grid---4cols-10305010 margin-6auto">
        {idealTeam.map((item, index) => (
          <Fragment key={item.idx}>
            <div className="center-text">
              {index === 0 ? <div className="center-text">1</div> : <div></div>}
            </div>
            <div className="center-text">
              <p>{item.role}</p>
            </div>
            <div className="center-text">
              <textarea
                className="width-80"
                type="text"
                rows="2"
                // cols="25"
                onChange={(e) => handleChangeSteps(e, item.idx, '1')}
              />
            </div>
            <div></div>
          </Fragment>
        ))}
      </div>
      {/* <br></br> */}
      <hr></hr>
      {/* <br></br> */}

      {steps.map(
        (step, stepIdx) =>
          step.idx !== '1' && (
            <Fragment key={step.idx}>
              <div className="grid grid---4cols-10305010 margin-6auto">
                {idealTeam.map((item, index) => (
                  <Fragment key={item.idx}>
                    {index === 0 ? (
                      <div className="center-text">{stepIdx + 1}</div>
                    ) : (
                      <div></div>
                    )}
                    <div className="center-text">
                      <p>{item.role}</p>
                    </div>
                    <div className="center-text">
                      <textarea
                        type="text"
                        rows="2"
                        className="width-80"
                        // cols="25"
                        onChange={(e) =>
                          handleChangeSteps(e, item.idx, step.idx)
                        }
                      />
                    </div>
                    {index === 0 ? (
                      <div className="center-text">
                        <button
                          className="btn-circle"
                          //   onClick={() => removeStep(step.idx)}
                          onClick={() =>
                            setSteps((prev) => {
                              const stepIndex = prev
                                .map((item) => item.idx)
                                .indexOf(step.idx);
                              prev.splice(stepIndex, 1);
                              return [...prev];
                            })
                          }
                        >
                          -
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Fragment>
                ))}
              </div>
              <hr></hr>
            </Fragment>
          )
      )}
    </div>
  );
}

export default AddStepsFields;
