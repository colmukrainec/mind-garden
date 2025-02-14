// Core imports
import React, { useState, useEffect } from 'react';

// Third party
import { format } from 'date-fns';

//UI
import { selectJournalEntries } from '@/utils/supabase/dbfunctions';
import SwiperUI from './ui/swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// Define our data structure for journal entries
interface JournalEntry {
  id: string;
  user_id: string;
  journal_text: string;
  entry_date: string;
}

/** useJounralEntries(userID: string)
 * Custom hook to manage journal entries with pagination
 * This hook handles loading, storing, and fetching more entries as needed
 */
function useJournalEntries(userId: string) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntryId, setCurrentEntryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ENTRIES_PER_PAGE = 5; 


  const fetchMoreEntries = async () => {
    // Prevent fetching more entries if we're already loading or at the end 
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { data, error } = await selectJournalEntries(userId, currentEntryId);

      if (error) throw error;

      if (data) {
        setEntries(prev => {
          // Prevent duplicate entries by checking IDs
          const newEntries = data as unknown as JournalEntry[];
          const existingIds = new Set(prev.map(entry => entry.id));
          const uniqueNewEntries = newEntries.filter(entry => !existingIds.has(entry.id));
          
          //set the last retrieved entry ID
          const lastEntry = data[data.length - 1] as unknown as JournalEntry;
          if (lastEntry?.id) {
            setCurrentEntryId(lastEntry.id);
          }
          //check if there more entries to fetch
          setHasMore(data.length >= ENTRIES_PER_PAGE);
          return [...prev, ...uniqueNewEntries];
          
        }); 
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset everything when userId changes
  useEffect(() => {
    setEntries([]);
    setCurrentEntryId("");
    setHasMore(true);
    fetchMoreEntries();

  }, [userId]); // Add userId as a dependency

  return {
    entries,
    isLoading,
    hasMore,
    fetchMoreEntries
  };
}


/**
 * Main journal component that combines the hook and UI components
 * Handles data fetching and rendering of journal entries
 */
interface JournalSwipeProps {
  readonly userId: string;
}

export function JournalSwipe({ userId }: JournalSwipeProps) {
  // Use our custom hook to manage entries
  const { entries, isLoading, hasMore, fetchMoreEntries } = useJournalEntries(userId);

  /**
   * Renders individual journal entries with consistent styling
   */
  const renderSlide = (item: JournalEntry) => (
    <>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {format(new Date(item.entry_date), 'MMMM d, yyyy')}
        </h3>
        <div className="h-1 w-20 bg-blue-500 rounded mt-2"></div>
      </div>
      <p className="text-gray-700 leading-relaxed flex-grow">
        {item.journal_text}
      </p>
    </>
  );

  return (
    <div>
      <SwiperUI 
        data={entries} 
        renderSlide={renderSlide}
        onReachEnd={() => {
          if (hasMore) {
            fetchMoreEntries();
          }
        }}
      />
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
    </div>
  );
}