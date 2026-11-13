import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextGreaterElement, slidingWindowMax } from '../src/index.js';

test('nextGreaterElement finds the next strictly greater index', () => {
  assert.deepEqual(nextGreaterElement([2, 1, 2, 4, 3]), [3, 2, 3, -1, -1]);
});

test('nextGreaterElement returns all -1 for a non-increasing array', () => {
  assert.deepEqual(nextGreaterElement([5, 4, 3, 2, 1]), [-1, -1, -1, -1, -1]);
});

test('nextGreaterElement returns all -1 for equal elements', () => {
  assert.deepEqual(nextGreaterElement([7, 7, 7]), [-1, -1, -1]);
});

test('nextGreaterElement handles an empty array', () => {
  assert.deepEqual(nextGreaterElement([]), []);
});

test('nextGreaterElement handles a single element', () => {
  assert.deepEqual(nextGreaterElement([42]), [-1]);
});

test('nextGreaterElement rejects non-arrays', () => {
  assert.throws(() => nextGreaterElement('nope'), TypeError);
});

test('slidingWindowMax on the classic example', () => {
  assert.deepEqual(slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]);
});

test('slidingWindowMax with window equal to array length', () => {
  assert.deepEqual(slidingWindowMax([4, 2, 9], 3), [9]);
});

test('slidingWindowMax with window of one returns the array itself', () => {
  assert.deepEqual(slidingWindowMax([4, 2, 9], 1), [4, 2, 9]);
});

test('slidingWindowMax returns empty for a window larger than the array', () => {
  assert.deepEqual(slidingWindowMax([1, 2], 5), []);
});

test('slidingWindowMax returns empty for a non-positive window', () => {
  assert.deepEqual(slidingWindowMax([1, 2, 3], 0), []);
  assert.deepEqual(slidingWindowMax([1, 2, 3], -2), []);
});

test('slidingWindowMax handles duplicate values', () => {
  assert.deepEqual(slidingWindowMax([2, 2, 2, 2], 2), [2, 2, 2]);
});

test('slidingWindowMax handles a strictly decreasing array', () => {
  assert.deepEqual(slidingWindowMax([5, 4, 3, 2, 1], 2), [5, 4, 3, 2]);
});

test('slidingWindowMax rejects a non-integer window', () => {
  assert.throws(() => slidingWindowMax([1, 2, 3], 1.5), TypeError);
});

test('slidingWindowMax rejects non-arrays', () => {
  assert.throws(() => slidingWindowMax(null, 2), TypeError);
});
