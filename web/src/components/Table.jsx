import axios from "axios";
import { ArrowUUpLeft, MagnifyingGlass } from "phosphor-react";
import { useContext, useState } from "react";
import { context } from "../context/ContextProvider";
import { TableData } from "./TableData";

export function Table() {
  const { lists, setLists, updateList, URL } = useContext(context);
  const [searchTask, setSearchTask] = useState("");

  async function handleSearchTask() {
    const searchs = lists.filter((list) =>
      list.description.toUpperCase().includes(searchTask.toUpperCase()) &&
      list.description.toLowerCase().includes(searchTask.toLowerCase())
        ? `&description__regex=/${searchTask}/i`
        : ""
    );

    await axios.get(`${URL}?sort=-createdAt${searchs}`).then((resp) => {
      setLists(searchs);
      searchTask.length === 0 && updateList();
    });
  }

  function handleReturnValue() {
    updateList();
    setSearchTask("");
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      handleSearchTask();
    } else if (e.key === "Escape") {
      handleReturnValue();
    }
  }

  return (
    <>
      <div className="flex justify-center mt-10">
        <input
          type="text"
          placeholder="Pesquisa sua tarefa..."
          className="h-7 w-2/3 mr-3 p-5 text-white text-lg bg-zinc-800 placeholder:pl-2 placeholder:text-zinc-500 placeholder:ml-2 
          outline-none border-0 font-semibold focus:ring-2 focus:outline-emerald-700 rounded-lg"
          onChange={(e) => setSearchTask(e.target.value)}
          onKeyUp={handleKeyUp}
          value={searchTask}
        />
        <button
          type="button"
          className="w-14 pl-2 flex items-center justify-center rounded-lg outline-none 
          focus:ring-2 focus:outline-emerald-700 border border-zinc-700 hover:bg-indigo-700 transition-colors"
          onClick={handleSearchTask}
        >
          <MagnifyingGlass size={24} className="text-white mr-2" />
        </button>
        <button
          type="button"
          className="w-14 pl-2 flex items-center justify-center ml-2 rounded-lg outline-none 
          focus:ring-2 focus:outline-emerald-700 border border-zinc-700 hover:bg-indigo-700 transition-colors"
          onClick={handleReturnValue}
        >
          <ArrowUUpLeft size={24} className="text-white mr-2" />
        </button>
      </div>
      <table className="w-11/12 mx-10 mt-16 text-zinc-200 ">
        <thead className="border-b border-zinc-400">
          <tr className="text-left">
            <th>Tarefas</th>
            <th>Data</th>
            <th className="flex justify-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <TableData />
        </tbody>
      </table>
    </>
  );
}
