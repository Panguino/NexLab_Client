# Manual QA Checklist: Zoom Fill Persistence Across Weather Data Products

## Overview
This checklist verifies that the Expand/Contract (Fit/Fill) display setting persists when switching between different weather data products in the Animator component.

## Test Environment Setup
- [ ] Ensure you have access to multiple weather data products (NEXRAD, Satrad, Forecast, etc.)
- [ ] Clear browser cache/localStorage to start with default settings
- [ ] Test on both desktop and mobile devices

## Test Cases

### 1. Default Behavior
- [ ] **Initial Load**: Navigate to any weather data product
- [ ] **Verify**: Default setting should be "Fit" (not expanded)
- [ ] **Expected**: Image should fit within the container bounds

### 2. Setting Persistence - Desktop
- [ ] **Step 1**: Navigate to NEXRAD weather data
- [ ] **Step 2**: Click the Expand/Contract button to change from "Fit" to "Fill" (expand)
- [ ] **Step 3**: Verify the image expands to fill the container
- [ ] **Step 4**: Navigate to Satrad weather data
- [ ] **Expected**: Setting should remain "Fill" (expanded)
- [ ] **Step 5**: Navigate to Forecast weather data
- [ ] **Expected**: Setting should remain "Fill" (expanded)
- [ ] **Step 6**: Navigate to Analysis weather data
- [ ] **Expected**: Setting should remain "Fill" (expanded)

### 3. Setting Persistence - Reverse Direction
- [ ] **Step 1**: Start with "Fill" setting from previous test
- [ ] **Step 2**: Navigate to any weather data product
- [ ] **Step 3**: Click the Expand/Contract button to change from "Fill" to "Fit"
- [ ] **Step 4**: Navigate to different weather data products
- [ ] **Expected**: Setting should remain "Fit" across all products

### 4. Mobile Behavior
- [ ] **Step 1**: Access the application on a mobile device
- [ ] **Step 2**: Navigate to any weather data product
- [ ] **Expected**: Should automatically use "Fill" setting on mobile
- [ ] **Step 3**: Switch between different weather data products
- [ ] **Expected**: Should maintain "Fill" setting across all products on mobile

### 5. Session Persistence
- [ ] **Step 1**: Set zoom fill to "Fill" on any weather data product
- [ ] **Step 2**: Navigate to a different weather data product
- [ ] **Step 3**: Refresh the browser page
- [ ] **Expected**: Setting should persist after page refresh
- [ ] **Step 4**: Navigate to another weather data product
- [ ] **Expected**: Setting should still be "Fill"

### 6. Cross-Product Consistency
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

### 7. UI Consistency
- [ ] **Button State**: Verify the expand/contract button shows correct icon state
- [ ] **Visual Feedback**: Ensure smooth transitions when toggling setting
- [ ] **No Regression**: Verify other animator controls still work (zoom, pan, play/pause)

### 8. Edge Cases
- [ ] **Multiple Tabs**: Open multiple browser tabs, change setting in one, verify it updates in others
- [ ] **Different Sectors**: Change geographic sectors and verify setting persists
- [ ] **Different Products**: Change product types within same category and verify setting persists

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
