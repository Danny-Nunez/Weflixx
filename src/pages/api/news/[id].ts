import axiosLoklokSub from "configs/axiosLoklokSub";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const NewsDetailsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  methodMiddleware(method as string, ["GET"], res);
  const { id = 0 } = query;
  const { data } = await axiosLoklokSub(PATH_API.newsDetail, { params: { id } });
  const content = data.content.replace(/LOKLOK/g, "Netfilm");
  const response = {
    message: "Get news details successfully!",
    data: { ...data, content }
  };
  responseSuccess(res, response);
};

export default catchAsync(NewsDetailsApi);

/** Get details news
 * @swagger
 * /news/{id}:
 *  get:
 *    summary: Get details news
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        example: 648
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */
