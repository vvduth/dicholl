import { Metadata } from "next";
import React from "react";
import { getAllUsers } from "@/lib/actions/user.action";
import { requireAdmin } from "@/lib/auth-guard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { deleteUser } from "@/lib/actions/user.action";
export const metadata: Metadata = {
  title: "User Management",
  description: "User Page",
};
const AdminUserPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();
  const { page = "1" } = await props.searchParams;
  const users = await getAllUsers({ page: Number(page) });
  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Users</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role === 'user' ? 
                (<Badge
                  variant={"secondary"}
                >User</Badge>) : (
                  <Badge
                    variant={"default"}
                  >Admin</Badge>
                )}</TableCell>
                <TableCell>
                  <Button asChild variant={"outline"} size={"sm"}>
                    <Link href={`/admin/users/${user.id}`}>
                      <span className="px-2">Edit</span>
                    </Link>
                  </Button>
                  {/* button delete */}
                   <DeleteDialog id={user.id} action={deleteUser} /> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;
