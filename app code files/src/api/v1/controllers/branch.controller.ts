import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as branchService from "../services/branch.service";

export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json(branch);
  } catch (err) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Could not create branch" });
  }
};

export const getAllBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await branchService.getAll();
    return res.status(HTTP_STATUS.OK).json(branches);
  } catch (err) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Could not retrieve branches" });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Branch id is required" });
    }

    const branch = await branchService.getById(id);
    if (!branch) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });
    }

    return res.status(HTTP_STATUS.OK).json(branch);
  } catch (err) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch branch" });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Branch id is required" });
    }

    const updated = await branchService.update(id, req.body);
    if (!updated) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });
    }

    return res.status(HTTP_STATUS.OK).json(updated);
  } catch (err) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update branch" });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Branch id is required" });
    }

    const deleted = await branchService.remove(id);
    if (!deleted) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });
    }

    return res.status(HTTP_STATUS.OK).json({ message: "Branch deleted successfully" });
  } catch (err) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete branch" });
  }
};
