// next react
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// own components
import SpinningLoader from '../../../components/UI/SpinningLoader';
import MentorCard from '../../../components/people/MentorCard';
import MentorFilter from '../../../components/people/MentorFilter';
import MentorFilterMobile from '../../../components/people/MentorFilterMobile';
import BtnCTA from '../../../components/UI/BtnCTA';
// import MessageForm from '../../../components/message/MessageForm';
// own functions
import { filterMentors } from '../../../lib/helper/mentors/filterMentors';
// context
import { useMainContext } from '../../../context/Context';
// packages
import axios from 'axios';

function MentorsPage() {
  const { mobileView, authState } = useMainContext();

  const router = useRouter();

  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  const [teachingCheckedIndex, setTeachingCheckedIndex] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);

  // MESSAGING
  // const [showMsgForm, setShowMsgForm] = useState(false);
  // const [message, setMessage] = useState('');
  // const [recipient, setRecipient] = useState('');
  // const [successMsg, setSuccessMsg] = useState(false);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/people/mentors`
      );
      //   console.log(res.data);
      if (res.data.success) {
        // filter out current user
        if (authState && authState.email.length > 0) {
          // filter out current user
          const userEmail = authState.email;
          let allMentors = res.data.mentors;
          let filteredMentors = allMentors.filter(
            (mentor) => mentor.email !== userEmail
          );
          setMentors(filteredMentors);
          setFilteredMentors(filteredMentors);
        } else {
          setMentors(res.data.mentors);
          setFilteredMentors(res.data.mentors);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [authState && authState.email]);

  useEffect(() => {
    if (!mobileView) {
      filterMentors(
        mentors,
        country,
        language,
        teachingCheckedIndex,
        skillsCheckedIndex,
        setFilteredMentors
      );
    }
  }, [country, language, teachingCheckedIndex, skillsCheckedIndex]);

  const mobileFilterMentors = () => {
    filterMentors(
      mentors,
      country,
      language,
      teachingCheckedIndex,
      skillsCheckedIndex,
      setFilteredMentors
    );
  };

  // const closeModal = () => {
  //   setShowMsgForm(false);
  // };

  // const handleStartConversation = async () => {
  //   // console.log(recipient);
  //   // console.log(message);
  //   try {
  //     // setLoading(true);
  //     const newMsg = {
  //       recipient,
  //       message,
  //     };
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/message/start-conversation`,
  //       newMsg,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authState.token}`,
  //         },
  //       }
  //     );
  //     // console.log(res);
  //     if (res.data.success) {
  //       // console.log('SULCESSO!');
  //       setMessage('');
  //       setSuccessMsg(true);
  //     }
  //     // setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Fragment>
      {loading ? (
        <SpinningLoader />
      ) : (
        <Fragment>
          <div>
            <h1>Coding Mentors</h1>
            <h4 className="h4-header">
              Experienced developers willing to help
            </h4>
            <br></br>
          </div>
          <br></br>
          {showFilter && (
            <MentorFilterMobile
              country={country}
              setCountry={setCountry}
              language={language}
              setLanguage={setLanguage}
              teachingCheckedIndex={teachingCheckedIndex}
              setTeachingCheckedIndex={setTeachingCheckedIndex}
              skillsCheckedIndex={skillsCheckedIndex}
              setSkillsCheckedIndex={setSkillsCheckedIndex}
              filterMentors={mobileFilterMentors}
              onClose={() => setShowFilter(false)}
            />
          )}
          <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
            {!mobileView && (
              <div>
                <MentorFilter
                  country={country}
                  setCountry={setCountry}
                  language={language}
                  setLanguage={setLanguage}
                  teachingCheckedIndex={teachingCheckedIndex}
                  setTeachingCheckedIndex={setTeachingCheckedIndex}
                  skillsCheckedIndex={skillsCheckedIndex}
                  setSkillsCheckedIndex={setSkillsCheckedIndex}
                />
              </div>
            )}
            <div>
              {authState && authState.token.length === 0 && (
                <div
                  className={
                    mobileView
                      ? 'flex flex-justify-center'
                      : 'flex flex-justify-space-between'
                  }
                >
                  {!mobileView && <div></div>}
                  <BtnCTA
                    label="Create Profile"
                    classname="btn-dark"
                    onCLickAction={() => router.push('/login')}
                  />
                </div>
              )}

              <div className="flex gap-12 padding-12rem">
                {mobileView && (
                  <BtnCTA
                    label="filter mentors"
                    classname="btn-light-big"
                    onCLickAction={() => setShowFilter(true)}
                    icon={true}
                    iconType="ci:filter-outline"
                  />
                )}
                {filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor) => (
                    <MentorCard
                      key={mentor._id}
                      userId={mentor._id}
                      username={mentor.username}
                      handle={mentor.handle}
                      description={mentor.shortDescription}
                      country={mentor.country}
                      teaching={mentor.teaching}
                      profilePic={mentor.profilePic}
                      // setShowMsgForm={setShowMsgForm}
                      // setRecipient={setRecipient}
                      // setSuccessMsg={setSuccessMsg}
                    />
                  ))
                ) : (
                  <p>
                    No mentors found for the filters applied. Please select
                    different search parameters.
                  </p>
                )}{' '}
                <div className="white-card"></div>
                <div className="white-card"></div>
                <div className="white-card"></div>
              </div>
            </div>
          </div>
          {/* {showMsgForm && (
            <MessageForm
              onClose={closeModal}
              setShowMsgForm={setShowMsgForm}
              message={message}
              setMessage={setMessage}
              setRecipient={setRecipient}
              handleStartConversation={handleStartConversation}
              successMsg={successMsg}
            />
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
}

export default MentorsPage;
