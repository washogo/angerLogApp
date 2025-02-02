
export function getDateRange(type: string | null, year: string | null, month: string | null, day: string | null):
  | { startDate: string; endDate: string }
  | { error: string } {
  if (!year || !month || (type === "daily" && !day)) {
    return { error: "無効な検索条件です" };
  }

  let startDate: string;
  let endDate: string;

  if (type === "daily") {
    startDate = `${year}-${month}-${day} 00:00:00`;
    endDate = `${year}-${month}-${day} 23:59:59`;
  } else if (type === "monthly") {
    startDate = `${year}-${month}-01 00:00:00`;
    const lastDay = new Date(Number(year), Number(month), 0).getDate();
    endDate = `${year}-${month}-${lastDay} 23:59:59`;
  } else {
    return { error: "無効な検索条件です" };
  }

  return { startDate, endDate };
}