import React from "react";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-4"
        >
          {data.map((product: any) => (
            <div key={product}>{product.name}</div>
          ))}
        </div>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default ProductList;
