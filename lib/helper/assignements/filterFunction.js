export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const filterAssignements = (
  assignements,
  difficultyCheckedIndex,
  participantsCheckedIndex,
  stackCheckedIndex,
  topicsCheckedIndex,
  setFilteredAssignements
) => {
  let remainingAssignements;
  remainingAssignements = assignements.filter((assignement) => {
    // filter difficulty
    let difficultyCondition;
    if (arrayEquals(difficultyCheckedIndex, [])) {
      difficultyCondition = true;
    } else {
      difficultyCondition = difficultyCheckedIndex.includes(
        assignement.difficulty
      );
    }

    // filter max number of participants
    let participantsCondition;
    if (arrayEquals(participantsCheckedIndex, [])) {
      participantsCondition = true;
    } else {
      participantsCondition = participantsCheckedIndex.includes(
        assignement.maxTeamMemebers.toString()
      );
    }

    // console.log(`stackCheckedIndex: ${stackCheckedIndex}`);
    // console.log(stackCheckedIndex);
    // tech stack
    let stackCondition;
    if (arrayEquals(stackCheckedIndex, [])) {
      stackCondition = true;
    } else {
      stackCondition = assignement.learning.filter((item) =>
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
      topicsCondition = assignement.topics.filter((item) =>
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
      difficultyCondition &&
      participantsCondition &&
      stackCondition &&
      topicsCondition
    );
  });
  setFilteredAssignements(remainingAssignements);
};
