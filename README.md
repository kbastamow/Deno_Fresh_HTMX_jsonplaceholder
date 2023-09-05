# Deno Fresh & Deno Fresh with HTMX

![fresh](./assets/fresh.ico) ![htmx](./assets/htmx.png)

## Description

Study of HTMX usage using JSON Placeholder api.

## Notes

Currently contains get posts & users, and post new post & post new user.

### Fetch posts

Fetches posts by calling a route in the app with htmx. The route contains a
function that fetches data from the api and returns it formatted in jsx (tsx).
Instead of re-directing user to that route, the returning jsx is inserted in a
specified section in the original page.

The button to fire the htmx is an **island** rendered client side, since they premade `<Button>` component.

❗~~  for some reason the method duplicates the NavBar component (inserted in _app.tsx) ~~ 
**Since htmx fetches the whole page, whatever stable parts that would be displayed on that page (e.g. navbar) will be repeated**

```jsx
<body>
  <NavBar></NavBar>
  <Component />
</body>;
```

![screenshot](./assets/screenshot-posts.png)

### Fetch users

Fetches users with Fresh's method by linking the user to a route where a Get
handler fetches the data from the api and passes them onto the component.

The buttons contain `<a>` tags to redirect the user and are **components**
rendered server-side.

Usercontrols (buttons) component needs to be repeated on top of the page that
displays the data, as the user actually moves to a new location.

![screenshot](./assets/screenshot-users.png)

### Create a new post with **hx-post**

Route *posts/add* displays a form to create a new post.
On submit, hx fires api/addPostQuery route which receives post request in handler and renders component with the returned data

*posts/add:* Click create post (hx-post)  
⬇️  
*api/addPostRequest:* Handler POST method  
⬇️  
*api/addPostRequest:* JSON Placeholder API  
⬇️  
*api/addPostRequest:* Render.ctx in handler with returned data  
⬇️  
*api/addPostRequest:* return component with data in jsx  
⬇️   
*posts/add:* Replace form with returned JSX 

Inserting hx result again replicates the navbar in the middle of the component.

![screenshot](./assets/screenshot-newpost.png)

### Create a new user with Fresh route handler

Route *users/add* displays a form to create a new user.
On submit, 
`<form method="post">` sends a post request to **this same page's handler**, where data is sent to JSON Placeholder API, received and rendered back to the component. 

*users/add:* Click create user  
⬇️  
*users/add:* Handler on same route handles POST method and sends data to API.  
⬇️  
*users/add:* Render.ctx in handler renders component with the returned data from API.  
⬇️  
*users/add:* When Api-returned data is present in the component, information about the new user is rendered instead of the form.

With this method, all action happens in the same component, and on **server-side**.


### Delete post with htmx

Observations:

❗Whatever hx fetches and inserts into the page **cannot contain** another component, as all styling disappears.

For each row of post data, the idea was to return a delete button that contains the id of the post. But it doesn't seem to be possible to return a component inside the jsx for htmx.

Attempted solution very convoluted: 
- Insert hx fetch to *api/deletePost/[id]* that inserts a confirmation message into the table.
- The confirmation message should be in another route, but a confirmation button needs to be an island, so bring a confirmation component that includes an island button that handles the request to delete the post from the api and redirects the post to the page that fetches the post list again.

**Not feasible!**

A simpler solution was implemented:

For each fetched post, The postQuery renders a table cell with its own hx-GET call to *api/deletePost/[id]*.
```jsx
  <td 
    hx-get={`/api/deletePost/${post.id}`}
    hx-target={`#row-${post.id}`}
    hx-swap="innerHTML">
    Delete
  </td>
  ```
  

 This route contains a GET-handler method that sends a delete request to JSON Placeholder, and on successful response renders a component with a message that the post was deleted, which is finally inserted into the postQuery view.

❗Downside: **No confirmation message before deletion.**

### Delete user with pure Fresh

The delete button in the table row is actually a modal component.

The modal contains a confirmation to delete the user. Modal button is a handleClick function inside the component that sends a fetch to api/userQuery where DELETE method of the handler takes care of JSON placeholder api request.

On successful response from the API, the modal show a brief message about the user being deleted, and the redirects the user to `window.location.href = "/api/userQuery"`, which is the GET-request to the handler and refetches the user list to show updated content (only theoretically, as JSON placeholder db isn't actually altered)

SO:

Delete button  
⬇️   
Modal confirmation  
⬇️  
HandleClick  
⬇️  
*api/userQuery* DELETE handler method  
⬇️   
Modal success message  
⬇️  
*api/userQuery* GET handler method


