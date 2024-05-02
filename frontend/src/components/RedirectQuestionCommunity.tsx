"use client";

import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

type RedirectQuestionCommunityProps = {
  questionID: string;
};

export default function RedirectQuestionCommunity({
  questionID,
}: RedirectQuestionCommunityProps) {
  console.log("questionID", questionID); // debug

  const { toast } = useToast();

  function handleNewCommunityWindow() {
    const url = `/community/ask-question?questionID=${encodeURIComponent(questionID)}`;
    window.open(url, "_blank");

    toast({
      description: "Redirecting to Community",
    });
  }

  return (
    <Button variant="outline" onClick={handleNewCommunityWindow}>
      Redirect to Community
    </Button>
  );
}
