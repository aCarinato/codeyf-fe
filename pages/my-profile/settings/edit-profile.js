// react / next
import { useEffect, useState } from 'react';
// own components
import UserRoute from '../../../components/routes/UserRoute';
import SpinningLoader from '../../../components/UI/SpinningLoader';
import TextArea from '../../../components/UI/form/TextArea';
import Select from '../../../components/UI/form/Select';
import Selections from '../../../components/UI/form/Selections';
// own data
import { countries } from '../../../data/countries';
import { allCountries } from '../../../data/allCountries';
import { allLanguages } from '../../../data/allLanguages';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../context/Context';

function EditAccount() {
  const { authState, currentUser, setCurrentUser } = useMainContext();

  // console.log(currentUser);
  const [loading, setLoading] = useState(false);

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

  return (
    <UserRoute>
      {loading ? (
        <SpinningLoader />
      ) : (
        currentUser && (
          <>
            <h2>Edit profile</h2>
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
          </>
        )
      )}
    </UserRoute>
  );
}

export default EditAccount;
