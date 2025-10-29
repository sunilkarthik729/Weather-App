import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 bg-white/10 backdrop-blur-lg p-3 rounded-2xl shadow-md w-full max-w-2xl mx-auto"
    >
      <input
        type="text"
        placeholder="Search for a city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-xl bg-transparent focus:outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:scale-105 transition-transform"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
