import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// data
import { groups } from '../../data/groups';
// own components
import GroupCard from '../../components/groups/GroupCard';
import BtnCTA from '../../components/UI/BtnCTA';
import GroupFilter from '../../components/groups/GroupFilter';
// context
import { useMainContext } from '../../context/Context';

function GroupsPage() {
  const { mobileView } = useMainContext();

  const router = useRouter();

  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    setFilteredGroups(groups);
  }, []);

  return (
    <Fragment>
      {/* <div className="grid grid---2cols-15-85"> */}
      <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
        {!mobileView && (
          <div>
            <GroupFilter
              groups={groups}
              setFilteredGroups={setFilteredGroups}
            />
          </div>
        )}
        <div>
          <div className="flex flex-justify-space-between">
            <div></div>
            <BtnCTA
              label="Create New Group"
              classname="btn-dark"
              onCLickAction={() => router.push('/coding-groups/create-group')}
            />
          </div>
          <br></br>
          <div className="flex">
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
                techStack={group.learning}
                nBuddies={group.nBuddies}
                buddies={group.buddies}
                proposedProject={group.proposedProject}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default GroupsPage;
