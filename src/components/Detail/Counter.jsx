export default function Counter({count,decrementCount,incrementCount}) {
  return (
    <div className=" sm:w-[80px] sm:h-10 w-[50px] h-[100px] flex flex-col-reverse sm:flex-row justify-between items-center sm:border-1 sm:border-colorGoldSecundary-500">
      <button className="flex items-center justify-center sm:w-[20px] w-full font-semibold border-1 border-colorGoldSecundary-500 sm:border-0" onClick={decrementCount}>-</button>
      <div>{count}</div>
      <button className="flex flex-col items-center justify-center sm:w-[20px] w-full font-semibold border-1 border-colorGoldSecundary-500 sm:border-0" onClick={incrementCount}>+</button>
    </div>
  );
}
