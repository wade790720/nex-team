/**
 * 判斷有向圖是否為單一環（cycle）
 * 
 * @param A 起點陣列，A[K] 表示第 K 條邊的起點
 * @param B 終點陣列，B[K] 表示第 K 條邊的終點
 * @returns 若圖為單一 cycle 則返回 true，否則返回 false
 * 
 * 定義：若可從某一點出發，走訪所有其他節點一次，最後回到起點，則此圖是一個 cycle
 */
export function solution(A: number[], B: number[]): boolean {
  const n = A.length;
  
  // 邊數必須等於頂點數
  if (n === 0) return false;
  
  // 找出實際的頂點範圍
  const vertices = new Set<number>();
  for (let i = 0; i < n; i++) {
    vertices.add(A[i]);
    vertices.add(B[i]);
  }
  
  const numVertices = vertices.size;
  
  // 邊數必須等於頂點數
  if (n !== numVertices) return false;
  
  // 檢查每個頂點的出度和入度
  const outDegree = new Map<number, number>();
  const inDegree = new Map<number, number>();
  
  // 建立鄰接表（每個節點只能有一條出邊）
  const nextNode = new Map<number, number>();
  
  for (let i = 0; i < n; i++) {
    const from = A[i];
    const to = B[i];
    
    // 計算出度
    outDegree.set(from, (outDegree.get(from) || 0) + 1);
    
    // 計算入度
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
    
    // 如果已經有出邊，則不是單一環（每個節點只能有一條出邊）
    if (nextNode.has(from)) {
      return false;
    }
    nextNode.set(from, to);
  }
  
  // 檢查每個頂點的出度和入度都必須為 1
  for (const vertex of Array.from(vertices)) {
    if (outDegree.get(vertex) !== 1 || inDegree.get(vertex) !== 1) {
      return false;
    }
  }
  
  // 從任意節點開始追蹤，檢查是否能走訪所有節點並回到起點
  const startNode = Array.from(vertices)[0];
  const visited = new Set<number>();
  let current = startNode;
  let count = 0;
  
  // 追蹤路徑
  while (count < numVertices) {
    // 如果已經訪問過這個節點，表示有重複訪問（不是單一環）
    if (visited.has(current)) {
      return false;
    }
    
    visited.add(current);
    count++;
    
    // 如果沒有下一條邊，則不是環
    if (!nextNode.has(current)) {
      return false;
    }
    
    current = nextNode.get(current)!;
  }
  
  // 訪問了所有節點後，必須回到起點
  return current === startNode;
}

