export const calcCompletionStatus = (group) => {
  if (group.requirements && group.requirements.length > 0) {
    const nMet = 0;
    group.requirements.forEach((requirement) => {
      if (requirement.met) nMet++;
    });
    // console.log(`nMet: ${nMet}`);
    const ratio = Math.ceil(nMet / group.requirements.length);
    return ratio;
  } else {
    return 0;
  }
};
