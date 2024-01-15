import "./App.css";
import { useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./LifeSycle";

function App() {
  // DiaryList와 DiaryEditor에서 사용할 공통 데이터
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // 새로작성하는 데이터를 받는 함수
  const onCreate = ({ author, content, emotion }) => {
    const created_date = new Date().getTime();

    // 받아온 값을 저장해주기
    const newData = {
      id: dataId.current, //현재 값
      author,
      content,
      emotion,
      created_date,
    };

    dataId.current += 1;
    // 새로운 데이터를 앞으로 넣어줘야하기때문에 앞에 newData를 앞으로
    setData([newData, ...data]);
  };

  // 데이터를 삭제하는 함수
  const onRemove = (id) => {
    const newList = data.filter((item) => item.id !== id);

    setData(newList);
  };

  const onEdit = (id, newContent) => {
    // 수정 대상의 id를 찾아서 맞을 경우 content변경, 아닐경우 기존 아이템으로 추가
    setData(
      // 새로운 배열을 setData해주기
      data.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  /*
  데이터를 넘길때 스프레드 연산자로 보내는 것도 가능. 
  스프레드 연산자를 사용해서 props를 넘기고 싶으면 무조건 key : value 형식이어야함
  ** object(객체)를 펼쳐서 prop로 넘기고 싶을때 가능하다! -> 그래서 전개 연산자 **
  why? 
  props는 key: value 형식으로 넘어가게 됨
  ex) 
    diaryList={data}는 받을 때  
    const test = ({diaryList}) {} 해야
    데이터가 [{},{}] 이런식으로 출력됨
    const test = (diaryList) {} 로 할 경우에는
    {diaryList : [{},{}]} 이런식으로 받아와져 버림
  
    그래서 여러개의 props를 한번에 object 넘기고 싶을 때, {...변수명}을 사용해서
    const test = ({변수명1, 변수명2, 변수명3}) 이런식으로 받을 수 있게 해줌 

    즉, props를 간결하게 넘길때 용이하다!

    - 스프레드 연산자 사용 o
  const data = {name : 1, content : 2}
  <h1 {...data} />

  - 스프레드 연산자 사용 x
  <h1 name={1} content={2}/>
*/

  return (
    // 다이어리 에디터를 만들기
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
