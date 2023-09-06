import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { id } = ctx.params
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      return ctx.render({id});

    }
    console.log("Something went wrong")
  },
};

export default function Delete(props: PageProps) {

  return <span class="block py-10 font-bold text-center w-full">Post {props.data.id} mock-deleted</span>;
}
