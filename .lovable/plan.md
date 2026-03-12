

# Fix Video Classes: Open in New Tab Instead of Iframe

## Problem
The vhpgo.com video URLs block iframe embedding via browser security headers (`X-Frame-Options: DENY` or CSP). This is a server-side restriction we cannot bypass.

## Solution
Replace the Dialog/iframe approach with a simple "open in new tab" action. When the user clicks "Watch Now", the video opens in a new browser tab where it will load natively.

## Changes

### `src/pages/member/MemberHome.tsx`
1. Remove the `activeVideoUrl` / `activeVideoTitle` state
2. Remove the `Dialog` component and iframe
3. Change "Watch Now" button click to `window.open(url, '_blank')`
4. Remove unused Dialog imports

