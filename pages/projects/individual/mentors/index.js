import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// own components
import IndividualCard from '../../../../components/individual/IndividualCard';
import IndividualFilter from '../../../../components/individual/IndividualFilter';
import IndividualFilterMobile from '../../../../components/individual/IndividualFilterMobile';
import BtnCTA from '../../../../components/UI/BtnCTA';
// own funcs
import { filterIndividuals } from '../../../../lib/helper/individuals/filterFunctions';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function IndividualProjectsPage() {
  const { mobileView } = useMainContext();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  // FILTER
  const [showFilter, setShowFilter] = useState(false);
  const [stackCheckedIndex, setStackCheckedIndex] = useState([]);
  const [topicsCheckedIndex, setTopicsCheckedIndex] = useState([]);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/individuals/mentors`
      );

      if (res.data.success) {
        setMentors(res.data.mentors);
        setFilteredMentors(res.data.mentors);
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
    fetchMentors();
  }, []);

  useEffect(() => {
    if (!mobileView) {
      filterIndividuals(
        mentors,
        stackCheckedIndex,
        topicsCheckedIndex,
        setFilteredMentors
      );
    }
  }, [stackCheckedIndex, topicsCheckedIndex]);

  return (
    <>
      <h1>Individual Projects</h1>
      <h4 className="h4-header">
        Mentors seek mentees for one-to-one learning experiences
      </h4>
      <br></br>
      {showFilter && (
        <IndividualFilterMobile
          stackCheckedIndex={stackCheckedIndex}
          setStackCheckedIndex={setStackCheckedIndex}
          topicsCheckedIndex={topicsCheckedIndex}
          setTopicsCheckedIndex={setTopicsCheckedIndex}
          filterIndividuals={() => {
            filterIndividuals(
              mentors,
              stackCheckedIndex,
              topicsCheckedIndex,
              setFilteredMentors
            );
          }}
          onClose={() => setShowFilter(false)}
        />
      )}
      <br></br>
      <div className={mobileView ? 'grid' : `grid grid---2cols-20-80`}>
        {!mobileView && (
          <div>
            <IndividualFilter
              stackCheckedIndex={stackCheckedIndex}
              setStackCheckedIndex={setStackCheckedIndex}
              topicsCheckedIndex={topicsCheckedIndex}
              setTopicsCheckedIndex={setTopicsCheckedIndex}
            />
          </div>
        )}
        <div>
          <div
            className={
              mobileView
                ? 'flex flex-justify-center'
                : 'flex flex-justify-space-between'
            }
          >
            {!mobileView && <div></div>}
            <BtnCTA
              label="Create New Project"
              classname="btn-dark"
              onCLickAction={() => router.push('/projects/individual/new')}
            />
          </div>
          <br></br>
          <div className="flex gap-12 padding-12rem">
            {mobileView && (
              <BtnCTA
                label="filter groups"
                classname="btn-light-big"
                onCLickAction={() => setShowFilter(true)}
                icon={true}
                iconType="ci:filter-outline"
              />
            )}
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <IndividualCard key={mentor._id} group={mentor} type="mentor" />
              ))
            ) : (
              <p>
                No mentors found for the filters applied. Please select
                different search parameters.
              </p>
            )}
            <div className="white-card"></div>
            <div className="white-card"></div>
            <div className="white-card"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualProjectsPage;
