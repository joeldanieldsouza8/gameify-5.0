import Link from "next/link";
import TopicCard from "./TopicCard";
import { fetchAllTopics } from "@/actions/topic.actions";
import { TopicType } from "@/types/types";

export default async function TopicsList() {
  const topics: TopicType[] = await fetchAllTopics();

  return (
    <div className="flex flex-wrap gap-4 justify-start md:justify-between">
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
