interface LcCounterProps {
  count: number;
  setCount: (count: number) => void;
}

export function LcCounter({ count, setCount }: LcCounterProps) {
  const decrement = () => count > 0 && setCount(count - 1);
  const increment = () => setCount(count + 1);
  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        className="bg-red-800 text-white p-1 rounded"
        style={{ lineHeight: "0.7rem" }}
        onClick={decrement}
      >
        -
      </button>
      <span>{count}</span>
      <button
        className="bg-green-800 text-white p-1 rounded"
        style={{ lineHeight: "0.7rem" }}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
