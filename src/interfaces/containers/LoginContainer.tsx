import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button";
import { PageHeading } from "@components/PageHeading";
import { ICredentials } from "@/modules/types/auth";

export function LoginContainer() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleClick = () => {
    const credentials: ICredentials = {
      email: "clauss@gmail.com",
      password: "123",
    };

    signIn(credentials)
      .then((response) => {
        navigate("/user/" + response.user?.id);
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
