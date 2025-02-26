import React from "react";
import { getFeaturedProducts, getLatestProducts } from "@/lib/actions/product.action";
import ProductList from "@/components/shared/product/product-list";
import ProductCarousel from "@/components/shared/product/product-carousel";
const Home = async () => {

  const latestProduct = await getLatestProducts();
  const featuredProduct = await getFeaturedProducts();
  return (
    <>
    {featuredProduct.length > 0 && <ProductCarousel data={featuredProduct} />}
      <ProductList
        data={latestProduct}
        title="Featured Products"
        limit={6}
      />
    </>
  );
};

export default Home;
