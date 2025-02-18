import React from "react";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";
const Home = async () => {
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Featured Products"
        limit={6}
      />
    </>
  );
};

export default Home;
