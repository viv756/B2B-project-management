import { Router } from "express";
import {
  changeWorkspaceMemberRoleController,
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceUserIsMemberController,
  getWorkspaceAnalyticsController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
  updateWorkspaceByIdController,
} from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkspaceController);
workspaceRoutes.put("/update/:id", updateWorkspaceByIdController);
workspaceRoutes.delete("/delete/:id",deleteWorkspaceController)

workspaceRoutes.put("/change/member/role/:id", changeWorkspaceMemberRoleController);

workspaceRoutes.get("/all", getAllWorkspaceUserIsMemberController);

workspaceRoutes.get("/:id", getWorkspaceByIdController);

workspaceRoutes.get("/members/:id", getWorkspaceMembersController);
workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

export default workspaceRoutes;
