import React, {useState} from "react"
import { dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NPDJWFactory = ({ userObj }) => {
    const [PDJW, setPDJW] = useState("")
    const onSubmit = async (event) => {
        if (PDJW === "") {
            return;
          }
        event.preventDefault();
        const PDJWObj = {
            text: PDJW,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        }
        await dbService.collection("PDJWs").add(PDJWObj);
        setPDJW("");
    }
    const onChange = (event) => {
        const { 
            target:{value},
        } = event;
        setPDJW(value);
    }
    return (
        <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={PDJW}
            onChange={onChange}
            type="text"
            placeholder="내용을 입력하세요"
            maxLength={200}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        </form>
    )
}
export default NPDJWFactory