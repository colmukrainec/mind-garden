"use server"

import { createClient } from '@/utils/supabase/server'
import {IAttributes, ICategories, IResponses} from "@/utils/supabase/schema";

export async function selectAllFromCategories(): Promise<Array<ICategories> | null> {
  const supabase = await createClient();
  const {data, error} = await supabase.from("categories").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function selectAllFromAttributes(): Promise<Array<IAttributes> | null> {
  const supabase = await createClient();
  const {data, error} = await supabase.from("attributes").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function selectResponsesByDate(userId: string, entryDate: string): Promise<Array<IResponses> | null> {
  const supabase = await createClient();
  const {data, error} = await supabase
    .from("responses")
    .select("*")
    .eq("user_id", userId)
    .eq("entry_date", entryDate);
  if (error) throw new Error(error.message);
  return data;
}

export async function insertResponses(attributeIds: Set<string>, userId: string): Promise<void> {
  const supabase = await createClient();
  const entryDate = new Date().toISOString().split("T")[0];
  const {data, error} = await supabase
    .from("responses")
    .insert(
      Array.from(attributeIds).map((attributeId) => ({
      user_id: userId,
      attribute_id: attributeId,
      entry_date: entryDate,
    }))
  );
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteResponses(attributeIds: Set<string>, userId: string): Promise<void> {
  const supabase = await createClient();
  const entryDate = new Date().toISOString().split("T")[0];

  const { error } = await supabase
    .from("responses")
    .delete()
    .match({ user_id: userId, entry_date: entryDate })
    .in("attribute_id", Array.from(attributeIds));

  if (error) throw new Error(error.message);
}
