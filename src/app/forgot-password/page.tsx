import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

import { Particles } from "@/components/magicui/particles"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer";
import ModifyAccount from "@/components/modify-account-info";
import { ToastContainer } from "react-toastify";

export default async function ForgotPasswordPage() {
    const supabase = await createClient();

    
}