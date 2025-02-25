"use client";
import { useToast } from "@/hooks/use-toast";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import { productDefaultValue } from "@/lib/constants";
import { Form } from "@/components/ui/form";
const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(type === "Create" ? insertProductSchema : updateProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefaultValue,
  });

  return (
    <Form
     {...form}
    >
      <form className='space-y-8'>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* name */}
          {/* slug */}
         
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* category */}
          {/* brand */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* price */}
          {/* stock */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row upload-field">
          {/* images */}
         
        </div>  
        <div className="upload-field">
          {/* is featured */}
        </div>
        <div>
          {/* Desc */}
        </div>
        <div>
          {/* submit */}
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
