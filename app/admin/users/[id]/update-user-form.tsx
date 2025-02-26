"use client";
import { useToast } from "@/hooks/use-toast";
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { USER_ROLE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.action";
const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({...values, id: user.id});
      if (!res.success) { 
        return toast({
          title: "Error",
          description: res.message,
          variant: "destructive"
        })
      }
      toast({
        title: "Success",
        description: res.message,
        variant: "default"
      });

      form.reset();
      router.push("/admin/users");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive"
      });
    };
  };


  return (
    <div>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
          {/* email */}
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof updateUserSchema>,
                  "email"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      placeholder="Enter email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* name */}
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof updateUserSchema>,
                  "name"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* role */}
          <div>
          <FormField
              control={form.control}
              name="role"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof updateUserSchema>,
                  "role"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Role</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={field.value.toString()}
                    >
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue
                         placeholder="Select role..."
                        />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {USER_ROLE.map((role) => (
                            <SelectItem key={role} value={role} >
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-between mt-4">
              <Button
                type="submit"
                className="btn-primary w-full"
                disabled={form.formState.isSubmitting}
              >{ form.formState.isSubmitting ? 'Submitting...' : 'Update' }</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
