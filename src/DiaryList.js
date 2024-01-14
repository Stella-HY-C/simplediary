import DiaryItem from "./DiaryItem";

// 여기서 (diaryList) 로 받으면 {diaryList : [{},{}]} 이런식으로 받아지고
// ({diaryList})로 받으면 [{},{}] 이런식으로 받아진다
// 결국 여기서 알수있는것은 Props는 지정한 key : value값으로 전달이 되기때문에 여러개를 key형태가 아닌 value 그 자체로 받고 싶으면
// ({ 변수명, 변수명, 변수명 }) 이런식으로 받아야한다.
const DiaryList = ({ diaryList, onRemove, onEdit }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* jsx문법 */}
        {diaryList.map((item) => (
          // key값은 왠만하면 내장되어있는 값으로 사용하는것이 좋다
          // -> map내장 index를 사용하면 삭제 혹은 추가시 인덱스 순서가 바뀔수 잇음
          //   <div key={item.id} className="">
          //     <div>작성자 : {item.author}</div>
          //     <div>일기 : {item.content}</div>
          //     <div>감정 : {item.emotion}</div>
          //     <div>작성 시간(ms) : {item.create_date}</div>
          //   </div>

          // onRemove DiaryList에서 사용은 안하지만 부모에서 두단계를 거처 최하위 자식 컴포넌트에 함수를 전달하는것 - props 드릴링
          <DiaryItem
            key={item.id}
            {...item}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

// defaultprops설정
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
