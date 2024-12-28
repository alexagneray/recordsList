import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { RecordForm } from "./RecordForm";
import { RecordList } from "./RecordList";
import { ListTools } from "./ListTools";
import { Stats } from "./Stats";

export default function App() {
  const [records, setRecords] = useState([]);
  const [sort, setSort] = useState("input");

  function handleSortChange(sort) {
    setSort(sort);
  }
  function handleAddRecord(artist, album) {
    setRecords(() => [
      ...records,
      { artist: artist, album: album, checked: false },
    ]);
  }

  function handleRemoveRecord(artist, album) {
    setRecords(() =>
      records.filter((r) => r.artist !== artist && r.album !== album)
    );
  }

  function handleCheckRecord(artist, album) {
    setRecords(() =>
      records.map((r) =>
        r.artist === artist && r.album === album
          ? { ...r, checked: !r.checked }
          : r
      )
    );
  }

  function handleClear() {
    if (confirm("Are you sure you want to cllear the list ?")) setRecords([]);
  }
  return (
    <div className="app">
      <header>record&apos;s list</header>
      <RecordForm onAddRecord={handleAddRecord} />
      <RecordList
        records={records}
        onRemoveRecord={handleRemoveRecord}
        onCheckRecord={handleCheckRecord}
        sort={sort}
      />
      {records.length ? (
        <ListTools
          onSortChange={handleSortChange}
          onClear={handleClear}
          sort={sort}
        />
      ) : null}

      <Stats records={records} />
    </div>
  );
}
