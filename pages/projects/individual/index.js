import React, { useEffect, useState } from 'react';
// own components
import SwitchTab from '../../../components/UI/SwitchTab';
import GroupCard from '../../../components/groups/GroupCard';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../context/Context';

function IndividualProjectsPage() {
  const { mobileView } = useMainContext();

  const [studentsActive, setStudentsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/individuals/students`
      );

      if (res.data.success) {
        setStudents(res.data.students);
        // setFilteredStudents(filteredBuddies);
        // if (authState && authState.email.length > 0) {
        //   // filter out current user
        //   const userEmail = authState.email;
        //   let allBuddies = res.data.buddies;
        //   let filteredBuddies = allBuddies.filter(
        //     (buddy) => buddy.email !== userEmail
        //   );
        //   setStudents(filteredBuddies);
        //   setFilteredStudents(filteredBuddies);
        // } else {
        //   setBuddies(res.data.buddies);
        //   setFilteredBuddies(res.data.buddies);
        // }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <h1>Individual Projects</h1>
      <h4 className="h4-header">
        Students and mentors looking for one-to-one learning experiences
      </h4>
      <br></br>
      <SwitchTab
        studentsActive={studentsActive}
        setStudentsActive={setStudentsActive}
      />
      <br></br>
      {studentsActive && (
        <div>
          <h3>Students seeking mentors</h3>
          {/* <h4 className="h4-header">To guide them in their individual project</h4> */}
          <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
            <div>filter</div>
            <div className="flex">
              {students.length > 0 ? (
                students.map((student) => (
                  <GroupCard key={student._id} group={student} />
                ))
              ) : (
                <p>
                  No buddies found for the filters applied. Please select
                  different search parameters.
                </p>
              )}{' '}
              <div className="white-card"></div>
              <div className="white-card"></div>
              <div className="white-card"></div>
            </div>
          </div>
        </div>
      )}
      <br></br>
      <div>
        <h3>Mentors seeking students</h3>
        {/* <h4 className="h4-header">To guide them in their individual project</h4> */}
      </div>
    </>
  );
}

export default IndividualProjectsPage;
