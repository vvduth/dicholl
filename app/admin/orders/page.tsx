import React from "react";
import { auth } from "@/auth";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-guard";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatId } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";
export const metadata: Metadata = {
  title: "Admin Orders",
};
const AdminOrderPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = 1 } = await props.searchParams;

  await requireAdmin();

  const orders = await getAllOrders({
    page: Number(page),
    limit: 2,
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PAID</TableHead>
            <TableHead>DELIVER</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.data.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatId(order.id)}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt
                  ? formatDate(order.paidAt)
                  : "Not Paid"}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt
                  ? formatDate(order.deliveredAt)
                  : "Not delivered"}
              </TableCell>
              <TableCell>
                <Button asChild variant={"outline"} size={"sm"}>
                  <Link href={`/order/${order.id}`}>
                    <span className="px-2">Details</span>
                  </Link>
                </Button>
                {/* button delete */}
                <DeleteDialog 
                  id={order.id}
                  action={deleteOrder}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders.totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />
      )}
    </div>
  );
};

export default AdminOrderPage;
