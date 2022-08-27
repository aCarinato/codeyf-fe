import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// data
import { groups } from '../../data/groups';
// own components
import GroupCard from '../../components/groups/GroupCard';
import BtnCTA from '../../components/UI/BtnCTA';
import GroupFilter from '../../components/groups/GroupFilter';
// context
// import { useMainContext } from '../../context/Context';

function GroupsPage() {
  // const { people } = useMainContext();
  const router = useRouter();

  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    setFilteredGroups(groups);
  }, []);

  return (
    <Fragment>
      <div className="grid grid---2cols-30-70">
        <div>
          <GroupFilter groups={groups} setFilteredGroups={setFilteredGroups} />
        </div>
        <div>
          <div className="btn-container-10">
            <BtnCTA
              label="Create Group"
              classname="btn-dark"
              onCLickAction={() => router.push('/coding-groups/create-group')}
            />
          </div>
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
