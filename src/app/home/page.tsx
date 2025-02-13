import { redirect } from 'next/navigation'
import { Bell } from "lucide-react"

import { createClient } from '@/utils/supabase/server'
import { Particles } from "@/components/magicui/particles"
import { Button } from "@/components/ui/button"
import { ProfileDropdown } from '@/components/profile-dropdown';
import Footer from '@/components/footer'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData?.user) {
    redirect('/error')
  }

  const userId = authData.user.id
  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileError) {
    redirect('/error')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: `url(/gradient.svg)`,
      backgroundSize: "cover",
    }}>

      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={"#000000"}
        refresh
      />

      <header className="border-b bg-white/50 backdrop-blur-sm mt-4 mx-4 rounded-full">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Mind Garden Logo" className="h-7 w-7 mr-2" />
            <p className="text-2xl font-semibold text-green-700">
              Mind Garden
            </p>
          </div>
          <div className="flex items-center gap-4">

            {/* Notifications for next sprint not currently implemented */}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">

      </main>

      <Footer />
    </div>
  )
}