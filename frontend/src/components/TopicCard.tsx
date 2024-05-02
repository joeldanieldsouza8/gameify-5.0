import Link from "next/link";

type TopicCardProps = {
  title: string;
  description: string;
  href: string; // Add href prop
};

export default function TopicCard({
  title,
  description,
  href,
}: TopicCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <Link
        href={`
      /practice/${href}
      `}
        className="flex flex-col"
      >
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </Link>
    </div>
  );
}
