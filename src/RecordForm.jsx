import { useState } from "react";

export function RecordForm({ onAddRecord }) {
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
