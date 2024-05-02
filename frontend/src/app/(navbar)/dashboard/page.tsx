// This is a page component that will be rendered by the server and sent to the client. By default this component is a server component.

import { CardContent } from "@/components/Card";
import H1 from "@/components/H1";
import LineChart from "@/components/LineChart";
import LeaderboardCard from "@/components/LeaderboardCard";

import { CircleUserRound } from "lucide-react";
import { GiLaurelsTrophy } from "react-icons/gi";

import { redirect } from "next/navigation";

// import { getUser } from "@/lib/actions/user.actions";

import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { getUserById } from "@/lib/actions/user.actions";

import { convertToTitleCase } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const uesrSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    xp_points: "1,999.00 XP",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    xp_points: "1,999.00 XP",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    xp_points: "39.00 XP",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    xp_points: "299.00 XP",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    xp_points: "39.00 XP",
  },
];

export default async function DashboardPage() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  const validateUser = await currentUser();
  console.log("Current User", validateUser); // debug

  // // Redirect the user to the login page if they are not signed in
  if (!userId) {
    return redirect("/sign-in");
  }
  // console.log("userId", userId); // debug

  // TODO: Get the user details from the database
  const user = await getUserById(userId);
  console.log("Fetched user details", user); // debug

  return (
    <div className="flex flex-col gap-5 w-full ">
      <div className="flex justify-between items-center">
        <H1>Dashboard</H1>
        <header>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </header>
      </div>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-2 ">
        <CardContent>
          <section className="flex justify-between gap-2">
            {/* label */}
            <p className="text-sm">Rank</p>
            {/* icon */}
            <div className="h-4 w-4 text-gray-400">
              <GiLaurelsTrophy />
            </div>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">
              {convertToTitleCase(user?.badge)}
            </h2>
            <p className="text-xs text-gray-500">XP Points: {user?.xpPoints}</p>
          </section>
        </CardContent>

        <CardContent>
          <section className="flex justify-between gap-2">
            {/* label */}
            <p className="text-sm">User Details</p>
            {/* icon */}
            <div className="h-4 w-4 text-gray-400">
              <CircleUserRound />
            </div>
          </section>

          <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">
              {validateUser?.firstName} {validateUser?.lastName}
            </h2>
            <p className="text-xs text-gray-500">Username: {user?.username}</p>
            <p className="text-xs text-gray-500">
              Daily Streaks: {user?.dailyStreaks}
            </p>
          </section>
        </CardContent>
      </section>

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <LineChart />
        </CardContent>

        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Leaderboard</p>
            <p className="text-sm text-gray-400">
              You earned {user?.xpPoints} XP points this month.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <LeaderboardCard
              key={i}
              email={d.email}
              name={d.name}
              xp_points={d.xp_points}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
