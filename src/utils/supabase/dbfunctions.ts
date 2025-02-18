import { createClient } from "./client";

/**
 * Inserts data into a given Supabase table
 * @param table - The name of the table
 * @param data - The data to insert (object or array of objects)
 * @returns - Success response or error
 * This will be a general function for all our insert operations (private to this script)
 */
export async function insertData<T>(table: string, data: T | T[]) {
    const supabase = createClient();
  
    const { data: insertedData, error } = await supabase.from(table).insert(data).select();
  
    if (error) {
      console.error(`Error inserting into ${table}:`, error.message);
      return { error };
    }
  
    return { data: insertedData };
  }

/**
 * Saves a journal entry to the database  
 * @param entry - The journal entry text
 * @param userId - The user ID of the journal entry owner
 * @returns - Success response or error
 **/
export async function saveJournalEntry(entry: string, userId: string) {

    if (!entry.trim()) return; // Prevent empty entries
    return await insertData("journal_entries", { user_id: userId,
                                          journal_text: entry });
    
  };

/**
 * Selects data from a given Supabase table
 * @param table - The name of the table
 * @param conditions - The conditions for filtering data (optional)
 * @param columns - The columns to select (optional, defaults to all columns)
 * @returns - The selected data or error
 * This will be a general function for all our select operations (private to this script)
 */
export async function selectData<T>(table: string, conditions?: object, columns: string[] = ['*']) {
  const supabase = createClient();

  // Build the query with conditions and selected columns
  const { data, error } = await supabase
    .from(table)
    .select(columns.join(', '))  // Use columns passed or default to '*'
    .match(conditions ?? {});    // Use conditions (if any)

  if (error) {
    console.error(`Error selecting from ${table}:`, error.message);
    return { error };
  }

  return { data };
}

/**
 * Selects data from a given Supabase table with pagination support
 * @param table - The name of the table
 * @param conditions - The conditions for filtering data (optional)
 * @param columns - The columns to select (optional, defaults to all columns)
 * @param lastEntryId - The ID of the last fetched entry for pagination
 * @param rangeEnd - The number of entries to fetch
 * @returns - The selected data or error
 * This will be the function for all our select operations with pagination (private to this script)
 */
export async function selectDataLazy<T>(table: string,conditions?: object, columns: string[] = ['*'], lastRetrievedId: string | null = null, rangeEnd: number = 5) {
  const supabase = createClient();
  let query = supabase.from(table).select(columns.join(', '));

  if (conditions) {
    query = query.match(conditions);
  }

  // If lastEntryId is provided, we'll fetch entries that come after this ID 
  if (lastRetrievedId) {
    query = query.gt('id', lastRetrievedId);
  }

  // Apply pagination using limit and ordering by id in ascending order
  query = query.order('id', { ascending: true }).limit(rangeEnd);

  const { data, error } = await query;

  if (error) {
    console.error(`Error selecting from ${table}:`, error.message);
    return { error };
  }

  return { data };
}

/**
 * Selects journal entries for a specific user, using entry ID for pagination
 * @param userId - The user ID whose journal entries need to be fetched
 * @param lastEntryId - The ID of the last fetched journal entry to continue from
 * @param columns - Optional columns to fetch (defaults to all columns)
 * @returns - The journal entries data or error
 */
export async function selectJournalEntries(userId: string, lastEntryId: string | null, columns: string[] = ['*']) {
  const { data, error } = await selectDataLazy('journal_entries', { user_id: userId }, columns, lastEntryId);

  if (error) {
    console.error("Error fetching journal entries:", error.message);
    return { error: error.message };
  }

  return { data };
}

/** 
 * Updates data in a given Supabase table
 * @param table - The name of the table
 * @param conditions - The conditions for filtering data
 * @param dataToUpdate - The data to update
 * @returns - Success response or error
 * This will be a general function for all our update operations (private to this script)
 */

export async function updateData<T>(table: string, conditions: object, dataToUpdate: T){
  const supabase = createClient();
  const { data, error } = await supabase.from(table).update(dataToUpdate).match(conditions).select();

  if (error) {
    console.error(`Error updating ${table}:`, error.message);
    return { error };
  } else{
    return {data};
  }
}

/**
 * Updates a journal entry in the database
 * @param entryId - The ID of the journal entry to update
 * @param newEntry - The new journal entry text
 * @returns - Success response or error
 */
export async function updateJournalEntry(entryId: string, newEntry: string) {
  if (!newEntry.trim()) return; // Prevent empty entries

  return await updateData('journal_entries', { id: entryId }, { journal_text: newEntry });
}
