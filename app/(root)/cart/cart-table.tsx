"use client";
import { Cart } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart, removeFromCart } from "@/lib/actions/cart.actions";
import { Minus, Plus, Loader, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <h1 className="h2-bold py-4">Shopping cart</h1>
      {!cart || cart.items.length === 0 ? (
        <>
          <div>
            Cart is empty
            <Link href={"/"}>Go shopping</Link>
          </div>
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="flex-center gap-2">
                        <Button
                          disabled={isPending}
                          variant={"outline"}
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeFromCart(item.productId);
                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={isPending}
                          variant={"outline"}
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addToCart(item);
                              if (!res.success) {
                                toast({
                                  
                                  description: res.message,
                                });
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                        <TableCell className="text-right">
                            {formatCurrency(item.price)}
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Card>
                <CardContent className="p-4 gap-4">
                    <div className="pb-3 text-xl">
                        Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)} items):{" "}
                        <span className="font-bold">
                            {formatCurrency(cart.itemsPrice)}
                        </span>
                    </div>
                    <Button className="w-full"
                     disabled={isPending}
                     onClick={() => startTransition(() => router.push("/shipping-address"))}>
                        {isPending ? (<Loader className="w-4 h-4 animate-spin"/>) : (
                            <ArrowRight className="h-4 w-4"/>
                        )}
                        Process to checkout
                    </Button>
                </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default CartTable;
