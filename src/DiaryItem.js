import { useRef, useState } from "react";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_date,
  onRemove,
  onEdit,
}) => {
  // 수정상태 state
  const [isEdit, setEdit] = useState(false);

  // 수정시 들어오는 Content
  const [modiContent, setModiContent] = useState(content);

  const contentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id + 1}번째 일기를 정말 삭제하시겠습니까?`))
      onRemove(id);
  };

  const toggleIsEdit = () => {
    // 수정하기를 누를경우 기존 content로 변경하기
    if (!isEdit) setModiContent(content);
    setEdit(!isEdit);
  };

  const editContent = () => {
    if (modiContent.length < 5) {
      contentInput.current.focus();
      return;
    }

    if (window.confirm(`${id + 1}번째 일기를 수정하시겠습니까?`))
      onEdit(id, modiContent);
    toggleIsEdit();
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              value={modiContent}
              ref={contentInput}
              onChange={(e) => setModiContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={toggleIsEdit}>수정취소</button>
          <button onClick={editContent}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
