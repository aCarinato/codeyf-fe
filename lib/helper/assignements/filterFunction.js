export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const functFilterAssignements = (
  assignements,
  difficultyCheckedIndex,
  participantsCheckedIndex,
  stackCheckedIndex,
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
        assignement.difficulty._id
      );
    }

    // filter max number of participants
    let participantsCondition;
    if (arrayEquals(participantsCheckedIndex, [])) {
      participantsCondition = true;
    } else {
      participantsCondition = participantsCheckedIndex.includes(
        assignement.maxParticipants.label
      );
    }

    // tech stack
    let stackCondition;
    if (arrayEquals(stackCheckedIndex, [])) {
      stackCondition = true;
    } else {
      stackCondition = assignement.stack.filter((item) =>
        stackCheckedIndex.includes(item._id)
      );
      if (!arrayEquals(stackCondition, [])) {
        stackCondition = true;
      } else {
        stackCondition = false;
      }
    }

    return difficultyCondition && participantsCondition && stackCondition;
  });
  setFilteredAssignements(remainingAssignements);
};
