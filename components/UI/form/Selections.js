import classes from './Selections.module.css';

function Selections(props) {
  const { selections, setSelections, disabled = false } = props;
  return (
    <div className="flex flex-justify-center flex-vertical-items-center gap-12 width-70">
      {selections.map((selection) => (
        <div className="tech-span" key={selection._id}>
          {disabled ? (
            <div className="tag-div">o</div>
          ) : (
            <span
              className="tag-div pointer"
              onClick={() =>
                setSelections((prev) =>
                  prev.filter((item) => item._id !== selection._id)
                )
              }
            >
              X
            </span>
          )}
          <span>{selection.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Selections;
