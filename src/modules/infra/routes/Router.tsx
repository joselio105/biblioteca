import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { Root } from "@layouts/Root";
import { PageNotFound } from "@layouts/PageNotFound";
import { LoanContainer } from "@interfaces/containers/LoanContainer";
import { UserContainer } from "@interfaces/containers/UserContainer";
import { LoansContainer } from "@interfaces/containers/LoansContainer";
import { UsersContainer } from "@interfaces/containers/UsersContainer";
import { LoginContainer } from "@interfaces/containers/LoginContainer";
import { UserFormContainer } from "@interfaces/containers/UserFormContainer";
import { LoanFormContainer } from "@interfaces/containers/LoanFormContainer";
import { PublicationContainer } from "@interfaces/containers/PublicationContainer";
import { PublicationsContainer } from "@interfaces/containers/PublicationsContainer";
import { PublicationFormContainer } from "@interfaces/containers/PublicationFormContainer";

export function Router() {
  const { isSigned } = useAuth();

  function protectedLoader(isSigned: boolean, { params }: LoaderFunctionArgs) {
    if (isSigned) {
      return params;
    } else {
      return redirect("/login");
    }
  }

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
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <UserContainer />,
          path: "/user/:id",
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <UserFormContainer />,
          path: "/userForm/:id?",
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <LoansContainer />,
          path: "/loans/:userId?",
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <LoanContainer />,
          path: "/loan/:id",
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <LoanFormContainer />,
          path: "/loanForm/:id?",
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <PublicationsContainer />,
          path: "/publications",
        },
        {
          element: <PublicationContainer />,
          path: "/publication/:id",
        },
        {
          element: <PublicationFormContainer />,
          path: "/publicationForm/:id?/:isbn?",
          loader: (props) => protectedLoader(isSigned, props),
        },
        {
          element: <LoginContainer />,
          path: "/login",
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
