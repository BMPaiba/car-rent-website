import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";

export const SearchArea = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      doSearch(inputValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    doSearch(inputValue);
  };

  const doSearch = (query: string) => {
    alert(`Searching for: ${query}`);
    // Aquí puedes agregar la lógica de búsqueda
  };

  return (
    <div className="flex border-2 items-center px-3 md:mx-3 rounded-xl gap-3 order-last md:order-none w-full md:max-w-sm lg:max-w-xl xl:w-full md:mt-0">
      <Search size={24} className="text-gray-500 " />

      <Input
        type="text"
        placeholder="Search something here"
        className="p-1 focus:outline-none focus:border-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <SlidersHorizontal
        size={24}
        onClick={handleClick}
        className="text-gray-500 cursor-pointer"
      />
    </div>
  );
};
