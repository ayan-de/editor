import { TWEAKCN_THEMES, isTweakCNTheme } from '../types/tweakcn-themes';
import {
  applyTheme,
  applyTweakCNTheme,
  toggleTweakCNDarkMode,
} from '../lib/theme-utils';

// Test function to verify theme system
export function testThemeSystem() {
  console.log('Testing TweakCN Theme System...');

  // Test 1: Check if themes are properly defined
  console.log('Available TweakCN themes:', Object.keys(TWEAKCN_THEMES));

  // Test 2: Check theme detection
  console.log(
    'Is "peach-blossom" a TweakCN theme?',
    isTweakCNTheme('peach-blossom')
  );
  console.log('Is "vs-dark" a TweakCN theme?', isTweakCNTheme('vs-dark'));

  // Test 3: Apply a theme (only works in browser environment)
  if (typeof document !== 'undefined') {
    console.log('Applying Peach Blossom theme...');
    applyTweakCNTheme('peach-blossom');

    setTimeout(() => {
      console.log('Toggling dark mode...');
      toggleTweakCNDarkMode('peach-blossom');
    }, 2000);

    setTimeout(() => {
      console.log('Applying Candy Pink theme...');
      applyTweakCNTheme('candy-pink');
    }, 4000);
  }

  console.log('Theme system test completed!');
}

// Export for manual testing
if (typeof window !== 'undefined') {
  (window as any).testThemeSystem = testThemeSystem;
}
