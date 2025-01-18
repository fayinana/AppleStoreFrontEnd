import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterHeader({
  onSortChange,
  onSearch,
  onLimitChange,
  sortArray,
  limitArray,
}) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <div className="gap-2 rounded-lg shadow-sm flex items-center px-1 py-6 justify-evenly flex-wrap">
      <form
        onSubmit={handleSearch}
        className="flex items-center  w-full md:w-1/2 self-end gap-2"
      >
        <Input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="ghost">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
      <div className="flex flex-wrap gap-4 items-center justify-start">
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-[100px] md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortArray.map((sort: { value: string; text: string }) => (
              <SelectItem key={sort.value} value={sort.value}>
                {sort.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[100px] md:w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {limitArray.map((limit: { value: string; text: string }) => (
              <SelectItem key={limit.value} value={limit.value}>
                {limit.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
