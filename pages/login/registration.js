import { Fragment } from 'react';
import MyForm from '../../components/UI/MyForm';

function RegistrationPage() {
  const formFields = [
    {
      type: 'textarea',
      label: 'Short Description',
      id: 'group-name',
      inputType: '',
      // ref: passwordInputRef,
      //   defaultValue:
      //     'Describe general rules (if any) or important notes the participants should be aware of',
      placeholder: 'An introduction about yourself. Short or long, you decide',
      maxlength: 200,
    },
    {
      type: 'select',
      label: 'Country',
      id: 'country',
      options: [
        { value: 2, name: 'Italy' },
        { value: 3, name: 'Spain' },
        { value: 4, name: 'USA' },
        { value: 5, name: 'India' },
        { value: 6, name: 'Pakistan' },
        { value: 7, name: 'Nigeria' },
        { value: 8, name: 'United Kingdom' },
        { value: 9, name: 'Canada' },
      ],
    },
    {
      type: 'fieldset',
      subtype: 'checkbox',
      label: 'Languages',
      name: 'languages',
      options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'it', label: 'Italian' },
      ],
    },
    {
      type: 'fieldset',
      subtype: 'radio',
      label: 'Coding Buddy',
      name: 'buddy',
      options: [
        {
          value: 1,
          label: 'yes, I"d like to learn with and from other people',
        },
        { value: 0, label: 'not yet, thanks' },
      ],
    },
    {
      type: 'fieldset',
      subtype: 'radio',
      label: 'Mentor',
      name: 'mentor',
      options: [
        { value: 1, label: 'yes, I want to mentor other people' },
        { value: 0, label: 'not yet, thanks' },
      ],
    },

    {
      type: 'fieldset',
      subtype: 'checkbox',
      label: 'I want to learn or keep learning:',
      name: 'learning',
      options: [
        { value: 'javascript', label: 'javascript' },
        { value: 'Reactjs', label: 'React js' },
        { value: 'ReactNative', label: 'React native' },
        { value: 'MERN', label: 'MERN' },
        { value: 'Angular', label: 'Angular' },
        { value: 'node', label: 'node' },
        { value: 'express', label: 'express' },
        { value: 'MEAN', label: 'MEAN' },
        { value: 'python', label: 'python' },
        { value: 'flask', label: 'flask' },
        { value: 'django', label: 'django' },
        { value: 'data-science', label: 'data science' },
        { value: 'frontend', label: 'frontend' },
        { value: 'backend', label: 'backend' },
      ],
    },

    {
      type: 'fieldset',
      subtype: 'radio',
      label: 'Python knowledge',
      name: 'python',

      options: [
        { value: 1, label: 'beginner' },
        { value: 2, label: 'intermediate' },
        { value: 3, label: 'advanced' },
      ],
    },
  ];
  return (
    <Fragment>
      <h2>Registration Page</h2>
      <MyForm
        formFields={formFields}
        labelCTA="complete"
        formSubmit={() => {}}
        error={''}
      />
    </Fragment>
  );
}

export default RegistrationPage;
