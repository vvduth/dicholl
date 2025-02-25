import React from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { getOrdersSummary } from "@/lib/actions/order.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeDollarSign,
  Barcode,
  CreditCard,
  
  User,
} from "lucide-react";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { Table,TableBody,TableCell,TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Charts from "./chart";
import { requireAdmin } from "@/lib/auth-guard";
export const metadata: Metadata = {
  title: "Admin Dashboard",
};
const AdminPage = async () => {

  await requireAdmin();

  const summary = await getOrdersSummary();
  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader
            className="flex flex-row items-center 
          justify-between space-y-0 pb-2"
          >
            <CardTitle className="text-sm font-medium">Total revenue</CardTitle>
            <BadgeDollarSign />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                summary.totalSales._sum.totalPrice?.toString() || 0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            className="flex flex-row items-center 
          justify-between space-y-0 pb-2"
          >
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(summary.ordercount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            className="flex flex-row items-center 
          justify-between space-y-0 pb-2"
          >
            <CardTitle className="text-sm font-medium">Customer</CardTitle>
            <User />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(summary.ordercount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            className="flex flex-row items-center 
          justify-between space-y-0 pb-2"
          >
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Barcode />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(summary.productCount)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Charts 
              data={{
                salesData: summary.salesData, 
              }}
            />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSale.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <TableCell>
                      {order?.user?.name ? order.user.name : "Deleted User"}
                    </TableCell>
                    <TableCell>
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(order.totalPrice)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/order/${order.id}`}
                      >Details</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
