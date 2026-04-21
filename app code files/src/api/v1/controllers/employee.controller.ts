import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as svc from "../services/employee.service";
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employee.schema";

const isNumeric = (v?: string) => !!v && /^\d+$/.test(v);

export const createEmployee = async (req: Request, res: Response) => {
  try {
    if (req.body.branchId && typeof req.body.branchId === "string") {
      req.body.branchId = Number(req.body.branchId);
    }

    await createEmployeeSchema.validateAsync(req.body);

    const emp = await svc.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json(emp);
  } catch (err: any) {
    if (err.isJoi) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to create employee" });
  }
};

export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await svc.getAll();
    return res.status(HTTP_STATUS.OK).json(employees);
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch employees" });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!isNumeric(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });

    const emp = await svc.getById(id);
    if (!emp) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });

    return res.status(HTTP_STATUS.OK).json(emp);
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to get employee" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!isNumeric(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });

    if (req.body.branchId && typeof req.body.branchId === "string") {
      req.body.branchId = Number(req.body.branchId);
    }

    await updateEmployeeSchema.validateAsync(req.body);

    const updated = await svc.update(id, req.body);
    if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });

    return res.status(HTTP_STATUS.OK).json(updated);
  } catch (err: any) {
    if (err.isJoi) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to update employee" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!isNumeric(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });

    const ok = await svc.remove(id);
    if (!ok) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });

    return res.status(HTTP_STATUS.OK).json({ message: "Employee deleted" });
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete employee" });
  }
};

export const getEmployeesForBranch = async (req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    if (!isNumeric(branchId)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid branch id" });

    const list = await svc.byBranch(branchId);
    return res.status(HTTP_STATUS.OK).json(list);
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch employees by branch" });
  }
};

export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const dept = req.params.department;
    if (!dept) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing department" });

    const list = await svc.byDepartment(dept);
    return res.status(HTTP_STATUS.OK).json(list);
  } catch {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch employees by department" });
  }
};
