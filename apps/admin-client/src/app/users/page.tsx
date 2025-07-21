import UserTable from '@/app/components/userTable'
// import { useUsers } from '@/hooks/useUsers' // your react-query hook for fetching users

export default function UsersPage() {
  //   const { data, isLoading, isError } = useUsers()

  //   if (isLoading) return <div>Loading users...</div>
  //   if (isError) return <div>Error loading users</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {/* <UserTable data={data || []} /> */}
    </div>
  )
}
