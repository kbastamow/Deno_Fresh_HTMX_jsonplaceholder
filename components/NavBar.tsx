export default function NavBar() {

  return (
    <div class="container bg-red-800 text-white font-semibold h-20 display flex justify-between items-center">
      <div class="display flex gap-10 mx-7">
        <a href="/users">Users</a>
        <a href="/posts">Posts</a>
      </div>
      <form action="" class="display flex gap-3 mx-7">
        <input type="text" />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
