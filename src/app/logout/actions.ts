'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}