import { HandlerContext, Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import DeleteUserModal from "../../islands/DeleteUserModal.tsx";
import UserControls from "../../components/UserControls.tsx";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });
    const users: User[] = await response.json();
    return ctx.render(users);
  },
  async DELETE(req: Request) {
    const body = await req.json()
    const id = JSON.stringify(body.id)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (response.ok) {
      const resp = await response.json()
        return new Response(JSON.stringify("User Deleted"))
    }
      throw new Error("Could not delete user")
  }
};
export default function UserQuery(props: PageProps) {
  const users: User[] = props.data;
  return (
    <>
      <UserControls></UserControls>
      <div id="user-container" class="mx-20 my-10">
        <table>
          <tr class="mt-5">
            <th>User id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th></th>
            <th></th>
          </tr>
          {users.map((user) => (
            <tr key={user.id} class="mt-5">
              <td class="p-5 text-dark-600">{user.id}</td>
              <td class="p-5 text-dark-600">{user.name}</td>
              <td class="p-5 text-dark-600">{user.email}</td>
              <td class="p-5 text-dark-600">
                {user.address.street} {user.address.suite}
                <br></br>
                {user.address.city} {user.address.zipcode}q
              </td>
              <td class="p-5 text-blue-900">{user.phone}</td>
              <td class="p-5 text-blue-900">Edit</td>
              
     
                <td class="p-5  text-blue-900"><DeleteUserModal id={user.id} name={user.name}></DeleteUserModal></td>
  
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
