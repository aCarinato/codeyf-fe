function GroupFilterMobileOptions(props) {
  const {
    allNumbersOfParticipants,
    nParticipantsCheckedIndex,
    setNParticipantsCheckedIndex,
    //
    allMentorWantedSelections,
    mentorCheckedIndex,
    setMentorCheckedIndex,
    //
    allMentorFoundSelections,
    mentorFoundCheckedIndex,
    setMentorFoundCheckedIndex,
    //
    allLearning,
    learningCheckedIndex,
    setLearningCheckedIndex,
  } = props;

  const toggleNParticipants = (id) => {
    // id
    let currentIndex;
    currentIndex = nParticipantsCheckedIndex.indexOf(id);
    const newCheckedIndex = [...nParticipantsCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setNParticipantsCheckedIndex(newCheckedIndex);
  };

  const toggleMentorWanted = (id) => {
    let currentIndex;
    currentIndex = mentorCheckedIndex.indexOf(id);
    const newCheckedIndex = [...mentorCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setMentorCheckedIndex(newCheckedIndex);
  };

  const toggleMentorFound = (id) => {
    let currentIndex;
    currentIndex = mentorFoundCheckedIndex.indexOf(id);
    const newCheckedIndex = [...mentorFoundCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setMentorFoundCheckedIndex(newCheckedIndex);
  };

  const toggleLearning = (id) => {
    let currentIndex;
    currentIndex = learningCheckedIndex.indexOf(id);
    const newCheckedIndex = [...learningCheckedIndex];

    if (currentIndex === -1) {
      newCheckedIndex.push(id);
    } else {
      newCheckedIndex.splice(currentIndex, 1);
    }

    setLearningCheckedIndex(newCheckedIndex);
  };

  return (
    <div>
      <fieldset>
        <legend>Number of participants (buddies and mentors)</legend>
        {allNumbersOfParticipants.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              name={option.value}
              value={option.value}
              onChange={() => toggleNParticipants(option.id)}
              checked={
                nParticipantsCheckedIndex.indexOf(option.id) === -1
                  ? false
                  : true
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
              onChange={() => toggleMentorWanted(option.id)}
              checked={
                mentorCheckedIndex.indexOf(option.id) === -1 ? false : true
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
              onChange={() => toggleMentorFound(option.id)}
              checked={
                mentorFoundCheckedIndex.indexOf(option.id) === -1 ? false : true
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
              onChange={() => toggleLearning(learn.id)}
              type="checkbox"
              id={learn.name}
              name={learn.name}
              value={learn.name}
              checked={
                learningCheckedIndex.indexOf(learn.id) === -1 ? false : true
              }
            />
            <label htmlFor={learn.name}> {learn.name}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

export default GroupFilterMobileOptions;
