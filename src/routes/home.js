import NPDJW from "components/NPDJW";
import NPDJWFactory from "components/NPDJWFactory";
import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = ( {userObj} ) => {
    const [PDJWs, setPDJWs] = useState([]);
    useEffect(() =>{
        dbService.collection("PDJWs").onSnapshot((snapshot)=>{
            const PDJWArray= snapshot.docs.map(doc =>
                ({id:doc.id, 
                  ...doc.data()
                }))
                setPDJWs(PDJWArray);         
                })
            }, [])
    return (
        <div className="container">
            <NPDJWFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {PDJWs.map((PDJW) => (
                    <NPDJW 
                    key={PDJW.id} 
                    PDJWObj={PDJW} 
                    isOwner={PDJW.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
    }
export default Home;