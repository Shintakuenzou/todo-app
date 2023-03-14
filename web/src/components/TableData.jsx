import { useContext } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import axios from "axios";
import { Check, Trash } from "phosphor-react";

import { context } from "../context/ContextProvider";

export function TableData() {
  const { lists, updateList } = useContext(context);

  async function handleCheckTask(list, id) {
    await axios
      .put(`http://localhost:3003/api/todos/${id}`, { ...list, done: true })
      .then(() => updateList());
  }

  async function handlePendingTask(list, id) {
    await axios
      .put(`http://localhost:3003/api/todos/${id}`, { ...list, done: false })
      .then(() => updateList());
  }

  async function handleRemove(id) {
    await axios
      .delete(`http://localhost:3003/api/todos/${id}`)
      .then(() => updateList());
  }

  return (
    <>
      {lists.map((list) => {
        const date = new Date(list.createdAt);
        const description = list.description;
        const checked = list.done;

        return (
          <tr key={list._id}>
            <td>
              <Checkbox.Root
                checked={checked}
                onCheckedChange={() =>
                  checked === false
                    ? handleCheckTask(list, list._id)
                    : handlePendingTask(list, list._id)
                }
                className={`flex items-center ${
                  checked === true && "line-through"
                } `}
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800">
                  <Checkbox.Indicator>
                    <Check
                      size={22}
                      className="text-green-500 "
                      weight="bold"
                    />
                  </Checkbox.Indicator>
                </div>

                <span className="font-semibold ml-2">{description}</span>
              </Checkbox.Root>
            </td>
            <td>
              <strong>
                {date.toLocaleString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                })}
              </strong>
            </td>
            <td className="flex justify-center">
              <button
                type="submit"
                onClick={() => handleRemove(list._id)}
                className="p-2 rounded-full hover:bg-red-700 transition-colors outline-none focus:ring-2 focus:outline-emerald-700"
              >
                <Trash size={24} className="text-red-100" />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
