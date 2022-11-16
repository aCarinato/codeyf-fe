export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const filterBuddies = (
  buddies,
  country,
  language,
  learningCheckedIndex,
  skillsCheckedIndex,
  setFilteredBuddies
) => {
  let remainingBuddies;
  remainingBuddies = buddies.filter((buddy) => {
    // filter on country
    let countryCondition;
    if (country === 'all') {
      // countryCondition = buddy.country !== '';
      countryCondition = true;
    } else {
      countryCondition = buddy.country === country;
    }
    // console.log(countryCondition);

    // filter on language
    let languageCondition;
    if (language === 'all') {
      languageCondition = true;
    } else {
      languageCondition = buddy.languages
        .map((item) => item._id)
        .includes(language);
    }

    // filter learning
    let learningCondition;
    if (arrayEquals(learningCheckedIndex, [])) {
      learningCondition = true;
    } else {
      // array intersection between elements contained (both) in the filter selection and in the buddy.learning
      learningCondition = buddy.learning.filter((item) =>
        learningCheckedIndex.includes(item._id)
      );
      if (!arrayEquals(learningCondition, [])) {
        learningCondition = true;
      } else {
        // the buddy does not have any element in his learning array that is included in the filter selection.
        // The comparison is made using the _id
        learningCondition = false;
      }
    }

    // filter skills level
    let skillsCondition;
    if (arrayEquals(skillsCheckedIndex, [])) {
      skillsCondition = true;
    } else {
      // array intersection between elements contained (both) in the filter selection and in the buddy.skillsLevel
      skillsCondition = buddy.skillsLevel.filter((item) =>
        skillsCheckedIndex.includes(item._id)
      );
      if (!arrayEquals(skillsCondition, [])) {
        skillsCondition = true;
      } else {
        skillsCondition = false;
      }
    }

    return (
      languageCondition &&
      countryCondition &&
      learningCondition &&
      skillsCondition
    );
  });

  setFilteredBuddies(remainingBuddies);
};
