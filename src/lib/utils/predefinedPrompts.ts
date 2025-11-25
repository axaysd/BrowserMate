/**
 * Central registry for all predefined prompts with full execution metadata
 * Structure matches the return type of _getSpecialTaskMetadata()
 */

import type { ExecutionMetadata } from '@/lib/types/messaging'

// Structure matching _getSpecialTaskMetadata return type
export interface PredefinedPromptDefinition {
  prompt: string  // Display text shown to user (with emoji)
  normalizedPrompt: string  // Normalized for matching (lowercase, trimmed)
  task: string  // Normalized task description (what agent sees)
  metadata: ExecutionMetadata  // Full execution metadata
}

// URL pattern to prompts mapping
export interface URLBasedPromptMapping {
  pattern: string  // URL pattern (e.g., '*leetcode.com/problems/*')
  prompts: PredefinedPromptDefinition[]  // Prompts with full metadata
}

// Global prompts (not tied to specific URLs) - matches _getSpecialTaskMetadata structure
export const GLOBAL_PREDEFINED_PROMPTS: PredefinedPromptDefinition[] = [
  {
    prompt: 'Read about our vision and upvote ❤️',
    normalizedPrompt: 'read about our vision and upvote ❤️',
    task: 'Read about our vision and upvote',
    metadata: {
      executionMode: 'predefined' as const,
      predefinedPlan: {
        agentId: 'browseros-launch-upvoter',
        name: 'BrowserOS Launch Upvoter',
        goal: 'Navigate to BrowserOS launch page and upvote it',
        steps: [
          'Navigate to https://dub.sh/browseros-launch',
          'Find and click the upvote button on the page using visual_click',
          'Use celebration tool to show confetti animation'
        ]
      }
    }
  },
  {
    prompt: 'Support BrowserOS on Github ⭐',
    normalizedPrompt: 'support browseros on github ⭐',
    task: 'Support BrowserOS on GitHub',
    metadata: {
      executionMode: 'predefined' as const,
      predefinedPlan: {
        agentId: 'github-star-browseros',
        name: 'GitHub Repository Star',
        goal: 'Navigate to BrowserOS GitHub repo and star it',
        steps: [
          'Navigate to https://git.new/browserOS',
          'Check if the star button indicates already starred (filled star icon)',
          'If not starred (outline star icon), click the star button to star the repository',
          'Use celebration_tool to show confetti animation'
        ]
      }
    }
  }
]

