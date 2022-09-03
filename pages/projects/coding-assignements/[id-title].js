// react/next
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// data
import { assignements } from '../../../data/assignements';

function AssignementScreen() {
  const router = useRouter();
  const { query } = router;

  const queryVal = query['id-title'];
  let postID;
  if (queryVal) {
    postID = queryVal.split('-')[0];
  }

  const [assignement, setAssignement] = useState();

  // console.log(query['id-title']);
  const fetchAssignement = () => {
    const selectedAssignement = assignements.filter(
      (assignement) => assignement._id === postID
    )[0];
    setAssignement(selectedAssignement);
  };

  useEffect(() => {
    fetchAssignement();
  }, [postID]);

  return (
    assignement &&
    assignement.title && (
      <Fragment>
        <div>AssignementScreen: {assignement.title}</div>
      </Fragment>
    )
  );
}

export default AssignementScreen;
