import { Router } from "express";
import {
  createProjectController,
  getAllProjectsInWorkspaceController,
  getProjectAnalyticsController,
  getProjectByIdAndWorkspaceIdController,
  updateProjectController,
} from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.post("/workspace/:workspaceId/create", createProjectController);

projectRoutes.put("/:id/workspace/:workspaceId/update", updateProjectController);

projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsInWorkspaceController);

projectRoutes.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceIdController);

projectRoutes.get("/:id/workspace/:workspaceId/analytics", getProjectAnalyticsController);

export default projectRoutes;
