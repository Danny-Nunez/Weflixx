import { IMovieDetailsLoklok, ISubtitle } from "types";
import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const getEpisodeApi = async (req: NextApiRequest, res: NextApiResponse) => {
  let { id, category = 0, episode = 0 } = req.query;
  episode = Number(episode);
  if (req.method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.get(PATH_API.detail, {
    params: { id, category, episode }
  });
  const movieDetails: IMovieDetailsLoklok = data;
  if (!movieDetails) {
    const error = new ApiError(STATUS.NOT_FOUND, "Not found movie");
    return responseError(error, res);
  }
  const { episodeVo } = movieDetails;
  let currentEpisode = episodeVo.find((ep) => ep.id === episode);
  if (!currentEpisode) currentEpisode = episodeVo[0];
  const { definitionList, subtitlingList } = currentEpisode;
  const getEpisode = async (code: string) => {
    const params = {
      category,
      contentId: id,
      episodeId: currentEpisode?.id,
      definition: code
    };
    return await axiosLoklok.get(PATH_API.media, { params });
  };
  let totalDuration = 0;
  const qualities = await Promise.all(
    definitionList.map(async (definition) => {
      const { data } = await getEpisode(definition.code);
      totalDuration = data.totalDuration;
      return {
        quality: Number(definition.description.replace(/[\p\P]/g, "")),
        url: data.mediaUrl.replace(/^http:\/\//i, "https://")
      };
    })
  );
  const subtitles = subtitlingList
    .map((sub) => ({
      lang: sub.languageAbbr,
      language: `${sub.language}${sub.translateType ? " (Auto)" : ""}`,
      url: `${PATH_API.srtToVtt}${sub.subtitlingUrl}`
    }))
    .reduce((acc, curr) => {
      if (curr.lang === "en") return [curr, ...acc];
      return [...acc, curr];
    }, [] as ISubtitle[])
    .reduce((acc, curr) => {
      if (curr.lang === "vi") return [curr, ...acc];
      return [...acc, curr];
    }, [] as ISubtitle[]);
  const hasNextEpisode = movieDetails.episodeVo.length > 1;
  const responseData: any = {
    ...movieDetails,
    episode: episode || currentEpisode.id,
    episodeVo: movieDetails.episodeVo.map((ep) => ({
      id: ep.id,
      seriesNo: ep.seriesNo
    })),
    likeList: movieDetails.likeList.map((movie) => ({
      id: movie.id,
      name: movie.name,
      coverVerticalUrl: movie.coverVerticalUrl,
      category: movie.category
    })),
    totalDuration: totalDuration || 0,
    currentEpName: hasNextEpisode ? `Ep ${currentEpisode.seriesNo}` : "",
    qualities,
    subtitles
  };
  delete responseData.collect;
  delete responseData.drameTypeVo;
  delete responseData.episodeRoomListVo;
  delete responseData.contentTagResourceList;
  delete responseData.reserved;
  delete responseData.showSetName;
  delete responseData.nameJson;
  delete responseData.translateType;
  delete responseData.upInfo;
  delete responseData.drameTypeVo;
  delete responseData.areaNameList;
  delete responseData.coverHorizontalUrlJson;
  delete responseData.tagNameList;
  const response = {
    message: `Get info episode ${currentEpisode?.seriesNo} of ${movieDetails.name} successfully!`,
    data: responseData
  };
  responseSuccess(res, response);
};

export default catchAsync(getEpisodeApi);

/** Get data episode movie
 * @swagger
 * /episode:
 *  get:
 *    summary: Get data episode movie
 *    tags: [Movie]
 *    parameters:
 *      - in: query
 *        name: category
 *        required: true
 *        example: 1
 *        schema:
 *          type: number
 *      - in: query
 *        name: id
 *        required: true
 *        example: 23149
 *        schema:
 *          type: number
 *      - in: query
 *        name: episode
 *        required: true
 *        example: 130680
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */
