import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from "../../../components/NavBar.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id } = ctx.params;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "GET",
      },
    );

    if (response.ok) {
      const user = await response.json();
      return ctx.render({ user });
    }
    return ctx.render(JSON.stringify({ msg: "Could not fetch user" }));
  },
  async POST(req, ctx) {
    const { id } = ctx.params;
    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      },
    );

    if (response.ok) {
      const editedUser = await response.json();
      return ctx.render({ editedUser });
    }
    return ctx.render(JSON.stringify({ msg: "Could not edit user" }));
  },
};

export default function Edit(props: PageProps) {
  if (props.data.user) {
    const user = props.data.user;
    return (
      <>
      <NavBar/>
      <div>
        <div class="container">
          <form
            method="post"
            class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200"
          >
            <h5 class="text-2xl">Add user</h5>
            <div>
              <label htmlFor="name" class="pr-8">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                class="rounded border-2 border-black"
              />
            </div>
            <div>
              <label htmlFor="email" class="pr-8">Email</label>
              <input
                type="textarea"
                name="email"
                id="email"
                value={user.email}
                class="rounded border-2 border-black"
              />
            </div>
            <div>
              <label htmlFor="phone" class="pr-8">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={user.phone}
                class="rounded border-2 border-black"
              />
            </div>
            <div>
              <button
                type="submit"
                class="px-2 py-1 border-black border-2 rounded bg-white hover:bg-black hover:text-white transition-colors"
              >
                Edit user
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
    );
  }

  if (props.data.editedUser) {
    const user = props.data.editedUser;
    return (
      <>
       <NavBar/>
        <div class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200">
          <h5 class="text-2xl">User edited:</h5>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div class="text-center">
          The user is mock-edited and will not appear on the user list.
        </div>
      </>
    );
  } else {
    return ( 
    <>
     <NavBar/>
    <h1>Something went wrong</h1>;
    </>
    )
  }
}
