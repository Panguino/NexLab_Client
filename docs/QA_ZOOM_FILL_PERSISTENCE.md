# Manual QA Checklist: Zoom Fill Persistence Across Weather Data Products

## Overview
This checklist verifies that the Expand/Contract (Fit/Fill) display setting persists when switching between different weather data products in the Animator component.

## Test Environment Setup
- [ ] Ensure you have access to multiple weather data products (NEXRAD, Satrad, Forecast, etc.)
- [ ] Clear browser cache/localStorage to start with default settings
- [ ] Test on both desktop and mobile devices
- [ ] Note: Settings are now stored in localStorage under key `nexlab-global-zoom-fill`

## Test Cases

### 1. Button State Sync Test (Primary Fix)
- [ ] **Set Preference**: Navigate to any weather data product and change zoom fill setting
- [ ] **Refresh Page**: Refresh the browser page
- [ ] **Verify Immediate State**: Button/icon should immediately show correct state (no flicker or wrong state)
- [ ] **Navigate Products**: Switch to other weather data products
- [ ] **Verify Consistency**: Button state should remain consistent across all products

### 2. Default Behavior (First Time Users)
- [ ] **Clear localStorage**: Clear browser localStorage or use incognito mode
- [ ] **Desktop Initial Load**: Navigate to any weather data product
- [ ] **Verify**: Default setting should be "Fit" (not expanded) on desktop
- [ ] **Expected**: Image should fit within the container bounds
- [ ] **Mobile Initial Load**: Navigate to any weather data product on mobile
- [ ] **Verify**: Default setting should be "Fill" (expanded) on mobile
- [ ] **Expected**: Image should fill the container on mobile

### 3. Setting Persistence - Desktop
- [ ] **Step 1**: Navigate to NEXRAD weather data
- [ ] **Step 2**: Click the Expand/Contract button to change from "Fit" to "Fill" (expand)
- [ ] **Step 3**: Verify the image expands to fill the container
- [ ] **Step 4**: Navigate to Satrad weather data
- [ ] **Expected**: Setting should remain "Fill" (expanded)
- [ ] **Step 5**: Navigate to Forecast weather data
- [ ] **Expected**: Setting should remain "Fill" (expanded)
- [ ] **Step 6**: Navigate to Analysis weather data
- [ ] **Expected**: Setting should remain "Fill" (expanded)

### 4. Setting Persistence - Reverse Direction
- [ ] **Step 1**: Start with "Fill" setting from previous test
- [ ] **Step 2**: Navigate to any weather data product
- [ ] **Step 3**: Click the Expand/Contract button to change from "Fill" to "Fit"
- [ ] **Step 4**: Navigate to different weather data products
- [ ] **Expected**: Setting should remain "Fit" across all products

### 5. Mobile Behavior
- [ ] **Step 1**: Access the application on a mobile device
- [ ] **Step 2**: Navigate to any weather data product
- [ ] **Expected**: Should automatically use "Fill" setting on mobile
- [ ] **Step 3**: Switch between different weather data products
- [ ] **Expected**: Should maintain "Fill" setting across all products on mobile

### 6. LocalStorage Persistence
- [ ] **Step 1**: Set zoom fill to "Fill" on any weather data product
- [ ] **Step 2**: Navigate to a different weather data product
- [ ] **Step 3**: Refresh the browser page
- [ ] **Expected**: Setting should persist after page refresh (stored in localStorage)
- [ ] **Step 4**: Navigate to another weather data product
- [ ] **Expected**: Setting should still be "Fill"
- [ ] **Step 5**: Open browser developer tools and check localStorage
- [ ] **Expected**: Should see `nexlab-global-zoom-fill` key with boolean value

### 7. Cross-Product Consistency
Test the following weather data products to ensure consistency:
- [ ] **NEXRAD**: Navigate and verify zoom fill setting
- [ ] **Satrad**: Navigate and verify zoom fill setting  
- [ ] **Forecast**: Navigate and verify zoom fill setting
- [ ] **Analysis (RAPMeso)**: Navigate and verify zoom fill setting
- [ ] **Isentropic**: Navigate and verify zoom fill setting
- [ ] **Upper Air**: Navigate and verify zoom fill setting
- [ ] **Sounding**: Navigate and verify zoom fill setting
- [ ] **Forecast Compare Models**: Navigate and verify zoom fill setting
- [ ] **Forecast Compare Heights**: Navigate and verify zoom fill setting
- [ ] **Forecast Compare Runs**: Navigate and verify zoom fill setting
- [ ] **Forecast Sounding**: Navigate and verify zoom fill setting

### 8. UI Consistency
- [ ] **Button State**: Verify the expand/contract button shows correct icon state
- [ ] **Visual Feedback**: Ensure smooth transitions when toggling setting
- [ ] **No Regression**: Verify other animator controls still work (zoom, pan, play/pause)

### 9. Edge Cases
- [ ] **Multiple Tabs**: Open multiple browser tabs, change setting in one, refresh other tabs to see updated setting
- [ ] **Different Sectors**: Change geographic sectors and verify setting persists
- [ ] **Different Products**: Change product types within same category and verify setting persists
- [ ] **LocalStorage Clearing**: Clear localStorage and verify first-time behavior (mobile vs desktop defaults)
- [ ] **Browser Restart**: Close and reopen browser, verify setting persists from localStorage

## Bug Reporting
If any test case fails, report with:
- [ ] Browser and version
- [ ] Device type (desktop/mobile)
- [ ] Steps to reproduce
- [ ] Expected vs actual behavior
- [ ] Screenshots/video if applicable

## Success Criteria
- [ ] All test cases pass
- [ ] No regression in existing functionality
- [ ] Consistent behavior across all weather data products
- [ ] Proper mobile behavior maintained
- [ ] Setting persists across browser sessions
