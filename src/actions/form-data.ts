"use server"

import { createClient } from '@/utils/supabase/server'

export async function selectAllFromCategories() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("categories").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function selectAllFromAttributes() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("attributes").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function selectAttributesByCategoryId(categoryId: string) {
  const supabase = await createClient();
  const {data, error} = await supabase.from("attributes").select("*").eq("category_id", categoryId);
  if (error) throw new Error(error.message);
  return data;
}
