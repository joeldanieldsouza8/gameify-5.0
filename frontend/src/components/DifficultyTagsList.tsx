import { Button } from "@/components/ui/button";

type DifficultyTagsListProps = {
  difficultyLevels: string[];
};

export default function DifficultyTagsList({
  difficultyLevels,
}: DifficultyTagsListProps) {
  return (
    <div className="flex gap-2 md:gap-4 justify-center md:justify-start">
      {difficultyLevels.map((level) => (
        <Button key={level} variant="outline" className="btn btn-sm px-4 py-2">
          {level}
        </Button>
      ))}
    </div>
  );
}
