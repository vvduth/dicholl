import React from "react";
import { Metadata } from "next";
import { getMyOrders } from "@/lib/actions/order.action";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { formatId } from "@/lib/utils";
import Pagination from "@/components/shared/pagination";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "My Orders",
  description: "My Orders",
};
const OrderPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getMyOrders({
    page: Number(page) || 1,
  });
  return (
    <div className="space-y-2">
      <h2 className="h2-bold"> Order history </h2>
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
                  <Link href={`/order/${order.id}`}>
                  <span className="px-2">
                  Details</span></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {
          orders.totalPages >= 1 && (
            <Pagination
              page={Number(page) || 1}
              totalPages={orders?.totalPages}
            
            />
          )
        }
      </div>
    </div>
  );
};

export default OrderPage;
