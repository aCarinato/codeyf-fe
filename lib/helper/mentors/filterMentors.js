export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const filterMentors = (
  mentors,
  country,
  language,
  teachingCheckedIndex,
  skillsCheckedIndex,
  setFilteredMentors
) => {
  let remainingMentors;
  remainingMentors = mentors.filter((mentor) => {
    // filter on country
    let countryCondition;
    if (country === 'all') {
      countryCondition = true;
    } else {
      countryCondition = mentor.country === country;
    }
    // console.log(countryCondition);

    // filter on language
    let languageCondition;
    if (language === 'all') {
      languageCondition = true;
    } else {
      languageCondition = mentor.languages
        .map((item) => item._id)
        .includes(language);
    }

    // filter teaching
    let teachingCondition;
    if (arrayEquals(teachingCheckedIndex, [])) {
      teachingCondition = true;
    } else {
      // array intersection between elements contained (both) in the filter selection and in the mentor.learning
      teachingCondition = mentor.teaching.filter((item) =>
        teachingCheckedIndex.includes(item._id)
      );
      if (!arrayEquals(teachingCondition, [])) {
        teachingCondition = true;
      } else {
        // the mentor does not have any element in his learning array that is included in the filter selection.
        // The comparison is made using the _id
        teachingCondition = false;
      }
    }

    // filter skills level
    let skillsCondition;
    if (arrayEquals(skillsCheckedIndex, [])) {
      skillsCondition = true;
    } else {
      // array intersection between elements contained (both) in the filter selection and in the mentor.skillsLevel
      skillsCondition = mentor.skillsLevel.filter((item) =>
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
      teachingCondition &&
      skillsCondition
    );
  });

  setFilteredMentors(remainingMentors);
};
