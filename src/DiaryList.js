import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
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
          <DiaryItem key={item.id} {...item} />
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
