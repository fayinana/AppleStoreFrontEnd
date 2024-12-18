import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, UserMinus, MoreVertical } from "lucide-react";
import useGetUsers from "./useGetUsers";
import LoadingSpinner from "@/components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { UpworkPagination } from "@/components/UpworkPagination";
import FilterHeader from "@/components/HeaderFunctionality";

const limitArray = [
  { value: 5, text: "5 item" },
  { value: 10, text: "10 item" },
  { value: 15, text: "15 item" },
  { value: 20, text: "20 item" },
];

const sortArray = [
  { value: "firstName", text: "Name (A-Z)" },
  { value: "-firstName", text: "Name (Z-A)" },
  { value: "-createdAt", text: "Date (Old to New)" },
  { value: "createdAt", text: "Date (New to Old)" },
];

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const sort = searchParams.get("sort") || "firstName";
  const search = searchParams.get("search") || "";
  const activeTab = searchParams.get("tab") || "overview";

  const { users, isLoading, total } = useGetUsers({
    limit,
    page: currentPage,
    sort,
  });

  const [filteredUser, setFilteredUser] = useState(users);

  const totalPages = Math.ceil(total / limit) || 1;

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      setSearchParams({
        page: "1",
        limit: limit.toString(),
        sort,
        search,
        tab: activeTab,
      });
    }
  }, [
    currentPage,
    totalPages,
    limit,
    sort,
    search,
    setSearchParams,
    activeTab,
  ]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }, [currentPage, limit, search, sort, queryClient]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({
        page: newPage.toString(),
        limit: limit.toString(),
        sort,
        search,
        tab: activeTab,
      });
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort,
      search: newSearch,
      tab: activeTab,
    });

    const newUser = users.filter((user) => {
      if (user.fullName.toLowerCase().includes(newSearch.toLowerCase())) {
        return user;
      }
    });

    setFilteredUser(newUser);
  };

  const handleLimitChange = (newLimit: number) => {
    setSearchParams({
      page: "1",
      limit: newLimit.toString(),
      sort,
      search,
      tab: activeTab,
    });
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort: newSort,
      search,
      tab: activeTab,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Management</h3>

        <FilterHeader
          sortArray={sortArray}
          limitArray={limitArray}
          onSortChange={handleSortChange}
          onSearch={handleSearchChange}
          onLimitChange={handleLimitChange}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUser.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                      <div className="grid gap-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            // Implement user edit functionality
                            console.log("Edit user:", user.id);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          // onClick={() => handleDeleteUser(user.id)}
                        >
                          <UserMinus className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {total <= limit ? null : (
          <UpworkPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Card>
  );
};

export default UserManagement;
