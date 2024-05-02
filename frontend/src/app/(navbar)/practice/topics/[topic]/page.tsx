import DifficultyTagsList from "@/components/DifficultyTagsList";
import H1 from "@/components/H1";
import { Search } from "@/components/Search";
import { columns } from "./columns";
import { DataTable } from "@/app/(navbar)/practice/topics/[topic]/data-table";

type TopicPageProps = {
  params: {
    topic: string;
  };
};

const difficultyLevels = ["Easy", "Medium", "Hard"];

// Sample data array
const data = [
  {
    id: "1",
    question_name: "Reverse a linked list in-place",
    topic_tag: "Linked List",
    difficulty_tag: "Easy",
    slug: "linked-list"
  },
  {
    id: "2",
    question_name: "Find the kth smallest element in a BST",
    topic_tag: "Binary Search Tree",
    difficulty_tag: "Medium",
    slug: "binary-search-tree"
  },
  {
    id: "3",
    question_name: "Implement a stack using two queues",
    topic_tag: "Stacks",
    difficulty_tag: "Hard",
    slug: "stacks"
  },
  // Add more sample questions as needed
];

export default function TopicPage({ params }: TopicPageProps) {
  const { topic } = params;

  // call endpoint to get data

  return (
    <div className="flex flex-col gap-6">
      <H1>{topic}</H1>

      <div className="flex flex-wrap gap-4 items-center w-full justify-between">
        <Search />

        <DifficultyTagsList difficultyLevels={difficultyLevels} />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
