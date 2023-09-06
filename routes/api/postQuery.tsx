interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function PostQuery() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
  });
  const posts: Post[] = await response.json();

  return (
    <>
    <table id="posts-table">
      <tr class="mt-5">
        <th>User id</th>
        <th>Post id</th>
        <th>Title</th>
        <th>Content</th>
        <th></th>
        <th></th>
      </tr>
      <div id="delete-message"></div>
      {posts.map((post) => (
        <>
        <tr key={post.id} class="mt-5" id={`row-${post.id}`}>
          <td class="p-5 text-dark-600">{post.id}</td>
          <td class="p-5 text-dark-600">{post.userId}</td>
          <td class="p-5 text-dark-600">{post.title}</td>
          <td class="p-5 text-dark-600">{post.body}</td>
          <td class="p-5 text-blue-900"><a href={`posts/edit/${post.id}`}>Edit</a></td>
          <td 
            class="p-5 text-blue-900"
            hx-get={`/api/deletePost/${post.id}`}
            hx-target="#delete-message"
            hx-swap="innerHTML"
          >Delete
         </td>
        </tr>
        </>
      ))}
    </table>
    </>
  );
}
