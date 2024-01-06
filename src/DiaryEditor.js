import { useRef, useState } from "react";

const DiaryEditor = () => {
  // 속성이 비슷한 state를 굳이 2개로 나누지 않고 하나로 합칠 수 있다.
  //   const [author, setAuthor] = useState("");
  //   const [content, setContent] = useState("");

  //   const inputAuhor = (e) => {
  //     setAuthor(e.target.value);
  //   };

  //   const inputContent = (e) => {
  //     setContent(e.target.value);
  //   };

  //   return (
  //     <div className="DiaryEditor">
  //       <h2>오늘의 일기</h2>
  //       <div>
  //         <input type="text" value={author} onChange={inputAuhor} />
  //       </div>
  //       <div>
  //         <textarea
  //           name=""
  //           id=""
  //           cols="30"
  //           rows="10"
  //           value={content}
  //           onChange={inputContent}
  //         />
  //       </div>
  //       <div></div>
  //     </div>
  //   );

  // 이런식으로 객체 형식으로 지정가능 - 비구조화 할당 + useState 객체방식
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  // useState에 프로퍼티가 길어지면 모든 객체를 다 넣을 수 없기때문에 스프레드로 기존꺼를 할당하면 된다
  // >> 바뀌는 값들만 변경되게 하기
  // 무조건 스프레드를 앞에....(기존꺼를 먼저 넣는다) why? 순서대로 업데이트가 되기때문
  const changeState = (e) => {
    // 이런방식도 있지만
    // e.target.name === "author"
    //   ? setState({ ...state, author: e.target.value })
    //   : setState({ ...state, content: e.target.value });

    // key와 name이 같기때문에 key로 직접 넣어줘도 된다
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 엘리먼트에 접근하기 위해서 useRef사용한다
  // 그리고 변수명을 원하는 엘리먼트에 ref = {authorInput}으로 추가를 한다
  const authorInput = useRef();
  const contentInput = useRef();

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //   alert("작성자는 최소 1글자 이상 입력해주세요.");
      // focus주기
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      //   alert("일기 본문은 최소 5글자 이상 입력해주세요.");
      // focus주기
      contentInput.current.focus();
      return;
    }

    alert("저장완료");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          type="text"
          name="author"
          value={state.author}
          ref={authorInput}
          onChange={changeState}
        />
      </div>
      <div>
        <textarea
          name="content"
          ref={contentInput}
          value={state.content}
          onChange={changeState}
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select name="emotion" value={state.emotion} onChange={changeState}>
          <option value={1} default>
            1
          </option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
