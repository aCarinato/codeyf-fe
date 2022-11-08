import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// data
import { groups } from '../../../data/groups';
import { allNumbersOfParticipants } from '../../../data/allNumbersOfParticipants';
import { allMentorFoundSelections } from '../../../data/allMentorFound';
import { allMentorWantedSelections } from '../../../data/allMentorWanted';
import { allLearning } from '../../../data/allLearning';
// functions
import { funcFilterGroups } from '../../../lib/helper/functions';
// own components
import GroupCard from '../../../components/groups/GroupCard';
import BtnCTA from '../../../components/UI/BtnCTA';
import GroupFilter from '../../../components/groups/GroupFilter';
import GroupFilterMobile from '../../../components/groups/mobile-filters/GroupFilterMobile';
// context
import { useMainContext } from '../../../context/Context';

function GroupsPage() {
  const { mobileView } = useMainContext();

  const router = useRouter();

  const [filteredGroups, setFilteredGroups] = useState([]);
  // FILTER
  const [showFilter, setShowFilter] = useState(false);

  //   number of participants
  const [nParticipants, setNParticipants] = useState([]);

  //   mentor wanted
  const [mentorWanted, setMentorWanted] = useState([]);
  const allMentorWantedSelectionsValues = allMentorWantedSelections.map(
    (item) => item.label
  );

  //   mentor found
  const [mentorFound, setMentorFound] = useState([]);
  const allMentorFoundSelectionsValues = allMentorFoundSelections.map(
    (item) => item.label
  );

  //   learning
  const [learning, setLearning] = useState([]);
  const allLearningNames = allLearning.map((learning) => learning.name);

  // MOBILE FILTER
  // number of participants
  const [nParticipantsCheckedIndex, setNParticipantsCheckedIndex] = useState(
    []
  );
  const [nParticipantsCheckedValues, setNParticipantsCheckedValues] = useState(
    []
  );
  // mentor wanted
  const [mentorCheckedIndex, setMentorCheckedIndex] = useState([]);
  const [mentorCheckedValues, setMentorCheckedValues] = useState([]);
  // mentor found
  const [mentorFoundCheckedIndex, setMentorFoundCheckedIndex] = useState([]);
  const [mentorFoundCheckedValues, setMentorFoundCheckedValues] = useState([]);
  // wants to learn
  const [learningCheckedIndex, setLearningCheckedIndex] = useState([]);
  const [learningCheckedValues, setLearningCheckedValues] = useState([]);

  useEffect(() => {
    setFilteredGroups(groups);
  }, []);

  useEffect(() => {
    // THIS IS TO MAP THE CHECKED INDECES TO THEIR NAMES
    let currentNParticipants;
    currentNParticipants = allNumbersOfParticipants.filter((item) =>
      nParticipantsCheckedIndex.includes(item.id)
    );
    let currentNParticipantsValues;
    currentNParticipantsValues = currentNParticipants.flatMap(
      (item) => item.value
    );
    setNParticipantsCheckedValues(currentNParticipantsValues);

    // mentor wanted
    let currentMentorWanted;
    currentMentorWanted = allMentorWantedSelections.filter((item) =>
      mentorCheckedIndex.includes(item.id)
    );
    let currentMentorWantedValues;
    currentMentorWantedValues = currentMentorWanted.map((item) => item.label);
    setMentorCheckedValues(currentMentorWantedValues);

    // mentor found
    let currentMentorFound;
    currentMentorFound = allMentorFoundSelections.filter((item) =>
      mentorFoundCheckedIndex.includes(item.id)
    );
    let currentMentorFoundValues;
    currentMentorFoundValues = currentMentorFound.map((item) => item.label);

    setMentorFoundCheckedValues(currentMentorFoundValues);

    // learning
    let currentLearning;
    currentLearning = allLearning.filter((item) =>
      learningCheckedIndex.includes(item.id)
    );
    let currentLearningValues;
    currentLearningValues = currentLearning.map((item) => item.name);

    setLearningCheckedValues(currentLearningValues);
  }, [
    nParticipantsCheckedIndex,
    mentorCheckedIndex,
    mentorFoundCheckedIndex,
    learningCheckedIndex,
  ]);

  // console.log(learningCheckedValues);

  const filterGroups = () => {
    funcFilterGroups(
      groups,
      nParticipantsCheckedValues,
      mentorCheckedValues,
      mentorFoundCheckedValues,
      learningCheckedValues,
      setFilteredGroups
    );
  };

  return (
    <Fragment>
      <div>
        <h1>Coding Groups</h1>
        <h4 className="h4-header">To learn with and from the others</h4>
        <br></br>
      </div>
      <br></br>
      {showFilter && (
        <GroupFilterMobile
          // setFilteredGroups={setFilteredGroups}
          allNumbersOfParticipants={allNumbersOfParticipants}
          nParticipantsCheckedIndex={nParticipantsCheckedIndex}
          setNParticipantsCheckedIndex={setNParticipantsCheckedIndex}
          //
          allMentorWantedSelections={allMentorWantedSelections}
          mentorCheckedIndex={mentorCheckedIndex}
          setMentorCheckedIndex={setMentorCheckedIndex}
          //
          allMentorFoundSelections={allMentorFoundSelections}
          mentorFoundCheckedIndex={mentorFoundCheckedIndex}
          setMentorFoundCheckedIndex={setMentorFoundCheckedIndex}
          //
          learningCheckedIndex={learningCheckedIndex}
          setLearningCheckedIndex={setLearningCheckedIndex}
          allLearning={allLearning}
          //
          filterGroups={filterGroups}
          onClose={() => setShowFilter(false)}
        />
      )}
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && (
          <div>
            <GroupFilter
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
              label="Create New Group"
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
              <GroupCard
                key={group._id}
                id={group._id}
                name={group.name}
                description={group.description}
                techStack={group.learning}
                nBuddies={group.nBuddies}
                buddies={group.buddies}
                proposedProject={group.proposedProject}
              />
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
