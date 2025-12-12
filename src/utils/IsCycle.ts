/**
 * 判斷有向圖是否為單一環（cycle）
 * 
 * @param A 起點陣列，A[K] 表示第 K 條邊的起點
 * @param B 終點陣列，B[K] 表示第 K 條邊的終點
 * @returns 若圖為單一 cycle 則返回 true，否則返回 false
 * 
 */

export function isCycle(A: number[], B: number[]): boolean {
  const n = A.length;
  if (n === 0) return false;
  if (n !== B.length) return false;

  // 收集頂點、建立 next、計算入度
  const vertices = new Set<number>();
  const nextNode = new Map<number, number>();
  const inDegree = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    const from = A[i];
    const to = B[i];

    vertices.add(from);
    vertices.add(to);

    // out-degree 必須為 1：同一個 from 不能出現第二條出邊
    if (nextNode.has(from)) return false;
    nextNode.set(from, to);

    // in-degree 計數
    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }

  const vCount = vertices.size;

  // 單一環必須：邊數 = 頂點數
  if (n !== vCount) return false;

  // 每個頂點都必須 in-degree = 1；且 out-degree = 1
  // 同時也確保 nextNode 對每個頂點都有對應（否則 out-degree 會是 0）
  for (const v of Array.from(vertices)) {
    if (inDegree.get(v) !== 1) return false;
    if (!nextNode.has(v)) return false;
  }

  // 檢查是否為單一連通環：沿 next 走訪 vCount 步，必須不重複且回到起點
  const startNode = vertices.values().next().value as number;
  const visited = new Set<number>();

  let current = startNode;
  for (let step = 0; step < vCount; step++) {
    if (visited.has(current)) return false;
    visited.add(current);

    const nxt = nextNode.get(current);
    if (nxt === undefined) return false; 
    current = nxt;
  }

  return current === startNode;
}
