import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from './SearchUsers'
import { clerkClient } from '@clerk/nextjs/server'
import { removeRole, setRole } from './_actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>
}) {
  if (!checkRole('admin')) {
    redirect('/')
  }

  const query = (await params.searchParams).search

  const client = await clerkClient()

  const users = query ? (await client.users.getUserList({ query })).data : []

  return (
    <div className="flex flex-col justify-center items-center p-5 mx-auto">
      <p className="my-10 text-lg font-extrabold">This is the protected admin dashboard restricted to users with the `admin` role.</p>

      <SearchUsers />
      
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>
                {user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress}
              </TableCell>
              <TableCell>{user.publicMetadata.role as string}</TableCell>
              <TableCell className="flex gap-2">
                <form action={setRole}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="role" value="admin" />
                  <Button variant="outline" size="sm">Admin</Button>
                </form>
                <form action={setRole}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="hidden" name="role" value="moderator" />
                  <Button variant="outline" size="sm">Moderator</Button>
                </form>
                <form action={removeRole}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button variant="destructive" size="sm">Xóa</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
