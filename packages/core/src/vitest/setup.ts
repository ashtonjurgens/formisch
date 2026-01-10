import { beforeEach } from 'vitest';
import { mockFramework, resetIdCounter } from './mock.ts';

// Mock framework globally for all tests
mockFramework();

// Reset ID counter before each test
beforeEach(() => {
  resetIdCounter();
});
