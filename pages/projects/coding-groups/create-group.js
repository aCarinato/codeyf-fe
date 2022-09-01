import { Fragment } from 'react';
import MyForm from '../../components/UI/MyForm';

function CreateGroupPage() {
  const formFields = [
    {
      type: 'input',
      label: 'Group Name',
      id: 'group-name',
      inputType: 'text',
      // ref: passwordInputRef,
      defaultValue:
        'Descriptive name like "Learning <program>", "Beginner <program>", etc.',
      placeholder:
        'Descriptive name like "Learning <program>", "Beginner <program>", etc.',
    },
    {
      type: 'textarea',
      label: 'Description',
      id: 'group-name',
      inputType: '',
      // ref: passwordInputRef,
      defaultValue:
        'Describe general rules (if any) or important notes the participants should be aware of',
      placeholder:
        'Describe general rules (if any) or important notes the participants should be aware of',
    },
    {
      type: 'fieldset',
      subtype: 'radio',
      label:
        'Number of participants (up to). The group can be considered completed also with less.',
      name: 'n-participants',
      options: [
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
      ],
    },
    {
      type: 'fieldset',
      subtype: 'radio',
      label: 'Preferred skill level of the participants',
      name: 'skill level',
      options: [
        { value: 1, label: 'Beginner' },
        { value: 2, label: 'Intermediate' },
        { value: 3, label: 'Advanced' },
      ],
    },
    {
      type: 'fieldset',
      subtype: 'radio',
      label: 'Mentor desired?',
      name: 'mentor',
      options: [
        { value: 1, label: 'Yes' },
        { value: 2, label: 'No' },
        { value: 3, label: 'Nice to have but not mandatory' },
      ],
    },
    {
      type: 'fieldset',
      subtype: 'checkbox',
      label: 'Topics',
      name: 'topics',
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
  ];

  return (
    <Fragment>
      <h2>Create new group</h2>
      <MyForm
        formFields={formFields}
        labelCTA="Create group"
        formSubmit={() => {}}
        error={''}
      />
    </Fragment>
  );
}

export default CreateGroupPage;
