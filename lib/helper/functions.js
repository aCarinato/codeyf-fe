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

    // //   filter learning
    // let learningCondition;
    // learningCondition = person.learning.filter((learn) =>
    //   learningCheckedNames.includes(learn)
    // );

    // if (arrayEquals(learningCheckedNames, [])) {
    //   learningCondition = true;
    // } else if (!arrayEquals(learningCondition, [])) {
    //   learningCondition = true;
    // } else {
    //   learningCondition = false;
    // }

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
