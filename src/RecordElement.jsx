export function RecordElement({ record, onRemoveRecord, onCheckRecord }) {
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
