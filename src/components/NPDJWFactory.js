import React, {useState} from "react"
import { dbService } from "fbase";

const NPDJWFactory = ({ userObj }) => {
    const [PDJW, setPDJW] = useState("")
    const onSubmit = async (event) => {
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
        <form onSubmit={onSubmit}>
                <input 
                    value={PDJW}
                    onChange = {onChange}
                    type="text" 
                    placeholder="내용을 입력하세요" 
                    maxLength={230} 
                    />
                <input type="submit" value="등록" />
            </form>
    )
}
export default NPDJWFactory