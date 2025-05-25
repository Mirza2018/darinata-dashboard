export const  dateConvert=(isoString)=>{
  const date = new Date(isoString);
  // Example output: "April 20, 2025, 11:59:59 PM"
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: true,
    // timeZoneName: "short",
  });
}

  