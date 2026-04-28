// Using browser's built-in Intl API — no external API needed, always works

const getUTCOffset = (timezone) => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    const offsetPart = parts.find(p => p.type === "timeZoneName")?.value || "GMT+0";
    const match = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
    if (!match) return "+00:00";
    const sign = match[1].startsWith("-") ? "-" : "+";
    const hours = Math.abs(parseInt(match[1])).toString().padStart(2, "0");
    const mins = (match[2] || "00").padStart(2, "0");
    return `${sign}${hours}:${mins}`;
  } catch {
    return "+00:00";
  }
};

export const fetchTimezone = async (timezone) => {
  // Simulate async so the loading spinner still shows
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        timezone,
        datetime: new Date().toISOString(),
        utc_offset: getUTCOffset(timezone),
      });
    }, 300);
  });
};
