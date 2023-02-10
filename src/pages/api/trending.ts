import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosLoklok from "configs/axiosLoklok";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { PATH_API } from "configs/path.api";

const getTopSearchesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
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
