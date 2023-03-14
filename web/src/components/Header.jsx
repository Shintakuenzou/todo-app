import { useContext, useState } from "react";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";
import { context } from "../context/ContextProvider";

const URL = "http://localhost:3003/api/todos";

export function Header() {
  const [description, setDescription] = useState("");
  const { updateList } = useContext(context);

  function newTask() {
    axios.post(URL, { description }).then(() => {
      updateList()
      setDescription("")
    });
  }

  return (
    <div className="flex justify-between items-center flex-row mx-10 pt-10">
      <h1 className="text-white text-2xl font-semibold">ToDo App</h1>

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="text-white font-semibold border rounded-lg px-6 py-4 flex items-center bg-indigo-700 hover:bg-indigo-600 
          transition-colors"
        >
          <Plus size={20} />
          Nova Tarefa
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
          <Dialog.Content className="w-2/5 max-h-56 bg-zinc-800 rounded-lg fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 p-5">
            <div className="flex justify-between">
              <Dialog.Title className="font-semibold text-xl text-white">
                Adicione uma nova tarefa
              </Dialog.Title>
              <Dialog.Close>
                <X
                  size={31}
                  className="text-zinc-300 rounded-full hover:rounded-full hover:bg-zinc-600 transition-colors"
                />
              </Dialog.Close>
            </div>

            <div className=" mt-7">
              <input
                type="text"
                placeholder="EX: Dormir 8h, Estudar 3h, etc"
                className="p-2 w-full bg-zinc-700 rounded-lg focus:outline-none text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-7 flex justify-end">
              <button
                type="button"
                className="text-green-100 font-bold bg-green-600 px-5 py-2 rounded-lg hover:bg-green-500 transition-colors"
                onClick={newTask}
              >
                Cadastrar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
