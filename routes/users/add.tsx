import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { fromFileUrl } from "$std/path/win32.ts";
import { Button } from "../../components/Button.tsx";
import UserControls from "../../components/UserControls.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render();
  },
  async POST(req: Request, ctx: HandlerContext): Promise<any> {
    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });

    const user = await response.json();
    return ctx.render(user);
  },
};

export default function AddUser(props: PageProps) {
  const user = props.data || null;

  if (user) {
    return (
      <>
        <div class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200">
          <h5 class="text-2xl">New user created:</h5>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div class="text-center">
          The new user is mock-created and will not appear on the user list.
        </div>
      </>
    );
  }

  return (
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
              value=""
              class="rounded border-2 border-black"
            />
          </div>
          <div>
            <label htmlFor="email" class="pr-8">Email</label>
            <input
              type="textarea"
              name="email"
              id="email"
              value=""
              class="rounded border-2 border-black"
            />
          </div>
          <div>
            <label htmlFor="phone" class="pr-8">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value=""
              class="rounded border-2 border-black"
            />
          </div>
          <div>
            <button type="submit" class="px-2 py-1 border-black border-2 rounded bg-white hover:bg-black hover:text-white transition-colors">
              Create by post request to same-page handler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
