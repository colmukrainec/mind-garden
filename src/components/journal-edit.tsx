"use client";

// Core imports
import { useState } from "react";

// UI
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, NotebookPen } from "lucide-react";
import { JournalEntry } from "@/components/journal-swipe"; // Import JournalEntry interface
import { format } from "date-fns";

// Import our database function
import { updateJournalEntry } from "@/utils/supabase/dbfunctions";

// Import toast for popups
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export function JournalEntryEditCard(item: Readonly<JournalEntry>) {
  const [entry, setEntry] = useState(item.journal_text); // Pre-fill with existing text
  const [isUpdating, setIsUpdating] = useState(false); // Loading state

  const handleUpdate = async () => {
    if (!entry.trim()) {
      toast.warn("Entry cannot be empty!"); // Warn if empty
      return;
    }

    setIsUpdating(true); // Show loading state

    const result = await updateJournalEntry(item.id, entry);

    setIsUpdating(false);

    if (result?.error) {
      toast.error("Failed to update journal entry.");
    } else {
      toast.success("Journal entry updated successfully!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="bg-white/50 backdrop-blur-sm rounded-2xl">
        {/* Header */}
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle>Edit Journal Entry from </CardTitle>
            <NotebookPen className="h-6 w-6" />
            <CardTitle className="text-lg font-semibold text-gray-800">
              {format(new Date(item.entry_date), "MMMM d, yyyy")}
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
          {/* Update button */}
          <Button onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Entry"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
