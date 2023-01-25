import { dbService } from "fbase";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="PDJW">
        {
            editing ? (
            <>
                <form onSubmit={onSubmit} className="container PDJWEdit">
                    <input 
                    type="text" 
                    placeholder="수정할 내용을 입력하세요" 
                    value={newPDJW} 
                    reaquired
                    autoFocus
                    onChange={onChange}
                    className="formInput"
                    />
                    <input 
                    type="submit"
                    value="수정하기"
                    className="formBtn"
                    />
                </form> 
                <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
            </>
            ) : (
            <>
            <h4>{PDJWObj.text}</h4>
            {isOwner && ( 
                <div className="PDJW__actions">
                <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
                </div>
                )}
            {/* <button>좋아요</button>
            <button>댓글</button> */}
            </>
            )}
        </div>
    )
}

export default NPDJW;