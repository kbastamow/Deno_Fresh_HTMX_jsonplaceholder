import { PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";

export default function DeleteUserModal({ id, name }) {
  const [showModal, setShowModal] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState("");
  const handleDelete = async (id: string) => {
    const response = await fetch("/api/userQuery", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setDeletedMessage("User mock-deleted");
      setTimeout(() => {
        window.location.href = "/api/userQuery";
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Delete
      </button>

      {!showModal
        ? <></>
        : (
          <div class="fixed top-0 left-0 right-0 z-50 w-full p-40 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full ">
              <div class="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {deletedMessage
                      ? <>{deletedMessage}</>
                      : <>Delete user {name} ?</>}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  {deletedMessage ? <></> : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
