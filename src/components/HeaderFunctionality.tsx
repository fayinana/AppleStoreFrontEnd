import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
  }) => void;
}

export default function ProductFilters({
  onFilterChange,
}: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("-price");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, minPrice, maxPrice, sort });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="sort">Sort By</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-price">Price: High to Low</SelectItem>
            <SelectItem value="price">Price: Low to High</SelectItem>
            <SelectItem value="-createdAt">Newest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Apply Filters</Button>
    </form>
  );
}
