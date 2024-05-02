import Link from "next/link";
import TopicCard from "./TopicCard";

// Sample topics data - replace with actual data fetching logic
const topics = [
  {
    id: 0,
    title: "All Topics", // [all, topics] ---> all-topics
    description: "Do all DSA topics.",
    href: "/topics/all",
  },
  {
    id: 1,
    title: "Linked Lists",
    description: "Learn about linked lists and their operations.",
    href: "/topics/linked-lists",
  },
  {
    id: 2,
    title: "Stacks",
    description: "Learn about stacks and their operations.",
    href: "/topics/stacks",
  },
  {
    id: 3,
    title: "Queues",
    description:
      "Learn about queues, their operations, and different types of queues.",
    href: "/topics/queues",
  },
];

export default function TopicsList() {
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          title={topic.title}
          description={topic.description}
          href={topic.href}
        />
      ))}
    </div>
  );
}
