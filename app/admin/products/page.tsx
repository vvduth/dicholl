import React from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/actions/product.action";
import { formatCurrency, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";
import { deleteProduct } from "@/lib/actions/product.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
const AdminProductpage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const searchtext = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query: searchtext || "",
    page,
    category,
  });
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
        <h1 className="h2-bold">Products</h1>
          {searchtext && (
            <div>
              Search results for <strong>{searchtext}</strong>
              <Link href="/admin/products">
                <Button  variant={"outline"} size={"sm"}>
                  Clear search
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        <Button asChild variant={"default"}>
          <Link href="/admin/products/create">Create product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant={"outline"} size={"sm"}>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                {/* delete */}
                <DeleteDialog 
                  id={product.id}
                  action={deleteProduct}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products?.totalPages && products.totalPages > 1 && (
        <Pagination 
            page={page}
            totalPages={products.totalPages}
        />
      )}
    </div>
  );
};

export default AdminProductpage;
