"use client";

import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const languages = [
  {
    value: "python",
    label: "Python",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  {
    value: "java",
    label: "Java",
  },
];

type LanguageSelectorProps = {
  language: string;
  onSelectLanguage: (language: string) => void;
};

export default function LanguageSelector({
  language,
  onSelectLanguage,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {language
            ? languages.find((lang) => lang.value === language)?.label
            : "Select language..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map((lang) => (
              <CommandItem
                key={lang.value}
                value={lang.value}
                onSelect={(currentValue) => {
                  onSelectLanguage(
                    currentValue === language ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <span>{lang.label}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    language === lang.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
