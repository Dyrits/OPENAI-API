function formatDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getDate(difference: number) {
  const now = new Date();
  now.setDate(now.getDate() + difference);
  return formatDate(now);
}

export const dates = {
  startDate: getDate(-3),
  endDate: getDate(-1)
};