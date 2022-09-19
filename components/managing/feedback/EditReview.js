import Modal from '../../UI/Modal';

function EditReview(props) {
  const { onClose, reviewEdit, setReviewEdit } = props;

  const updateComment = (e) => {
    let tempReview = { ...reviewEdit };
    tempReview.comment = e.target.value;
    // console.log(tempReview);
    setReviewEdit(tempReview);
  };

  const updateRating = (e) => {
    let tempReview = { ...reviewEdit };
    tempReview.rate = e.target.value;
    // console.log(tempReview);
    setReviewEdit(tempReview);
  };

  const ratings = [
    { rate: '1', label: '1 - Poor' },
    { rate: '2', label: '2 - Fair' },
    { rate: '3', label: '3 - Good' },
    { rate: '4', label: '4 - Very good' },
    { rate: '5', label: '5 - Excellent' },
  ];

  return (
    <Modal onClose={onClose}>
      <div>
        <label>comment</label>
        <input
          type="text"
          value={reviewEdit.comment}
          onChange={(e) => updateComment(e)}
        />
      </div>
      <div>
        <label>Rating</label>
        <select
          name="rating"
          id="rating"
          value={reviewEdit.rate}
          onChange={(e) => updateRating(e)}
        >
          {ratings.map((rating) => (
            <option key={rating.rate} value={rating.rate}>
              {rating.label}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
}

export default EditReview;
