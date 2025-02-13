import { redirect } from "next/navigation"
import { Bell } from "lucide-react"

import { createClient } from "@/utils/supabase/server"
import { Particles } from "@/components/magicui/particles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileDropdown } from "@/components/profile-dropdown";
import Footer from "@/components/footer";
import DeleteAccount from "@/components/delete-account";

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError || !authData?.user) {
        redirect("/error")
    }

    const userId = authData.user.id
    const { data: profileData, error: profileError } = await supabase.from("users").select("*").eq("id", userId).single()

    if (profileError) {
        redirect("/error")
    }

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: "url(/gradient.svg)",
                backgroundSize: "cover",
            }}
        >
            <Particles className="absolute inset-0 z-0" quantity={200} ease={80} color={"#000000"} refresh />

            <header className="border-b bg-white/50 backdrop-blur-sm mt-4 mx-4 rounded-full">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Mind Garden Logo" className="h-7 w-7 mr-2" />
                        <p className="text-2xl font-semibold text-green-700">Mind Garden</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <ProfileDropdown />
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                    First Name
                                </label>
                                <Input id="firstName" defaultValue={profileData?.first_name} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium">
                                    Last Name
                                </label>
                                <Input id="lastName" defaultValue={profileData?.last_name} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Input id="email" type="email" defaultValue={profileData?.email} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Update Profile</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="currentPassword" className="text-sm font-medium">
                                    Current Password
                                </label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="text-sm font-medium">
                                    New Password
                                </label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirm New Password
                                </label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Change Password</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle>Delete Account</CardTitle>
                            <CardDescription>Permanently delete your account and all associated data</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <DeleteAccount userId={userId} />
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}

