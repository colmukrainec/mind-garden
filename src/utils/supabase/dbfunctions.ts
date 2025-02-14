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
 * 
 * example: select from journal_entries where user_id = userId
 *    selectData('journal_entries', { user_id: userId });
 * 
 * example: select certain columns from journal entry
 *    selectData('journal_entries', {}, ['id', 'journal_text', 'created_at']);
 */
export async function selectData<T>(table: string, conditions?: object, columns: string[] = ['*']) {
  const supabase = createClient();

  // Build the query with conditions and selected columns
  const { data, error } = await supabase
    .from(table)
    .select(columns.join(', '))  // Use columns passed or default to '*'
    .match(conditions || {});    // Use conditions (if any)

  if (error) {
    console.error(`Error selecting from ${table}:`, error.message);
    return { error };
  }

  return { data };
}

export async function selectDataLazy<T>(
  table: string,
  conditions?: object,
  columns: string[] = ['*'],
  lastEntryId: string | null = null,  // Last entry ID for pagination
  rangeEnd: number = 5
) {
  const supabase = createClient();
  let query = supabase.from(table).select(columns.join(', '));

  if (conditions) {
    query = query.match(conditions);
  }

  // If lastEntryId is provided, we'll fetch entries that come after this ID
  if (lastEntryId) {
    console.log('lastEntryId:', lastEntryId);
    query = query.gt('id', lastEntryId);  // 'id' refers to the journal entry ID
    console.log('query with lastEntryId:', query);
  }

  // Apply pagination using limit and ordering by id in ascending order
  query = query.order('id', { ascending: true }).limit(rangeEnd);  // Always fetch next `rangeEnd` entries

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
    console.error(`Error fetching journal entries for user ${userId}:`, error);
    return { error: error.message };
  }

  return { data };
}