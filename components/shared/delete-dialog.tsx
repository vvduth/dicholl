"use client";

import React from "react";
import { useState } from "react";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../ui/alert-dialog";

const DeleteDialog = ({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{
    success: boolean;
    message: string;
  }>;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();


  const handleDeleteClick =  () => { 
     startTransition(async () => {
        const res = await action(id);

        if (!res.success) {
            toast({
                variant: "destructive",
                description: res.message
            });  
        } else {
            setOpen(false);
            toast({
                variant: "default",
                description: res.message
            }); 
        }
     })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="ml-2" size={"sm"} variant={"destructive"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this order
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
            <Button
                variant={"destructive"}
                size={"sm"}
                disabled={isPending}    
                onClick={handleDeleteClick}
            >{isPending ? "Deleteing..." : "Delete"}</Button>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
