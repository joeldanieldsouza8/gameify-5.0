import DifficultyTagsList from "@/components/DifficultyTagsList";
import H1 from "@/components/H1";
import { Search } from "@/components/Search";
import { columns } from "./columns";
import { DataTable } from "@/app/(navbar)/practice/topics/[topic]/data-table";
import { convertToTitleCase, convertToSlug } from "../../../../../lib/utils";
import {
  fetchAllQuestions,
  fetchQuestionsByTopic,
} from "@/actions/question.actions";
import { QuestionType } from "@/types/types";

type TopicPageProps = {
  params: {
    topic: string;
  };
};

const difficultyLevels = ["Easy", "Medium", "Hard"];

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = params;
  console.log("Topic:", topic); // debug

  let questions: QuestionType[] = [];

  // Guard clause to prevent fetching data when the topic is not valid
  if (!topic) {
    return (
      <div>
        <H1>Invalid topic</H1>
      </div>
    );
  } else if (topic === "all") {
    questions = await fetchAllQuestions();
    console.log("All Questions Data:", questions); // debug
  } else {
    questions = await fetchQuestionsByTopic(topic);
    console.log("Questions Data:", questions); // debug
  }

  // Guard clause to prevent rendering the page when there are no questions
  if (!questions || questions.length === 0) {
    return (
      <div>
        <H1>No questions found</H1>
      </div>
    );
  }

  // Transform the data to match the DataTable component's expected structure
  const transformedQuestions = questions.map((question) => ({
    id: question.id,
    title: question.title,
    topicTag: convertToTitleCase(question.topicTag) || "N/A",
    difficulty: question.difficulty,
    slug: convertToSlug(question.topicTag),
  }));
  console.log("Transformed Questions Data:", transformedQuestions); // debug

  return (
    <div className="flex flex-col gap-6">
      <H1>{convertToTitleCase(topic)}</H1>

      <div className="flex flex-wrap gap-4 items-center w-full justify-between">
        <Search />

        <DifficultyTagsList difficultyLevels={difficultyLevels} />
      </div>

      <DataTable columns={columns} data={transformedQuestions} />
    </div>
  );
}
