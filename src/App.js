// useReducer와 contextAPI(provider)를 사용하는 App.js
import "./App.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// state : state의 초기값 혹은 변경된 값
// action : dispatch로 넘겨받은 값
const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      return action.data;
    case "create":
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
      break;
    case "remove":
      return state.filter((item) => item.id !== action.targetId);
      break;
    case "edit":
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
      break;
    default:
      return state;
  }
};

// Context API - provider사용하기
// 이 context도 내보내줘야한다 -> 그래야 다른 컴포넌트들이 접근해서 데이터를 사용을 할 수 있어서
export const DiaryStateContext = React.createContext();

const App = () => {
  // DiaryList와 DiaryEditor에서 사용할 공통 데이터
  // useState -> useReducer로 변경하기
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  // 비동기로 값 가져오기
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((item) => {
      return {
        id: item.id,
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
      };
    });

    // useState -> useReducer로 변경하기
    // setData(initData);
    dispatch({ type: "init", data: initData });
  };

  // mount시에 실행
  useEffect(() => {
    getData();
  }, []);

  // 새로작성하는 데이터를 받는 함수
  const onCreate = useCallback(({ author, content, emotion }) => {
    // const created_date = new Date().getTime();

    // // 받아온 값을 저장해주기
    // const newData = {
    //   id: dataId.current, //현재 값
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    // };
    // dataId.current += 1;
    // 새로운 데이터를 앞으로 넣어줘야하기때문에 앞에 newData를 앞으로
    // setData((data) => [newData, ...data]);

    // useState -> useReducer로 변경하기
    dispatch({
      type: "create",
      data: {
        id: dataId.current, //현재 값
        author,
        content,
        emotion,
      },
    });

    dataId.current += 1;
  }, []);

  // 데이터를 삭제하는 함수
  const onRemove = useCallback((id) => {
    // const newList = data.filter((item) => item.id !== id);

    // useCallback사용 때문에 변경함.
    // setData부분에 최신 state가 전달이 되어야 하기때문에 기존 state의 data가 아닌 전달받은 최신의 data를 사용해야한다.
    // setData((data) => data.filter((item) => item.id !== id));

    // useState -> useReducer로 변경하기
    dispatch({ type: "remove", targetId: id });
  }, []);

  const onEdit = useCallback((id, newContent) => {
    // 수정 대상의 id를 찾아서 맞을 경우 content변경, 아닐경우 기존 아이템으로 추가
    // setData(
    //   // 새로운 배열을 setData해주기
    //   data.map((item) =>
    //     item.id === id ? { ...item, content: newContent } : item
    //   )
    // );

    // setData((data) =>
    //   // 새로운 배열을 setData해주기 -> 마찬가지로 useCallback을 사용해서 최신의 state data값을 받기 위해 수정
    //   // 이렇게 하면 삭제나 수정하기 누르면 state가 변경이 되서 모든 다이어리 아이템이 리랜더링 됐는데 현재는 그렇게 되지 않음
    //   data.map((item) =>
    //     item.id === id ? { ...item, content: newContent } : item
    //   )
    // );

    // useState -> useReducer로 변경하기
    dispatch({ type: "edit", targetId: id, newContent: newContent });
  }, []);

  const getDiraryAnalysis = useMemo(() => {
    /**
     * Memoization
     * 일기에 넣는 감정을 가지고 일기리스트 중 감정의 비율을 알아보는 함수를 만들기
     * 기존데이터가 변하지 않을 때, 리랜더링이 될 경우 연산을 계속하게 되면 비효율적, 그럴때 사용하는것이 useMemo(callback함수, 배열)
     * 여기서 배열은 useEffect와 같은역할(useEffect도 update의 경우 배열내의 값이 변하면 실행하게 됨) -> 현재 data.length를 넣어 data.length가 변하면 callback함수를 실행하게 한다.
     */
    // console.log("일기 분석 시작");

    // 기분좋은 일기 갯수
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    // 기분 안좋은 일기 갯수
    const badCount = data.length - goodCount;
    // 기분좋은 일기의 비율
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiraryAnalysis;

  return (
    // 다이어리 에디터를 만들기
    // context provider 사용하기 -> 넘기고 싶은 데이터를 넘기기(여기서는 data state)
    <DiaryStateContext.Provider value={data}>
      <div className="App">
        <DiaryEditor onCreate={onCreate} />
        <div>전체 일기 갯수 : {data.length}</div>
        <div>기분 좋은 일기 갯수 : {goodCount}</div>
        <div>기분 안좋은 일기 갯수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
      </div>
    </DiaryStateContext.Provider>
  );
};

export default App;
