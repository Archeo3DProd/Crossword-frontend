import { isGridComplete } from '../validation';
import { describe, it, expect } from 'vitest';
import { verifyGrid } from '../validation';

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


describe('verifyGrid', () => {
  const grid = [
    [
      { cellId: '1-0', letter: 'H' },
      { cellId: '1-1', letter: 'E' },
      { cellId: '1-2', letter: 'Y' },
    ]
  ];

  it('should return true for all correct letters', () => {
    const userInput = {
      '1-0': 'H',
      '1-1': 'E',
      '1-2': 'Y',
    };

    const { result, errors } = verifyGrid(grid, userInput);

    expect(result).toEqual({
      '1-0': true,
      '1-1': true,
      '1-2': true,
    });

    expect(errors).toBe(0);
  });

  it('should return false for incorrect letters', () => {
    const userInput = {
      '1-0': 'H',
      '1-1': 'X',  // erreur ici
      '1-2': 'Y',
    };

    const { result, errors } = verifyGrid(grid, userInput);

    expect(result).toEqual({
      '1-0': true,
      '1-1': false,
      '1-2': true,
    });

    expect(errors).toBe(1);
  });

  it('should be case-insensitive', () => {
    const userInput = {
      '1-0': 'h',
      '1-1': 'e',
      '1-2': 'y',
    };

    const { result, errors } = verifyGrid(grid, userInput);

    expect(result).toEqual({
      '1-0': true,
      '1-1': true,
      '1-2': true,
    });

    expect(errors).toBe(0);
  });
});