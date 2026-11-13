// Monotonic stack utilities: next-greater-element and sliding-window maximum.
//
// The stack holds indices, not values, because both algorithms need to know
// where an element lives in order to assign a result to that position (NGE)
// or to evict an element once it falls out of the window (SWM). Storing only
// values would force a second scan to recover positions.

/**
 * For each element, returns the index of the next element strictly greater
 * than it, or -1 if none exists to the right.
 *
 * Runs in O(n) time and O(n) space. The stack is kept strictly decreasing
 * in value; a new element pops every smaller-or-equal top, which is exactly
 * the set of positions whose next greater element it is.
 *
 * @param {number[]} nums
 * @returns {number[]} indices into `nums`, or -1
 */
export function nextGreaterElement(nums) {
  if (!Array.isArray(nums)) {
    throw new TypeError('nextGreaterElement expects an array');
  }
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < n; i++) {
    const v = nums[i];
    while (stack.length > 0 && nums[stack[stack.length - 1]] < v) {
      result[stack.pop()] = i;
    }
    stack.push(i);
  }
  return result;
}

/**
 * Returns the maximum of every contiguous window of length `k`.
 *
 * The deque holds indices whose values are strictly decreasing from front to
 * back. The front is always the maximum of the current window. Indices are
 * evicted from the back when a newer, larger-or-equal value arrives, and from
 * the front when they slide out of range.
 *
 * A window length that cannot fit in the array (k <= 0 or k > n) yields an
 * empty array rather than throwing: callers that iterate over a stream often
 * hit this case on the first few elements and an empty result is the natural
 * answer.
 *
 * @param {number[]} nums
 * @param {number} k window length
 * @returns {number[]}
 */
export function slidingWindowMax(nums, k) {
  if (!Array.isArray(nums)) {
    throw new TypeError('slidingWindowMax expects an array');
  }
  if (!Number.isInteger(k)) {
    throw new TypeError('slidingWindowMax expects an integer window length');
  }
  const n = nums.length;
  if (k <= 0 || k > n) {
    return [];
  }
  const result = new Array(n - k + 1);
  // head/tail indices into a plain array avoid Array.prototype.shift(), which
  // is O(n) and would make the whole algorithm quadratic on large inputs.
  const deque = [];
  let head = 0;
  let tail = 0;
  for (let i = 0; i < n; i++) {
    const v = nums[i];
    while (tail > head && nums[deque[tail - 1]] <= v) {
      tail--;
    }
    deque[tail++] = i;
    if (deque[head] <= i - k) {
      head++;
    }
    if (i >= k - 1) {
      result[i - k + 1] = nums[deque[head]];
    }
  }
  return result;
}
