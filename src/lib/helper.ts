export const formatDate = (date: string | number | Date) => {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

export const timeDiff = (date: string | number | Date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
};
