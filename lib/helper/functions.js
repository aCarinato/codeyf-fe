export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const checkboxSelection = (
  e,
  stateArray,
  setStateArray,
  allSelectedOptions
) => {
  let currentSelection = [];
  currentSelection = stateArray.slice();

  if (arrayEquals(currentSelection, [])) {
    currentSelection.push(e.target.value);
    setStateArray(currentSelection);
  } else if (arrayEquals(currentSelection, allSelectedOptions)) {
    if (e.target.checked) {
      currentSelection = [];
      currentSelection.push(e.target.value);
    } else {
      const index = currentSelection.indexOf(e.target.value);
      currentSelection.splice(index, 1);
    }

    setStateArray(currentSelection);
  } else {
    if (currentSelection.includes(e.target.value)) {
      const index = currentSelection.indexOf(e.target.value);
      currentSelection.splice(index, 1);
      if (arrayEquals(currentSelection, [])) {
        setStateArray(allSelectedOptions);
      } else {
        setStateArray(currentSelection);
      }
    } else {
      currentSelection.push(e.target.value);
      setStateArray(currentSelection);
    }
  }
};

// function for filtering in mobile when the filter button is pressed
export const funcFilterMentors = (
  peopleArray,
  country,
  language,
  teachingCheckedNames,
  skillsCheckedNames,
  setFilteredPeople
) => {
  let remainingPeople;
  remainingPeople = peopleArray.filter((person) => {
    // filter on country
    let countryCondition;
    if (country === 'all') {
      countryCondition = person.country !== '';
    } else {
      countryCondition = person.country === country;
    }

    // filter on language
    let languageCondition;
    if (language === 'all') {
      languageCondition = person.languages !== [];
    } else {
      languageCondition = person.languages.includes(language);
    }

    //   filter teaching
    let teachingCondition;
    teachingCondition = person.teaching.filter((learn) =>
      teachingCheckedNames.includes(learn)
    );

    if (arrayEquals(teachingCheckedNames, [])) {
      teachingCondition = true;
    } else if (!arrayEquals(teachingCondition, [])) {
      teachingCondition = true;
    } else {
      teachingCondition = false;
    }

    // filter skills
    let skillsCondition;
    skillsCondition = person.skills.filter((skill) =>
      skillsCheckedNames.includes(skill)
    );

    if (arrayEquals(skillsCheckedNames, [])) {
      skillsCondition = true;
    } else if (!arrayEquals(skillsCondition, [])) {
      skillsCondition = true;
    } else {
      skillsCondition = false;
    }

    return (
      countryCondition &&
      languageCondition &&
      teachingCondition &&
      skillsCondition
    );
  });
  // console.log(remainingBuddies);
  setFilteredPeople(remainingPeople);
};

export const funcFilterGroups = (
  groupsArray,
  nParticipantsCheckedNames,
  mentorWantedCheckedValues,
  mentorFoundCheckedValues,
  learningCheckedValues,
  setFilteredGroups
) => {
  let remainingGroups;
  remainingGroups = groupsArray.filter((group) => {
    if (
      mentorWantedCheckedValues.includes('no') &&
      group.mentorRequired === 'no'
    ) {
      // ++++++++++++++++++++++++++++
      // filter number of participants
      let nParticipantsCondition;
      if (arrayEquals(nParticipantsCheckedNames, [])) {
        nParticipantsCondition = true;
      } else {
        nParticipantsCondition = nParticipantsCheckedNames.includes(
          group.nBuddies.toString()
        );
      }

      // ++++++++++++++++++++++++++++
      //   filter learning
      let learningCondition;
      //   console.log(learning);
      learningCondition = group.learning.filter((learn) =>
        learningCheckedValues.includes(learn)
      );

      if (arrayEquals(learningCheckedValues, [])) {
        learningCondition = true;
      } else if (!arrayEquals(learningCondition, [])) {
        learningCondition = true;
      } else {
        learningCondition = false;
      }

      return nParticipantsCondition && learningCondition;
    } else {
      // filter number of participants
      let nParticipantsCondition;
      if (arrayEquals(nParticipantsCheckedNames, [])) {
        nParticipantsCondition = true;
      } else {
        nParticipantsCondition = nParticipantsCheckedNames.includes(
          group.nBuddies.toString()
        );
      }

      // ++++++++++++++++++++++++++++
      // filter if the group already has a mentor
      let mentorWantedCondition;
      mentorWantedCondition = mentorWantedCheckedValues.includes(
        group.mentorRequired
      );

      if (arrayEquals(mentorWantedCheckedValues, []))
        mentorWantedCondition = true;

      let groupHasAllMentors; // can also mean no mentor required
      groupHasAllMentors =
        group.mentors.length === group.nMentorsRequired ? 'yes' : 'no';

      let mentorFoundCondition;
      mentorFoundCondition =
        mentorFoundCheckedValues.includes(groupHasAllMentors);
      if (
        arrayEquals(mentorFoundCheckedValues, []) ||
        groupHasAllMentors === 'yes'
      )
        mentorFoundCondition = true;

      // selected (in the checkbox) 'mentor is required but not found already'
      if (
        arrayEquals(mentorFoundCheckedValues, ['no']) &&
        groupHasAllMentors === 'yes'
      )
        mentorFoundCondition = false;

      // ++++++++++++++++++++++++++++
      //   filter learning
      let learningCondition;
      //   console.log(learning);
      learningCondition = group.learning.filter((learn) =>
        learningCheckedValues.includes(learn)
      );

      if (arrayEquals(learningCheckedValues, [])) {
        learningCondition = true;
      } else if (!arrayEquals(learningCondition, [])) {
        learningCondition = true;
      } else {
        learningCondition = false;
      }

      return (
        nParticipantsCondition &&
        mentorWantedCondition &&
        mentorFoundCondition &&
        learningCondition
      );
    }
  });
  setFilteredGroups(remainingGroups);
};
