import { cn } from "@/lib/utils";

type H3Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H3({ children, className }: H3Props) {
  return <h3 className={cn("text-xl font-medium", className)}>{children}</h3>;
}
