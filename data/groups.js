export const groups = [
  {
    _id: '1',
    name: 'python study',
    description:
      'Finding buddies to learn python. The group is open to beginners from Amsterdam time zone',
    organiser: '1',
    nBuddies: 6,
    buddies: ['1', '3', '7', '8'],
    mentorRequired: 'yes',
    nMentorsRequired: 1,
    mentors: ['1'],
    filled: false,
    learning: ['python', 'html'],
    hasProposedAssignment: true,
    proposedAssignmentID: '0',
    proposedProjectLink: '',
    isClosed: false,
    feedback: [
      {
        fromUserID: '1',
        to: [
          { userID: '3', rate: '5', comment: 'Very nice working together' },
          { userID: '7', rate: '4', comment: 'Improving consistencys' },
        ],
      },
      {
        fromUserID: '3',
        to: [{ userID: '1', rate: '4', comment: 'Communication to improve' }],
      },
    ],
  },
  {
    _id: '2',
    name: 'learning javascript - full beginner',
    description: 'For ',
    organiser: '2',
    nBuddies: 4,
    buddies: ['5'],
    mentorRequired: 'yes',
    nMentorsRequired: 1,
    mentors: [],
    filled: false,
    learning: ['javascript', 'html', 'css'],
    hasProposedAssignment: true,
    proposedAssignmentID: '1',
    proposedProjectLink: 'Odin Project',
    isClosed: false,
  },
  {
    _id: '3',
    name: 'frontend react',
    description: '',
    organiser: '3',
    nBuddies: 2,
    buddies: ['6'],
    mentorRequired: 'no',
    nMentorsRequired: 0,
    mentors: [],
    filled: true,
    learning: ['react', 'node', 'express'],
    hasProposedAssignment: false,
    proposedAssignmentID: '',
    proposedProjectLink: '',
    isClosed: false,
  },
  {
    _id: '4',
    name: 'frontend react',
    description: 'building a simple ecommerce application with MERN stack',
    organiser: '5',
    nBuddies: 5,
    buddies: ['6', '5'],
    mentorRequired: 'no',
    nMentorsRequired: 0,
    mentors: [],
    filled: false,
    learning: ['react', 'node', 'express', 'mongodb'],
    hasProposedAssignment: true,
    proposedAssignmentID: '1',
    proposedProjectLink: '',
    isClosed: false,
  },
];
