import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export default function App() {
  const [records, setRecords] = useState([]);

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
  return (
    <div className="app">
      <header>record's list</header>
      <RecordForm onAddRecord={handleAddRecord} />
      <RecordList
        records={records}
        onRemoveRecord={handleRemoveRecord}
        onCheckRecord={handleCheckRecord}
      />
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

function RecordList({ records, onRemoveRecord, onCheckRecord }) {
  return (
    <div className="recordList">
      {records.map((r) => (
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
