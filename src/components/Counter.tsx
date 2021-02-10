import React, { useState } from "react";

interface Props {
  children: (data: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  }) => JSX.Element | null;
}

const Counter: React.FC<Props> = ({ children }) => {
  const [count, setCount] = useState(0);

  return <div>{children({ count, setCount })}</div>;
};

export default Counter;

// import React, { useState } from "react";

// interface Props {
//   children: (data: {
//     count: number;
//     setCount: React.Dispatch<React.SetStateAction<number>>;
//   }) => JSX.Element | null;
// }

// const Counter: React.FC<{}> = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <div>
//         {count}
//         <button onClick={() => setCount(count + 1)}>+</button>
//         <button onClick={() => setCount(count - 1)}>-</button>
//       </div>
//     </div>
//   );
// };

// export default Counter;