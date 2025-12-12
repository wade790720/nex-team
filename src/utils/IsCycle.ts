/**
 * 判斷有向圖是否為單一環（cycle）
 * 
 * @param A 起點陣列，A[K] 表示第 K 條邊的起點
 * @param B 終點陣列，B[K] 表示第 K 條邊的終點
 * @returns 若圖為單一 cycle 則返回 true，否則返回 false
 * 
 */

export function isCycle(A: number[], B: number[]): boolean {
  // 邊界檢查
  const n = A.length;
  if (n === 0) return false;
  
  // 建立鄰接表並檢查出度
  const nextNode = new Map<number, number>();
  for (let i = 0; i < n; i++) {
    if (nextNode.has(A[i])) return false;
    nextNode.set(A[i], B[i]);
  }
  
  // 檢查邊數是否等於頂點數
  if (n !== nextNode.size) return false;
  
  // 追蹤路徑檢查連通性
  const startNode = nextNode.keys().next().value;
  if (startNode === undefined) return false;
  
  const visited = new Set<number>();
  let current = startNode;
  
  for (let i = 0; i < nextNode.size; i++) {
    if (visited.has(current)) return false;
    visited.add(current);
    
    const next = nextNode.get(current);
    if (next === undefined) return false;
    current = next;
  }
  
  return current === startNode;
}
