import { IUser } from "../types";

export const checkIsManagement = (user: IUser): boolean => {
  return ["administrator", "management"].includes(user.role || "role");
};

export const checkPermission = (user: IUser, permission: string): boolean => {
  return user.role === "administrator" || (user.permissions || []).includes(permission || "");
};
