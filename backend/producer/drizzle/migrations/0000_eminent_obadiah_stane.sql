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
 CREATE TYPE "topicTag" AS ENUM('all-topics', 'other', 'array', 'math', 'string', 'hash-table', 'dynamic-programming', 'sorting', 'greedy', 'depth-first-search', 'database', 'binary-search', 'tree', 'matrix', 'bit-manipulation', 'two-pointers', 'binary-tree', 'heap-(priority-queue)', 'prefix-sum', 'stack', 'simulation', 'graph', 'design', 'counting', 'sliding-window', 'backtracking', 'union-find', 'enumeration', 'linked-list', 'ordered-set', 'monotonic-stack', 'trie', 'number-theory', 'divide-and-conquer', 'recursion', 'bitmask', 'queue', 'binary-search-tree', 'topological-sort', 'string-matching', 'combinatorics', 'rolling-hash', 'shortest-path', 'game-theory', 'interactive', 'data-stream', 'brainteaser', 'monotonic-queue', 'randomized', 'merge-sort', 'iterator', 'concurrency', 'doublly-linked-list', 'probability-and-statistics', 'quickselect', 'bucket-sort', 'suffix-array', 'minimum-spanning-tree', 'counting-sort', 'shell', 'line-sweep', 'reservoir-sampling', 'stronly-connected-component', 'eulerian-circuit', 'radix-sort', 'rejection-sampling', 'biconnected-component');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
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
	"id" serial PRIMARY KEY NOT NULL,
	"totalQuestionsAnswered" integer DEFAULT 0 NOT NULL,
	"userClerkID" text NOT NULL,
	CONSTRAINT "answeredQuestions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "codeSnippet" (
	"id" serial PRIMARY KEY NOT NULL,
	"snippets" jsonb NOT NULL,
	"questionID" serial NOT NULL,
	CONSTRAINT "codeSnippet_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "constraints" (
	"id" serial PRIMARY KEY NOT NULL,
	"bulletPoints" text NOT NULL,
	"questionID" serial NOT NULL,
	CONSTRAINT "constraints_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "example" (
	"id" serial PRIMARY KEY NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL,
	"explanation" text,
	"questionID" serial NOT NULL,
	CONSTRAINT "example_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" serial PRIMARY KEY NOT NULL,
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
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"postID" serial NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "comment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"topicTag" "topicTag" NOT NULL,
	"slug" varchar(500) NOT NULL,
	"xpPoints" integer NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "question_id_unique" UNIQUE("id"),
	CONSTRAINT "question_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionPost" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"questionID" serial NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "questionPost_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionComment" (
	"id" serial PRIMARY KEY NOT NULL,
	"body" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"downvotes" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"questionPostID" serial NOT NULL,
	"authorClerkID" text NOT NULL,
	CONSTRAINT "questionComment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testCase" (
	"id" serial PRIMARY KEY NOT NULL,
	"input" text NOT NULL,
	"output" text NOT NULL,
	"expectedOutput" text NOT NULL,
	"questionID" serial NOT NULL,
	CONSTRAINT "testCase_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topic" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"href" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "topic_id_unique" UNIQUE("id"),
	CONSTRAINT "topic_title_unique" UNIQUE("title"),
	CONSTRAINT "topic_href_unique" UNIQUE("href")
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
	"id" serial PRIMARY KEY NOT NULL,
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
 ALTER TABLE "codeSnippet" ADD CONSTRAINT "codeSnippet_questionID_question_id_fk" FOREIGN KEY ("questionID") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "constraints" ADD CONSTRAINT "constraints_questionID_question_id_fk" FOREIGN KEY ("questionID") REFERENCES "question"("id") ON DELETE no action ON UPDATE no action;
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
