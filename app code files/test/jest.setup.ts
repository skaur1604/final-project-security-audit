const __storage: Record<string, Record<string, any>> = {
  branches: {
    "1": { name: "HQ", address: "123 Main", phone: "204-555-0100", createdAt: "", updatedAt: "" },
  },
  employees: {
    "1": { name: "Test Emp", email: "t@e.com", position: "Teller", branchId: "1", department: "Loans", createdAt: "", updatedAt: "" },
  },
};

jest.mock("../config/firebaseConfig", () => {
  const createDoc = (collection: string, id: string) => ({
    get: jest.fn(async () => {
      const exists = !!__storage[collection]?.[id];
      return {
        exists,
        id,
        data: () => __storage[collection]?.[id] ?? null,
      };
    }),
    set: jest.fn(async (data: any) => {
      __storage[collection] = __storage[collection] || {};
      __storage[collection][id] = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }),
    update: jest.fn(async (data: any) => {
      __storage[collection] = __storage[collection] || {};
      __storage[collection][id] = { ...(__storage[collection][id] || {}), ...data, updatedAt: new Date().toISOString() };
    }),
    delete: jest.fn(async () => {
      if (__storage[collection]) delete __storage[collection][id];
    }),
  });

  const createCollection = (collection: string) => ({
    doc: jest.fn((id?: string) => createDoc(collection, String(id))),
    add: jest.fn(async (data: any) => {
      __storage[collection] = __storage[collection] || {};
      const nextId = String(
        Math.max(0, ...Object.keys(__storage[collection]).map((k) => Number.isNaN(Number(k)) ? 0 : Number(k))) + 1
      );
      __storage[collection][nextId] = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      return { id: nextId };
    }),
    get: jest.fn(async () => {
      const docs = Object.entries(__storage[collection] || {}).map(([id, data]) => ({ id, data: () => data }));
      return { docs };
    }),
    where: jest.fn((field: string, _op: string, value: any) => ({
      get: jest.fn(async () => {
        const docs = Object.entries(__storage[collection] || {})
          .filter(([, data]) => (data as any)[field] === value)
          .map(([id, data]) => ({ id, data: () => data }));
        return { docs };
      }),
    })),
  });

  return {
    auth: {
      verifyIdToken: jest.fn(),
      getUser: jest.fn(),
    },
    db: {
      collection: jest.fn((name: string) => createCollection(name)),
      runTransaction: jest.fn(async (fn: any) => fn({})),
      batch: jest.fn(() => ({
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        commit: jest.fn(async () => {}),
      })),
    },
  };
});

afterEach(() => jest.clearAllMocks());
afterAll(() => jest.resetModules());
