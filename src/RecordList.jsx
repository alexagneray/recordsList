import { RecordElement } from "./RecordElement";

export function RecordList({ records, onRemoveRecord, onCheckRecord, sort }) {
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
