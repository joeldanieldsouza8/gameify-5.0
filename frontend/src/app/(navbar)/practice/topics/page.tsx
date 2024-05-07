// ShadcnUI Components
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

// React Libraries
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

// React Components
import CodeEditor from "@/components/Editor/CodeEditor";

import { convertToTitleCase } from "@/lib/utils";
import { fetchQuestionById } from "@/actions/question.actions";
import { fetchExamplesByQuestionId } from "@/actions/example.actions";
import { fetchCodeSnippetsByQuestionId } from "@/actions/codeSnippet.actions";
import { fetchTestCasesByQuestionId } from "@/actions/testCase.actions";

type SpecificQuestionPageProps = {
  searchParams: {
    category: string;
    question: string;
  };
};

export default async function SpecificQuestionPage({
  searchParams,
}: SpecificQuestionPageProps) {
  // console.log("searchParams", searchParams); // debug
  console.log("searchParams.question", searchParams.question); // debug

  const question = await fetchQuestionById(searchParams.question);
  // console.log("question", question); // debug

  const examples = await fetchExamplesByQuestionId(searchParams.question);

  const codeSnippets = await fetchCodeSnippetsByQuestionId(
    searchParams.question
  );
  // console.log("(page.tsx) codeSnippets", codeSnippets.snippets); // debug

  const testCases = await fetchTestCasesByQuestionId(searchParams.question);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <Card className="md:w-5/12 w-full h-auto">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{question.title}</CardTitle>
            <div className="flex flex-col gap-2">
              <CopyClipboardToast questionID={searchParams.question} />
              <RedirectQuestionCommunity questionID={searchParams.question} />
            </div>
          </div>
          <CardDescription>
            <div className="flex gap-3">
              <span>{convertToTitleCase(question.difficulty)}</span>
              <span>{convertToTitleCase(question.topicTag)}</span>
              <span>{question.xpPoints} XP</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>{question.body}</div>
            {examples.map((example) => (
              <div key={example.id} className="flex flex-col gap-1">
                <span>Example 1</span>
                <span>Input: {example.input}</span>
                <span>Output: {example.output}</span>
                <span>Explanation: {example.explanation}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <span>{question.upvotes}</span>
            <span>{question.downvotes}</span>
          </div>
        </CardFooter>
      </Card>

      <div className="md:w-7/12 w-full flex flex-col gap-4">
        <Card className="w-full h-96">
          <CodeEditor codeSnippets={codeSnippets} />
        </Card>
        <Card className="w-full h-96">{/* Insert CodeEditor here */}</Card>
      </div>
    </div>
  );
}
