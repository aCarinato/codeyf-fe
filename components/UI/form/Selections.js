// import classes from './Selections.module.css'

function Selections(props) {
  const { selections, setSelections, disabled = false } = props;
  return (
    <div className="flex flex-justify-flex-start gap-12">
      {selections.map((selection) => (
        <div className="tech-span" key={selection._id}>
          {selection.label}{' '}
          {!disabled && (
            <span
              className="pointer"
              onClick={() =>
                setSelections((prev) =>
                  prev.filter((item) => item._id !== selection._id)
                )
              }
            >
              x
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Selections;
