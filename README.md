# Deno Fresh & Deno Fresh with HTMX

![fresh](./assets/fresh.ico) ![htmx](./assets/htmx.png)

## Description

Study of HTMX usage using JSON Placeholder api.

## Notes

Currently just two fetches: Fetch users and fetch posts.

### Fetch posts

Fetches posts by calling a route in the app with htmx. The route contains a
function that fetches data from the api and returns it formatted in jsx (tsx).
Instead of re-directing user to that route, the returning jsx is inserted in a
specified section in the original page.

The buttons to fire the htmx are **islands** rendered client side.

❗For some reason the method duplicates the NavBar component (inserted in
_app.tsx).

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
