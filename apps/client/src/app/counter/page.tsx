'use client'

import { useCounterStore } from '@/store/useCounterStore'

const Counter = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xl">Count: {count}</p>
      <div className="flex gap-2">
        <button onClick={increment} className="btn">
          +
        </button>
        <button onClick={decrement} className="btn">
          -
        </button>
        <button onClick={reset} className="btn">
          Reset
        </button>
      </div>
    </div>
  )
}

export default Counter
