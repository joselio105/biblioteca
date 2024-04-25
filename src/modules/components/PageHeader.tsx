import { Link } from "react-router-dom";
import { Button } from "./Button";

export function PageHeader() {
  return (
    <>
      <header className="w-full py-4 bg-stone-800">
        <div className="h-16 max-w-7xl w-full mx-auto px-4 lg:px-0 flex items-center gap-3">
          <Link to="/">
            <img
              className="h-16 w-16 object-contain rounded-full"
              src="/pib-logo.jpg"
              alt="PIB Floripa logo"
            />
          </Link>
          <h1 className="text-2xl text-blue-500 font-bold">Biblioteca</h1>
        </div>
      </header>
      <nav className="max-w-7xl w-full mx-auto px-4 lg:px-0 pt-3 flex items-center justify-end gap-3">
        <Button to="/loans">Empréstimos</Button>
        <Button to="/publications">Publicações</Button>
        <Button to="/users">Usuários</Button>
      </nav>
    </>
  );
}
