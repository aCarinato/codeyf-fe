import { Fragment, useState } from 'react';
// data
import { countries } from '../../data/countries';
import { allLanguages } from '../../data/allLanguages';
import { allTopics } from '../../data/allTopics';
import { allTechStacks } from '../../data/allTechStacks';
import { allSkillsLevel } from '../../data/allSkillsLevel';
// own components
import BtnCTA from '../UI/BtnCTA';
// packages
import axios from 'axios';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/Context';
import Link from 'next/link';

function CompleteProfileForm() {
  const { authState } = useMainContext();

  // submit
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // fields
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [country, setCountry] = useState('--select country--');
  const [languages, setLanguages] = useState([]);
  const [availability, setAvailability] = useState([true, null]);
  const [topics, setTopics] = useState([]);
  const [learning, setLearning] = useState([]);
  const [teaching, setTeaching] = useState([]);
  const [skillsLevel, setSkillsLevel] = useState([]);
  const [companyJob, setCompanyJob] = useState(null);
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');

  const [image, setImage] = useState({});

  // touched
  const [shortDescriptionTouched, setShortDescriptionTouched] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);
  const [languagesTouched, setLanguagesTouched] = useState(false);
  const [availablityTouched, setAvailabilityTouched] = useState(false);
  const [topicsTouched, setTopicsTouched] = useState(false);
  const [learningTouched, setLearningTouched] = useState(false);
  const [teachingTouched, setTeachingTouched] = useState(false);
  const [skillsLevelTouched, setSkillsLevelTouched] = useState(false);
  const [companyJobTouched, setCompanyJobTouched] = useState(false);
  const [yearsExperienceTouched, setYearsExperienceTouched] = useState(false);
  // const [linkedinTouched, setLinkedinTouched] = useState(false);

  //   INPUT VALIDITY
  const shortDescriptionIsValid =
    shortDescription.trim() !== '' && shortDescription.length < 33;
  const shortDescriptionIsInvalid =
    !shortDescriptionIsValid && shortDescriptionTouched;

  const countryIsValid = country !== '--select country--';
  const countryIsInvalid = !countryIsValid && countryTouched;

  const languagesIsValid = languages.length > 0;
  const languagesIsInvalid = !languagesIsValid && languagesTouched;

  const availabilityIsValid = availability[1] !== null;
  const availabilityIsInvalid = !availabilityIsValid && availablityTouched;

  const topicsIsValid = topics.length > 2;
  const topicsIsInvalid = !topicsIsValid && topicsTouched;

  const learningIsValid =
    (availability[0] && learning.length > 1) ||
    (availability[1] && !availability[0]);
  const learningIsInvalid = !learningIsValid && learningTouched;

  const teachingIsValid =
    (availability[1] && teaching.length > 0) ||
    (availability[0] && !availability[1]);
  const teachingIsInvalid = !teachingIsValid && teachingTouched;

  const skillsLevelIsValid = skillsLevel.length > 0;
  const skillsLevelIsInvalid = !skillsLevelIsValid && skillsLevelTouched;

  const companyJobIsValid =
    (availability[1] && companyJob !== null) ||
    (availability[0] && !availability[1]);
  const companyJobIsInvalid = !companyJobIsValid && companyJobTouched;

  // const linkedinIsValid =
  //   (availability[1] && linkedin.trim() !== '') ||
  //   (availability[0] && !availability[1]);
  // const linkedinIsInvalid = !linkedinIsValid && linkedinTouched;

  const yearsExperienceIsValid =
    (availability[1] && yearsExperience > 0) ||
    (availability[0] && !availability[1]);
  const yearsExperienceIsInvalid =
    !yearsExperienceIsValid && yearsExperienceTouched;

  let formIsValid;

  if (
    shortDescriptionIsValid &&
    languagesIsValid &&
    availabilityIsValid &&
    topicsIsValid &&
    learningIsValid &&
    teachingIsValid &&
    skillsLevelIsValid &&
    companyJobIsValid &&
    yearsExperienceIsValid
    // && linkedinIsValid
  )
    formIsValid = true;

  // console.log(companyJob);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    setShortDescriptionTouched(true);
    setCountryTouched(true);
    setLanguagesTouched(true);
    setAvailabilityTouched(true);
    setTopicsTouched(true);
    setLearningTouched(true);
    setTeachingTouched(true);
    setSkillsLevelTouched(true);
    setCompanyJobTouched(true);
    setYearsExperienceTouched(true);
    // setLinkedinTouched(true);

    if (!formIsValid) {
      return;
    } else {
      try {
        let mentorPendingApproval;
        if (availability[1]) {
          mentorPendingApproval = true;
        } else {
          mentorPendingApproval = false;
        }

        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/user/complete-profile`,
          {
            shortDescription,
            longDescription,
            country,
            languages,
            availability,
            mentorPendingApproval,
            topics,
            learning,
            teaching,
            yearsExperience,
            companyJob,
            linkedin,
            github,
            skillsLevel,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (res.data.error) {
          console.log(res.data.error);
          setError(res.data.error);
        }

        if (res.data.success) {
          setSuccess(true);
          // emit event 'registrationCompleted'
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    // console.log([...formData]);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/upload-image`,
        formData
      );
      // console.log('uploaded image => ', data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLanguages = (id) => {
    let currentIndex;
    let tempLanguages = [...languages];
    let tempLanguagesIdx = tempLanguages.map((item) => item._id);

    currentIndex = tempLanguagesIdx.indexOf(id);

    if (currentIndex === -1) {
      tempLanguagesIdx.push(id);
    } else {
      tempLanguagesIdx.splice(currentIndex, 1);
    }
    // console.log(tempTopicsIdx);
    tempLanguages = tempLanguagesIdx.map(
      (idx) => allLanguages.filter((item) => item._id === idx)[0]
    );

    setLanguages(tempLanguages);
    setLanguagesTouched(true);
  };

  // AVAILABILITY
  const handleAvailabilityChange = (e) => {
    const tempAvailability = [...availability];
    if (e.target.value === 'yes') {
      tempAvailability[1] = true;
      setAvailability(tempAvailability);
    }
    if (e.target.value === 'no') {
      tempAvailability[1] = false;
      setAvailability(tempAvailability);
    }

    setAvailabilityTouched(true);
  };

  // TOPICS
  const toggleTopics = (id) => {
    let currentIndex;
    let tempTopics = [...topics];
    let tempTopicsIdx = tempTopics.map((item) => item._id);

    currentIndex = tempTopicsIdx.indexOf(id);

    if (currentIndex === -1) {
      tempTopicsIdx.push(id);
    } else {
      tempTopicsIdx.splice(currentIndex, 1);
    }
    // console.log(tempTopicsIdx);
    tempTopics = tempTopicsIdx.map(
      (idx) => allTopics.filter((topic) => topic._id === idx)[0]
    );

    setTopics(tempTopics);
    setTopicsTouched(true);
  };

  // LEARNING
  const toggleLearning = (id) => {
    let currentIndex;
    let tempLearning = [...learning];
    let tempLearningIdx = tempLearning.map((item) => item._id);

    currentIndex = tempLearningIdx.indexOf(id);

    if (currentIndex === -1) {
      tempLearningIdx.push(id);
    } else {
      tempLearningIdx.splice(currentIndex, 1);
    }
    // console.log(tempTopicsIdx);
    tempLearning = tempLearningIdx.map(
      (idx) => allTechStacks.filter((item) => item._id === idx)[0]
    );

    setLearning(tempLearning);
    setLearningTouched(true);
  };

  // TEACHING
  const toggleTeaching = (id) => {
    let currentIndex;
    let tempTeaching = [...teaching];
    let tempTeachingIdx = tempTeaching.map((item) => item._id);

    currentIndex = tempTeachingIdx.indexOf(id);

    if (currentIndex === -1) {
      tempTeachingIdx.push(id);
    } else {
      tempTeachingIdx.splice(currentIndex, 1);
    }
    // console.log(tempTopicsIdx);
    tempTeaching = tempTeachingIdx.map(
      (idx) => allTechStacks.filter((item) => item._id === idx)[0]
    );

    setTeaching(tempTeaching);
    setTeachingTouched(true);
  };

  // TEACHING
  const toggleSkillsLevel = (id) => {
    let currentIndex;
    let tempSkillsLevel = [...skillsLevel];
    let tempSkillsLevelIdx = tempSkillsLevel.map((item) => item._id);

    currentIndex = tempSkillsLevelIdx.indexOf(id);

    if (currentIndex === -1) {
      tempSkillsLevelIdx.push(id);
    } else {
      tempSkillsLevelIdx.splice(currentIndex, 1);
    }
    // console.log(tempTopicsIdx);
    tempSkillsLevel = tempSkillsLevelIdx.map(
      (idx) => allSkillsLevel.filter((item) => item._id === idx)[0]
    );

    setSkillsLevel(tempSkillsLevel);
    setSkillsLevelTouched(true);
  };

  // console.log(languages);

  const successMsg = (
    <div>
      <h3>Thank you for completing your profile!</h3>
      {availability[1] && (
        <p>
          Your request to be a mentor is being processed. The outcome will be
          notified within 48 hours
        </p>
      )}
      <br></br>
      <div>
        <Link href="/my-profile">
          <p className="link-text">
            <Icon icon="akar-icons:arrow-back" /> to my profile
          </p>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      {success ? (
        successMsg
      ) : (
        <div className="grid grid--2cols margin-6auto">
          <div className="padding-3rem">
            <div className="myform-input-section">
              <label className="myform-label bold" htmlFor="short-description">
                short description (max 32 characters) <sup>*</sup>
              </label>
              <textarea
                className={
                  shortDescriptionIsInvalid
                    ? 'input-invalid myform-text-input'
                    : 'myform-text-input'
                }
                id="short-description"
                name="short-description"
                type="text"
                maxLength="32"
                rows="2"
                cols="50"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                onBlur={() => setShortDescriptionTouched(true)}
                placeholder="who you are or what you like in one sentence"
              />
              {shortDescriptionIsInvalid && (
                <p className="input-error-msg">
                  short description less than 80 characters long
                </p>
              )}
            </div>
            <div className="myform-input-section">
              <label className="myform-label bold" htmlFor="long-description">
                long description (max 250 characters)
              </label>
              <textarea
                className="myform-text-input"
                type="text"
                id="long-description"
                name="long-description"
                maxLength="250"
                rows="4"
                cols="50"
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="any additional info about you that can be useful for members to know once they reach out to you"
              />
            </div>

            {/* COUNTRY */}
            <div className="myform-input-section">
              <label className="myform-label bold" htmlFor="country">
                Country <sup>*</sup>
              </label>
              <select
                className={
                  countryIsInvalid ? 'input-invalid ' : 'myform-select-input'
                }
                name="country"
                id="country"
                value={country}
                // defaultValue={'default'}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCountryTouched(true);
                }}
              >
                <option>--select country--</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {countryIsInvalid && (
                <p className="input-error-msg">select a country</p>
              )}
            </div>

            {/* LANGUAGES */}
            <div className="myform-input-section">
              <fieldset className={languagesIsInvalid ? 'fieldset-error' : ''}>
                <legend>
                  Languages <sup>*</sup>
                </legend>
                {allLanguages.map((item) => (
                  <div key={item._id}>
                    <input
                      type="checkbox"
                      name={item.label}
                      value={item.label}
                      onChange={() => toggleLanguages(item._id)}
                      // checked={
                      //   stackCheckedIndex.indexOf(item._id) === -1 ? false : true
                      // }
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </fieldset>
              {languagesIsInvalid && (
                <p className="input-error-msg">select at least one language</p>
              )}
            </div>

            {/* IMAGE */}
            <div className="myform-input-section">
              <label className="myform-label bold">
                Profile picture <sup>*</sup>
              </label>
              {image && image.url && (
                <div className="img-input-container">
                  <img className="img-input-container" src={`${image.url}`} />
                </div>
              )}
              {/* <input onChange={uploadImg} type="file" accept="images/*" /> */}

              <input
                onChange={(e) => handleImage(e)}
                type="file"
                accept="image/*"
              />
            </div>

            {/* GITHUB */}
            <div className="myform-input-section">
              <label className="myform-label bold" htmlFor="linkedin">
                GitHub profile
              </label>
              <input
                className="myform-text-input"
                id="github"
                name="github"
                type="text"
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                // onBlur={() => setLinkedinTouched(true)}
              />
            </div>

            {/* TOPICS */}
            <div className="myform-input-section">
              <fieldset className={topicsIsInvalid ? 'fieldset-error' : ''}>
                <legend>
                  Topics of interest <sup>*</sup>
                </legend>
                {allTopics.map((item) => (
                  <div key={item._id}>
                    <input
                      type="checkbox"
                      name={item.label}
                      value={item.label}
                      onChange={() => toggleTopics(item._id)}
                      // checked={
                      //   stackCheckedIndex.indexOf(item._id) === -1 ? false : true
                      // }
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </fieldset>
              {topicsIsInvalid && (
                <p className="input-error-msg">select at least three topics</p>
              )}
            </div>

            {/* LEARNING */}
            <div className="myform-input-section">
              <fieldset className={learningIsInvalid ? 'fieldset-error' : ''}>
                <legend>
                  Programming languages and frameworks you've studied or want to
                  study <sup>*</sup>
                </legend>
                {allTechStacks.map((item) => (
                  <div key={item._id}>
                    <input
                      type="checkbox"
                      name={item.label}
                      value={item.label}
                      onChange={() => toggleLearning(item._id)}
                      // checked={
                      //   stackCheckedIndex.indexOf(item._id) === -1 ? false : true
                      // }
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </fieldset>
              {learningIsInvalid && (
                <p className="input-error-msg">select at least two items</p>
              )}
            </div>

            {/* SKILLS */}
            <div className="myform-input-section">
              <fieldset
                className={skillsLevelIsInvalid ? 'fieldset-error' : ''}
              >
                <legend>
                  Your skill level <sup>*</sup>
                </legend>
                {allSkillsLevel.map((item) => (
                  <div key={item._id}>
                    <input
                      type="checkbox"
                      name={item.label}
                      value={item.label}
                      onChange={() => toggleSkillsLevel(item._id)}
                      // checked={
                      //   stackCheckedIndex.indexOf(item._id) === -1 ? false : true
                      // }
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </fieldset>
              {skillsLevelIsInvalid && (
                <p className="input-error-msg">select at least one item</p>
              )}
            </div>
          </div>

          <div className="padding-3rem">
            {/* MENTOR */}
            <div className="myform-input-section">
              <fieldset
                className={availabilityIsInvalid ? 'fieldset-error' : ''}
              >
                <legend>
                  Do you want to mentor students? <sup>*</sup>
                </legend>
                <div>
                  <input
                    type="radio"
                    name="mentor"
                    value="yes"
                    onChange={(e) => {
                      handleAvailabilityChange(e);
                    }}
                  />
                  <label htmlFor="buddy">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="mentor"
                    value="no"
                    onChange={(e) => {
                      handleAvailabilityChange(e);
                      setYearsExperience(0);
                      setCompanyJob(null);
                      setLinkedin('');
                      setTeaching([]);
                    }}
                  />
                  <label htmlFor="mentor">No</label>
                </div>
              </fieldset>
              {/* <p>
                NOTE: you will be able to set your state as "unavailable" at any
                time so people will not be able to reach out to you.
              </p> */}
              {availabilityIsInvalid && (
                <p className="input-error-msg">select at least one option</p>
              )}
            </div>

            {/* TEACHING */}
            {availability[1] && (
              <Fragment>
                {/* COMPANY JOB */}
                <div className="myform-input-section">
                  <fieldset
                    className={companyJobIsInvalid ? 'fieldset-error' : ''}
                  >
                    <legend>
                      Are you working or have you worked as a developer in a
                      company? <sup>*</sup>
                    </legend>
                    <div>
                      <input
                        type="radio"
                        name="company"
                        value="yes"
                        onChange={() => {
                          setCompanyJob(true);
                          setCompanyJobTouched(true);
                        }}
                      />
                      <label htmlFor="buddy">yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="company"
                        value="no"
                        onChange={() => {
                          setCompanyJob(false);
                          setCompanyJobTouched(true);
                        }}
                      />
                      <label htmlFor="company">no</label>
                    </div>
                  </fieldset>
                  {companyJobIsInvalid && (
                    <p className="input-error-msg">select an option</p>
                  )}
                </div>

                {/* YEARS OF EXPERIENCE */}
                <div className="myform-input-section">
                  <label className="myform-label bold" htmlFor="experience">
                    Years of experience coding <sup>*</sup>
                  </label>
                  <input
                    className={
                      yearsExperienceIsInvalid
                        ? 'input-invalid myform-text-input'
                        : 'myform-text-input'
                    }
                    id="experience"
                    name="experience"
                    type="number"
                    min="1"
                    value={yearsExperience}
                    onChange={(e) => {
                      setYearsExperience(Number(e.target.value));
                    }}
                    onBlur={() => setYearsExperienceTouched(true)}
                    // placeholder="who you are or what you like in one sentence"
                  />
                  {yearsExperienceIsInvalid && (
                    <p className="input-error-msg">
                      enter a number greater than 0
                    </p>
                  )}
                </div>

                {/* LINKEDIN */}
                <div className="myform-input-section">
                  <label className="myform-label bold" htmlFor="linkedin">
                    Linkedin profile
                  </label>
                  <input
                    className="myform-text-input"
                    // className={
                    //   linkedinIsInvalid
                    //     ? 'input-invalid myform-text-input'
                    //     : 'myform-text-input'
                    // }
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    value={linkedin}
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                    }}
                    // onBlur={() => setLinkedinTouched(true)}
                  />
                  {/* {linkedinIsInvalid && (
                    <p className="input-error-msg">enter a link</p>
                  )} */}
                </div>

                {/* TEACHING */}
                <div className="myform-input-section">
                  <fieldset
                    className={teachingIsInvalid ? 'fieldset-error' : ''}
                  >
                    <legend>
                      Programming languages and frameworks you're available to
                      help with as a mentor <sup>*</sup>
                    </legend>
                    {allTechStacks.map((item) => (
                      <div key={item._id}>
                        <input
                          type="checkbox"
                          name={item.label}
                          value={item.label}
                          onChange={() => toggleTeaching(item._id)}
                          // checked={
                          //   stackCheckedIndex.indexOf(item._id) === -1 ? false : true
                          // }
                        />
                        <label htmlFor={item.label}>{item.label}</label>
                      </div>
                    ))}
                  </fieldset>
                  {teachingIsInvalid && (
                    <p className="input-error-msg">select at least two items</p>
                  )}
                </div>
              </Fragment>
            )}

            <div>
              <BtnCTA
                classname="btn-dark"
                label="submit choices"
                onCLickAction={(e) => handleSubmit(e)}
              />
            </div>

            <br></br>
            {error.length > 0 && <p className="submit-error-msg">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompleteProfileForm;
