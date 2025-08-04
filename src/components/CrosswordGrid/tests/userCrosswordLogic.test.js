import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCrosswordLogic } from '../useCrosswordLogic';

describe('useCrosswordLogic', () => {
  const mockWords = [
    {
      id: 1,
      word: 'REACT',
      row: 0,
      col: 0,
      direction: 'across',
    },
    {
      id: 2,
      word: 'API',
      row: 0,
      col: 2,
      direction: 'down',
    },
  ];

  it('should create a grid of correct size', () => {
    const { result } = renderHook(() =>
      useCrosswordLogic(mockWords, 5)
    );

    expect(result.current.grid.length).toBe(5);
    expect(result.current.grid[0].length).toBe(5);
  });

  it('should place the words in the grid with correct cellIds and letters', () => {
    const { result } = renderHook(() =>
      useCrosswordLogic(mockWords, 5)
    );

    const grid = result.current.grid;

    expect(grid[0][0].letter).toBe('R');
    expect(grid[0][1].letter).toBe('E');
    expect(grid[0][2].letter).toBe('A'); // REACT → R E A C T
    expect(grid[1][2].letter).toBe('P'); // API vertical ↓
    expect(grid[2][2].letter).toBe('I');

    expect(grid[0][0].cellId).toBe('1-0');
    expect(grid[0][2].letter).toBe('A');
    expect(grid[1][2].cellId).toBe('2-1');
  });

  it('should initialize empty userInput and validationMap', () => {
    const { result } = renderHook(() =>
      useCrosswordLogic(mockWords, 5)
    );

    expect(result.current.userInput).toEqual({});
    expect(result.current.validationMap).toEqual({});
  });

  it('should generate correct cellToWordMap', () => {
    const { result } = renderHook(() =>
      useCrosswordLogic(mockWords, 5)
    );

    const map = result.current.cellToWordMap;

    expect(map.get('1-0')).toMatchObject({ wordId: 1, direction: 'across', index: 0 });
    expect(map.get('2-1')).toMatchObject({ wordId: 2, direction: 'down', index: 1 });
  });
});
