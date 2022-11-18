function ItemSelectorChild(props) {
  const { card, btn, userId, selectedId, setSelectedId } = props;
  return (
    <div className="outline">
      {card}
      <div className="addbuddy-footer">
        <div className="addbuddy-action">{userId === selectedId && btn}</div>
        <div className="addbuddy-check-div">
          <div
            onClick={() => {
              if (userId === selectedId) {
                setSelectedId('');
              } else {
                setSelectedId(userId);
              }
            }}
            className="addbuddy-check"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ItemSelectorChild;
