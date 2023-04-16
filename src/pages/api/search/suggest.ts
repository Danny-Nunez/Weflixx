import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const getSuggestApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  methodMiddleware(method as string, ["GET"], res);

  const { keyword, size = 10 } = query;
  const { data } = await axiosLoklok.post(PATH_API.searchSuggest, {
    searchKeyWord: keyword,
    size
  });
  const results = data.searchResults;
  const response = {
    message: "Get search keywords successfully !",
    data: results
  };
  responseSuccess(res, response);
};

export default catchAsync(getSuggestApi);

/** Get search suggests by keyword
 * @swagger
 * /search/suggest:
 *  get:
 *    summary: Get search suggests by keyword
 *    tags: [Search]
 *    parameters:
 *      - in: query
 *        name: keyword
 *        required: true
 *        example: batman
 *        schema:
 *          type: string
 *      - in: query
 *        name: size
 *        example: 10
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */
