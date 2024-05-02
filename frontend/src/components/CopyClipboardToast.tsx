"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type CopyClipboardToastProps = {
  questionID: string;
};

export function CopyClipboardToast({
  questionID,
}: CopyClipboardToastProps) {
  const { toast } = useToast();

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(questionID);

      toast({
        description: "Question ID copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy question ID to clipboard", error);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleCopyClick}
    >
      Copy Question ID
    </Button>
  );
}
