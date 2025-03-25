import { ErrorCodeEnum } from "../enums/error-code.enum";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/members.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";

export const getMemberRoleInWorkspace = async (userId: string, workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const member = await MemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!member) {
    throw new UnauthorizedException(
      "You are not a member of this workspace",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }

  const roleName = member.role?.name;

  return { role: roleName };
};

export const joinWokspaceControllerService = async (userId: string, inviteCode: string) => {
  // find the workspace by inviteCode
  const workspace = await WorkspaceModel.findOne({ inviteCode }).exec();
  if (!workspace) {
    throw new NotFoundException("Invalid invite code or workspace not found");
  }

  // check the user is already a member in the workspace
  const existingMember = await MemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  }).exec();
  if (existingMember) {
    throw new BadRequestException("You are already a member of this workspace");
  }

  // save user as a member in the workspace
  const role = await RoleModel.findOne({ name: Roles.MEMBER });
  if (!role) {
    throw new NotFoundException("Role not found");
  }

  // create and save the user in the member-model
  const newMember = new MemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id,
  });
  await newMember.save();

  return { workspaceId: workspace._id, role: role.name };
};
