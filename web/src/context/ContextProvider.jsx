import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const context = createContext({
  URL: "",
  lists: [],
  setLists: () => [],
  updateList: () => {},
});

const URL = "http://localhost:3003/api/todos";

export function ContextProvider({ children }) {
  const [lists, setLists] = useState([]);

  async function updateList() {
    await axios.get(`${URL}?sort=-createdAt`).then((resp) => {
      setLists(resp.data);
    });
  }

  useEffect(() => {
    updateList();
  }, []);

  return (
    <context.Provider value={{ lists, setLists, updateList, URL }}>
      {children}
    </context.Provider>
  );
}
