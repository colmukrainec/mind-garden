"use client"

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, NotebookPen } from "lucide-react";
import { insertData } from "@/utils/supabase/dbfunctions";

interface JournalEntryProps {
  userId: string;
}

export function JournalEntry({ userId }: JournalEntryProps) {
  const [entry, setEntry] = useState(""); // State to store textarea input

  const handleSave = async () => {
    if (!entry.trim()) return; // Prevent empty entries
    await insertData("journal_entries", { user_id: userId,
                                          journal_text: entry });
    setEntry(""); // Clear input after saving
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
        {/* Header */}
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle>Journal Entry</CardTitle>
            <NotebookPen className="h-6 w-6" />
          </div>
          <div className="flex items-center space-x-2">
            <CardDescription>Journal your thoughts</CardDescription>
            <Brain className="h-4 w-4" />
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-10">
          <div className="space-y-2">
            <TextArea
              placeholder="What's on your mind?"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter>
          <Button onClick={handleSave}>Save Entry</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
