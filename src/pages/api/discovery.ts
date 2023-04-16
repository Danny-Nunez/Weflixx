import axiosLoklok from "configs/axiosLoklok";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { IMediaPreviewLoklok } from "types";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const discoveryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  methodMiddleware(method as string, ["GET"], res);

  const { page = 0 } = query;
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
    console.log("request?.data[index]: ", request?.data[index]);
    return {
      category: item.category,
      coverHorizontalUrl: item.coverHorizontalUrl,
      coverVerticalUrl: item.coverVerticalUrl,
      id: item.id,
      likeCount: item.likeCount,
      name: item.name,
      refList: item.refList.slice(0, 1),
      upInfo: item.upInfo,
      mediaInfoUrl: process.env.PROXY_LOKLOK + request?.data[index].mediaUrl
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
