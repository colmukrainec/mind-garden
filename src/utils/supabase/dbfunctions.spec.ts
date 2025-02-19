import express from "express";
import { 
    insertData, 
    saveJournalEntry, 
    selectData, 
    selectJournalEntries, 
    updateData, 
    updateJournalEntry 
} from "../supabase/dbfunctions";
import { createClient } from "../supabase/client";

const app = express();
app.use(express.json());

jest.mock("../supabase/client");

jest.mock("../supabase/client");

const mockSupabase: any = {
  from: jest.fn(() => ({
    insert: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({ data: [{ id: "1" }], error: null }),
    })),
    select: jest.fn(() => ({
      match: jest.fn().mockResolvedValue({ data: [{ id: "1" }], error: null }),
    })),
    update: jest.fn(() => ({
      match: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({ data: [{ id: "1", journal_text: "Updated Entry" }], error: null }),
      })),
    })),
  })),
};

(createClient as jest.Mock).mockReturnValue(mockSupabase);


(createClient as jest.Mock).mockReturnValue(mockSupabase);

describe("Database Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert data into the specified table", async () => {
    mockSupabase.insert.mockResolvedValue({ data: [{ id: "1" }], error: null });

    const result = await insertData("journal_entries", { user_id: "123", journal_text: "Test Entry" });
    expect(result).toEqual([{ id: "1" }]);
  });

  it("should insert a journal entry", async () => {
    mockSupabase.insert.mockResolvedValue({ data: [{ id: "1" }], error: null });

    const result = await saveJournalEntry("My new journal entry", "user123");

    expect(mockSupabase.insert).toHaveBeenCalledWith({ user_id: "user123", journal_text: "My new journal entry" });
    expect(result?.data).toEqual([{ id: "1" }]);
  });

  it("should retrieve data from a table", async () => {
    mockSupabase.select.mockResolvedValue({ data: [{ id: "1" }], error: null });

    const result = await selectData("journal_entries");

    expect(mockSupabase.from).toHaveBeenCalledWith("journal_entries");
    expect(mockSupabase.select).toHaveBeenCalledWith("*");
    expect(result.data).toEqual([{ id: "1" }]);
  });

  it("should retrieve user-specific journal entries", async () => {
    mockSupabase.select.mockResolvedValue({ data: [{ id: "1" }], error: null });

    const result = await selectJournalEntries("user123", null);

    expect(mockSupabase.match).toHaveBeenCalledWith({ user_id: "user123" });
    expect(result.data).toEqual([{ id: "1" }]);
  });

  it("should update a record in a table", async () => {
    mockSupabase.update.mockResolvedValue({ data: [{ id: "1", journal_text: "Updated Entry" }], error: null });

    const result = await updateData("journal_entries", { id: "1" }, { journal_text: "Updated Entry" });

    expect(mockSupabase.update).toHaveBeenCalledWith({ journal_text: "Updated Entry" });
    expect(mockSupabase.match).toHaveBeenCalledWith({ id: "1" });
    expect(result.data).toEqual([{ id: "1", journal_text: "Updated Entry" }]);
  });

  it("should update a journal entry", async () => {
    mockSupabase.update.mockResolvedValue({ data: [{ id: "1", journal_text: "Updated Entry" }], error: null });

    const result = await updateJournalEntry("1", "Updated Entry");

    expect(mockSupabase.update).toHaveBeenCalledWith({ journal_text: "Updated Entry" });
    expect(mockSupabase.match).toHaveBeenCalledWith({ id: "1" });
    expect(result?.data).toEqual([{ id: "1", journal_text: "Updated Entry" }]);
  });
});
