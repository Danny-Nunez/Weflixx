import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const getTopSearchesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  methodMiddleware(method as string, ["GET"], res);

  const { data } = await axiosLoklok.get(PATH_API.trending);
  const response = {
    message: "Get top searches successfully !",
    data: data.list
  };
  responseSuccess(res, response);
};

export default catchAsync(getTopSearchesApi);

/** Get trending movie
 * @swagger
 * /trending:
 *  get:
 *    summary: Get trending movie
 *    tags: [Movie]
 *    responses:
 *      200:
 *        description: Success
 */
