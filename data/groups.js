export const groups = [
  {
    id: '1',
    name: 'python study',
    description: 'Finding buddies to learn python',
    organiser: '2',
    nBuddies: 6,
    buddies: ['1', '3'],
    mentorRequired: 'yes',
    nMentorsRequired: 1,
    mentors: ['1'],
    filled: false,
    learning: ['python', 'html'],
    isProposedProject: false,
    proposedProject: '',
    proposedProjectLink: '',
  },
  {
    id: '2',
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
    isProposedProject: true,
    proposedProject: 'Odin Project',
    proposedProjectLink: 'Odin Project',
  },
  {
    id: '3',
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
    isProposedProject: false,
    proposedProject: '',
    proposedProjectLink: '',
  },
];
