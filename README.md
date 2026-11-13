# monotonic-stack-tools

Two linear-time array queries built on a monotonic stack: `nextGreaterElement(nums)` returns, for each position, the index of the next strictly greater element to its right (or `-1`), and `slidingWindowMax(nums, k)` returns the maximum of every contiguous window of length `k`.

```js
import { nextGreaterElement, slidingWindowMax } from './src/index.js';

nextGreaterElement([2, 1, 2, 4, 3]);
// [3, 2, 3, -1, -1]

slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3);
// [3, 3, 5, 5, 6, 7]
```

## Why this exists

Both problems look like they want nested loops: for each element scan rightward until something bigger shows up, or for each window scan its `k` elements. That is O(n·k). The monotonic stack replaces the inner scan with amortised O(1) work per element, because each index is pushed once and popped at most once. The trade-off is memory: we keep an explicit index stack (and, for the window case, a deque) of up to `n` entries. For the sizes where the quadratic version actually hurts, that is a good trade.

There is no clever trick beyond that. The stack stores indices rather than values because both algorithms need to write a result back to a position — the value alone does not tell you where it came from.

## The awkward edge

`slidingWindowMax` returns `[]` when `k <= 0` or `k > nums.length`, rather than throwing or returning a single `NaN`. This is deliberate: streaming callers routinely see the first few elements before enough data has arrived for a window, and an empty result composes cleanly with `for...of`. If you would rather have an error, check `k` at the call site.

Non-integer `k` is rejected with a `TypeError`; a fractional window length has no sensible meaning here. Non-array inputs to either function also throw `TypeError`.

## Exports

- `nextGreaterElement(nums: number[]): number[]`
- `slidingWindowMax(nums: number[], k: number): number[]`

Both are re-exported from `src/index.js`; the implementations live in `src/core.js`.
