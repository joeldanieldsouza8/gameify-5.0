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
import H3 from "@/components/H3";

import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

export default function page() {
  return (
    <CardContent className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader className="">
          <div className="border-b-2 flex justify-between pb-2">
            <CardTitle>Question Title</CardTitle>
            <CardDescription>#2863</CardDescription>
          </div>
          <CardDescription className="pt-4">
            Here is the question content
          </CardDescription>
        </CardHeader>
        <CardContent>{/* Card Content here */}</CardContent>
        <CardFooter className="flex justify-between">
          {/* <Link href={`community/posts?post=${postID}`}>
                <Button variant="default">Reply</Button>
              </Link> */}
          <div className="flex justify-between gap-6">
            <Badge>Badge</Badge>
            <Badge>Badge</Badge>
            <Badge>Badge</Badge>
          </div>

          <OptionsPicker />
        </CardFooter>
      </Card>

      <H3>20 Answers</H3>

      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between">
            <CardDescription className="mr-28">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </CardDescription>
            <CardDescription className="pb-2">Username</CardDescription>
          </div>
        </CardHeader>

        <CardContent>{/* Card Content here */}</CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-1.5 items-center">
            <p>20</p>
            <IoBookmarkOutline />
          </div>
          <OptionsPicker />
        </CardFooter>
      </Card>
    </CardContent>
  );
}
