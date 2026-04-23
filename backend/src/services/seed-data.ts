export interface SeedSource {
  id: string;
  name: string;
  url: string;
}

export interface SeedData {
  jurisdiction: string;
  lastVerified: string;
  sources: SeedSource[];
  timeline: Array<{
    id: string;
    title: string;
    description: string;
    sourceId?: string;
  }>;
  stateProcesses: Record<string, string[]>;
  glossary: Array<{
    term: string;
    definition: string;
    sourceId?: string;
  }>;
  faq: Array<{
    id: string;
    question: string;
    answer: string;
    sourceId?: string;
  }>;
}

export const seedData: SeedData = {
  jurisdiction: "India",
  lastVerified: "2026-04-22",
  sources: [
    {
      id: "eci-main",
      name: "Election Commission of India",
      url: "https://eci.gov.in"
    }
  ],
  timeline: [
    {
      id: "notification",
      title: "Election Notification",
      description: "Election schedule and constituency details are announced.",
      sourceId: "eci-main"
    },
    {
      id: "nomination",
      title: "Nomination Period",
      description: "Candidates submit nomination papers within the notified window.",
      sourceId: "eci-main"
    },
    {
      id: "polling-day",
      title: "Polling Day",
      description: "Eligible voters cast ballots at designated polling stations.",
      sourceId: "eci-main"
    },
    {
      id: "counting-results",
      title: "Counting and Results",
      description: "Votes are counted and official results are declared.",
      sourceId: "eci-main"
    }
  ],
  stateProcesses: {
    default: [
      "Check eligibility and voter roll status.",
      "Carry valid voter identification on polling day.",
      "Find polling station details from official election portals.",
      "Follow polling staff instructions and complete voting process."
    ],
    maharashtra: [
      "Verify your name in Maharashtra voter list.",
      "Review official district polling information.",
      "Reach polling station during notified timing.",
      "Cast vote and verify process completion."
    ],
    karnataka: [
      "Confirm enrollment in Karnataka electoral roll.",
      "Check constituency and booth details.",
      "Bring accepted ID and follow booth instructions.",
      "Complete voting and track result timelines from official channels."
    ]
  },
  glossary: [
    {
      term: "Electoral Roll",
      definition: "The official list of registered voters in a constituency.",
      sourceId: "eci-main"
    },
    {
      term: "Model Code of Conduct",
      definition: "A set of guidelines for political parties and candidates during elections.",
      sourceId: "eci-main"
    }
  ],
  faq: [
    {
      id: "faq-1",
      question: "How do I check if I am eligible to vote?",
      answer: "Check the latest voter roll and eligibility rules published by official election authorities.",
      sourceId: "eci-main"
    }
  ]
};
