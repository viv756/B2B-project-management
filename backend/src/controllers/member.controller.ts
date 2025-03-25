import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { z } from "zod";
import { joinWokspaceControllerService } from "../services/member.service";
import { HTTPSTATUS } from "../config/http.config";

export const joinWokspaceController = asyncHandler(async (req: Request, res: Response) => {
  const inviteCode = z.string().parse(req.params.inviteCode);
  // only logged in user can join in a workspace through inviteCode
  const userId = req.user?._id;

  const { workspaceId, role } = await joinWokspaceControllerService(userId, inviteCode);

  return res.status(HTTPSTATUS.OK).json({
    message: "Successfully joined the workspace",
    workspaceId,
    role,
  });
});
