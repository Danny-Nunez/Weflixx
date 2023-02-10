export const checkTimeAgo = (timeCreated: number) => {
  let periods: { [key: string]: number } = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
  };
  let diff = Date.now() - new Date(timeCreated).getTime();
  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + "s"} ago`;
    }
  }
  return "Just now";
};

export const randomDeviceId = (length = 16) => {
  const hexCharacters = "0123456789abcdef";
  let deviceid = "";
  for (let i = 0; i < length; ++i) {
    deviceid += hexCharacters.charAt(Math.floor(Math.random() * 16));
  }
  return deviceid;
};

export const formatTimeDuration = (totalDuration: number) => {
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor(totalDuration / 60) % 60;
  const seconds = totalDuration % 60;
  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
