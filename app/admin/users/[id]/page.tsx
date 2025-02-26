import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { requireAdmin } from "@/lib/auth-guard";
import { getUserById } from "@/lib/actions/user.action";
import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: "Update User",
  description: "Update User Page",
};
const AdminEditUserPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const user = await getUserById(id);
  if (!user) {
    notFound();
  }
  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update user</h1>
      <UpdateUserForm 
        user={user}
        />
    </div>
  );
};

export default AdminEditUserPage;
