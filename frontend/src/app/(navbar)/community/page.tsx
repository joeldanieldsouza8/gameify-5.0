// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import H1 from "@/components/H1";
import { CommunityForm } from "@/components/CommunityForm";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OptionsPicker from "@/components/OptionsPicker";
import Link from "next/link";

export default async function CommunityPage() {


  const postID = "2863";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Browse Questions</CardTitle>
          <CardDescription>Find an already asked question</CardDescription>
        </div>

        <Link href="/community/ask-question">
          <Button variant="default" className="w-40">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="w-full md:w-5/12">
        <Input placeholder="Search" />
      </div>

      <div className="overflow-scroll">
        <Card className="w-full">
          <CardHeader>
            <div className="border-b-2 flex justify-between pb-2 items-center">
              <CardTitle>Question Title</CardTitle>

              <CardDescription className="flex flex-col gap-1 items-center">
                <p>asked:</p>
                <span>2 mins ago</span>
              </CardDescription>
              <CardDescription className="flex flex-col gap-1 items-center">
                <p>upvotes:</p>
                <span>0</span>
              </CardDescription>
              <CardDescription className="flex flex-col gap-1 items-center">
                <p>answers:</p>
                <span>0</span>
              </CardDescription>
              <CardDescription>#2863</CardDescription>
            </div>
            {/* <CardDescription className="pt-4">
                Here is the question content
              </CardDescription> */}
          </CardHeader>
          <CardContent className="pt-4">
            Here is the question content...
          </CardContent>
          <CardFooter className="flex justify-between pt-4">
            <Link
              href={`community/posts?post=${postID}`}
              className="flex gap-4"
            >
              <Button variant="default">More</Button>
            </Link>
            <div className="flex justify-between gap-6">
              <Badge>Badge</Badge>
              <Badge>Badge</Badge>
              <Badge>Badge</Badge>
            </div>

            <OptionsPicker />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
