import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialPayments = [
  {
    id: "1",
    customer: "John Doe",
    amount: 999,
    date: "2023-06-01",
    status: "Completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    amount: 1299,
    date: "2023-06-02",
    status: "Pending",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    amount: 799,
    date: "2023-06-03",
    status: "Failed",
  },
];

const PaymentList = () => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment List</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">#{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Completed"
                        ? "default"
                        : payment.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PaymentList;
