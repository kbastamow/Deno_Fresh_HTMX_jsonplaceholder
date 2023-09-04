import { Button } from "../components/Button.tsx";

export default function PostForm() {
  return (
    <div>
      <div class="container">
        <form
          id="postform"
          method="post"
          hx-post="/api/addPostQuery"
          hx-target="this"
          hx-swap="innerHTML"
          class="display flex flex-col justify-center items-center gap-7 mx-40 py-10 bg-gray-200"
        >
          <h5 class="text-2xl">Add Post</h5>
          <div>
          <div class="w-full text-center">
            <label htmlFor="title" class="pr-8">Title</label>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value=""
              class="rounded border-2 border-black"
            />
          </div>
          <div>
          <div class="w-full text-center">
            <label htmlFor="body" >Content</label> <br />
           </div>
            <textarea
              rows={4}
              cols={40}
              name="body"
              form="postform"
              class="rounded border-2 border-black"
              value=""
            >
            </textarea>
          </div>
          <div>
          <button type="submit" class="px-2 py-1 border-black border-2 rounded bg-white hover:bg-black hover:text-white transition-colors">
          Create through HTMX
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
