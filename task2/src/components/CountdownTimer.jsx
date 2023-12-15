import React, { useState, useRef, useEffect } from 'react';

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [counting, setCounting] = useState(false);
  const timerRef = useRef(null);

  const handleStartStop = () => {
    setCounting((prevCounting) => !prevCounting);
  };

  const handleReset = () => {
    setCounting(false);
    clearInterval(timerRef.current);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (counting) {
      timerRef.current = setInterval(() => {
        if (seconds > 0 || minutes > 0) {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        } else {
          clearInterval(timerRef.current);
          setCounting(false);
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [counting, minutes, seconds]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded shadow-lg">
      <div className=" flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="number"
            value={counting?"0":minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
            min="0"
            className="border border-gray-300 px-2 py-1 w-12 focus:outline-none"
          />
          <span className="mx-1">:</span>
          <input
            type="number"
            value={counting?"0":seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
            min="0"
            max="59"
            className="border border-gray-300 px-2 py-1 w-12 focus:outline-none"
          />
        </div>
        <button
          onClick={handleStartStop}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          {counting ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          Reset
        </button>
      </div>
      <div className=' flex justify-center' >
        <p className="text-4xl  pt-4 text-center h-[5rem] rounded-[30%] w-[6rem] bg-rose-600">
        {minutes}:{seconds}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
