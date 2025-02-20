'use client';

import { redirect } from "next/navigation"
import { Particles } from "@/components/magicui/particles"
import Footer from "@/components/footer";
import ResetPassword from "@/components/reset-password";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { authenticateResetCode } from "@/actions/auth";

// export default async function resetPasswordPage(){

//     const [code, setCode] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get('code');
//         if (!code) {
//             setError('Invalid reset code');
//             return;
//         }
//         setCode(code);
//     }, []);

//     if(!code){
//         // Exchange the reset code for a session
//         const supabase = await createClient();
//         const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
  
//         if (sessionError) {
//           setError("Failed to authenticate with reset code.");
//           return;
//         }
//     }

        
//         return (
//             <div
//                 className="min-h-screen flex flex-col"
//                 style={{
//                     backgroundImage: "url(/gradient.svg)",
//                     backgroundSize: "cover",
//                 }}
//             >
//                 <Particles className="absolute inset-0 z-0" quantity={200} ease={80} color={"#000000"} refresh />
//                 <ToastContainer/>
    
//                 <main className="flex-1 container mx-auto px-4 py-8">
//                     <div className="max-w-2xl mx-auto space-y-8">
//                         <ModifyPassword />
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         )

    

    
//     // const supabase = await createClient();

//     // const { data: authData, error: authError } = await supabase.auth.getUser()
//     // if (authError || !authData?.user) {
//     //     redirect('/error')
//     // }

//     // const userId = authData.user.id
//     //     const { data: profileData, error: profileError } = await supabase
//     //         .from('users')
//     //         .select('*')
//     //         .eq('id', userId)
//     //         .single()
    
//     //     if (profileError) {
//     //         redirect('/error')
//     //     }
    
//     //     return (
//     //         <div
//     //             className="min-h-screen flex flex-col"
//     //             style={{
//     //                 backgroundImage: "url(/gradient.svg)",
//     //                 backgroundSize: "cover",
//     //             }}
//     //         >
//     //             <Particles className="absolute inset-0 z-0" quantity={200} ease={80} color={"#000000"} refresh />
//     //             <ToastContainer/>
    
//     //             <main className="flex-1 container mx-auto px-4 py-8">
//     //                 <div className="max-w-2xl mx-auto space-y-8">
//     //                     <ModifyPassword />
//     //                 </div>
//     //             </main>
//     //             <Footer />
//     //         </div>
//     //     )

//     }

export default function ResetPasswordPage() { 
  const [session, setSession] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const fetchSession = async () => {
        const { data, error } = await authenticateResetCode(code);

        if (error) {
          setError(error);
          setSession(null);
          toast("Failed to authenticate with reset code.");
          redirect("/")
        } else {
          setSession(data);
        }
      };

      fetchSession();
    }
  }, []);

  if (error) {
    redirect("/error");
  }
  //   return <div>Error: {error}</div>;
  // }


  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url(/gradient.svg)",
        backgroundSize: "cover",
      }}
    >
      <Particles className="absolute inset-0 z-0" quantity={200} ease={80} color={"#000000"} refresh />
      <ToastContainer/>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {session ? <ResetPassword session={session} /> : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

