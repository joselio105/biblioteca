import { Search as SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./Button";
import clsx from "clsx";

interface Props {
  labelText: string;
  executeQuery: (data: string) => void;
  placeholder?: string;
  feedback?: string;
}

export function Search({
  labelText,
  placeholder,
  executeQuery,
  feedback = "",
}: Props) {
  const [query, setQuery] = useState("");

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    executeQuery(query);
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="flex items-center gap-3 mb-5">
        <label
          htmlFor="query"
          className="text-primary-700 dark:text-primary-300 text-xs"
        >
          {labelText}
        </label>
        <input
          className={clsx(
            "flex-1 p-3 rounded-lg",
            "bg-primary-300 placeholder:text-primary-600",
            "focus:outline-none focus:outline-secondary-100",
            "dark:bg-primary-700 dark:text-primary-200 dark:placeholder:text-primary-400",
            "dark:focus:outline-none dark:focus:outline-secondary-900"
          )}
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
      {feedback.length > 0 ? (
        <span className="flex items-center justify-center p-3 mb-4 -mt-4 rounded-lg bg-error-800 text-error-200">
          {feedback}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
