import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

export default function App() {
  const [records, setRecords] = useState([]);
  const [sort, setSort] = useState("input");

  function handleSortChange(sort) {
    console.log(sort);
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

function RecordForm({ onAddRecord }) {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  return (
    <form
      className="recordForm"
      onSubmit={(e) => {
        e.preventDefault();
        onAddRecord(artist, album);
        setArtist("");
        setAlbum("");
      }}
    >
      <span>Add a record you wanna get in the list ! 📀</span>
      <span>Artist : </span>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      ></input>
      <span>Album : </span>
      <input
        type="text"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

function RecordList({ records, onRemoveRecord, onCheckRecord, sort }) {
  let sortRecords;

  if (sort === "input") {
    sortRecords = records.slice();
  } else if (sort === "album") {
    sortRecords = records
      .slice()
      .sort((a, b) => a.album.localeCompare(b.album));
  } else if (sort === "check") {
    sortRecords = records
      .slice()
      .sort((a, b) => Number(a.checked) - Number(b.checked));
  }
  return (
    <div className="recordList">
      {sortRecords.map((r) => (
        <RecordElement
          record={r}
          key={r}
          onRemoveRecord={onRemoveRecord}
          onCheckRecord={onCheckRecord}
        />
      ))}
    </div>
  );
}

function RecordElement({ record, onRemoveRecord, onCheckRecord }) {
  return (
    <div className="recordElement" key={record.artist + record.album}>
      <input
        type="checkbox"
        onChange={() => onCheckRecord(record.artist, record.album)}
      ></input>
      <span
        className={record.checked ? "recordLabel checkedRecord" : "recordLabel"}
      >
        {record.artist} - {record.album}
      </span>
      <span
        className="delBtn"
        onClick={() => onRemoveRecord(record.artist, record.album)}
      >
        ❌
      </span>
    </div>
  );
}

function ListTools({ onSortChange, onClear, sort }) {
  return (
    <div
      className="listTools"
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <select>
        <option value="input">Sort by input</option>
        <option value="album">Sort by album name</option>
        <option value="check">Sort by check</option>
      </select>
      <button onClick={onClear}>Clear</button>
    </div>
  );
}
function Stats({ records }) {
  const total = records.length;
  const countChecked = records.filter((r) => r.checked).length;
  const perc = (countChecked / total) * 100;

  return (
    <div className="stats">
      <span>
        {total
          ? `You have bought ${countChecked} / ${total} of the records (${perc} %)`
          : `The list is empty, add some records to buy ! :-)`}
      </span>
    </div>
  );
}
