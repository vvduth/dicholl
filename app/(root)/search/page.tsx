import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { getAllProducts, getAllCategories } from "@/lib/actions/product.action";
import Link from "next/link";
import React from "react";

const price_ranges = [
  {
    name: "1€ to 50€",
    value: "1-50",
  },
  {
    name: "51€ to 100€",
    value: "51-100",
  },
  {
    name: "101€ to 200€",
    value: "101-200",
  },
  { 
    name: "201€ to 500€",
    value: "201-500",
  },
  {
    name: "501€ to 1000€",
    value: "501-1000",
  },
  {
    name: "1000€+",
    value: "1000-100000",
  }
]

const rating_ranges = [4,3,2,1]

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    sort?: string;
    page?: string;
    rating?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    sort = "newest",
    page = "1",
    rating = "all",
  } = await props.searchParams;

   // Construct filter url
   const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };


  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  });

  const categories = await getAllCategories();
  
  return (
    <div
      className="grid 
      md:grid-cols-5 md:gap-5
      "
    >
      <div className="filter-links">
        <div className="text-xl mb-2 mt-3">Category</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  category === "all" || category === "" ? "text-blue-500" : ""
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                 className={`${category === x.category ? "text-blue-500" : ""}`}
                  href={getFilterUrl({ c: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl mb-2 mt-8">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  price === "all" || price === "" ? "text-blue-500" : ""
                }`}
                href={getFilterUrl({ p: "all" })}
              >
                Any
              </Link>
            </li>
            {price_ranges.map((p) => (
              <li key={p.value}>
                <Link
                 className={`${price === p.value ? "text-blue-500" : ""}`}
                  href={getFilterUrl({ p: p.value })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xl mb-2 mt-8">Ratings</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${
                  rating === "all" || rating === "" ? "text-blue-500" : ""
                }`}
                href={getFilterUrl({ r: "all" })}
              >
                Any
              </Link>
            </li>
            {rating_ranges.map((r) => (
              <li key={r}>
                <Link
                 className={`${rating === r.toString() ? "text-blue-500" : ""}`}
                  href={getFilterUrl({ r: r.toString() })}
                >
                  {r} stars
                 </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 space-y-4 ">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex items-center">
            {q !== "all" && q !== '' && 'Search text: '+ q }
            {category !== "all" && category !== '' && ' Category: '+ category }
            {price !== "all" && price !== '' && ' Price: '+ price }
            {rating !== "all" && rating !== '' && ' Rating: '+ rating + '+ stars' }
            &nbsp;
            {(q !== 'all' && q !== '') ||           
            (category !== 'all' && category !== '') ||
            (price !== 'all' && price !== '') ||
            (rating !== 'all' && rating !== '') ? (
              <Button  variant={'link' } asChild>
                <Link href={"/search"} >Clear</Link>
              </Button>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}

          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
