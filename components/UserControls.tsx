import { useState } from "preact/hooks";
import { Button } from "./Button.tsx";

export default function UserControls() {
  return (
    <div class="display flex justify-center my-5 gap-3">
      <Button>
        <a href="/api/userQuery">Get Users using route, component & handler</a>
      </Button>
      <Button><a href="/users/add">Add new user</a></Button>
    </div>
  );
}
