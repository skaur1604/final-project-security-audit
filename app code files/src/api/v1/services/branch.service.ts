import { Branch as FireBranch } from "../models/branchModel";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

type BranchNoId = Omit<FireBranch, "id">;
export type FireNewBranch = Omit<FireBranch, "id" | "createdAt" | "updatedAt">;

const toStringId = (id: string | number) => String(id);

const formatBranch = (id: string, data: BranchNoId): FireBranch => ({
  id,
  ...data,
});

export const getAll = async (): Promise<FireBranch[]> => {
  const snap = await getDocuments(COLLECTION);
  return snap.docs.map((doc) => formatBranch(doc.id, doc.data() as BranchNoId));
};

export const getById = async (id: string | number): Promise<FireBranch | undefined> => {
  const doc = await getDocumentById(COLLECTION, toStringId(id));
  if (!doc) return undefined;
  return formatBranch(doc.id, doc.data() as BranchNoId);
};

export const create = async (data: FireNewBranch): Promise<FireBranch> => {
  const now = new Date().toISOString();
  const newId = await createDocument<BranchNoId>(COLLECTION, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  const created = await getDocumentById(COLLECTION, newId);
  if (created) {
    return formatBranch(newId, created.data() as BranchNoId);
  }

  return {
    id: newId,
    name: data.name ?? "Unnamed Branch",
    address: data.address ?? "",
    phone: data.phone ?? "",
    createdAt: now,
    updatedAt: now,
  };
};

export const update = async (
  id: string | number,
  updates: Partial<FireNewBranch>
): Promise<FireBranch | null> => {
  const docId = toStringId(id);
  const existing = await getDocumentById(COLLECTION, docId);
  if (!existing) return null;

  const updatedData: Partial<BranchNoId> = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await updateDocument<BranchNoId>(COLLECTION, docId, updatedData);

  const updated = await getDocumentById(COLLECTION, docId);
  if (!updated) return null;

  return formatBranch(updated.id, updated.data() as BranchNoId);
};

export const remove = async (id: string | number): Promise<boolean> => {
  const docId = toStringId(id);
  const exists = await getDocumentById(COLLECTION, docId);
  if (!exists) return false;

  await deleteDocument(COLLECTION, docId);
  return true;
};
