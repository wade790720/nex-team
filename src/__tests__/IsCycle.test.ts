import { solution } from '../utils/IsCycle';

// 測試所有圖片中的例子
describe('IsCycle 測試', () => {
  test('例子 1: A = [1, 3, 2, 4], B = [4, 1, 3, 2] → true (單一環)', () => {
    const A = [1, 3, 2, 4];
    const B = [4, 1, 3, 2];
    expect(solution(A, B)).toBe(true);
  });

  test('例子 2: A = [1, 2, 3, 4], B = [2, 1, 4, 3] → false (兩個分離的環)', () => {
    const A = [1, 2, 3, 4];
    const B = [2, 1, 4, 3];
    expect(solution(A, B)).toBe(false);
  });

  test('例子 3: A = [3, 1, 2], B = [2, 3, 1] → true', () => {
    const A = [3, 1, 2];
    const B = [2, 3, 1];
    expect(solution(A, B)).toBe(true);
  });

  test('例子 4: A = [1, 2, 1], B = [2, 3, 3] → false (頂點1有兩條出邊)', () => {
    const A = [1, 2, 1];
    const B = [2, 3, 3];
    expect(solution(A, B)).toBe(false);
  });

  test('例子 5: A = [1, 2, 3, 4], B = [2, 1, 4, 4] → false (自環和分離組件)', () => {
    const A = [1, 2, 3, 4];
    const B = [2, 1, 4, 4];
    expect(solution(A, B)).toBe(false);
  });

  test('例子 6: A = [1, 2, 2, 3, 3], B = [2, 3, 3, 4, 5] → false (頂點2和3有多條出邊)', () => {
    const A = [1, 2, 2, 3, 3];
    const B = [2, 3, 3, 4, 5];
    expect(solution(A, B)).toBe(false);
  });

  test('邊界情況: 空陣列 → false', () => {
    expect(solution([], [])).toBe(false);
  });

  test('單一頂點自環: A = [1], B = [1] → true', () => {
    const A = [1];
    const B = [1];
    expect(solution(A, B)).toBe(true);
  });
});

