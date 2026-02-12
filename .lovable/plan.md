
# Add Empty "Message Your Coach" Section for Suzie and Olivia

## Overview
Add a "Message Your Coach" card to the Care Team tab for Suzie and Olivia (non-Healthie members). It will match the same card style used for John but show an empty chat placeholder instead of the live Healthie chat.

## Change

### `src/pages/member/MemberHome.tsx`
After the "Book an Appointment" card in the non-Healthie branch (around line 897, before the closing `</>` at line 898), add a new Card:

- Title: "Message Your Coach" with the MessageSquare icon (same as John's)
- Description: "Chat directly with your health coach between sessions."
- Content: An empty chat-like container (matching the `h-[500px] border rounded-lg` style of the HealthieChat component) with a centered placeholder message such as "No messages yet. Start a conversation with your coach." and a disabled "Send" input area at the bottom to give it the look of a real chat UI.

This keeps it visually consistent with John's connected chat while clearly showing it's empty for demo purposes.

One file modified, no new files needed.
