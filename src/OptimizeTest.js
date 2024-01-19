import React, { useState, useEffect } from "react";

// const Textview = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log("update::text : ", text);
//   });
//   return <div>{text}</div>;
// });

// const Countview = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log("update::count : ", count);
//   });
//   return <div>{count}</div>;
// });

// const OptimizeTest = () => {
//   const [count, setCount] = useState(1);
//   const [text, setText] = useState("");

//   return (
//     <div style={{ padding: 50 }}>
//       <div>
//         <h2>count</h2>
//         <Countview count={count} />
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <div>
//         <h2>text</h2>
//         <Textview text={text} />
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

///////////////////////////////////////////////////////////////////////////////////
/**
 * 이렇게 만들면 counterA는 값이 변하는것이 아닌 기존값을 계속 넣어주는 것이라 리랜더 x
 * 하지만 counterB는 객체이기 때문이다. js는 기본적으로 객체를 비교할 때 얕은 비교를 함
 * object는 비원시 타입으로 비원시 타입은 값을 비교할 때 값을 비교하는것이 아닌 주소(메모리주소)에 의한 비교를 진행 -> 얕은비교
 * 여기서도 setObj({ count: obj.count });로 주고있는데 이전의 obj에 넣어져있는 객체의 주소와 setObj안에 있는 객체의 주소가 틀리다 -> 객체를 계속 새로 생성해주기 때문
 * 그래서 다른 주소이기 때문에 다른 객체라 판단하여 리랜더링을 진행함
 */
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log("count :: count : ", count);
  });

  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log("obj :: count : ", obj.count);
  });
  return <div>{obj.count}</div>;
};

// 객체를 조건반환에 따라 리랜더링 해주기
const areEqual = (prev, next) => {
  // true -> 이전props와 현재 props가 같다 -> 리랜더링 x
  // false -> 이전props와 현재 props가 틀리다 -> 리랜더링 o
  return prev.obj.count === next.obj.count;
};

// 원하는 컴포넌트를 비교하는 함수 전달하기 (원하는 컴포넌트, 비교함수)
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({ count: 1 });

  /**
   * 똑같은 값을 계속 전달해보기
   */

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>counter A</h2>
        <CounterA count={count} />
        <button
          onClick={() => {
            setCount(count);
          }}
        >
          A button
        </button>
      </div>
      <div>
        <h2>counter B</h2>
        {/* <CounterB obj={obj} /> */}
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() => {
            setObj({ count: obj.count });
          }}
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
