import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import ProductAddEdit from "./ProductAddEdit";

const initialProducts = [
  { id: "1", name: "iPhone 15 Pro", price: 999, stock: 50 },
  { id: "2", name: "MacBook Pro", price: 1299, stock: 30 },
  { id: "3", name: "iPad Pro", price: 799, stock: 40 },
];

export default function ProductsManagement() {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Product Management</h3>
        <div className="flex space-x-4 mb-4">
          <Modal triggerText="Add Product">
            <ProductAddEdit />
          </Modal>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
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
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
      </div>
    </Card>
  );
}
