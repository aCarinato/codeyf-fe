// next react
import { Fragment, useEffect, useState } from 'react';
// own functions
import { filterBuddies } from '../../../lib/helper/buddies/filterFunctions';
// own components
import BtnCTA from '../../../components/UI/BtnCTA';
import BuddyCard from '../../../components/people/BuddyCard';
import SpinningLoader from '../../../components/UI/SpinningLoader';
import BuddyFilter from '../../../components/people/BuddyFilter';
import BuddyFilterMobile from '../../../components/people/BuddyFilterMobile';
import MessageForm from '../../../components/message/MessageForm';
// context
import { useMainContext } from '../../../context/Context';
// packages
import axios from 'axios';

function CodingBuddiesScreen() {
  const { mobileView, authState, socket } = useMainContext();
  const [buddies, setBuddies] = useState([]);
  const [filteredBuddies, setFilteredBuddies] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // FILTER
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  const [learningCheckedIndex, setLearningCheckedIndex] = useState([]);
  const [skillsCheckedIndex, setSkillsCheckedIndex] = useState([]);

  // MESSAGING
  const [showMsgForm, setShowMsgForm] = useState(false);
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // console.log(authState);

  const fetchBuddies = async () => {
    try {
      setLoading(true);
      let userEmail = '';
      if (authState && authState.email && authState.email.length > 0) {
        userEmail = authState.email;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/people/buddies`,
        { userEmail }
      );
      if (res.data.success) {
        setBuddies(res.data.buddies);
        setFilteredBuddies(res.data.buddies);
        // setFilteredBuddies(res.data.buddies);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  useEffect(() => {
    if (!mobileView) {
      filterBuddies(
        buddies,
        country,
        language,
        learningCheckedIndex,
        skillsCheckedIndex,
        setFilteredBuddies
      );
    }
  }, [country, language, learningCheckedIndex, skillsCheckedIndex]);

  const mobileFilterBuddies = () => {
    filterBuddies(
      buddies,
      country,
      language,
      learningCheckedIndex,
      skillsCheckedIndex,
      setFilteredBuddies
    );
  };

  const closeModal = () => {
    setShowMsgForm(false);
  };

  const handleStartConversation = async () => {
    // console.log(recipient);
    // console.log(message);
    try {
      // setLoading(true);
      const newMsg = {
        recipient,
        message,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/message/start-conversation`,
        newMsg,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res);
      if (res.data.success) {
        // console.log('SULCESSO!');
        setMessage('');
        setSuccessMsg(true);
      }
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <SpinningLoader />
      ) : (
        <Fragment>
          <div>
            <h1>Coding Buddies</h1>
            <h4 className="h4-header">
              Friendly learners on their way to coding mastery
            </h4>
            <br></br>
          </div>
          <br></br>
          {showFilter && (
            <BuddyFilterMobile
              country={country}
              setCountry={setCountry}
              language={language}
              setLanguage={setLanguage}
              learningCheckedIndex={learningCheckedIndex}
              setLearningCheckedIndex={setLearningCheckedIndex}
              skillsCheckedIndex={skillsCheckedIndex}
              setSkillsCheckedIndex={setSkillsCheckedIndex}
              filterBuddies={mobileFilterBuddies}
              onClose={() => setShowFilter(false)}
            />
          )}
          <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
            {!mobileView && (
              <div>
                <BuddyFilter
                  country={country}
                  setCountry={setCountry}
                  language={language}
                  setLanguage={setLanguage}
                  learningCheckedIndex={learningCheckedIndex}
                  setLearningCheckedIndex={setLearningCheckedIndex}
                  skillsCheckedIndex={skillsCheckedIndex}
                  setSkillsCheckedIndex={setSkillsCheckedIndex}
                />
              </div>
            )}

            <div className="flex">
              {mobileView && (
                <BtnCTA
                  label="filter buddies"
                  classname="btn-light-big"
                  onCLickAction={() => setShowFilter(true)}
                  icon={true}
                  iconType="ci:filter-outline"
                />
              )}
              {filteredBuddies.length > 0 ? (
                filteredBuddies.map((buddy) => (
                  <BuddyCard
                    key={buddy._id}
                    userId={buddy._id}
                    username={buddy.username}
                    handle={buddy.handle}
                    description={buddy.shortDescription}
                    country={buddy.country}
                    learning={buddy.learning}
                    profilePic={buddy.profilePic}
                    setShowMsgForm={setShowMsgForm}
                    setRecipient={setRecipient}
                    setSuccessMsg={setSuccessMsg}
                  />
                ))
              ) : (
                <p>
                  No buddies found for the filters applied. Please select
                  different search parameters.
                </p>
              )}{' '}
              <div className="white-card"></div>
              <div className="white-card"></div>
              <div className="white-card"></div>
            </div>
          </div>
          {showMsgForm && (
            <MessageForm
              onClose={closeModal}
              setShowMsgForm={setShowMsgForm}
              message={message}
              setMessage={setMessage}
              setRecipient={setRecipient}
              handleStartConversation={handleStartConversation}
              successMsg={successMsg}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default CodingBuddiesScreen;
