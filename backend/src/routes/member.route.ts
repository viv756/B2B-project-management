import { Router } from "express";
import { joinWokspaceController } from "../controllers/member.controller";

const memberRoutes = Router();

memberRoutes.post("/workspace/:inviteCode/join", joinWokspaceController);

export default memberRoutes;
