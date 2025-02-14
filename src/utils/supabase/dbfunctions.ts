import { createClient } from "./client";

/**
 * Inserts data into a given Supabase table
 * @param table - The name of the table
 * @param data - The data to insert (object or array of objects)
 * @returns - Success response or error
 */
export async function insertData<T>(table: string, data: T | T[]) {
    const supabase = await createClient();
  
    const { data: insertedData, error } = await supabase.from(table).insert(data).select();
  
    if (error) {
      console.error(`Error inserting into ${table}:`, error.message);
      return { error: error.message };
    }
  
    return { data: insertedData };
  }