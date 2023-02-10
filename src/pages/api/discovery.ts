import { IMediaPreviewLoklok } from "types";
import axiosLoklok from "configs/axiosLoklok";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const discoveryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 0 } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.get(`/recommendPool/getVideoFromRecommondPool`, {
    params: { page }
  });
  const payloadGetMedia = data.map((item: IMediaPreviewLoklok) => {
    const { definitionList } = item.mediaInfo;
    return {
      contentId: item.id,
      episodeId: item.mediaInfo.id,
      category: item.category,
      definition: definitionList[definitionList.length - 1]?.code
    };
  });
  const request = await axiosLoklok.post(`/media/bathGetplayInfo`, payloadGetMedia);
  const videos = data.map((item: IMediaPreviewLoklok, index: number) => {
    return {
      category: item.category,
      coverHorizontalUrl: item.coverHorizontalUrl,
      coverVerticalUrl: item.coverVerticalUrl,
      id: item.id,
      likeCount: item.likeCount,
      name: item.name,
      refList: item.refList.slice(0, 1),
      upInfo: item.upInfo,
      mediaInfoUrl: request?.data[index]
    };
  });
  const response = {
    message: "Get media video successfully!",
    data: videos
  };
  responseSuccess(res, response);
};

export default catchAsync(discoveryApi);

/** Get videos discovery
 * @swagger
 * /discovery:
 *  get:
 *    summary: Get videos discovery same tiktok video
 *    tags: [Discovery]
 *    parameters:
 *      - in: query
 *        name: page
 *        example: 0
 *        schema:
 *          type: number
 *    responses:
 *        200:
 *          description: Success
 */
