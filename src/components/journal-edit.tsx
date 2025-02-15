"use client";

// Core imports
import { useState } from "react";

// UI
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, NotebookPen } from "lucide-react";
import { JournalEntry } from "@/components/journal-swipe"; // Import JournalEntry interface

import { format } from 'date-fns';


export function JournalEntryEditCard(item: JournalEntry) {
  const [entry, setEntry] = useState(item.journal_text); // Pre-fill with existing text

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
        {/* Header */}
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle>Edit Journal Entry from </CardTitle>
            <NotebookPen className="h-6 w-6" />
            <CardTitle className="text-lg font-semibold text-gray-800">
                {format(new Date(item.entry_date), 'MMMM d, yyyy')}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <CardDescription>Modify your thoughts</CardDescription>
            <Brain className="h-4 w-4" />
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-10">
          <div className="space-y-2">
            <TextArea
              placeholder="Edit your thoughts..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter>
          {/* Edit button (no functionality yet) */}
          <Button variant="outline">
            Edit Entry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
