import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// cleans the dom after each test case
afterEach(() => {
  cleanup();
});
