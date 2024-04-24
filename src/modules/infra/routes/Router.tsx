import { LoansContainer } from "@/interfaces/containers/LoansContainer";
import { PublicationsContainer } from "@/interfaces/containers/PublicationsContainer";
import { UsersContainer } from "@interfaces/containers/UsersContainer";
import { Root } from "@layouts/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export function Router() {
  const routes = createBrowserRouter([
    {
      element: <Root />,
      path: "/",
      children: [
        {
          element: <PublicationsContainer />,
          path: "/",
        },
        {
          element: <UsersContainer />,
          path: "/users",
        },
        {
          element: <LoansContainer />,
          path: "/loans",
        },
        {
          element: <PublicationsContainer />,
          path: "/publications",
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
