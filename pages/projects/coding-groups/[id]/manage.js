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

  const [currentUser, setCurrentUser] = useState(null);

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviewees, setReviewees] = useState([]);
  const [reviewStatus, setReviewStatus] = useState([]);

  const [reviewEdit, setReviewEdit] = useState({});

  //   modal for reviewing
  const [showEditReview, setShowEditReview] = useState(false);

  const [reviewsOnMe, setReviewsOnMe] = useState([]);
  //   [{from: '3', complete: true, rate: '4', comment: 'Communication to improve'}, {from: '7', complete: false, rate: '', comment: ''}, {from: '8', complete: false, rate: '', comment: ''}, ]
  const fetchReviewsOnMe = () => {
    if (
      group !== undefined &&
      group !== {} &&
      group.name &&
      currentUser !== null
    ) {
      let tempReviewsOnMe = [];
      // find all participants
      const reviewers = group.buddies.filter((item) => item !== currentUser.id);
      //   reviewers = ['3','7', '8']
      //  find the index of the reviews in group.feedback
      reviewers.map((item) => {
        const idxCurrReviewer = group.feedback
          .map((item2) => item2.fromUserID)
          .indexOf(item);

        //   find the index of the review about current user
        if (idxCurrReviewer !== -1) {
          const idxUserID = group.feedback[idxCurrReviewer].to
            .map((item) => item.userID)
            .indexOf(currentUser.id);

          if (idxUserID === -1) {
            let tempReviewsOnMeItem = {
              from: item,
              complete: false,
              rate: '',
              comment: '',
            };
            tempReviewsOnMe.push(tempReviewsOnMeItem);
          } else {
            let tempReviewsOnMeItem = {
              from: item,
              complete: true,
              rate: group.feedback[idxCurrReviewer].to[idxUserID].rate,
              comment: group.feedback[idxCurrReviewer].to[idxUserID].comment,
            };
            tempReviewsOnMe.push(tempReviewsOnMeItem);
          }
        } else {
          let tempReviewsOnMeItem = {
            from: item,
            complete: false,
            rate: '',
            comment: '',
          };
          tempReviewsOnMe.push(tempReviewsOnMeItem);
        }
      });

      setReviewsOnMe(tempReviewsOnMe);
    }
  };

  const fetchCurrentUser = () => {
    if (group !== undefined && group !== {} && group.name) {
      const currentUserId = group.organiser;
      const filteredUser = people.filter(
        (person) => person.id === currentUserId
      )[0];
      setCurrentUser(filteredUser);
    }
  };

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

  //   console.log(reviewEdit);

  useEffect(() => {
    fecthGroup();
    fetchCurrentUser();
    fetchReviewees();
    fetchReviewsOnMe();
    // fetchReviewStatus();
  }, [id, group, currentUser]);

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
              <h4>Review the other participants</h4>
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
              <br></br>
              <h4>Reviews from the other participants</h4>
              <p>This is what the others had to say about you.</p>
              <div>
                <table>
                  <thead>
                    <tr>
                      <td>username</td>
                      <td>reviewed?</td>
                      <td>rate</td>
                      <td>comment</td>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewsOnMe.map((item) => (
                      <tr key={item.from}>
                        <td>
                          {
                            people.filter(
                              (person) => person.id === item.from
                            )[0].username
                          }
                        </td>
                        <td>{item.complete ? 'Y' : 'N'}</td>
                        <td>{item.rate}</td>
                        <td>{item.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <br></br>
              {/* {currentUser !== null && group.organiser === currentUser.id && (
                <div>
                  <h4>Review status from all participants</h4>
                  {group.buddies.map((item) => {
                    if (item !== currentUser.id) {
                      return (
                        <p key={item}>
                          {
                            people.filter((person) => person.id === item)[0]
                              .username
                          }
                        </p>
                      );
                    }
                  })}
                </div>
              )}
              <br></br> */}
              {currentUser !== null && group.organiser === currentUser.id && (
                <div>
                  <h4>Review status from all participants (part2)</h4>
                  <table>
                    <thead>
                      <tr>
                        <td>from</td>
                        <td>to</td>
                        <td>rate</td>
                        <td>comment</td>
                      </tr>
                    </thead>
                    <tbody>
                      {group.feedback.map((item) => {
                        if (item.fromUserID !== currentUser.id) {
                          return item.to.map((to) => (
                            <tr key={to.userID}>
                              <td>
                                {
                                  people.filter(
                                    (person) => person.id === item.fromUserID
                                  )[0].username
                                }
                              </td>
                              <td>
                                {
                                  people.filter(
                                    (person) => person.id === to.userID
                                  )[0].username
                                }
                              </td>
                              <td>{to.rate}</td>
                              <td>{to.comment}</td>
                            </tr>
                          ));
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              )}
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
