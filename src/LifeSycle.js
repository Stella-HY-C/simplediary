import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  //   const [count, setCount] = useState(0);
  //   const [text, setText] = useState("");

  //   // 1. Mount시점에서 제어하기 -> Depth부분에 빈배열로 넘겨주기
  //   useEffect(() => {
  //     console.log("mount!");
  //   }, []);

  //   // 2. Update시점에 제어 (state변경 시점) -> Depth부분에 아무것도 넣지 않기
  //   // 이거는 모든 state가 변경되면 실행됨
  //   useEffect(() => {
  //     console.log("update!");
  //   });

  //   // 2-1. 이런방식으로도 가능함
  //   // Depth 배열에 넣어주는 값들이 변경됐을때 해당 useEffect만 호출됨
  //   useEffect(() => {
  //     console.log(`count is update : ${count}`);
  //     if (count > 5) {
  //       alert("경고!");
  //       setCount(1);
  //     }
  //   }, [count]);

  //   useEffect(() => {
  //     console.log(`text is update : ${text}`);
  //   }, [text]);

  //   return (
  //     <div style={{ padding: 20 }}>
  //       <div>
  //         {count}
  //         <button
  //           onClick={() => {
  //             setCount(count + 1);
  //           }}
  //         >
  //           +
  //         </button>
  //       </div>
  //       <div>
  //         <input value={text} onChange={(e) => setText(e.target.value)} />
  //       </div>
  //     </div>
  //   );

  // 3. unMount시점에 제어
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {/* isVisibale이 TRUE면 UnmounteTest가 랜더링 -> 단락회로평가 */}
      {isVisible && <UnmountTest />}
    </div>
  );
};

// 3-1. 자식컴포넌트
const UnmountTest = () => {
  useEffect(() => {
    console.log("mount!");

    return () => {
      // 3-2. mount callback내에서 return callback함수를 사용하면 unmount 시점에만 실행됨
      console.log("unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

export default Lifecycle;
