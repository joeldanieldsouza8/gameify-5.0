import { CopyClipboardToast } from "@/components/CopyClipboardToast";
import RedirectQuestionCommunity from "@/components/RedirectQuestionCommunity";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SpecificQuestionPageProps = {
  searchParams: {
    category: string;
    question: string;
  };
};

export default function SpecificQuestionPage({
  searchParams,
}: SpecificQuestionPageProps) {
  return (
    <div className="flex gap-4">
      <Card className="w-5/12 h-screen">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Question</CardTitle>
            <div className="flex flex-col gap-4">
              <CopyClipboardToast questionID={searchParams.question} />
              <RedirectQuestionCommunity questionID={searchParams.question} />
            </div>
          </div>
          <CardDescription>Here is the question</CardDescription>
        </CardHeader>
        <CardContent>{/* Card Content here */}</CardContent>
        <CardFooter className="flex justify-between">
          {/* Button Content here */}
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4 w-7/12">
        <Card className="w-full h-1/2">
          <CardHeader>
            <CardTitle>Question</CardTitle>
            <CardDescription>Here is the question</CardDescription>
          </CardHeader>
          <CardContent>{/* Card Content here */}</CardContent>
          <CardFooter className="flex justify-between">
            {/* Button Content here */}
          </CardFooter>
        </Card>

        <Card className="w-full h-1/2">
          <CardHeader>
            <CardTitle>Question</CardTitle>
            <CardDescription>Here is the question</CardDescription>
          </CardHeader>
          <CardContent>{/* Card Content here */}</CardContent>
          <CardFooter className="flex justify-between">
            {/* Button Content here */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
