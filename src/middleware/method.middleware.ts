import { STATUS } from "constants/status";
import { NextApiResponse } from "next";
import { ApiError, responseError } from "utils/response";

const methodMiddleware = (method: string, methodAllowed: string[], res: NextApiResponse) => {
  if (!methodAllowed.includes(method)) {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, `Method ${method} not allowed`);
    return responseError(error, res);
  }
};

export default methodMiddleware;
