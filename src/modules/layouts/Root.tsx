import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";

export function Root() {
  return (
    <div className="w-screen min-h-screen bg-stone-900">
      <header className="w-full py-4 bg-stone-800">
        <div className="h-16 max-w-7xl w-full mx-auto px-4 lg:px-0 flex items-center gap-3">
          <Link to="/">
            <img
              className="h-16 w-16 object-contain rounded-full"
              src="/pib-logo.jpg"
              alt="PIB Floripa logo"
            />
          </Link>
          <h1 className="text-2xl text-blue-200 font-bold">Biblioteca</h1>
        </div>
      </header>
      <nav className="max-w-7xl w-full mx-auto px-4 lg:px-0 pt-3 flex items-center justify-end gap-3">
        <Button to="/loans">Empréstimos</Button>
        <Button to="/publications">Publicações</Button>
        <Button to="/users">Usuários</Button>
      </nav>
      <main className="max-w-7xl w-full mx-auto px-4 lg:px-0 py-4 text-stone-200">
        <Outlet />
      </main>
    </div>
  );
}

interface ButtonProps {
  to: string;
  children: ReactNode;
}
function Button({ to, children }: ButtonProps) {
  return (
    <Link
      className="bg-blue-900 text-stone-200 text-lg px-4 py-3 rounded-lg hover:bg-blue-700 duration-300"
      to={to}
    >
      {children}
    </Link>
  );
}
