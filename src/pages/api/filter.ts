import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const getFilterOptionsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  methodMiddleware(method as string, ["GET"], res);

  const { data: filters } = await axiosLoklok(PATH_API.genres);
  const response = {
    message: "Get filter options successfully!",
    data: filters
  };
  responseSuccess(res, response);
};

export default catchAsync(getFilterOptionsApi);

/** Get filter options
 * @swagger
 * /filter:
 *  get:
 *    summary: Get filter options
 *    tags: [Search]
 *    responses:
 *        200:
 *            description: Success
 */
