import { Button } from "../components/Button.tsx";

export default function PostControls() {
  return (
    <div>
      <div class="display flex justify-center my-5 gap-3">
        <Button
          hx-get="/api/postQuery"
          hx-target="#post-container"
          hx-swap="innerHTML"
        >
          Get Posts using HTMX
        </Button>
        <Button
        >
            <a href="/posts/add">Add new post</a>
          
        </Button>
      </div>
      <div id="post-container" class="mx-20"></div>
    </div>
  );
}
