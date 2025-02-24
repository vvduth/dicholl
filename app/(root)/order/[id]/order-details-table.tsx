"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import Image from "next/image";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { createPaypalOrder, approvePaypalOrder } from "@/lib/actions/order.action";
import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from "@paypal/react-paypal-js"
const OrderDetailsTables = ({ order, paypalClientId }: { order: Order, paypalClientId: string }) => {
  const {
    id,
    shippingAddress,
    orderitems,
    shippingPrice,
    taxPrice,
    totalPrice,
    itemsPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order;

  const {toast} = useToast()
  const PrintLoadingState = () => {
    const [{isPending, isRejected}] = usePayPalScriptReducer()
    let status = ''
    if (isPending) {
      status = 'Loading...'
    } else if (isRejected) {
      status = 'Error loading PayPal'
    }

    return status ;
  }

  const handleCreatePayPalOrder = async () => {
    const res  = await createPaypalOrder(order.id)
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message
      })
    }

    return res.data
  }

  const handleApprovePayPalOrder = async (data: {orderID: string}) => {
    const res = await approvePaypalOrder(order.id, data)
    toast({
      variant: res.success ? 'default' : 'destructive',
      description: res.message
    })
  }
  return (
    <div>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant={"secondary"}>
                  Paid at {formatDate(paidAt!)}
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Not Paid</Badge>
              )}
            </CardContent>
          </Card>
          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.streetAddress}, {shippingAddress.city} <br/>
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              
              {isDelivered ? (
                <Badge variant={"secondary"}>
                  Paid at {formatDate(paidAt!)}
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Not delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Order items</h2>
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link href={`/products/${item.slug}`}
                         className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt={item.name}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell>€{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <DropdownMenuSeparator/>
              <div className="flex justify-between">
                <div className="font-bold">Total</div>
                <div className="font-bold">{formatCurrency(totalPrice)}</div>
              </div>
              {!isPaid && paymentMethod === 'PayPal' && (
                <div>
                  <PayPalScriptProvider options={{ "clientId": paypalClientId, currency: "EUR", }}> 
                    <PrintLoadingState/>
                    <PayPalButtons 
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTables;
