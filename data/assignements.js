export const assignements = [
  {
    _id: '0',
    title: 'Form validator',
    description: 'Client side form validation',
    goals: [
      'Styled as per common industry standards',
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
        name: 'form validation',
        link: 'www.redditAPIeeee.com',
        type: 'video',
      },
      {
        name: 'how to make a form with html, css and vanilla javascript',
        link: 'www.tosorea.com',
        type: 'blog article',
      },
    ],
    reviews: [
      { id: '0', comment: '', rate: '5' },
      { id: '1', comment: '', rate: '5' },
      { id: '2', comment: '', rate: '4' },
    ],
    repo: 'https://github.com/aCarinato/giroq-frontend',
    stages: [
      {
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
    comments: [],
  },
  {
    _id: '1',
    title: 'Reddit API with Python',
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
        name: 'reddit API with python',
        link: 'www.redditAPIeeee.com',
        type: 'video',
      },
      {
        name: 'topic clustering with python',
        link: 'www.tosorea.com',
        type: 'blog article',
      },
    ],
    reviews: [
      { id: '0', comment: '', rate: '5' },
      { id: '1', comment: '', rate: '4' },
      { id: '2', comment: '', rate: '4' },
    ],
    repo: 'https://github.com/aCarinato/giroq-frontend',
    stages: [
      {
        n: '1',
        tasks: [
          {
            participantId: '0',
            names: ['Get reddit API keys', 'Setup connection with script'],
          },
        ],
      },
      {
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
