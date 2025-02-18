"use client";

//Core imports
import { useState } from "react";

// Third party imports
import { Brain, NotebookPen } from "lucide-react";

// Utility
import { saveJournalEntry } from "@/utils/supabase/dbfunctions";

//UI
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


interface JournalEntryProps {
  readonly userId: string;
}

export function JournalEntryCard({ userId }: JournalEntryProps) {
  const [entry, setEntry] = useState(""); // State to store textarea input

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
        {/* Header */}
        <CardHeader>
          {/* Title and Icon */}
          <div className="flex items-center space-x-2">
            <CardTitle>Journal Entry</CardTitle>
            <NotebookPen className="h-6 w-6" />
          </div>
          {/* Description and Icon */}
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
          {/* This will save our journal entry and make the textarea blank */}
          <Button onClick={async () => { await saveJournalEntry(entry, userId); setEntry(""); }}> 
            Save Entry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}