import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosLoklok from "configs/axiosLoklok";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { PATH_API } from "configs/path.api";

const searchWithCategoryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const {
    area = "",
    category = 1,
    order = "up",
    size = 12,
    params = "",
    sort = "",
    subtitles = "",
    year = ""
  } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.post(PATH_API.searchWithCategory, {
    area,
    order,
    category,
    params,
    size,
    sort,
    subtitles,
    year
  });

  const response = {
    message: "Get search by category successfully!",
    data: data.searchResults
  };
  responseSuccess(res, response);
};

export default catchAsync(searchWithCategoryApi);

/** Search movie by category
 * @swagger
 * /category:
 *  get:
 *    summary: Search movie by category
 *    tags: [Search]
 *    parameters:
 *      - in: query
 *        name: area
 *        example: 44
 *        schema:
 *          type: number
 *      - in: query
 *        name: category
 *        example: 1
 *        schema:
 *          type: number
 *      - in: query
 *        name: order
 *        example: "up"
 *        schema:
 *          type: string
 *      - in: query
 *        name: params
 *        example: "TV,SETI,MINISERIES,VARIETY,TALK,COMIC,DOCUMENTARY"
 *        schema:
 *          type: string
 *      - in: query
 *        name: sort
 *        example: "1668495183036,27805"
 *        schema:
 *          type: string
 *      - in: query
 *        name: subtitles
 *        example: ""
 *        schema:
 *          type: string
 *      - in: query
 *        name: year
 *        example: "2019,2019"
 *        schema:
 *          type: string
 *    responses:
 *        200:
 *            description: Success
 */
