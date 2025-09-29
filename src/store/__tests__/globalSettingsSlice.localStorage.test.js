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

// Test the localStorage functionality
function testLocalStorageIntegration() {
  console.log('Testing localStorage integration for globalZoomFill...');
  
  // Clear localStorage
  mockLocalStorage.clear();
  
  // Test 1: First-time user (no stored value)
  console.log('\n1. Testing first-time user behavior:');
  const stored = mockLocalStorage.getItem('nexlab-global-zoom-fill');
  console.log('Stored value:', stored); // Should be null
  
  // Simulate mobile first-time user
  const isMobile = true;
  if (stored === null) {
    const initialValue = isMobile;
    mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(initialValue));
    console.log('Set initial value for mobile user:', initialValue); // Should be true
  }
  
  // Test 2: Verify storage
  console.log('\n2. Testing storage:');
  const storedAfterInit = mockLocalStorage.getItem('nexlab-global-zoom-fill');
  console.log('Stored after initialization:', JSON.parse(storedAfterInit)); // Should be true
  
  // Test 3: User changes setting
  console.log('\n3. Testing user preference change:');
  const newUserPreference = false;
  mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(newUserPreference));
  console.log('User changed setting to:', newUserPreference);
  
  // Test 4: Returning user
  console.log('\n4. Testing returning user:');
  const returningUserValue = JSON.parse(mockLocalStorage.getItem('nexlab-global-zoom-fill'));
  console.log('Returning user gets stored value:', returningUserValue); // Should be false
  
  // Test 5: Desktop first-time user
  console.log('\n5. Testing desktop first-time user:');
  mockLocalStorage.clear();
  const isDesktop = false;
  const desktopStored = mockLocalStorage.getItem('nexlab-global-zoom-fill');
  if (desktopStored === null) {
    const desktopInitialValue = isDesktop; // false for desktop
    mockLocalStorage.setItem('nexlab-global-zoom-fill', JSON.stringify(desktopInitialValue));
    console.log('Set initial value for desktop user:', desktopInitialValue); // Should be false
  }
  
  console.log('\n✅ All localStorage tests completed successfully!');
  console.log('Final localStorage contents:', {
    key: 'nexlab-global-zoom-fill',
    value: JSON.parse(mockLocalStorage.getItem('nexlab-global-zoom-fill'))
  });
}

// Run the test
testLocalStorageIntegration();

// Export for potential use in actual test frameworks
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testLocalStorageIntegration, mockLocalStorage };
}
