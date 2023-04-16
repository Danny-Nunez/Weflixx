import axios from "axios";
import * as cheerio from "cheerio";
import { PATH_API } from "configs/path.api";

import methodMiddleware from "middleware/method.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { IBanner } from "types";
import catchAsync from "utils/catch-async";
import { responseSuccess } from "utils/response";

const BannerApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  methodMiddleware(method as string, ["GET"], res);

  const banners = await getBanners();
  const response = {
    message: "Get home banners successfully!",
    data: banners
  };
  responseSuccess(res, response);
};

const getPosition = (string: string, subString: string, index: number) => {
  return string.split(subString, index).join(subString).length;
};

async function getBanners() {
  const response = await axios.get(PATH_API.loklok);
  const html = response.data;
  const $ = cheerio.load(html);
  let banners: IBanner[] = [];
  let scriptStr = $("#__nuxt + script").text();
  scriptStr = scriptStr.slice(scriptStr.indexOf("banners:[") + 8, scriptStr.indexOf(",indexData:"));
  scriptStr = scriptStr.replace(/[\[\]]/g, "");
  scriptStr = scriptStr.replace(/\\u002F/g, "\u002F");
  const arrayData = scriptStr.split("},");
  $(".swiper-wrap .swiper-slide", html).each(function (index, element) {
    const item = arrayData[index];
    const id = item.slice(item.indexOf('jumpParam:"') + 11, getPosition(item, ",", 4) - 1);
    const imageUrl = item.slice(item.indexOf("imgUrl:") + 8, item.indexOf('",'));
    const title = $(element).find(".footer-shadow").text();
    banners.push({ id: Number(id), imageUrl, title, jumpType: 1 });
  });
  return banners;
}

export default catchAsync(BannerApi);

/** Get data home banners
 * @swagger
 * /banner:
 *  get:
 *    summary: Get data home banners
 *    tags: [Banner]
 *    responses:
 *      200:
 *        description: Success
 */
