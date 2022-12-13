export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const filterIndividuals = (
  individuals,
  stackCheckedIndex,
  topicsCheckedIndex,
  setFilteredIndividuals
) => {
  let remainingGroups;
  remainingGroups = individuals.filter((group) => {
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
    return stackCondition && topicsCondition;
  });
  setFilteredIndividuals(remainingGroups);
};
