import { PATH_API } from "configs/path.api";
import { ISubtitle, ISubtitlingLoklok } from "types";

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

export const removeHttp = (url: string) => {
  return url.replace(/^https?:\/\//, "");
};

export const sortSubtitles = (subtitles: ISubtitlingLoklok[]) => {
  return subtitles
    .map((sub) => ({
      lang: sub.languageAbbr,
      language: `${sub.language}${sub.translateType ? " (Auto)" : ""}`,
      url: `${PATH_API.srtToVtt}${sub.subtitlingUrl}`
    }))
    .reduce((acc, curr) => {
      if (curr.lang === "vi") return [curr, ...acc];
      return [...acc, curr];
    }, [] as ISubtitle[])
    .reduce((acc, curr) => {
      if (curr.lang === "en") return [curr, ...acc];
      return [...acc, curr];
    }, [] as ISubtitle[]);
};
