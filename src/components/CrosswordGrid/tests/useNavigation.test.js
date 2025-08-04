import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNavigation } from '../useNavigation';

describe('useNavigation', () => {
  const cellToWordMap = new Map([
    ['1-0', { direction: 'across', index: 0, wordId: 1 }],
    ['1-1', { direction: 'across', index: 1, wordId: 1 }],
  ]);

  const mockGrid = [
    [
      { cellId: '1-0', letter: 'H' },
      { cellId: '1-1', letter: 'I' },
    ],
  ];

  it('should update input and focus next cell on handleChange', () => {
    const setUserInput = vi.fn();
    const setActiveWordId = vi.fn();

    const { result } = renderHook(() =>
      useNavigation(mockGrid, cellToWordMap, {}, setUserInput, setActiveWordId)
    );

    const fakeRef = { focus: vi.fn() };
    result.current.inputRefs.current['1-1'] = fakeRef;

    result.current.handleChange('1-0', 'H');

    expect(setUserInput).toHaveBeenCalledWith(expect.any(Function));
    expect(fakeRef.focus).toHaveBeenCalled();
  });

  it('should clear input on backspace if cell is not empty', () => {
    const setUserInput = vi.fn();
    const setActiveWordId = vi.fn();
    const userInput = { '1-0': 'H' };

    const { result } = renderHook(() =>
      useNavigation(mockGrid, cellToWordMap, userInput, setUserInput, setActiveWordId)
    );

    const fakeEvent = { key: 'Backspace' };

    result.current.handleKeyDown(fakeEvent, '1-0');

    expect(setUserInput).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should focus previous cell on backspace if current is empty', () => {
    const setUserInput = vi.fn();
    const setActiveWordId = vi.fn();
    const userInput = { '1-0': '', '1-1': '' };

    const { result } = renderHook(() =>
      useNavigation(mockGrid, cellToWordMap, userInput, setUserInput, setActiveWordId)
    );

    const fakeRef = { focus: vi.fn() };
    result.current.inputRefs.current['1-0'] = fakeRef;

    const fakeEvent = { key: 'Backspace' };
    result.current.handleKeyDown(fakeEvent, '1-1');

    expect(setUserInput).toHaveBeenCalledWith(expect.any(Function));
    expect(fakeRef.focus).toHaveBeenCalled();
  });
});
