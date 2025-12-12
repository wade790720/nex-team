import { useState, useEffect, useRef } from 'react';

/**
 * RunningClock 元件 - 倒數計時器
 * 
 * 功能：
 * - 設定初始時間（分鐘和秒數）
 * - 開始倒數
 * - 暫停與恢復
 * - 重置計時器
 */
function RunningClock(): JSX.Element {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [displayTime, setDisplayTime] = useState<number>(0); // 總秒數
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(0); // 記錄初始時間，用於重新開始
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false); // 控制 input 是否 disabled
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimeRef = useRef<number>(0);

  /**
   * 格式化時間為 mm:ss
   */
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  /**
   * 清除計時器
   */
  const clearTimer = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 同步 displayTimeRef
  useEffect(() => {
    displayTimeRef.current = displayTime;
  }, [displayTime]);

  /**
   * 開始倒數
   * 當 isRunning 或 isPaused 改變時，啟動或停止計時器
   */
  useEffect(() => {
    // 清除現有的計時器
    clearTimer();

    // 只有在運行中、未暫停、且時間大於 0 時才啟動計時器
    if (isRunning && !isPaused && displayTimeRef.current > 0) {
      intervalRef.current = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev <= 1) {
            // 倒數結束
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // 清理函數
    return () => {
      clearTimer();
    };
  }, [isRunning, isPaused]);

  /**
   * 處理 START 按鈕點擊
   * 讀取 input 轉成總秒數，開始倒數
   * 如果正在倒數或暫停，使用一開始輸入的時間重新開始
   */
  const handleStart = (): void => {
    let totalSeconds: number;
    
    // 如果正在倒數或暫停，使用初始時間重新開始
    if (isRunning || isPaused) {
      totalSeconds = initialTime;
    } else {
      // 第一次開始，使用當前 input 值
      totalSeconds = minutes * 60 + seconds;
      setInitialTime(totalSeconds); // 記錄初始時間
    }

    if (totalSeconds <= 0) {
      return; // 如果時間為 0，不執行任何操作
    }

    setDisplayTime(totalSeconds);
    setIsRunning(true);
    setIsPaused(false);
    setIsInputDisabled(true); // 按下 START 時，disabled input
  };

  /**
   * 處理 PAUSE / RESUME 按鈕點擊
   */
  const handlePauseResume = (): void => {
    if (!isRunning && displayTime === 0) {
      return; // 如果還沒開始或已結束，不執行
    }

    if (isPaused) {
      // 恢復
      setIsPaused(false);
      setIsRunning(true);
    } else {
      // 暫停
      setIsPaused(true);
      setIsRunning(false);
    }
  };

  /**
   * 處理 RESET 按鈕點擊
   * 清空 inputs 和顯示時間，並重新啟用 input
   */
  const handleReset = (): void => {
    clearTimer();
    setMinutes(0);
    setSeconds(0);
    setDisplayTime(0);
    setIsRunning(false);
    setIsPaused(false);
    setInitialTime(0);
    setIsInputDisabled(false); // 按下 RESET 時，重新啟用 input
  };

  return (
    <div>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value) || 0)}
          disabled={isInputDisabled}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value) || 0)}
          disabled={isInputDisabled}
        />
        Seconds
      </label>
      <button onClick={handleStart}>START</button>
      <button onClick={handlePauseResume}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>
      <h1 data-testid="running-clock">{formatTime(displayTime)}</h1>
    </div>
  );
}

export default RunningClock;

