export const assignements = [
  {
    _id: '0',
    createdBy: '4',
    title: 'Form validator',
    fullDescription:
      'Creating an input form that can accept at least the following fields: username, email, password. When th submit button is pressed the form gives feedback on the validity of the iput. No backend required.',
    shortDescription: 'Client side form validation',
    goals: [
      {
        _id: '0',
        label:
          'Styled as per common industry standards. Vanilla CSS or frameworks allowed (bootstrap, material UI, etc.)',
      },
      {
        _id: '1',
        label: 'Conditional formatting of input field based on validity',
      },
      {
        _id: '2',
        label:
          'Throw an error on screen if an input does not match the input type',
      },
      {
        _id: '3',
        label: 'Throw an error on screen if some input is missing when submit',
      },
    ],
    difficulty: { _id: '0', label: 'beginner' },
    maxParticipants: { _id: '3', label: '3' },
    idealConfig: [
      { _id: '0', n: '1', role: 'html-css' },
      { _id: '1', n: '1', role: 'javascript' },
    ],
    stack: [
      { _id: '0', label: 'html' },
      { _id: '1', label: 'css' },
      { _id: '2', label: 'javascript' },
    ],
    topics: [
      { _id: '0', label: 'styling' },
      { _id: '1', label: 'javascript functions' },
      { _id: '2', label: 'code refactoring' },
      { _id: '3', label: 'error handling' },
    ],
    resources: [
      {
        _id: '0',
        name: 'form validation',
        link: 'www.redditAPIeeee.com',
        type: 'video',
        upvotes: '',
      },
      {
        _id: '1',
        name: 'how to make a form with html, css and vanilla javascript',
        link: 'https://medium.com/london-app-brewery/why-i-left-medicine-and-built-a-tech-company-cfd4f94087be',
        type: 'blog article',
        upvotes: '',
      },
    ],
    reviews: [
      {
        _id: '0',
        createdBy: '1',
        createdAt: '09-10-2021',
        comment: 'Very useful tutorial for beginner web developers',
        rating: '5',
      },
      {
        _id: '1',
        createdBy: '2',
        createdAt: '09-10-2022',
        comment: '',
        rating: '5',
      },
      {
        _id: '2',
        createdBy: '3',
        createdAt: '09-10-2020',
        comment: '',
        rating: '4.5',
      },
    ],
    repo: 'https://github.com/aCarinato/giroq-frontend',
    steps: [
      {
        _id: '1',
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
        _id: '2',
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
      {
        _id: '2',
        postedBy: '2',
        text: 'Very useful and recommended as a starting point for people who want to learn the basics of web development',
      },
      {
        _id: '3',
        postedBy: '7',
        text: 'I would like it to be in react too',
      },
    ],
  },
  {
    _id: '1',
    createdBy: '8',
    title: 'Reddit API with Python',
    fullDescription: '',
    shortDescription: 'Automate retrieval of reddit posts',
    goals: [
      { _id: '0', label: 'Accept a subreddit name as an input' },
      { _id: '1', label: 'Retrieve at least 200 posts from a subreddit.' },
      { _id: '2', label: 'Retrive hot reddits' },
      { _id: '3', label: 'Retrive most popular reddits' },
      { _id: '4', label: 'Save on .csv file' },
      {
        _id: '5',
        label: 'BONUS: Perform topic clustering on retrieved reddits',
      },
    ],
    // difficulty: 'beginner',
    difficulty: { _id: '1', label: 'intermediate' },
    maxParticipants: { _id: '2', label: '2' },
    idealConfig: [{ _id: '0', n: '1', role: 'python scripting' }],
    stack: [{ _id: '3', label: 'python' }],
    topics: [
      { _id: '4', label: 'third-party API' },
      { _id: '5', label: 'machine learning' },
      { _id: '6', label: 'NLP' },
      { _id: '7', label: 'topic clustering' },
    ],
    resources: [
      {
        _id: '0',
        name: 'reddit API with python',
        link: 'https://www.redditAPIeeee.com',
        type: 'video',
        upvotes: '',
      },
      {
        _id: '1',
        name: 'topic clustering with python',
        link: 'https://www.tosorea.com',
        type: 'blog article',
        upvotes: '',
      },
    ],
    reviews: [
      {
        _id: '0',
        createdBy: '1',
        createdAt: '09-10-2022',
        comment: 'Very useful tutorial for beginner API',
        rating: '5',
      },
      {
        _id: '1',
        createdBy: '2',
        createdAt: '09-10-2021',
        comment: '',
        rating: '3',
      },
      {
        _id: '2',
        createdBy: '3',
        createdAt: '09-10-2020',
        comment: '',
        rating: '5',
      },
    ],
    repo: 'https://github.com/aCarinato/giroq-frontend',
    steps: [
      {
        _id: '1',
        n: '1',
        tasks: [
          {
            participantId: '0',
            names: ['Get reddit API keys', 'Setup connection with script'],
          },
        ],
      },
      {
        _id: '2',
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
        _id: '3',
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
