"use client" // Ensures this component is a Client Component in Next.js

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; // Utility function to conditionally join class names

// Define the props interface, extending standard <textarea> attributes
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Forward ref to allow parent components to reference the textarea element
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    // Create a reference to the textarea element
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      const textarea = textareaRef.current; // Get the textarea element reference
      if (!textarea) return;

      const adjustHeight = () => {
        textarea.style.height = "auto"; // Reset height to auto before measuring
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
      };

      adjustHeight(); // Adjust height on mount to fit pre-filled content

      // Add event listener for 'input' event to adjust height dynamically
      textarea.addEventListener("input", adjustHeight);

      // Cleanup: Remove event listener when component unmounts
      return () => textarea.removeEventListener("input", adjustHeight);
    }, []); // Runs once when component mounts

    return (
      <textarea
        ref={(el) => {
          textareaRef.current = el; // Store reference for internal use

          // Handle the forwarded ref from parent components
          if (typeof ref === "function") ref(el);
          else if (ref && el) (ref as React.RefObject<HTMLTextAreaElement>).current = el;
        }}
        className={cn(
          "w-full min-h-[100px] max-h-[300px] p-3 rounded-md border border-input bg-background text-base focus:ring focus:ring-primary/50 resize-none placeholder:text-muted-foreground disabled:opacity-50",
          className // Allows additional custom class names to be passed
        )}
        {...props} // Spread any additional props 
      />
    );
  }
);

TextArea.displayName = "TextArea"; 

export { TextArea }; 