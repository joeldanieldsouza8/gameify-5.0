export type UserType = {
  clerkID: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  badge: string;
  role: string;
  dailyStreaks: number;
  xpPoints: number;
  createdAt: string;
  updatedAt: string;
};

export type TopicType = {
  id: number;
  title: string;
  description: string;
  href: string;
};

export type QuestionType = {
  id: string;
  title: string;
  body: string;
  difficulty: string;
  topicTag: string;
  xpPoints: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  authorClerkID: string;
};

export type ExampleType = {
  id: string;
  input: string;
  output: string;
  explanation: string;
  questionID: string;
};

export type CodeSnippetType = {
  id: string;
  // snippets: unknown;
  snippets: {
    [key: string]: string; // Assuming keys are languages like 'javascript', 'python', etc., and values are code snippets in those languages
  };
  questionID: string;
};
