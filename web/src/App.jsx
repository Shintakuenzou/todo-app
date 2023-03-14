import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { ContextProvider } from "./context/ContextProvider";

import "./style/global.css";

export function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <ContextProvider>
        <Header />
        <Table />
      </ContextProvider>
    </div>
  );
}
