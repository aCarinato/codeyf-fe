// react / next
import { useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../../components/routes/UserRoute';
import SpinningLoader from '../../../components/UI/SpinningLoader';
import TextInput from '../../../components/UI/form/TextInput';
import TextArea from '../../../components/UI/form/TextArea';
import Select from '../../../components/UI/form/Select';
import Selections from '../../../components/UI/form/Selections';
import ImgUploader from '../../../components/UI/form/ImgUploader';
// own data
import { allCountries } from '../../../data/allCountries';
import { allLanguages } from '../../../data/allLanguages';
import { allTopics } from '../../../data/allTopics';
import { allTechStacks } from '../../../data/allTechStacks';
// libs
import axios from 'axios';
// context +31644638690
import { useMainContext } from '../../../context/Context';
import BtnCTA from '../../../components/UI/BtnCTA';

function EditAccount() {
  const { authState, currentUser, setCurrentUser } = useMainContext();

  // console.log(currentUser);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPic, setLoadingPic] = useState(false);

  const [shortDescription, setShortDescription] = useState(
    currentUser !== null && currentUser.shortDescription
  );
  const [longDescription, setLongDescription] = useState(
    currentUser !== null && currentUser.longDescription
  );
  const [country, setCountry] = useState('');
  const [languages, setLanguages] = useState(
    currentUser !== null && currentUser.languages
  );
  const [topics, setTopics] = useState(
    currentUser !== null && currentUser.topics
  );
  const [learning, setLearning] = useState(
    currentUser !== null && currentUser.learning
  );

  const [profilePic, setProfilePic] = useState(
    currentUser !== null && currentUser.profilePic ? currentUser.profilePic : {}
  );

  const [github, setGithub] = useState(
    currentUser !== null && currentUser.github ? currentUser.github : ''
  );

  const [teaching, setTeaching] = useState(
    currentUser !== null && currentUser.teaching ? currentUser.teaching : []
  );

  const [linkedin, setLinkedin] = useState(
    currentUser !== null && currentUser.linkedin ? currentUser.linkedin : ''
  );

  // DEFAULT INPUTS

  // countries
  const [defaultCountryValue, setDefaultCountryValue] = useState('');

  const findCountryValue = () => {
    const idx = allCountries
      .map((item) => item.label)
      .indexOf(currentUser.country);
    setDefaultCountryValue(allCountries[idx]._id);
  };

  useEffect(() => {
    if (currentUser !== null && currentUser.country) {
      findCountryValue();
    }
  }, [currentUser]);

  // console.log(languages);

  // INPUT TOUCHED
  const [shortDescriptionTouched, setShortDescriptionTouched] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);
  const [languagesTouched, setLanguagesTouched] = useState(false);
  const [topicsTouched, setTopicsTouched] = useState(false);
  const [learningTouched, setLearningTouched] = useState(false);
  const [teachingTouched, setTeachingTouched] = useState(false);

  //   INPUT VALIDITY
  const shortDescriptionIsValid =
    currentUser !== null &&
    shortDescription.trim() !== '' &&
    shortDescription.length < 80;
  const shortDescriptionIsInvalid =
    !shortDescriptionIsValid && shortDescriptionTouched;

  const countryIsValid = country !== null;
  const countryIsInvalid = !countryIsValid && countryTouched;

  const languagesIsValid = languages !== null && languages.length > 0;
  const languagesIsInvalid =
    !languagesIsValid || (!languagesIsValid && languagesTouched);

  const topicsIsValid = topics.length > 0;
  const topicsIsInvalid = !topicsIsValid || (!topicsIsValid && topicsTouched);

  const learningIsValid = learning.length > 0;
  const learningIsInvalid =
    !learningIsValid || (!learningIsValid && learningTouched);

  const teachingIsValid = currentUser.isMentor ? teaching.length > 0 : true;
  const teachingIsInvalid =
    !teachingIsValid || (!teachingIsValid && teachingTouched);

  let formIsValid;
  if (
    shortDescriptionIsValid &&
    countryIsValid &&
    languagesIsValid &&
    topicsIsValid &&
    learningIsValid &&
    teachingIsValid
    // requirementsIsValid &&
  )
    formIsValid = true;

  // console.log(country);

  const getCurrentUser = async () => {
    try {
      // console.log('Executing getCurrentUser()');
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (data.ok) {
        setCurrentUser(data.user);
      }
      setLoading(false);
    } catch (err) {
      //   router.push('/login');
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser._id === '') {
      getCurrentUser();
    }
  }, [currentUser && currentUser._id]);

  const handleImage = async (e) => {
    // console.log([...formData]);
    try {
      setLoadingPic(true);
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/upload-image`,
        formData
      );
      // console.log('uploaded image => ', data);
      setProfilePic({
        url: data.url,
        public_id: data.public_id,
      });
      setLoadingPic(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async () => {
    setShortDescriptionTouched(true);
    setCountryTouched(true);
    setLanguagesTouched(true);
    setTopicsTouched(true);
    setLearningTouched(true);
    setTeachingTouched(true);

    console.log(formIsValid);

    if (formIsValid) {
      const updatedProfile = {
        shortDescription,
        longDescription,
        country,
        languages,
        topics,
        learning,
        profilePic,
        github,
        teaching,
        linkedin,
      };

      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/user/update-profile`,
          updatedProfile,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        // console.log(res.data.success);
        if (res.data.success) {
          setSuccess(true);
          // setNewGroupId(res.data.newGroupId);
        } else {
          // setSuccess(false);
          setError('An error occurred');
          console.log('An error occurred');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const successMsg = (
    <div>
      <p>Profile successfully updated!</p>
      <Link href={`/my-profile`}>Go to your profile</Link>
    </div>
  );

  return (
    <UserRoute>
      {loading ? (
        <SpinningLoader />
      ) : success ? (
        successMsg
      ) : (
        currentUser && (
          <>
            <h2>Edit profile</h2>
            <br></br>
            <ImgUploader
              img={profilePic}
              uploadImg={handleImage}
              removeImg={() => setProfilePic({})}
              uploading={loadingPic}
            />
            <br></br>
            <TextArea
              required={false}
              label="Headline (max 80 characters)"
              maxLength="79"
              nRows="2"
              nCols="50"
              value={shortDescription}
              // disabled={true}
              onChange={(e) => setShortDescription(e.target.value)}
              onBlur={() => setShortDescriptionTouched(true)}
              isInvalid={shortDescriptionIsInvalid}
              errorMsg={`Enter a non empty value.`}
            />
            <br></br>
            <TextArea
              required={false}
              label="Long Description (max 250 characters)"
              maxLength="250"
              nRows="2"
              nCols="50"
              value={longDescription}
              // disabled={true}
              onChange={(e) => setLongDescription(e.target.value)}
            />
            <br></br>
            <Select
              required={true}
              label="Country"
              name="country"
              options={allCountries}
              defaultValue={defaultCountryValue}
              onChange={(e) => {
                setCountryTouched(true);
                if (e.target.value !== 'null-value') {
                  const idx = allCountries
                    .map((item) => item._id)
                    .indexOf(e.target.value);

                  setCountry(allCountries[idx].label);
                } else {
                  setCountry(null);
                }
              }}
              isInvalid={countryIsInvalid}
              errorMsg={`Select a country`}
            />
            <br></br>
            <div className="flex flex-justify-space-between">
              <Select
                required={true}
                label="Languages"
                name="languages"
                options={allLanguages}
                onChange={(e) => {
                  setLanguagesTouched(true);
                  // console.log(e.target.value);
                  if (e.target.value !== 'null-value') {
                    setLanguages((prev) => {
                      // check if language is not already in the array
                      if (
                        !languages
                          .map((lang) => lang._id)
                          .includes(e.target.value)
                      ) {
                        const idx = allLanguages
                          .map((item) => item._id)
                          .indexOf(e.target.value);
                        return [...prev, allLanguages[idx]];
                      }
                      return [...prev];
                    });
                  }
                }}
                isInvalid={languagesIsInvalid}
                errorMsg={`Select at least one language`}
              />
              <Selections selections={languages} setSelections={setLanguages} />
            </div>
            <br></br>
            <div className="flex flex-justify-space-between">
              <Select
                required={true}
                label="Topics"
                name="topics"
                options={allTopics}
                onChange={(e) => {
                  setTopicsTouched(true);
                  // console.log(e.target.value);
                  if (e.target.value !== 'null-value') {
                    setTopics((prev) => {
                      // check if language is not already in the array
                      if (
                        !topics
                          .map((topic) => topic._id)
                          .includes(e.target.value)
                      ) {
                        const idx = allTopics
                          .map((item) => item._id)
                          .indexOf(e.target.value);
                        return [...prev, allTopics[idx]];
                      }
                      return [...prev];
                    });
                  }
                }}
                isInvalid={topicsIsInvalid}
                errorMsg={`Select at least one topic`}
              />
              <Selections selections={topics} setSelections={setTopics} />
            </div>
            <br></br>
            <div className="flex flex-justify-space-between">
              <Select
                required={true}
                label="Learning"
                name="learning"
                options={allTechStacks}
                // defaultValue={learning.length === 0 ? 'null-value' : null}
                onChange={(e) => {
                  setLearningTouched(true);
                  // console.log(e.target.value);
                  if (e.target.value !== 'null-value') {
                    setLearning((prev) => {
                      // check if language is not already in the array
                      if (
                        !learning
                          .map((learn) => learn._id)
                          .includes(e.target.value)
                      ) {
                        const idx = allTechStacks
                          .map((item) => item._id)
                          .indexOf(e.target.value);
                        return [...prev, allTechStacks[idx]];
                      }
                      return [...prev];
                    });
                  }
                }}
                isInvalid={learningIsInvalid}
                errorMsg={`Select at least one item`}
              />
              <Selections selections={learning} setSelections={setLearning} />
            </div>
            <br></br>
            <TextInput
              // required={true}
              label="GitHub profile"
              value={github}
              maxLength={30}
              onChange={(e) => setGithub(e.target.value)}
              // onBlur={() => setNameTouched(true)}
              // isInvalid={nameIsInvalid}
              // errorMsg={`Enter a non empty value`}
            />
            <br></br>
            {currentUser.isMentor && (
              <>
                <div className="flex flex-justify-space-between">
                  <Select
                    required={true}
                    label="Teaching"
                    name="teaching"
                    options={allTechStacks}
                    onChange={(e) => {
                      setTeachingTouched(true);
                      // console.log(e.target.value);
                      if (e.target.value !== 'null-value') {
                        setTeaching((prev) => {
                          // check if teaching is not already in the array
                          if (
                            !teaching
                              .map((teach) => teach._id)
                              .includes(e.target.value)
                          ) {
                            const idx = allTechStacks
                              .map((item) => item._id)
                              .indexOf(e.target.value);
                            return [...prev, allTechStacks[idx]];
                          }
                          return [...prev];
                        });
                      }
                    }}
                    isInvalid={teachingIsInvalid}
                    errorMsg={`Select at least one item`}
                  />
                  <Selections
                    selections={teaching}
                    setSelections={setTeaching}
                  />
                </div>
                <br></br>
                <TextInput
                  // required={true}
                  label="Linkedin profile"
                  value={linkedin}
                  maxLength={30}
                  onChange={(e) => setLinkedin(e.target.value)}
                  // onBlur={() => setNameTouched(true)}
                  // isInvalid={nameIsInvalid}
                  // errorMsg={`Enter a non empty value`}
                />
                <br></br>
              </>
            )}
            <BtnCTA
              label="update profile"
              classname="btn-dark"
              onCLickAction={updateProfile}
            />
          </>
        )
      )}
    </UserRoute>
  );
}

export default EditAccount;
