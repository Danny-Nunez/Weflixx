import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const StarInfoApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { starId = 18 } = query;
  methodMiddleware(method as string, ["GET"], res);

  const { data } = await axiosLoklok(PATH_API.star, { params: { starId } });
  const response = {
    message: "Get star info successfully!",
    data
  };
  responseSuccess(res, response);
};

export default catchAsync(StarInfoApi);

/** Get info star
 * @swagger
 * /star:
 *  get:
 *    summary: Get info star
 *    tags: [Star]
 *    parameters:
 *      - in: query
 *        name: starId
 *        required: true
 *        example: 18
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */
