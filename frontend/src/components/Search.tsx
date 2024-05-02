import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex-grow md:max-w-md lg:max-w-lg">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full"
      />
    </div>
  );
}
