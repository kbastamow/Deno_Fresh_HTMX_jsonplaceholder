import { context } from "https://deno.land/x/esbuild@v0.18.11/mod.js";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext) {
    const form = await req.formData();
    const title = form.get("title");
    const body = form.get("body");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const post = await response.json();
    return ctx.render(post);
  },
};

export default function AddPostQuery(props: PageProps) {
  const post = props.data;
  return (
    <>
      <div class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200">
        <h5 class="text-2xl">New post created:</h5>
        <p>Title: {post.title}</p>
        <p>Content: {post.body}</p>
      </div>
      <div class="text-center">
        The new post is mock-created and will not appear on the posts list.
      </div>
    </>
  );
}
