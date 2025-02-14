"use client";

import { useState, useEffect } from "react";
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
import { saveJournalEntry, selectJournalEntries } from "@/utils/supabase/dbfunctions";
import { JournalSwipe } from "@/components/journal-swipe";

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
          {/* This will save our journal entry and make the textarea blank */}
          <Button onClick={async () => { 
            await saveJournalEntry(entry, userId); 
            setEntry(""); 
          }}> 
            Save Entry
          </Button>
        </CardFooter>
      </Card>

      {/* This will output our journal entries */}
      <JournalSwipe userId={userId} /> {/* Pass journal entries data to JournalSwipe */}
    </div>
  );
}