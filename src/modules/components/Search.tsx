import { Search as SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./Button";

interface Props {
  labelText: string;
  executeQuery: (data: string) => void;
  placeholder?: string;
}

export function Search({ labelText, placeholder, executeQuery }: Props) {
  const [query, setQuery] = useState("");

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    executeQuery(query);
  }

  return (
    <form onSubmit={submitHandler} className="flex items-center gap-3 mb-5">
      <label htmlFor="query" className="text-stone-400 text-xs">
        {labelText}
      </label>
      <input
        className="flex-1 bg-stone-700 text-stone-200 p-3 rounded-lg placeholder:text-stone-400 focus:outline-none focus:outline-blue-900"
        type="text"
        id="query"
        name="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit">
        <SearchIcon size={20} /> Buscar
      </Button>
    </form>
  );
}
