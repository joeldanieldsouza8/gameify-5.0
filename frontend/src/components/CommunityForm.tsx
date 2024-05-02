"use client";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const formSchema = z.object({
  questionID: z.string().min(2, {
    message: "Question ID must be at least 2 characters.",
  }),
  questionText: z.string().min(1, {
    message: "Question text is required.",
  }),
});

export function CommunityForm() {
  const searchParams = useSearchParams();

  const searchQuestionID = searchParams.get("questionID");
  console.log("searchQuestionID", searchQuestionID); // debug

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionID: searchQuestionID || "", // Initialize form with URL parameter or empty string
      questionText: "", // Initialize form with empty string
    },
  });

  // React Hook Form's `setValue` is used to update form value when `searchQuestionID` changes.
  // This is useful for scenarios where `searchQuestionID` might change and you want the form to reflect the new value.
  useEffect(() => {
    if (searchQuestionID) {
      form.setValue("questionID", searchQuestionID);
    }
  }, [searchQuestionID, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Card className="w-full h-2/4">
        <CardHeader>
          <CardTitle>Ask A Question</CardTitle>
          <CardDescription>Here is the question</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="questionID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question ID</FormLabel>
                    <Input placeholder="Enter Your Question ID..." {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questionText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <Textarea placeholder="Enter Your Question..." {...field} />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Button Content here */}
        </CardFooter>
      </Card>
    </div>
  );
}
