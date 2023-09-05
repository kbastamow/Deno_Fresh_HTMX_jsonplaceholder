import { AppProps } from "$fresh/server.ts";
import NavBar from "../components/NavBar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.4"></script>
        <title>fresh_jsonplaceholder</title>
      </head>
      <body>
      <NavBar></NavBar>
        <Component />
      </body>
    </html>
  );
}
