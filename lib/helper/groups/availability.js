export const calcBuddyAvailabilityMsg = (group) => {
  let buddyAvailabilityMsg;

  //   const buddyRequired = group.nBuddies;
  const buddyPositionFilled = group.buddiesFilled;

  if (buddyPositionFilled) {
    buddyAvailabilityMsg = (
      <p className="card-group-unavailable">Buddy position filled</p>
    );
  } else {
    let NSpotsAvailable;

    if (group.buddies) NSpotsAvailable = group.nBuddies - group.buddies.length;

    buddyAvailabilityMsg = (
      <p className="card-group-available">
        {NSpotsAvailable} buddy position
        {NSpotsAvailable > 1 && <span>s</span>} still available!
      </p>
    );
  }

  return buddyAvailabilityMsg;
};

export const calcMentorAvailabilityMsg = (group) => {
  let mentorAvailabilityMsg;
  const mentorRequired = group.mentorRequired;
  const mentorPositionFilled = group.mentorsFilled;

  if (!mentorRequired) {
    mentorAvailabilityMsg = <p>No mentor required</p>;
  }

  if (mentorRequired && mentorPositionFilled) {
    mentorAvailabilityMsg = (
      <p className="card-group-unavailable">Mentor position filled</p>
    );
  }

  if (mentorRequired && !mentorPositionFilled) {
    const NSpotsAvailable = group.nMentorsRequired - group.mentors.length;

    mentorAvailabilityMsg = (
      <p className="card-group-available">
        {NSpotsAvailable} mentor position
        {NSpotsAvailable > 1 && <span>s</span>} still available!
      </p>
    );
  }
  //   console.log(mentorAvailabilityMsg);
  return mentorAvailabilityMsg;
};

export const calcBuddyAvailabilityCTA = (group, currentUser) => {
  // the scope of the funtion is whether or not telling if joining as a mentor
  //  returns true or false
  let buddyAvailabilityCTA;
  //   console.log(`group.organiser._id: ${group.organiser._id}`);
  //   console.log(`currentUser === null: ${currentUser === null}`);

  //   const isOrganiser = group.organiser._id === currentUser._id;
  // const mentorRequired = group.mentorRequired;
  const buddyPositionFilled = group.buddiesFilled;

  if (buddyPositionFilled) {
    // mentor is required but mentor position is already filled
    buddyAvailabilityCTA = false;
  } else if (!buddyPositionFilled) {
    // mentor is required and mentor position is not filled
    if (currentUser === null) {
      // user is not logged in
      // no user logged in. does not need to take into account if it is a mentor or not
      buddyAvailabilityCTA = true;
    } else if (currentUser._id.length === 0) {
      buddyAvailabilityCTA = true;
    } else if (currentUser._id.length > 0) {
      if (
        group.buddies &&
        group.buddies.map((buddy) => buddy._id).includes(currentUser._id)
      ) {
        // the current user already in the group
        buddyAvailabilityCTA = false;
      } else {
        buddyAvailabilityCTA = true;
      }
    }
  }

  return buddyAvailabilityCTA;
};

export const calcMentorAvailabilityCTA = (group, currentUser) => {
  // the scope of the funtion is whether or not telling if joining as a mentor
  //  returns true or false
  let mentorAvailabilityCTA;
  //   console.log(`group.organiser._id: ${group.organiser._id}`);
  //   console.log(`currentUser === null: ${currentUser === null}`);

  //   const isOrganiser = group.organiser._id === currentUser._id;
  const mentorRequired = group.mentorRequired;
  const mentorPositionFilled = group.mentorsFilled;

  if (!mentorRequired) {
    // mentor not required
    mentorAvailabilityCTA = false;
  } else if (mentorRequired && mentorPositionFilled) {
    // mentor is required but mentor position is already filled
    mentorAvailabilityCTA = false;
  } else if (mentorRequired && !mentorPositionFilled) {
    // mentor is required and mentor position is not filled
    if (currentUser === null) {
      // user is not logged in
      // no user logged in. does not need to take into account if it is a mentor or not
      mentorAvailabilityCTA = true;
    } else if (currentUser._id.length === 0) {
      mentorAvailabilityCTA = true;
    } else if (currentUser._id.length > 0) {
      if (currentUser.isMentor) {
        if (
          group.mentors.map((mentor) => mentor._id).includes(currentUser._id)
        ) {
          // the current user already in the group
          mentorAvailabilityCTA = false;
        } else {
          mentorAvailabilityCTA = true;
        }
      } else if (!currentUser.isMentor) mentorAvailabilityCTA = false; // no need to propose apply as a mentor if is not a mentor
    }
  }

  console.log(`mentorRequired: ${mentorRequired}`);
  console.log(`mentorPositionFilled: ${mentorPositionFilled}`);
  if (currentUser && currentUser._id) {
    console.log(`currentUser._id.length: ${currentUser._id.length}`);
    console.log(`currentUser.isMentor: ${currentUser.isMentor}`);
    console.log(
      `group.mentors.map((mentor) => mentor._id).includes(currentUser._id): ${group.mentors
        .map((mentor) => mentor._id)
        .includes(currentUser._id)}`
    );
  }

  console.log(`mentorAvailabilityCTA: ${mentorAvailabilityCTA}`);

  return mentorAvailabilityCTA;
};
