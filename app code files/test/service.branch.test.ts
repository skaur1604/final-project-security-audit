import * as branchService from "../src/api/v1/services/branch.service";
import * as firestoreRepo from "../src/api/v1/repositories/firestoreRepository";

describe("branch service — full test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("getAll should return an array of branches", async () => {
    jest.spyOn(firestoreRepo, "getDocuments").mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            name: "X",
            address: "123",
            phone: "111-1111"
          }),
        },
      ],
    } as any);

    const result = await branchService.getAll();

    expect(Array.isArray(result)).toBe(true);
    expect(result[0].id).toBe("1");
  });

  test("create should return the newly created branch", async () => {
    jest.spyOn(firestoreRepo, "createDocument").mockResolvedValue("b1");
    jest.spyOn(firestoreRepo, "getDocumentById").mockResolvedValue({
      id: "b1",
      exists: true,
      data: () => ({
        name: "X",
        address: "123",
        phone: "111-1111",
      }),
    } as any);

    const created = await branchService.create({
      name: "X",
      address: "123",
      phone: "111-1111",
    } as any);

    expect(created.id).toBe("b1");
  });

  test("getById should return an item when it exists", async () => {
    jest.spyOn(firestoreRepo, "getDocumentById").mockResolvedValue({
      id: "1",
      exists: true,
      data: () => ({
        name: "Y",
        address: "234",
        phone: "222-2222",
      }),
    } as any);

    const item = await branchService.getById("1");
    expect(item?.id).toBe("1");
  });

  test("update should return the updated branch", async () => {
    jest
      .spyOn(firestoreRepo, "getDocumentById")
      .mockResolvedValueOnce({
        id: "1",
        exists: true,
        data: () => ({}),
      } as any);

    jest.spyOn(firestoreRepo, "updateDocument").mockResolvedValue();

    jest
      .spyOn(firestoreRepo, "getDocumentById")
      .mockResolvedValueOnce({
        id: "1",
        exists: true,
        data: () => ({
          name: "Z",
          address: "345",
          phone: "999-0000",
        }),
      } as any);

    const updated = await branchService.update("1", {
      phone: "999-0000",
    } as any);

    expect(updated?.phone).toBe("999-0000");
  });

  test("remove should return true when deletion succeeds", async () => {
    jest.spyOn(firestoreRepo, "getDocumentById").mockResolvedValue({
      id: "1",
      exists: true,
      data: () => ({}),
    } as any);

    jest.spyOn(firestoreRepo, "deleteDocument").mockResolvedValue();

    const removed = await branchService.remove("1");
    expect(removed).toBe(true);
  });
});
