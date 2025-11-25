/**
 * Utility for displaying prompt-related text (word + emoji)
 * Uses hardcoded prompt-to-display mappings for simplicity
 * Shared between content scripts and sidepanel
 */

const DEFAULT_DISPLAY = 'Agent'

// Hardcoded prompt-to-display mappings
// Maps exact prompt text to display text (word + emoji)
const PROMPT_DISPLAY_MAP: Record<string, string> = {
  'Fix my code to pass all test cases 🔧': 'Fix🔧',
  'Write an optimal solution with step-by-step explanation 📝': 'Write📝',
  'Read about our vision and upvote ❤️': 'Read❤️',
  'Support BrowserOS on Github ⭐': 'Support⭐',
  'Open amazon.com and order Sensodyne toothpaste 🪥': 'Open🪥',
  'Summarize PR changes 📝': 'Summarize📝',
  'Review PR changes 🔍': 'Review🔍',
  'Summarize video 📝': 'Summarize📝',
  'Extract key takeaways 🔑': 'Takeaways🔑',
  'Find timestamps ⏱️': 'Timestamps⏱️',
  'Summarize reviews ⭐': 'Reviews⭐',
  'Compare with similar items ⚖️': 'Compare⚖️',
  'Is this a good deal? 💰': 'Deal?💰',
  'Summarize thread 🧵': 'Summarize🧵',
  'Draft reply ✍️': 'Reply✍️',
  'Extract action items ✅': 'Actions✅',
  'Summarize profile 👤': 'Profile👤',
  'Draft connection message 🤝': 'Connect🤝',
  'Fact check 🔍': 'FactCheck🔍',
  'TL;DR ⚡': 'TL;DR⚡',
  'Explain like I\'m 5 👶': 'ELI5👶',
  'Summarize solution ✅': 'Solution✅',
  'Summarize discussion 💬': 'Discuss💬'
}

/**
 * Get display text for a given prompt
 * Returns mapped display text or extracts first word if no mapping exists
 */
export function getDisplayTextFromPrompt(prompt: string | null): string {
  if (!prompt) {
    return DEFAULT_DISPLAY
  }

  const trimmed = prompt.trim()

  // Check if we have a direct mapping
  if (PROMPT_DISPLAY_MAP[trimmed]) {
    return PROMPT_DISPLAY_MAP[trimmed]
  }

  // Fallback: extract first word and capitalize it
  const firstWordMatch = trimmed.match(/^([a-zA-Z]+)/i)
  if (firstWordMatch) {
    const firstWord = firstWordMatch[1]
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()
  }

  return DEFAULT_DISPLAY
}

