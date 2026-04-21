import { Employee as FireEmployee } from "../models/employeeModel";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "employees";

type EmployeeNoId = Omit<FireEmployee, "id">;
export type FireNewEmployee = Omit<FireEmployee, "id" | "createdAt" | "updatedAt">;

const toStringId = (id: string | number) => String(id);

export const getAll = async (): Promise<FireEmployee[]> => {
  const snap = await getDocuments(COLLECTION);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as EmployeeNoId) }));
};

export const getById = async (id: string | number): Promise<FireEmployee | undefined> => {
  const doc = await getDocumentById(COLLECTION, toStringId(id));
  if (!doc) return undefined;
  return { id: doc.id, ...(doc.data() as EmployeeNoId) };
};

export const create = async (data: FireNewEmployee): Promise<FireEmployee> => {
  const now = new Date().toISOString();
  const newId = await createDocument<EmployeeNoId>(COLLECTION, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const created = await getDocumentById(COLLECTION, newId);
  if (!created) throw new Error("Failed to create employee");
  return { id: newId, ...(created.data() as EmployeeNoId) };
};

export const update = async (
  id: string | number,
  updates: Partial<FireNewEmployee>
): Promise<FireEmployee | null> => {
  const docId = toStringId(id);
  const existing = await getDocumentById(COLLECTION, docId);
  if (!existing) return null;

  await updateDocument<EmployeeNoId>(COLLECTION, docId, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });

  const updated = await getDocumentById(COLLECTION, docId);
  if (!updated) return null;
  return { id: updated.id, ...(updated.data() as EmployeeNoId) };
};

export const remove = async (id: string | number): Promise<boolean> => {
  const docId = toStringId(id);
  const existing = await getDocumentById(COLLECTION, docId);
  if (!existing) return false;
  await deleteDocument(COLLECTION, docId);
  return true;
};

export const byBranch = async (branchId: string | number): Promise<FireEmployee[]> => {
  const snap = await getDocuments(COLLECTION);
  const target = toStringId(branchId);
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as EmployeeNoId) }))
    .filter((e) => String(e.branchId) === target);
};

export const byDepartment = async (dept: string): Promise<FireEmployee[]> => {
  const snap = await getDocuments(COLLECTION);
  const target = (dept || "").toLowerCase();
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as EmployeeNoId) }))
    .filter((e) => (e.department || "").toLowerCase() === target);
};
