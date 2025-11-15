import TanstackQueryProvider from "./provider/TanstackQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} position="right" />
      <Toaster />
    </TanstackQueryProvider>
  );
}

export default App;
