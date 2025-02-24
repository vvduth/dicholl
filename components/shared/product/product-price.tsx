import React from "react";
import { cn } from "@/lib/utils";
const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // ensure 2 decimals
  const stringValue = value.toFixed(2);

  // get the int/float
  const [intval, floatVal] = stringValue.split(".");
  return (
    <>
      <p className={cn("text-2xl", className)}>
        <span className="text-xs align-super">€</span>
        {intval}
        <span className="text-xs align-super">.{floatVal}</span>
      </p>
    </>
  );
};

export default ProductPrice;
