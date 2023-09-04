export default function AddPost() {
  return (
    <div class="container">
      <form class="display flex flex-col gap-7">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="body">Content</label>
          <input type="textarea" name="content" id="content" />
        </div>
        <div>
        </div>
      </form>
    </div>
  );
}
