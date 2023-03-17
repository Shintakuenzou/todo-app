import { Header } from "./components/Header";
import { Table } from "./components/Table";

import { useDispatch } from "react-redux";
import { updateLists } from "./store/slices";
import { useEffect } from "react";
import "./style/global.css";

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLists());
  }, []);
  return (
    <div className="h-screen">
      <Header />
      <Table />
    </div>
  );
}
