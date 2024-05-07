import { redirect } from "next/navigation";

import { Search } from "@/components/Search";
import H1 from "@/components/H1";
import H3 from "@/components/H3";
import TopicsList from "@/components/TopicsList";

export default async function PracticePage() {
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8">
      <H1>Practice</H1>
      <Search />
      <H3>Browse Topics</H3>
      <TopicsList />
    </div>
  );
}
