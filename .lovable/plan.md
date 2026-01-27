
# Contact Support with Simulated Salesforce Integration

## Overview
Create a Contact Support modal that simulates sending a support request to Salesforce. The modal will include a form, show a loading state with Salesforce branding, and display a success confirmation - all for demo purposes without actual API integration.

## What You'll Get
- A "Contact Support" button that opens a professional support form
- Form fields for subject and message
- A simulated "sending to Salesforce" loading state with progress indicator
- Success confirmation showing "Case Created" with a mock case number
- Salesforce branding badge to reinforce the integration story

## User Experience Flow
1. User clicks "Contact Support" button
2. Modal opens with a support request form
3. User fills in subject and message
4. User clicks "Submit Request"
5. Modal shows loading state: "Sending to Salesforce..." with a spinner
6. After 2 seconds, displays success: "Case #SF-XXXXX created successfully"
7. User can close the modal or it auto-closes

## Implementation Details

### Files to Modify

**1. `src/pages/member/MemberHome.tsx`**
- Add state for the support modal (`supportModalOpen`)
- Add state for form fields (`supportSubject`, `supportMessage`)
- Add state for submission status (`submitting`, `submitted`, `caseNumber`)
- Wire the "Contact Support" button to open the modal
- Add the support modal with:
  - Form with subject dropdown and message textarea
  - Loading state with spinner and "Connecting to Salesforce..." text
  - Success state with Salesforce badge and mock case number
  - Reset function when modal closes

### Form Fields
- **Subject** (dropdown):
  - Order Issue
  - Delivery Question
  - Dietary Preferences
  - Program Questions
  - Technical Support
  - Other
- **Message** (textarea): Free-form description

### Visual States
1. **Form State**: Shows the input form with Salesforce badge in header
2. **Submitting State**: Shows spinner with "Creating case in Salesforce..." message
3. **Success State**: Shows checkmark, case number (e.g., SF-847291), and "Created in Salesforce" badge

### Technical Notes
- Uses existing `IntegrationBadge` component for Salesforce branding
- Uses `setTimeout` to simulate API delay (2 seconds)
- Generates random case number for demo realism
- Form resets when modal is closed
- Uses existing Dialog, Select, Textarea, and Button components
