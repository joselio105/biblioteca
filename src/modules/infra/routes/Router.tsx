import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "@layouts/Root";
import { PageNotFound } from "@layouts/PageNotFound";
import { LoanContainer } from "@interfaces/containers/LoanContainer";
import { UserContainer } from "@interfaces/containers/UserContainer";
import { LoansContainer } from "@interfaces/containers/LoansContainer";
import { UsersContainer } from "@interfaces/containers/UsersContainer";
import { PublicationContainer } from "@interfaces/containers/PublicationContainer";
import { PublicationsContainer } from "@interfaces/containers/PublicationsContainer";

export function Router() {
  const routes = createBrowserRouter([
    {
      element: <Root />,
      path: "/",
      errorElement: <PageNotFound />,
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
          element: <UserContainer />,
          path: "/user/:id",
        },
        {
          element: <LoansContainer />,
          path: "/loans",
        },
        {
          element: <LoanContainer />,
          path: "/loan/:id",
        },
        {
          element: <PublicationsContainer />,
          path: "/publications",
        },
        {
          element: <PublicationContainer />,
          path: "/publication/:id",
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
