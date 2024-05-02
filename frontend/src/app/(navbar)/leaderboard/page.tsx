import { User, columns } from "./columns";
import { DataTable } from "@/app/(navbar)/practice/topics/[topic]/data-table";
import H1 from "@/components/H1";

// const data = [
//   {
//     id: "1",
//     positions: "1",
//     name: "Alice Johnson",
//     total_questions_answered: 173,
//     xp_points: 167,
//     badge: "gold",
//   },
//   {
//     id: "2",
//     positions: "2",
//     name: "Bob Smith",
//     total_questions_answered: 43,
//     xp_points: 626,
//     badge: "gold",
//   },
// ];

export default async function LeaderboardPage() {
  const response = await fetch("http://localhost:4000/users");
  const data = await response.json();

  return (
    <div>
      <H1>Leaderboard</H1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
