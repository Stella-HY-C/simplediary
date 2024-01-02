import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "하또",
    content: "h2",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "하",
    content: "h21",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "호호",
    content: "h23",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "의잉",
    content: "h24",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    // 다이어리 에디터를 만들기
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
