import * as employeeSvc from "../src/api/v1/services/employee.service";
import * as firestoreRepo from "../src/api/v1/repositories/firestoreRepository";

describe("Employee Service - remaining functions", () => {
beforeEach(() => jest.restoreAllMocks());

it("should create a new employee and return it", async () => {
jest.spyOn(firestoreRepo, "createDocument").mockResolvedValue("emp123");
jest.spyOn(firestoreRepo, "getDocumentById").mockResolvedValue({
id: "emp123",
exists: true,
data: () => ({
name: "Alice",
position: "Teller",
department: "Operations",
email: "[alice@x.com](mailto:alice@x.com)",
phone: "123-456",
branchId: "1",
createdAt: "now",
updatedAt: "now",
}),
} as any);
});

it("should fetch an employee by ID", async () => {
jest.spyOn(firestoreRepo, "getDocumentById").mockResolvedValue({
id: "2",
exists: true,
data: () => ({
name: "Bob",
position: "Teller",
department: "Operations",
email: "[bob@x.com](mailto:bob@x.com)",
phone: "789-101",
branchId: "1",
createdAt: "now",
updatedAt: "now",
}),
} as any);
});

it("should update an employee and return updated data", async () => {
jest.spyOn(firestoreRepo, "getDocumentById")
.mockResolvedValueOnce({ id: "2", exists: true, data: () => ({}) } as any);
jest.spyOn(firestoreRepo, "updateDocument").mockResolvedValue();
jest.spyOn(firestoreRepo, "getDocumentById")
.mockResolvedValueOnce({
id: "2",
exists: true,
data: () => ({
name: "Charlie",
position: "Teller",
department: "Operations",
email: "[charlie@x.com](mailto:charlie@x.com)",
phone: "555-555",
branchId: "1",
createdAt: "now",
updatedAt: "now",
}),
} as any);
});

it("should delete an employee successfully", async () => {
jest.spyOn(firestoreRepo, "getDocumentById").mockResolvedValue({
id: "3",
exists: true,
data: () => ({}),
} as any);
jest.spyOn(firestoreRepo, "deleteDocument").mockResolvedValue();

});

it("should return employees for a specific branch", async () => {
jest.spyOn(firestoreRepo, "getDocuments").mockResolvedValue({
docs: [
{ id: "1", data: () => ({ branchId: "1" }) },
{ id: "2", data: () => ({ branchId: "2" }) },
],
} as any);

});

it("should return employees for a specific department", async () => {
jest.spyOn(firestoreRepo, "getDocuments").mockResolvedValue({
docs: [
{ id: "1", data: () => ({ department: "Operations" }) },
{ id: "2", data: () => ({ department: "Loans" }) },
],
} as any);

});
});
