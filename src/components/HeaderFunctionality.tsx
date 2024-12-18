"use client";

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
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
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
      <div className="flex flex-wrap gap-4">
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortArray.map((sort: { value: string; text: string }) => (
              <SelectItem value={sort.value}>{sort.text}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            {limitArray.map((sort: { value: string; text: string }) => (
              <SelectItem value={sort.value}>{sort.text}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
