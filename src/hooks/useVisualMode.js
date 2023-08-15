import { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prevHistory => {
      const updatedHistory = replace ? [...prevHistory.slice(0, -1), newMode] : [...prevHistory, newMode];
      return updatedHistory;
    });
  }

  function back() {
    if (history.length > 1) {
      const previousMode = history[history.length - 2];
      setMode(previousMode);
      setHistory(prevHistory => prevHistory.slice(0, -1));
    } else {
      setMode(initial);
      setHistory([initial]);
    }
  }


  return {
    mode,
    transition,
    back
  };
}

export { useVisualMode };
