import axiosLoklok from "configs/axiosLoklok";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseHomeLoklok } from "types";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const HomePageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  methodMiddleware(method as string, ["GET"], res);

  const { page = 0 } = query;
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
