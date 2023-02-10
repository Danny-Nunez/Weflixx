import { IResponseHomeLoklok } from "types";
import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";

const HomePageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { page = 0 } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const {
    page: currentPage,
    recommendItems,
    searchKeyWord
  }: IResponseHomeLoklok = (await axiosLoklok(PATH_API.home, { params: { page } })).data;
  const validHomeSections = recommendItems.filter(
    (section) => section.homeSectionType !== "BLOCK_GROUP" && section.homeSectionName !== ""
  );
  const homeSections = validHomeSections.map((section) => ({
    homeSectionName: section.homeSectionName.replace("Loklok", "Netfilm"),
    homeSectionId: section.homeSectionId,
    homeMovies: section.recommendContentVOList.map((movie) => ({
      id: movie.id,
      category: movie.category,
      imageUrl: movie.imageUrl,
      title: movie.title
    }))
  }));
  const response = {
    message: "Get home successfully!",
    data: {
      page: currentPage,
      searchKeyWord,
      homeSections
    }
  };
  responseSuccess(res, response);
};

export default catchAsync(HomePageApi);

/** Get data homepage
 * @swagger
 * /home:
 *  get:
 *    summary: Get data homepage
 *    tags: [Home]
 *    parameters:
 *      - in: query
 *        name: page
 *        example: 0
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 */
