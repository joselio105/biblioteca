import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button";
import { PageHeading } from "@components/PageHeading";
import { ICredentials } from "@/modules/types/auth";

export function LoginContainer() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleClick = () => {
    const credentials: ICredentials = {
      email: "seninha@email.com",
      password: "123",
    };

    signIn(credentials)
      .then(({ user }) => {
        if (user) {
          const destin = `/user/${user.id}`;
          console.log(destin);
          return redirect(destin);
          // navigate("/user/" + response.user.id);
        } else {
          console.log("Falha ao realizar o login");
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <PageHeading>Login</PageHeading>
      <Button onClick={handleClick}>Login</Button>
    </>
  );
}
