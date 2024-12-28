export function ListTools({ onSortChange, onClear, sort }) {
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
