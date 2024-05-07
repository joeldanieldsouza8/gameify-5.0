import { fetchAllUsers } from "@/actions/user.actions";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import H1 from "@/components/H1";

import { convertToTitleCase } from "@/lib/utils";

import { UserType } from "@/types/types";

export default async function LeaderboardPage() {
  const users = await fetchAllUsers();

  const formattedUsers = users.map((user: UserType) => {
    return {
      id: user.clerkID,
      name: `${convertToTitleCase(user.firstName)} ${convertToTitleCase(
        user.lastName
      )}`,
      xp_points: user.xpPoints,
      badge: convertToTitleCase(user.badge),
    };
  });

  return (
    <div>
      <H1>Leaderboard</H1>
      <DataTable columns={columns} data={formattedUsers} />
    </div>
  );
}
