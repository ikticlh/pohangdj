import { dbService } from "fbase";
import React, {useState} from "react";

const NPDJW = ({PDJWObj, isOwner}) => {
    const [editing, setEdting] = useState(false);
    const [newPDJW, setNewPDJW] = useState(PDJWObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("이 글을 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`PDJWs/${PDJWObj.id}`).delete();
        }
    }
    const toggleEditing = () => setEdting((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`PDJWs/${PDJWObj.id}`).update({
            text:newPDJW,
        })
        setEdting(false)
    }
    const onChange = (event) => {
        const {target:{value},
    } = event;
    setNewPDJW(value);
    }
    return (
        <div>
        {
            editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                    type="text" 
                    placeholder="수정할 내용을 입력하세요" 
                    value={newPDJW} 
                    reaquired
                    onChange={onChange}
                    />
                    <input 
                    type="submit"
                    value="수정하기"
                    />
                </form> 
                <button onClick={toggleEditing}>취소</button>
            </>
            ) : (
            <><h4>{PDJWObj.text}</h4>
            {isOwner && ( 
            <>
            <button onClick={onDeleteClick}>삭제</button>
            <button onClick={toggleEditing}>수정</button>
            </>
                )}
            <button>좋아요</button>
            <button>댓글</button>
            </>
            )}
        </div>
    )
}

export default NPDJW;