
import { JournalEntry } from "@/components/journal-swipe";
import { JournalEntryEditCard } from '../journal-edit';

const renderSlide = (item: JournalEntry) => (

        <JournalEntryEditCard {...item} />
);

export default renderSlide;
