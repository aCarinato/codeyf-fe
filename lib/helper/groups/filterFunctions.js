export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const filterGroups = (
  groups,
  mentorCheckedIndex,
  participantsCheckedIndex,
  stackCheckedIndex,
  topicsCheckedIndex,
  setFilteredGroups
) => {
  let remainingGroups;
  remainingGroups = groups.filter((group) => {
    // is mentor wanted
    let mentorCondition;
    if (arrayEquals(mentorCheckedIndex, [])) {
      mentorCondition = true;
    } else {
      mentorCondition = mentorCheckedIndex.includes(group.mentorRequired);
    }

    // filter max number of participants
    let participantsCondition;
    if (arrayEquals(participantsCheckedIndex, [])) {
      participantsCondition = true;
    } else {
      participantsCondition = participantsCheckedIndex.includes(
        group.nBuddies.toString()
      );
    }

    // tech stack
    let stackCondition;
    if (arrayEquals(stackCheckedIndex, [])) {
      stackCondition = true;
    } else {
      stackCondition = group.learning.filter((item) =>
        stackCheckedIndex.includes(item._id)
      );
      if (!arrayEquals(stackCondition, [])) {
        stackCondition = true;
      } else {
        stackCondition = false;
      }
    }

    let topicsCondition;
    if (arrayEquals(topicsCheckedIndex, [])) {
      topicsCondition = true;
    } else {
      topicsCondition = group.topics.filter((item) =>
        topicsCheckedIndex.includes(item._id)
      );
      if (!arrayEquals(topicsCondition, [])) {
        topicsCondition = true;
      } else {
        topicsCondition = false;
      }
    }

    // console.log(`-----------------------------------`);
    // console.log(`stackCondition: ${stackCondition}`);
    return (
      mentorCondition &&
      participantsCondition &&
      stackCondition &&
      topicsCondition
    );
  });
  setFilteredGroups(remainingGroups);
};
