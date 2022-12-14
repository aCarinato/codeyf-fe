import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// functions
import { filterGroups } from '../../../lib/helper/groups/filterFunctions';
// own components
import GroupCard from '../../../components/groups/GroupCard';
import BtnCTA from '../../../components/UI/BtnCTA';
import GroupFilter from '../../../components/groups/GroupFilter';
import GroupFilterMobile from '../../../components/groups/GroupFilterMobile';
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

  return (
    <Fragment>
      <div>
        <h1>Coding Teams</h1>
        <h4 className="h4-header">To learn with and from the others</h4>
        <br></br>
      </div>
      <br></br>
      {showFilter && (
        <GroupFilterMobile
          mentorCheckedIndex={mentorCheckedIndex}
          setMentorCheckedIndex={setMentorCheckedIndex}
          participantsCheckedIndex={participantsCheckedIndex}
          setParticipantsCheckedIndex={setParticipantsCheckedIndex}
          stackCheckedIndex={stackCheckedIndex}
          setStackCheckedIndex={setStackCheckedIndex}
          topicsCheckedIndex={topicsCheckedIndex}
          setTopicsCheckedIndex={setTopicsCheckedIndex}
          filterGroups={() =>
            filterGroups(
              groups,
              mentorCheckedIndex,
              participantsCheckedIndex,
              stackCheckedIndex,
              topicsCheckedIndex,
              setFilteredGroups
            )
          }
          onClose={() => setShowFilter(false)}
        />
      )}
      <div className={mobileView ? 'grid' : `grid grid---2cols-20-80`}>
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