// URL-based prompt mappings - same structure
export const URL_BASED_PROMPT_MAPPINGS: URLBasedPromptMapping[] = [
  {
    pattern: '*leetcode.com/problems/*',
    prompts: [
      {
        prompt: 'Fix my code to pass all test cases 🔧',
        normalizedPrompt: 'fix my code to pass all test cases 🔧',
        task: 'Fix my code to pass all test cases',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'leetcode-code-fixer',
            name: 'LeetCode Code Fixer',
            goal: 'Fix the code to pass all test cases',
            steps: [
              'Extract the current code from the code editor panel using extract tool to get the full code content',
              'Extract the error message and details from the "Test Result" tab to understand what type of error occurred (syntax error, runtime error, wrong answer, etc.)',
              'Analyze the error message to identify the specific issue - check the error type, line number, and error description',
              'Click on the code editor area to focus it, then use key tool to press Ctrl+A (or Cmd+A on Mac) to select all existing code',
              'Use clear tool to clear the selected code from the editor',
              'Type the corrected code into the editor using type tool, fixing the identified issues (syntax errors, logic errors, missing code, incorrect algorithms, etc.)',
              'Click the "Run" button (or "Play" button) in the top toolbar to execute the code and test it',
              'Wait for test execution to complete using wait tool (typically 2-3 seconds for code execution)',
              'Extract the test results from the "Test Result" tab to check if the error is resolved and all test cases pass',
              'If error persists or tests still fail, extract the new error message, analyze what went wrong, clear the editor again with Ctrl+A and clear tool, then type the newly corrected code',
              'Repeat the run-test-check cycle until all test cases pass with no errors or wrong answers',
              'Once all tests pass successfully (check the "Test Result" tab shows success), click the "Submit" button in the top toolbar to submit the solution'
            ]
          }
        }
      },
      {
        prompt: 'Write an optimal solution with step-by-step explanation 📝',
        normalizedPrompt: 'write an optimal solution with step-by-step explanation 📝',
        task: 'Write an optimal solution with step-by-step explanation',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'leetcode-solution-writer',
            name: 'LeetCode Solution Writer',
            goal: 'Write an optimal solution with step-by-step explanation',
            steps: [
              'Analyze the problem requirements',
              'Design an optimal algorithm',
              'Implement the solution',
              'Provide step-by-step explanation'
            ]
          }
        }
      }
    ]
  }
  ,
  {
    pattern: '*github.com/*/*/pull/*',
    prompts: [
      {
        prompt: 'Summarize PR changes 📝',
        normalizedPrompt: 'summarize pr changes 📝',
        task: 'Summarize the changes in this PR',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'github-pr-summarizer',
            name: 'GitHub PR Summarizer',
            goal: 'Summarize the changes in this PR',
            steps: [
              'Extract the PR title and description to understand the context',
              'Click on the "Files changed" tab to view the code changes',
              'Extract the file names and code diffs from the "Files changed" view',
              'Analyze the changes to understand what was modified, added, or deleted',
              'Generate a concise summary of the changes, grouping them by component or functionality',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Review PR changes 🔍',
        normalizedPrompt: 'review pr changes 🔍',
        task: 'Review the changes in this PR for code quality and bugs',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'github-pr-reviewer',
            name: 'GitHub PR Reviewer',
            goal: 'Review the changes in this PR for code quality and bugs',
            steps: [
              'Extract the PR title and description to understand the context',
              'Click on the "Files changed" tab to view the code changes',
              'Extract the file names and code diffs from the "Files changed" view',
              'Analyze the code changes for potential bugs, security issues, and code quality improvements',
              'Check for adherence to best practices and coding standards',
              'Generate a review report highlighting any issues found and suggestions for improvement',
              'Present the review report to the user'
            ]
          }
        }
      }
    ]
  }
  ,
  {
    pattern: '*youtube.com/watch*',
    prompts: [
      {
        prompt: 'Summarize video 📝',
        normalizedPrompt: 'summarize video 📝',
        task: 'Summarize this video',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'youtube-summarizer',
            name: 'YouTube Video Summarizer',
            goal: 'Summarize the video content',
            steps: [
              'Extract the video title and description',
              'Check if the transcript is available and extract it',
              'If transcript is not available, use the description and visual context',
              'Generate a concise summary of the video content',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Extract key takeaways 🔑',
        normalizedPrompt: 'extract key takeaways 🔑',
        task: 'Extract key takeaways from this video',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'youtube-takeaways',
            name: 'YouTube Key Takeaways',
            goal: 'Extract key takeaways from the video',
            steps: [
              'Extract the video content (transcript/description)',
              'Identify the main points and actionable advice',
              'List the key takeaways in a bulleted format',
              'Present the takeaways to the user'
            ]
          }
        }
      },
      {
        prompt: 'Find timestamps ⏱️',
        normalizedPrompt: 'find timestamps ⏱️',
        task: 'Create a table of contents with timestamps',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'youtube-timestamps',
            name: 'YouTube Timestamp Generator',
            goal: 'Create a table of contents with timestamps',
            steps: [
              'Analyze the video content to identify topic transitions',
              'Generate a list of topics with their corresponding timestamps',
              'Present the table of contents to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*amazon.com/*/dp/*',
    prompts: [
      {
        prompt: 'Summarize reviews ⭐',
        normalizedPrompt: 'summarize reviews ⭐',
        task: 'Summarize the customer reviews',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'amazon-review-summarizer',
            name: 'Amazon Review Summarizer',
            goal: 'Summarize customer reviews',
            steps: [
              'Scroll to the reviews section',
              'Extract the top positive and critical reviews',
              'Analyze the common themes, pros, and cons',
              'Generate a balanced summary of user sentiment',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Compare with similar items ⚖️',
        normalizedPrompt: 'compare with similar items ⚖️',
        task: 'Compare this item with similar products',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'amazon-comparator',
            name: 'Amazon Product Comparator',
            goal: 'Compare with similar items',
            steps: [
              'Identify similar items in the "Compare with similar items" section or recommendations',
              'Extract key specs, prices, and ratings for comparison',
              'Create a comparison table',
              'Highlight the best value option',
              'Present the comparison to the user'
            ]
          }
        }
      },
      {
        prompt: 'Is this a good deal? 💰',
        normalizedPrompt: 'is this a good deal? 💰',
        task: 'Analyze if this product is a good deal',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'amazon-deal-analyzer',
            name: 'Amazon Deal Analyzer',
            goal: 'Analyze price and value',
            steps: [
              'Extract the current price and list price',
              'Check for any active coupons or promotions',
              'Compare with prices of similar items if available',
              'Provide an assessment of whether this is a good deal',
              'Present the analysis to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*mail.google.com/*',
    prompts: [
      {
        prompt: 'Summarize thread 🧵',
        normalizedPrompt: 'summarize thread 🧵',
        task: 'Summarize this email thread',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'gmail-thread-summarizer',
            name: 'Gmail Thread Summarizer',
            goal: 'Summarize the email conversation',
            steps: [
              'Extract the content of all emails in the current thread',
              'Identify the key participants and main discussion points',
              'Generate a chronological summary of the conversation',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Draft reply ✍️',
        normalizedPrompt: 'draft reply ✍️',
        task: 'Draft a reply to this email',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'gmail-reply-drafter',
            name: 'Gmail Reply Drafter',
            goal: 'Draft a reply',
            steps: [
              'Analyze the latest email and the thread context',
              'Determine the appropriate tone and key points to address',
              'Draft a response email',
              'Present the draft to the user for review'
            ]
          }
        }
      },
      {
        prompt: 'Extract action items ✅',
        normalizedPrompt: 'extract action items ✅',
        task: 'Extract action items from this email',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'gmail-action-extractor',
            name: 'Gmail Action Item Extractor',
            goal: 'Identify tasks and deadlines',
            steps: [
              'Analyze the email content for requests, tasks, and deadlines',
              'Extract specific action items and who they are assigned to',
              'List the action items clearly',
              'Present the list to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*linkedin.com/in/*',
    prompts: [
      {
        prompt: 'Summarize profile 👤',
        normalizedPrompt: 'summarize profile 👤',
        task: 'Summarize this LinkedIn profile',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'linkedin-profile-summarizer',
            name: 'LinkedIn Profile Summarizer',
            goal: 'Summarize professional profile',
            steps: [
              'Extract the user\'s headline, about section, and experience',
              'Identify key skills and achievements',
              'Generate a professional summary of the person',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Draft connection message 🤝',
        normalizedPrompt: 'draft connection message 🤝',
        task: 'Draft a connection request message',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'linkedin-connect-drafter',
            name: 'LinkedIn Connection Msg Drafter',
            goal: 'Draft a personalized connection message',
            steps: [
              'Analyze the profile to find common interests or relevant experience',
              'Draft a polite and personalized connection request message (under 300 chars)',
              'Present the draft to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*twitter.com/*/status/*',
    prompts: [
      {
        prompt: 'Summarize thread 🧵',
        normalizedPrompt: 'summarize thread 🧵',
        task: 'Summarize this Twitter thread',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'twitter-thread-summarizer',
            name: 'Twitter Thread Summarizer',
            goal: 'Summarize the thread',
            steps: [
              'Extract the main tweet and subsequent replies in the thread',
              'Synthesize the main argument or story',
              'Generate a concise summary',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Fact check 🔍',
        normalizedPrompt: 'fact check 🔍',
        task: 'Fact check the claims in this tweet',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'twitter-fact-checker',
            name: 'Twitter Fact Checker',
            goal: 'Verify claims',
            steps: [
              'Identify the main claims made in the tweet',
              'Search for reliable sources to verify the information',
              'Compare the claims with the found evidence',
              'Provide a fact-check report',
              'Present the report to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*x.com/*/status/*',
    prompts: [
      {
        prompt: 'Summarize thread 🧵',
        normalizedPrompt: 'summarize thread 🧵',
        task: 'Summarize this X thread',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'x-thread-summarizer',
            name: 'X Thread Summarizer',
            goal: 'Summarize the thread',
            steps: [
              'Extract the main post and subsequent replies in the thread',
              'Synthesize the main argument or story',
              'Generate a concise summary',
              'Present the summary to the user'
            ]
          }
        }
      },
      {
        prompt: 'Fact check 🔍',
        normalizedPrompt: 'fact check 🔍',
        task: 'Fact check the claims in this post',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'x-fact-checker',
            name: 'X Fact Checker',
            goal: 'Verify claims',
            steps: [
              'Identify the main claims made in the post',
              'Search for reliable sources to verify the information',
              'Compare the claims with the found evidence',
              'Provide a fact-check report',
              'Present the report to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*wikipedia.org/wiki/*',
    prompts: [
      {
        prompt: 'TL;DR ⚡',
        normalizedPrompt: 'tl;dr ⚡',
        task: 'Provide a TL;DR summary of this article',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'wikipedia-tldr',
            name: 'Wikipedia TL;DR',
            goal: 'Summarize article',
            steps: [
              'Extract the introduction and section headers',
              'Generate a 3-bullet point summary of the main topic',
              'Present the TL;DR to the user'
            ]
          }
        }
      },
      {
        prompt: 'Explain like I\'m 5 👶',
        normalizedPrompt: 'explain like i\'m 5 👶',
        task: 'Explain this topic like I am 5 years old',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'wikipedia-eli5',
            name: 'Wikipedia ELI5',
            goal: 'Simplify explanation',
            steps: [
              'Analyze the article content',
              'Rewrite the core concept using simple language and analogies',
              'Present the simplified explanation to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*stackoverflow.com/questions/*',
    prompts: [
      {
        prompt: 'Summarize solution ✅',
        normalizedPrompt: 'summarize solution ✅',
        task: 'Summarize the best solution for this question',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'stackoverflow-summarizer',
            name: 'StackOverflow Solution Summarizer',
            goal: 'Summarize best solution',
            steps: [
              'Identify the accepted answer and highly upvoted answers',
              'Extract the code snippets and explanations',
              'Synthesize a comprehensive solution',
              'Present the solution to the user'
            ]
          }
        }
      }
    ]
  },
  {
    pattern: '*news.ycombinator.com/item*',
    prompts: [
      {
        prompt: 'Summarize discussion 💬',
        normalizedPrompt: 'summarize discussion 💬',
        task: 'Summarize the Hacker News discussion',
        metadata: {
          executionMode: 'predefined' as const,
          predefinedPlan: {
            agentId: 'hn-discussion-summarizer',
            name: 'Hacker News Summarizer',
            goal: 'Summarize discussion',
            steps: [
              'Extract the top comments and threads',
              'Identify the main arguments, counter-arguments, and consensus',
              'Generate a summary of the discussion',
              'Present the summary to the user'
            ]
          }
        }
      }
    ]
  }
]

/**
 * Match URL against a pattern
 * Pattern format: *domain.com/path/*
 * Supports wildcards (*) for flexible matching
 */
export function matchPattern(url: string, pattern: string): boolean {
  try {
    const urlObj = new URL(url)
    const fullPath = `${urlObj.hostname}${urlObj.pathname}`

    // Convert pattern to regex
    const regexPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')  // Escape special chars
      .replace(/\*/g, '.*')  // Convert * to .*

    const regex = new RegExp(`^${regexPattern}$`, 'i')
    return regex.test(fullPath)
  } catch {
    return false
  }
}

/**
 * Get suggestive prompts for a given URL (returns just prompt strings for UI)
 */
export function getSuggestivePrompts(url: string | null | undefined): string[] {
  if (!url) return []

  for (const mapping of URL_BASED_PROMPT_MAPPINGS) {
    if (matchPattern(url, mapping.pattern)) {
      return mapping.prompts.slice(0, 2).map(p => p.prompt)
    }
  }

  return []
}

/**
 * Get predefined task metadata by prompt text
 * Returns structure matching _getSpecialTaskMetadata return type
 */
export function getPredefinedTaskMetadata(promptText: string): { task: string, metadata: ExecutionMetadata } | null {
  const normalized = promptText.toLowerCase().trim()

  // Check global prompts first
  for (const promptDef of GLOBAL_PREDEFINED_PROMPTS) {
    if (promptDef.normalizedPrompt === normalized ||
      promptText.toLowerCase() === promptDef.prompt.toLowerCase()) {
      return {
        task: promptDef.task,
        metadata: promptDef.metadata
      }
    }
  }

  // Check URL-based prompts
  for (const mapping of URL_BASED_PROMPT_MAPPINGS) {
    for (const promptDef of mapping.prompts) {
      if (promptDef.normalizedPrompt === normalized ||
        promptText.toLowerCase() === promptDef.prompt.toLowerCase()) {
        return {
          task: promptDef.task,
          metadata: promptDef.metadata
        }
      }
    }
  }

  return null
}

