import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosLoklok from "configs/axiosLoklok";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { PATH_API } from "configs/path.api";

const searchWithKeywordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { keyword = "", size = 50, sort = "", searchType = "" } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const { data } = await axiosLoklok.post(PATH_API.searchWithKeyword, {
    searchKeyWord: keyword,
    size,
    sort,
    searchType
  });
  const results = data.searchResults;
  const response = {
    message: "Get search successfully !",
    data: { keyword, results }
  };
  responseSuccess(res, response);
};

export default catchAsync(searchWithKeywordApi);

/** Search movie by keyword
 * @swagger
 * /search:
 *  get:
 *      summary: Search movie by keyword
 *      tags: [Search]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: true
 *          example: batman
 *          schema:
 *            type: string
 *        - in: query
 *          name: size
 *          example: 10
 *          schema:
 *            type: number
 *        - in: query
 *          name: sort
 *          example: ""
 *          schema:
 *            type: string
 *        - in: query
 *          name: searchType
 *          example: ""
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Success
 */
