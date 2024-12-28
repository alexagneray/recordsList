export function Stats({ records }) {
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
