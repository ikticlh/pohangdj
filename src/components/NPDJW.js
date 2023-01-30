import { dbService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";



library.add();

const NPDJW = ({ PDJWObj, isOwner, userObj }) => {
    const [editing, setEdting] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const [newPDJW, setNewPDJW] = useState(PDJWObj.text);
    const [newCmt, setNewCmt] = useState("");
    let comments = PDJWObj.comments;
if(!comments) comments = []
const numberOfComments = comments.length;
console.log(numberOfComments);

    const onLikeClick = async () => {
        const currentValue = await JSON.parse(localStorage.getItem("likedArticles")) || []
        const docRef = await dbService.doc(`PDJWs/${PDJWObj.id}`);
        const doc = await docRef.get();
        const likeCount = doc.data().likeCount || 0;


        console.log(`${PDJWObj.id}`)
        console.log(currentValue)
        if (currentValue.includes(`${PDJWObj.id}`)) {
            await docRef.update({ likeCount: likeCount - 1 })
            const newArray = currentValue.filter(id => id !== PDJWObj.id)
            localStorage.setItem("likedArticles", JSON.stringify(newArray));
        } else {
            await docRef.update({ likeCount: likeCount + 1 })
            currentValue.push(PDJWObj.id);
            localStorage.setItem("likedArticles", JSON.stringify(currentValue));
        }
    }
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
            text: newPDJW,
        })
        setEdting(false)
    }
    const onCmtSubmit = async (event) => {
        event.preventDefault();
        let comments = PDJWObj.comments;
        if (!Array.isArray(comments)) {
            comments = []
        }
        await dbService.doc(`PDJWs/${PDJWObj.id}`).update({
            comments: [...comments, newCmt],
        });
        setCommenting(false);
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewPDJW(value);
    }

    const onCmtChange = (event) => {
        const { target: { value } } = event;
        setNewCmt(value);
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
                            취소
                        </span>
                    </>
                ) : (
                    <>
                        <h4>{PDJWObj.text}</h4>
                        {isOwner ?
                            (<>
                                <div className="mmmm"><span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                    <span className="edit" onClick={toggleEditing}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </span>
                                    {<span className="like" onClick={onLikeClick}>
                                        <span className="like" onClick={onLikeClick}>
                                            <FontAwesomeIcon icon={faHeart} />  {PDJWObj.likeCount}
                                        </span>
                                    </span>}

                                    {commenting ? (
                                        <form onSubmit={onCmtSubmit} className="container CmtEdit">
                                            <input
                                                style={{marginTop : 10}}
                                                type="text"
                                                placeholder="댓글을 입력하세요"
                                                required
                                                autoFocus
                                                onChange={onCmtChange}
                                                className="formInput"
                                            />
                                            <input type="submit" value="댓글달기" className="formBtn" />
                                        </form>
                                    ) : (
                                        <span style={{marginLeft : 4.4}} onClick={() => setCommenting(true)}><FontAwesomeIcon icon={faComment}/></span>
                                    )}
                                    <div style={{ marginTop: 20, marginBottom: 10 }}>댓글  ( {numberOfComments} )</div>
                                    {PDJWObj.comments && PDJWObj.comments.map((comment, index) => (
                                        <div style={{ marginTop: 1 }} key={index}>{comment}</div>
                                    ))}

                                </div>
                            </>) : (<>
                                <span className="abclike" onClick={onLikeClick}>
                                    <span className="abclike" onClick={onLikeClick}>
                                        <FontAwesomeIcon icon={faHeart} />  {PDJWObj.likeCount}
                                    </span>
                                </span>
                                {commenting ? (
                                        <form onSubmit={onCmtSubmit} className="container CmtEdit">
                                            <input
                                                style={{marginTop : 20}}
                                                type="text"
                                                placeholder="댓글을 입력하세요"
                                                required
                                                autoFocus
                                                onChange={onCmtChange}
                                                className="formInput"
                                            />
                                            <input type="submit" value="댓글달기" className="formBtn" />
                                        </form>
                                        ) : (
                                <span style={{marginLeft : 20}} onClick={() => setCommenting(true)}><FontAwesomeIcon icon={faComment}/></span>
                                        )}
                                <div style={{ marginTop: 20, marginBottom: 9 }}>댓글  ( {numberOfComments} )</div>
                                {PDJWObj.comments && PDJWObj.comments.map((comment, index) => (
                                    <div style={{ marginTop: 1 }} key={index}>{comment}</div>
                                ))}
                            </>)
                        }
                    </>
                )}
        </div>
    )

}

export default NPDJW;