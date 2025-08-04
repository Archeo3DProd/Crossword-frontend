import { isGridComplete } from '../validation';
import { describe, it, expect } from 'vitest';

describe('isGridComplete', () => {
  it('should return false if validationMap is empty', () => {
    expect(isGridComplete({})).toBe(false);
  });

  it('should return false if a cell is incorrect', () => {
    expect(isGridComplete({ a: true, b: false })).toBe(false);
  });

  it('should return true if all cells are correct', () => {
    expect(isGridComplete({ a: true, b: true })).toBe(true);
  });
});
