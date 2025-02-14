"use client"; 

import { useRouter } from 'next/navigation'
import { NotebookPen } from "lucide-react"
import { Button } from "@/components/ui/button";

export function JournalButton() {
    const { push } = useRouter();

    return  (
    <Button onClick={() => push('/journal')} variant="ghost" size="icon">
    <NotebookPen className="h-5 w-5" />
    </Button>  
    )
}