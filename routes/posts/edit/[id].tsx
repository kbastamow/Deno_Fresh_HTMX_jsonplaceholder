import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from "../../../components/NavBar.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id } = ctx.params;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "GET",
      },
    );

    if (response.ok) {
      const post = await response.json();
      return ctx.render({ post });
    }
    return ctx.render(JSON.stringify({ msg: "Could not fetch post" }));
  }
}
    
export default function Edit(props: PageProps) {
  if (!props.data.post) return (
      <>
      <NavBar/>
      <h1>Something went wrong</h1>
      </>
   )
    const post = props.data.post;
    return (
      <>
        <NavBar />
        <div>
          <div class="container">
            <form
              hx-put="/api/editPostQuery"
              method="put"
              id="editPostForm"
              hx-target="this"
              hx-swap="outerHTML"
              class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200"
            >
              <h5 class="text-2xl">Edit Post</h5>
              <div>
                <input type="hidden" name="id" value={post.id} />
                <div class="w-full text-center">
                  <label htmlFor="title" class="pr-8">Title</label>
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={post.title}
                  class="rounded border-2 border-black"
                />
              </div>
              <div>
                <div class="w-full text-center">
                  <label htmlFor="body">Content</label> <br />
                </div>
                <textarea
                  rows={4}
                  cols={40}
                  name="body"
                  id="body"
                  form="editPostForm"
                  class="rounded border-2 border-black"
                  value={post.body}
                >
                </textarea>
              </div>
              <div>
                <button
                  type="submit"
                  class="px-2 py-1 border-black border-2 rounded bg-white hover:bg-black hover:text-white transition-colors"
                >
                  Edit through HTMX
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

