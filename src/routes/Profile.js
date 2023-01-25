import React, { useState} from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default ( {refreshUser, userObj } ) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = 
    useState(userObj.displayName)
    const onLogOutClick =() => {
        authService.signOut()
        history.push("/");
    };
    const onChange = (event) => {
        const { 
            target:{value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
            refreshUser();

        }
        console.log(userObj.displayName)
    }

    
    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            type="text" 
            placeholder="사용할 이름을 입력하세요"
            value={newDisplayName}

            />
            <input type="submit" value="프로필 수정하기" />
        </form>
        <button onClick={onLogOutClick}>로그아웃</button>
    </>
    )
}