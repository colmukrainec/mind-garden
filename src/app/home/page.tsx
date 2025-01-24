import { redirect } from 'next/navigation'
import { logout } from "@/app/logout/actions";  

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <><p>Hello {data.user.email} </p>
    <button onClick={logout}>Logout</button>
  </>
}