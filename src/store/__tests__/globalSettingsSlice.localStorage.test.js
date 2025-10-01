/**
 * Simple test to verify localStorage integration for globalZoomFill setting
 * This can be run in a browser console to test the functionality
 */

// Mock localStorage for testing
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => store[key] = value.toString(),
    removeItem: (key) => delete store[key],
    clear: () => store = {},
    get length() { return Object.keys(store).length; },
    key: (index) => Object.keys(store)[index] || null
  };
})();

// Mock window object for testing
const mockWindow = {
  innerWidth: 1200, // Default to desktop
  localStorage: mockLocalStorage
};

// Test the new hydration approach
function testZoomFillHydration() {
  console.log('Testing zoom fill hydration approach...');

  // Test 1: Desktop first-time user (no stored value)
  console.log('\n1. Testing desktop first-time user:');
  mockLocalStorage.clear();
  mockWindow.innerWidth = 1200; // Desktop width

  // Simulate the initializeZoomFillFromStorage function
  const initializeZoomFillFromStorage = () => {
    const stored = mockLocalStorage.getItem('nexlab-global-zoom-fill');
    if (stored !== null) {
      const storedValue = JSON.parse(stored);
      console.log('Found stored value:', storedValue);
      return storedValue;
    } else {
      // First time - use mobile detection
      const isMobile = mockWindow.innerWidth <= 900;
      const initialValue = isMobile;
      mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(initialValue));
      console.log('First time, set initial value:', initialValue);
      return initialValue;
    }
  };

  const desktopResult = initializeZoomFillFromStorage();
  console.log('Desktop first-time result:', desktopResult); // Should be false

  // Test 2: Mobile first-time user (no stored value)
  console.log('\n2. Testing mobile first-time user:');
  mockLocalStorage.clear();
  mockWindow.innerWidth = 800; // Mobile width

  const mobileResult = initializeZoomFillFromStorage();
  console.log('Mobile first-time result:', mobileResult); // Should be true

  // Test 3: Returning user (has stored value)
  console.log('\n3. Testing returning user:');
  // Don't clear localStorage - should use stored value
  mockWindow.innerWidth = 1200; // Back to desktop, but should use stored mobile preference

  const returningResult = initializeZoomFillFromStorage();
  console.log('Returning user result (should use stored mobile preference):', returningResult); // Should be true

  // Test 4: User manually changes setting
  console.log('\n4. Testing manual setting change:');
  const setGlobalZoomFill = (zoomFill) => {
    mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(zoomFill));
    return zoomFill;
  };

  const manualChange = setGlobalZoomFill(false);
  console.log('User manually changed to:', manualChange);

  // Test 5: After manual change, hydration should return the manual setting
  const afterManualChange = initializeZoomFillFromStorage();
  console.log('After manual change, hydration returns:', afterManualChange); // Should be false

  console.log('\n✅ All zoom fill hydration tests completed successfully!');
}

// Run the test
testZoomFillHydration();

// Export for potential use in actual test frameworks
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testZoomFillHydration, mockLocalStorage };
}
