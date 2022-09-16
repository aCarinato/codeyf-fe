import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { groups } from '../../../../data/groups';
import { people } from '../../../../data/people';
// components
import BtnCTA from '../../../../components/UI/BtnCTA';
import EditReview from '../../../../components/managing/feedback/EditReview';

function ManageGroupPage() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviewees, setReviewees] = useState([]);
  const [reviewStatus, setReviewStatus] = useState([]);

  const [reviewEdit, setReviewEdit] = useState({});

  //   modal for reviewing
  const [showEditReview, setShowEditReview] = useState(false);

  const fecthGroup = () => {
    setLoading(true);
    const filteredGroup = groups.filter((group) => group._id === id)[0];
    setGroup(filteredGroup);
    setLoading(false);
  };

  const fetchReviewees = () => {
    let tempReviewees = [];
    if (group !== undefined && group !== {} && group.name) {
      // find the people to review
      group.buddies.map((buddy) => {
        if (buddy !== group.organiser) {
          let currentBuddy = people.filter((person) => person.id === buddy)[0];
          tempReviewees.push(currentBuddy);
        }
      });
      setReviewees(tempReviewees);
      //   console.log(tempReviewees);
      // find the index of the reviews made by the current user
      const indexCurrentReviewer = group.feedback
        .map((item) => item.fromUserID)
        .indexOf(group.organiser);

      // if there is no review yet and no fields in group.feedback
      let tempReviewStatus = [];
      if (indexCurrentReviewer === -1) {
        tempReviewees.map((item) => {
          tempReviewStatus.push({ username: item, reviewed: false });
        });
        setReviewStatus(tempReviewStatus);
      } else {
        // let revieweesID = tempReviewees.map((item) => item.id);
        let reviewedIDs = group.feedback[indexCurrentReviewer].to.map(
          (item) => item.userID
        );

        tempReviewees.map((item) => {
          if (reviewedIDs.includes(item.id)) {
            let index = group.feedback[indexCurrentReviewer].to
              .map((i) => i.userID)
              .indexOf(item.id);
            tempReviewStatus.push({
              id: item.id,
              username: item.username,
              reviewed: true,
              rate: group.feedback[indexCurrentReviewer].to[index].rate,
              comment: group.feedback[indexCurrentReviewer].to[index].comment,
            });
          } else {
            tempReviewStatus.push({
              id: item.id,
              username: item.username,
              reviewed: false,
              rate: '',
              comment: '',
            });
          }
        });
        setReviewStatus(tempReviewStatus);
      }
    }
  };

  //   console.log(reviewStatus);

  const retrieveReviewToEdit = (id) => {
    // 1) find the reviews of the current user from group.feedback (for now it is the organiser, but that will have to change)
    const idxCurrReviewer = group.feedback
      .map((item) => item.fromUserID)
      .indexOf(group.organiser);
    // 2) find the review of the specific person from group.feedback[idxCurrReviewer].to[idxUserID]
    const idxUserID = group.feedback[idxCurrReviewer].to
      .map((item) => item.userID)
      .indexOf(id);

    let retirevedReview = {
      rate: group.feedback[idxCurrReviewer].to[idxUserID].rate,
      comment: group.feedback[idxCurrReviewer].to[idxUserID].comment,
    };
    setReviewEdit(retirevedReview);

    setShowEditReview(true);
  };

  console.log(reviewEdit);

  useEffect(() => {
    fecthGroup();
    fetchReviewees();
    // fetchReviewStatus();
  }, [id, group]);

  //   console.log(reviewStatus);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {group !== undefined && group !== {} && group.name && (
            <Fragment>
              <p>{group.name}</p>
              <p>
                To get the reward all participants in the group need to give
                each other feedback. This serves as a proof of completion.
              </p>
              <br></br>
              <p>
                The following skills will be granted to the participants upon
                completion
              </p>
              <br></br>
              <div>
                {' '}
                {group.learning.map((item, index) => (
                  <span key={item} className={`tech-span tech-span---${item}`}>
                    {item}
                  </span>
                ))}
              </div>

              <br></br>
              <h4>reviews</h4>
              <p>
                Give all participants feedback and make sure they will do the
                same.
              </p>
              <div>
                <table>
                  <thead>
                    <tr>
                      <td>username</td>
                      <td>reviewed?</td>
                      <td>rate</td>
                      <td>comment</td>
                      <td>action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewStatus.map((item) => (
                      <tr key={item.id}>
                        <td>{item.username}</td>
                        <td>{item.reviewed ? 'Y' : 'N'}</td>
                        <td>{item.rate}</td>
                        <td>{item.comment}</td>
                        <td>
                          {item.reviewed ? (
                            <BtnCTA
                              label="edit"
                              onCLickAction={() => {
                                retrieveReviewToEdit(item.id);
                              }}
                            />
                          ) : (
                            <BtnCTA
                              label="review"
                              classname="btn-dark-sm"
                              onCLickAction={() => {}}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {showEditReview && (
                <EditReview
                  onClose={() => setShowEditReview(false)}
                  reviewEdit={reviewEdit}
                  setReviewEdit={setReviewEdit}
                />
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ManageGroupPage;
