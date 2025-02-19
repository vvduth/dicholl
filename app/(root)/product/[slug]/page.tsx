import React from "react";
import { getProductBySlug } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrice from "@/components/shared/product/product-price";
import ProductImages from "@/components/shared/product/product-images";

const ProductDetailPage = async (props: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images columns */}
        <div className="col-span-2">
          <ProductImages images={product.images} />
        </div>
        {/* details columns */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>
              {product.brand} {product.category}
            </p>
            <h1 className="h3-bold">{product.name}</h1>
            <p>
              {product.rating} of {product.numReviews}
            </p>
            <div
              className="flex flex-col sm:flex-row 
                    gap-3 sm:items-center"
            >
              <ProductPrice
                value={Number(product.price)}
                className="w-24 rounded-full bg-green-100
                             text-green-700 px-5 py-2"
              />
            </div>
          </div>
          <div className="mt-10">
            <p className="font-semibold">Description</p>
            <p>{product.description}</p>
          </div>
        </div>
        {/* action col */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>
                  <ProductPrice value={Number(product.price)} />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                {product.stock > 0 ? (
                  <Badge variant={"outline"}>In stock</Badge>
                ) : (
                  <Badge variant={"destructive"}>Out of stock</Badge>
                )}
              </div>
              {product.stock > 0 && (
                <div className="flex-center">
                  <Button className="w-full">Add to cart</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
