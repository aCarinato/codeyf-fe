export const assignements = [
  {
    _id: '0',
    createdBy: '4',
    title: 'Form validator',
    details:
      'Creating an input form that can accept at least the following fields: username, email, password. When th submit button is pressed the form gives feedback on the validity of the iput. No backend required.',
    description: 'Client side form validation',
    goals: [
      'Styled as per common industry standards. Vanilla CSS or frameworks allowed (bootstrap, material UI, etc.)',
      'Conditional formatting of input field based on validity',
      'Throw an error on screen if an input does not match the input type',
      'Throw an error on screen if some input is missing when submit',
    ],
    difficulty: 'beginner',
    maxParticipants: 2,
    idealConfig: [
      { _id: '0', n: '1', role: 'html-css' },
      { _id: '1', n: '1', role: 'javascript' },
    ],
    stack: ['html', 'css', 'javascript'],
    skills: [
      'styling',
      'javascript functions',
      'code refactoring',
      'error handling',
    ],
    resources: [
      {
        _id: '0',
        name: 'form validation',
        link: 'www.redditAPIeeee.com',
        type: 'video',
      },
      {
        _id: '1',
        name: 'how to make a form with html, css and vanilla javascript',
        link: 'www.tosorea.com',
        type: 'blog article',
      },
    ],
    reviews: [
      { _id: '0', comment: 'Very useful tutorial for ', rate: '5' },
      { _id: '1', comment: '', rate: '5' },
      { _id: '2', comment: '', rate: '4' },
    ],
    repo: 'https://github.com/aCarinato/giroq-frontend',
    steps: [
      {
        _id: '0',
        n: '1',
        tasks: [
          {
            participantId: '0',
            names: [
              'Complete form creation',
              'All input fields in place',
              'Basic styling',
            ],
          },
          {
            participantId: '1',
            names: ['Basic form validation using if statements'],
          },
        ],
      },
      {
        _id: '1',
        n: '2',
        tasks: [
          {
            participantId: '0',
            names: ['Conditional styling based on input validity'],
          },
          {
            participantId: '1',
            names: [
              'Functions to check validity. In new fields are added these functions can be reused',
            ],
          },
        ],
      },
    ],
    comments: [
      {
        _id: '0',
        commentBy: '0',
        text: 'Better to use useRef() or useState()?',
      },
      {
        _id: '1',
        commentBy: '3',
        text: 'Bootstrap to style components',
      },
    ],
  },
  {
    _id: '1',
    createdBy: '0',
    title: 'Reddit API with Python',
    details: '',
    description: 'Automate retrieval of reddit posts',
    goals: [
      'Accept a subreddit name as an input',
      'Retrieve at least 200 posts from a subreddit.',
      'Retrive hot reddits',
      'Retrive most popular reddits',
      'Save on .csv file',
      'BONUS: Perform topic clustering on retrieved reddits',
    ],
    difficulty: 'beginner',
    maxParticipants: 2,
    idealConfig: [{ _id: '0', n: '1', role: 'python scripting' }],
    stack: ['python'],
    skills: ['third-party API', 'machine learning', 'NLP', 'topic clustering'],
    resources: [
      {
        _id: '0',
        name: 'reddit API with python',
        link: 'www.redditAPIeeee.com',
        type: 'video',
      },
      {
        _id: '1',
        name: 'topic clustering with python',
        link: 'www.tosorea.com',
        type: 'blog article',
      },
    ],
    reviews: [
      { _id: '0', comment: '', rate: '5' },
      { _id: '1', comment: '', rate: '4' },
      { _id: '2', comment: '', rate: '4' },
    ],
    repo: 'https://github.com/aCarinato/giroq-frontend',
    steps: [
      {
        _id: '0',
        n: '1',
        tasks: [
          {
            participantId: '0',
            names: ['Get reddit API keys', 'Setup connection with script'],
          },
        ],
      },
      {
        _id: '1',
        n: '2',
        tasks: [
          {
            participantId: '0',
            names: [
              'Subreddit Input functionality',
              'Number of reddits to be extracted',
              'Hot or popular selection',
            ],
          },
        ],
      },
      {
        _id: '2',
        n: '3',
        tasks: [
          {
            participantId: '0',
            names: [
              'Post extraction and save into .csv file',
              'Topic clustering',
            ],
          },
        ],
      },
    ],
    comments: [],
  },
];
