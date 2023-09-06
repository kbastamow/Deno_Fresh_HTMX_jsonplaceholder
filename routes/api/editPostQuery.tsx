import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async PUT(req, ctx) {
      const form = await req.formData();
      const title = form.get("title");
      const body = form.get("body");
      const id = form.get("id")
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        },
      );
  
      if (response.ok) {
        const post = await response.json();
        return ctx.render(post);
      }
      return ctx.render(JSON.stringify({ msg: "Could not edit post" }));
    },
  };
  
  export default function Edit(props: PageProps) {
      
    if (!props.data) {
        return (
            <>
            <h1>Something went wrong</h1>
            </>
        )
      }

      const post = props.data
      return (
        <>
          <div class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200">
            <h5 class="text-2xl">Post edited:</h5>
            <p>Title: {post.title}</p>
            <p class="mx-15 px-15">Content: {post.body}</p>
          </div>
          <div class="text-center">
            The new post is mock-edited and will not appear on the posts list.
          </div>
        </>
      );
      }
