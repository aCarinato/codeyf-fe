import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// functions
import { filterGroups } from '../../../lib/helper/groups/filterFunctions';
// own components
import GroupCard from '../../../components/groups/GroupCard';
import BtnCTA from '../../../components/UI/BtnCTA';
import GroupFilter from '../../../components/groups/GroupFilter';
import GroupFilterMobile from '../../../components/groups/mobile-filters/GroupFilterMobile';
// context
import { useMainContext } from '../../../context/Context';
// libs
import axios from 'axios';

function GroupsPage() {
  const { mobileView } = useMainContext();

  const router = useRouter();

  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/groups/`);
      setGroups(res.data.groups);
      setFilteredGroups(res.data.groups);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // FILTER
  const [showFilter, setShowFilter] = useState(false);

  const [mentorCheckedIndex, setMentorCheckedIndex] = useState([]);
  const [participantsCheckedIndex, setParticipantsCheckedIndex] = useState([]);
  const [stackCheckedIndex, setStackCheckedIndex] = useState([]);
  const [topicsCheckedIndex, setTopicsCheckedIndex] = useState([]);
  // console.log(mentorCheckedIndex);
  useEffect(() => {
    if (!mobileView) {
      filterGroups(
        groups,
        mentorCheckedIndex,
        participantsCheckedIndex,
        stackCheckedIndex,
        topicsCheckedIndex,
        setFilteredGroups
      );
    }
  }, [
    mentorCheckedIndex,
    participantsCheckedIndex,
    stackCheckedIndex,
    topicsCheckedIndex,
  ]);

  // //   number of participants
  // const [nParticipants, setNParticipants] = useState([]);

  // //   mentor wanted
  // const [mentorWanted, setMentorWanted] = useState([]);
  // const allMentorWantedSelectionsValues = allMentorWantedSelections.map(
  //   (item) => item.label
  // );

  // //   mentor found
  // const [mentorFound, setMentorFound] = useState([]);
  // const allMentorFoundSelectionsValues = allMentorFoundSelections.map(
  //   (item) => item.label
  // );

  // //   learning
  // const [learning, setLearning] = useState([]);
  // const allLearningNames = allLearning.map((learning) => learning.name);

  // // MOBILE FILTER
  // // number of participants
  // const [nParticipantsCheckedIndex, setNParticipantsCheckedIndex] = useState(
  //   []
  // );
  // const [nParticipantsCheckedValues, setNParticipantsCheckedValues] = useState(
  //   []
  // );
  // // mentor wanted
  // const [mentorCheckedIndex, setMentorCheckedIndex] = useState([]);
  // const [mentorCheckedValues, setMentorCheckedValues] = useState([]);
  // // mentor found
  // const [mentorFoundCheckedIndex, setMentorFoundCheckedIndex] = useState([]);
  // const [mentorFoundCheckedValues, setMentorFoundCheckedValues] = useState([]);
  // // wants to learn
  // const [learningCheckedIndex, setLearningCheckedIndex] = useState([]);
  // const [learningCheckedValues, setLearningCheckedValues] = useState([]);

  // // useEffect(() => {
  // //   setFilteredGroups(groups);
  // // }, []);

  // useEffect(() => {
  //   // THIS IS TO MAP THE CHECKED INDECES TO THEIR NAMES
  //   let currentNParticipants;
  //   currentNParticipants = allNumbersOfParticipants.filter((item) =>
  //     nParticipantsCheckedIndex.includes(item.id)
  //   );
  //   let currentNParticipantsValues;
  //   currentNParticipantsValues = currentNParticipants.flatMap(
  //     (item) => item.value
  //   );
  //   setNParticipantsCheckedValues(currentNParticipantsValues);

  //   // mentor wanted
  //   let currentMentorWanted;
  //   currentMentorWanted = allMentorWantedSelections.filter((item) =>
  //     mentorCheckedIndex.includes(item.id)
  //   );
  //   let currentMentorWantedValues;
  //   currentMentorWantedValues = currentMentorWanted.map((item) => item.label);
  //   setMentorCheckedValues(currentMentorWantedValues);

  //   // mentor found
  //   let currentMentorFound;
  //   currentMentorFound = allMentorFoundSelections.filter((item) =>
  //     mentorFoundCheckedIndex.includes(item.id)
  //   );
  //   let currentMentorFoundValues;
  //   currentMentorFoundValues = currentMentorFound.map((item) => item.label);

  //   setMentorFoundCheckedValues(currentMentorFoundValues);

  //   // learning
  //   let currentLearning;
  //   currentLearning = allLearning.filter((item) =>
  //     learningCheckedIndex.includes(item.id)
  //   );
  //   let currentLearningValues;
  //   currentLearningValues = currentLearning.map((item) => item.name);

  //   setLearningCheckedValues(currentLearningValues);
  // }, [
  //   nParticipantsCheckedIndex,
  //   mentorCheckedIndex,
  //   mentorFoundCheckedIndex,
  //   learningCheckedIndex,
  // ]);

  // console.log(learningCheckedValues);

  // const filterGroups = () => {
  //   // filterGroups(
  //   //   groups,
  //   //   nParticipantsCheckedValues,
  //   //   mentorCheckedValues,
  //   //   mentorFoundCheckedValues,
  //   //   learningCheckedValues,
  //   //   setFilteredGroups
  //   // );
  // };

  return (
    <Fragment>
      <div>
        <h1>Coding Teams</h1>
        <h4 className="h4-header">To learn with and from the others</h4>
        <br></br>
      </div>
      <br></br>
      {showFilter && (
        <></>
        // <GroupFilterMobile
        //   // setFilteredGroups={setFilteredGroups}
        //   allNumbersOfParticipants={allNumbersOfParticipants}
        //   nParticipantsCheckedIndex={nParticipantsCheckedIndex}
        //   setNParticipantsCheckedIndex={setNParticipantsCheckedIndex}
        //   //
        //   allMentorWantedSelections={allMentorWantedSelections}
        //   mentorCheckedIndex={mentorCheckedIndex}
        //   setMentorCheckedIndex={setMentorCheckedIndex}
        //   //
        //   allMentorFoundSelections={allMentorFoundSelections}
        //   mentorFoundCheckedIndex={mentorFoundCheckedIndex}
        //   setMentorFoundCheckedIndex={setMentorFoundCheckedIndex}
        //   //
        //   learningCheckedIndex={learningCheckedIndex}
        //   setLearningCheckedIndex={setLearningCheckedIndex}
        //   allLearning={allLearning}
        //   //
        //   filterGroups={filterGroups}
        //   onClose={() => setShowFilter(false)}
        // />
      )}
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && (
          <div>
            <GroupFilter
              mentorCheckedIndex={mentorCheckedIndex}
              setMentorCheckedIndex={setMentorCheckedIndex}
              participantsCheckedIndex={participantsCheckedIndex}
              setParticipantsCheckedIndex={setParticipantsCheckedIndex}
              stackCheckedIndex={stackCheckedIndex}
              setStackCheckedIndex={setStackCheckedIndex}
              topicsCheckedIndex={topicsCheckedIndex}
              setTopicsCheckedIndex={setTopicsCheckedIndex}
            />
            {/* <GroupFilter
              groups={groups}
              setFilteredGroups={setFilteredGroups}
              allNumbersOfParticipants={allNumbersOfParticipants}
              nParticipants={nParticipants}
              setNParticipants={setNParticipants}
              mentorWanted={mentorWanted}
              setMentorWanted={setMentorWanted}
              allMentorWantedSelections={allMentorWantedSelections}
              allMentorWantedSelectionsValues={allMentorWantedSelectionsValues}
              mentorFound={mentorFound}
              setMentorFound={setMentorFound}
              allMentorFoundSelectionsValues={allMentorFoundSelectionsValues}
              learning={learning}
              setLearning={setLearning}
              allLearningNames={allLearningNames}
              allMentorFoundSelections={allMentorFoundSelections}
              allLearning={allLearning}
            /> */}
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
              label="Create New Team"
              classname="btn-dark"
              onCLickAction={() => router.push('/projects/coding-groups/new')}
            />
          </div>
          <br></br>
          <div className="flex">
            {mobileView && (
              <BtnCTA
                label="filter groups"
                classname="btn-light-big"
                onCLickAction={() => setShowFilter(true)}
                icon={true}
                iconType="ci:filter-outline"
              />
            )}
            {filteredGroups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))}{' '}
            <div className="white-card"></div>
            <div className="white-card"></div>
            <div className="white-card"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GroupsPage;
