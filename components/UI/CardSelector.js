function CardSelector(props) {
  const { card, btn, itemId, selectedId, setSelectedId } = props;
  return (
    <div className="outline">
      {card}
      <div className="addbuddy-footer">
        <div className="addbuddy-action">{itemId === selectedId && btn}</div>
        <div className="addbuddy-check-div">
          <div
            onClick={() => {
              if (itemId === selectedId) {
                setSelectedId('');
              } else {
                setSelectedId(itemId);
              }
            }}
            className="addbuddy-check"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CardSelector;
