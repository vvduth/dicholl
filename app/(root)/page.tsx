import React from "react";
import { getLatestProducts } from "@/lib/actions/product.action";
import ProductList from "@/components/shared/product/product-list";
const Home = async () => {

  const latestProduct = await getLatestProducts();
  return (
    <>
      <ProductList
        data={latestProduct}
        title="Featured Products"
        limit={6}
      />
    </>
  );
};

export default Home;
