// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// 抑制 ReactDOMTestUtils.act 的棄用警告
// 這個警告來自於 @testing-library/react 的內部實現
// 會在未來版本中修復
const originalError = console.error;
console.error = (...args: any[]) => {
  // 檢查所有參數中是否包含棄用警告（匹配多種格式）
  const hasDeprecationWarning = args.some(
    (arg) => {
      if (typeof arg !== 'string') return false;
      // 匹配多種可能的警告訊息格式
      return arg.includes('ReactDOMTestUtils.act') && 
             (arg.includes('deprecated') || arg.includes('is deprecated'));
    }
  );
  if (hasDeprecationWarning) {
    return;
  }
  originalError(...args);
};
