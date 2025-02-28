import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";

export default async function Admin() {
  const client = await clerkClient();

  const users = (await client.users.getUserList()).data;

  return (
    <table>
      <thead>
        <tr className="bg-neutral-600 text-white text-lg p-6">
          <th>Email</th>
          <th>Role</th>
          <th>Change</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => {
          return (
            <tr
              key={user.id}
              className={`${
                users.indexOf(user) % 2 === 0 ? "bg-neutral-200" : "bg-white"
              }`}
            >
              <td className="pl-12">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </td>

              <td className="text-center">
                {user.publicMetadata.role as string}
              </td>

              <td className="flex gap-2 justify-center">
                <form action={setRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 hover:bg-neutral-800 hover:text-white"
                  >
                    Make Admin
                  </button>
                </form>

                <form action={setRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="realtor" name="role" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 hover:bg-neutral-800 hover:text-white"
                  >
                    Make Realtor
                  </button>
                </form>

                <form action={removeRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 hover:bg-neutral-800 hover:text-white"
                  >
                    Remove Role
                  </button>
                </form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
