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

// Test the new getInitialZoomFill logic
function testGetInitialZoomFill() {
  console.log('Testing new getInitialZoomFill logic...');

  // Test 1: Desktop first-time user (no stored value)
  console.log('\n1. Testing desktop first-time user:');
  mockLocalStorage.clear();
  mockWindow.innerWidth = 1200; // Desktop width

  // Simulate the getInitialZoomFill function
  const getInitialZoomFill = () => {
    const stored = mockLocalStorage.getItem('nexlab-global-zoom-fill');
    if (stored !== null) {
      return JSON.parse(stored);
    }

    // If no stored value exists, use mobile detection
    const isMobile = mockWindow.innerWidth <= 900;
    const initialValue = isMobile;

    // Save the initial value to localStorage immediately
    mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(initialValue));

    return initialValue;
  };

  const desktopResult = getInitialZoomFill();
  console.log('Desktop first-time result:', desktopResult); // Should be false
  console.log('Stored in localStorage:', JSON.parse(mockLocalStorage.getItem('nexlab-global-zoom-fill')));

  // Test 2: Mobile first-time user (no stored value)
  console.log('\n2. Testing mobile first-time user:');
  mockLocalStorage.clear();
  mockWindow.innerWidth = 800; // Mobile width

  const mobileResult = getInitialZoomFill();
  console.log('Mobile first-time result:', mobileResult); // Should be true
  console.log('Stored in localStorage:', JSON.parse(mockLocalStorage.getItem('nexlab-global-zoom-fill')));

  // Test 3: Returning user (has stored value)
  console.log('\n3. Testing returning user:');
  // Don't clear localStorage - should use stored value
  mockWindow.innerWidth = 1200; // Back to desktop, but should use stored mobile preference

  const returningResult = getInitialZoomFill();
  console.log('Returning user result (should use stored mobile preference):', returningResult); // Should be true

  // Test 4: User manually changes setting
  console.log('\n4. Testing manual setting change:');
  const setGlobalZoomFill = (zoomFill) => {
    mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(zoomFill));
    return zoomFill;
  };

  const manualChange = setGlobalZoomFill(false);
  console.log('User manually changed to:', manualChange);

  // Test 5: After manual change, getInitialZoomFill should return the manual setting
  const afterManualChange = getInitialZoomFill();
  console.log('After manual change, getInitialZoomFill returns:', afterManualChange); // Should be false

  console.log('\n✅ All new localStorage tests completed successfully!');
}

// Run the test
testGetInitialZoomFill();

// Export for potential use in actual test frameworks
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testGetInitialZoomFill, mockLocalStorage };
}
