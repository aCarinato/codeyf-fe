import { useEffect, useState } from 'react';
// data
// import { allMentorWantedSelections } from '../../data/allMentorWanted';
// import { allMentorFoundSelections } from '../../data/allMentorFound';
// import { allLearning } from '../../data/allLearning';
// helper functions
import { checkboxSelection, arrayEquals } from '../../lib/helper/functions';

function GroupFilter(props) {
  const {
    groups,
    nParticipants,
    setNParticipants,
    setFilteredGroups,
    allNumbersOfParticipants,
    mentorWanted,
    setMentorWanted,
    allMentorWantedSelections,
    allMentorWantedSelectionsValues,
    mentorFound,
    setMentorFound,
    allMentorFoundSelectionsValues,
    learning,
    setLearning,
    allLearningNames,
    allMentorFoundSelections,
    allLearning,
  } = props;

  useEffect(() => {
    let remainingGroups;
    // console.log('**************************************');
    remainingGroups = groups.filter((group) => {
      //   console.log('GROUP N: ' + group.id);

      //   console.log(mentorWanted.includes('no'));
      //   console.log(group.mentorRequired === 'no');

      if (mentorWanted.includes('no') && group.mentorRequired === 'no') {
        // console.log('CONDIZIONE SODDISFETTA');

        // ++++++++++++++++++++++++++++
        // filter number of participants
        let nParticipantsCondition;

        // Transform the array in true or false
        if (arrayEquals(nParticipants, [])) {
          nParticipantsCondition = true;
        } else {
          nParticipantsCondition = nParticipants.includes(
            group.nBuddies.toString()
          );
        }

        // ++++++++++++++++++++++++++++
        //   filter learning
        let learningCondition;
        //   console.log(learning);
        learningCondition = group.learning.filter((learn) =>
          learning.includes(learn)
        );

        if (arrayEquals(learning, [])) {
          learningCondition = true;
        } else if (!arrayEquals(learningCondition, [])) {
          learningCondition = true;
        } else {
          learningCondition = false;
        }
        return true && learningCondition && nParticipantsCondition;
      } else {
        // ++++++++++++++++++++++++++++
        // filter number of participants
        let nParticipantsCondition;
        if (arrayEquals(nParticipants, [])) {
          nParticipantsCondition = true;
        } else {
          nParticipantsCondition = nParticipants.includes(
            group.nBuddies.toString()
          );
        }
        // ++++++++++++++++++++++++++++
        // filter if the group already has a mentor
        let mentorWantedCondition;
        mentorWantedCondition = mentorWanted.includes(group.mentorRequired);

        if (arrayEquals(mentorWanted, [])) mentorWantedCondition = true;

        // console.log('Mentor wanted selected?');
        // console.log(mentorWantedCondition);

        let groupHasAllMentors; // can also mean no mentor required
        groupHasAllMentors =
          group.mentors.length === group.nMentorsRequired ? 'yes' : 'no';

        let mentorFoundCondition;
        mentorFoundCondition = mentorFound.includes(groupHasAllMentors);
        if (arrayEquals(mentorFound, []) || groupHasAllMentors === 'yes')
          mentorFoundCondition = true;

        // selected (in the checkbox) 'mentor is required but not found already'
        if (arrayEquals(mentorFound, ['no']) && groupHasAllMentors === 'yes')
          mentorFoundCondition = false;

        //   filter learning
        let learningCondition;
        //   console.log(learning);
        learningCondition = group.learning.filter((learn) =>
          learning.includes(learn)
        );

        if (arrayEquals(learning, [])) {
          learningCondition = true;
        } else if (!arrayEquals(learningCondition, [])) {
          learningCondition = true;
        } else {
          learningCondition = false;
        }

        return (
          mentorWantedCondition &&
          mentorFoundCondition &&
          learningCondition &&
          nParticipantsCondition
        );
      }
    });

    setFilteredGroups(remainingGroups);
  }, [nParticipants, mentorWanted, mentorFound, learning]);

  return (
    <div>
      <h3>Filter Groups</h3>
      <br></br>
      <fieldset>
        <legend>Number of participants (buddies and mentors)</legend>
        {allNumbersOfParticipants.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              name={option.value}
              value={option.value}
              onChange={(e) =>
                checkboxSelection(
                  e,
                  nParticipants,
                  setNParticipants,
                  allNumbersOfParticipants
                )
              }
            />
            <label htmlFor={option.value}> {option.value}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Mentor wanted</legend>
        {allMentorWantedSelections.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              name={option.label}
              value={option.label}
              onChange={(e) =>
                checkboxSelection(
                  e,
                  mentorWanted,
                  setMentorWanted,
                  allMentorWantedSelectionsValues
                )
              }
            />
            <label htmlFor={option.label}> {option.label}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Mentor found already</legend>
        {allMentorFoundSelections.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              name={option.label}
              value={option.label}
              onChange={(e) =>
                checkboxSelection(
                  e,
                  mentorFound,
                  setMentorFound,
                  allMentorFoundSelectionsValues
                )
              }
            />
            <label htmlFor={option.label}> {option.label}</label>
          </div>
        ))}
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Wants to learn</legend>
        {allLearning.map((learn) => (
          <div key={learn.id}>
            <input
              //   onChange={selectLearning}
              onChange={(e) =>
                checkboxSelection(e, learning, setLearning, allLearningNames)
              }
              type="checkbox"
              id={learn.name}
              name={learn.name}
              value={learn.name}
            />
            <label htmlFor={learn.name}> {learn.name}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default GroupFilter;
