DO $$ BEGIN
 CREATE TYPE "badge" AS ENUM('unranked', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'elite', 'champion', 'unreal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "difficulty" AS ENUM('easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "topicTag" AS ENUM('linked_lists', 'arrays', 'binary_search', 'divide_and_conquer', 'stacks', 'queues', 'trees', 'hash_tables', 'graphs', 'recursion', 'recursive_binary_search_trees', 'sorting', 'tree_traversal', 'dynamic_programming', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"canCreateQuestions" boolean DEFAULT false NOT NULL,
	"canDeleteQuestions" boolean DEFAULT false NOT NULL,
	"canEditQuestions" boolean DEFAULT false NOT NULL,
	CONSTRAINT "admin_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "answeredQuestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"totalQuestionsAnswered" integer DEFAULT 0 NOT NULL,
	"userClerkID" text NOT NULL,
	CONSTRAINT "answeredQuestions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "example" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL,
	"explanation" text NOT NULL,
	"questionID" uuid NOT NULL,
	CONSTRAINT "example_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"topicTag" "topicTag" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "post_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"postID" uuid NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "comment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"topicTag" "topicTag" NOT NULL,
	"xpPoints" integer NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "question_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionPost" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"questionID" uuid NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "questionPost_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionComment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"questionPostID" uuid NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "questionComment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testCase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL,
	"expectedOutput" text NOT NULL,
	"questionID" uuid NOT NULL,
	CONSTRAINT "testCase_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"clerkID" text PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"email" varchar(255) NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"badge" "badge" DEFAULT 'unranked' NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"dailyStreaks" integer DEFAULT 0 NOT NULL,
	"xpPoints" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_clerkID_unique" UNIQUE("clerkID"),
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userPreference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"emailNotification" boolean DEFAULT false NOT NULL,
	"darkMode" boolean DEFAULT false NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userClerkID" text NOT NULL,
	CONSTRAINT "userPreference_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answeredQuestions" ADD CONSTRAINT "answeredQuestions_userClerkID_user_clerkID_fk" FOREIGN KEY ("userClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "example" ADD CONSTRAINT "example_questionID_question_id_fk" FOREIGN KEY ("questionID") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_authorClerkID_user_clerkID_fk" FOREIGN KEY ("authorClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_postID_post_id_fk" FOREIGN KEY ("postID") REFERENCES "post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_authorClerkID_user_clerkID_fk" FOREIGN KEY ("authorClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question" ADD CONSTRAINT "question_authorClerkID_user_clerkID_fk" FOREIGN KEY ("authorClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionPost" ADD CONSTRAINT "questionPost_questionID_question_id_fk" FOREIGN KEY ("questionID") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionPost" ADD CONSTRAINT "questionPost_authorClerkID_user_clerkID_fk" FOREIGN KEY ("authorClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionComment" ADD CONSTRAINT "questionComment_questionPostID_questionPost_id_fk" FOREIGN KEY ("questionPostID") REFERENCES "questionPost"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionComment" ADD CONSTRAINT "questionComment_authorClerkID_user_clerkID_fk" FOREIGN KEY ("authorClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testCase" ADD CONSTRAINT "testCase_questionID_question_id_fk" FOREIGN KEY ("questionID") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userPreference" ADD CONSTRAINT "userPreference_userClerkID_user_clerkID_fk" FOREIGN KEY ("userClerkID") REFERENCES "user"("clerkID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
