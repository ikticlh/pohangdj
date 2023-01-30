import NPDJW from "components/NPDJW";
import NPDJWFactory from "components/NPDJWFactory";
import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Hot = ( {userObj} ) => {
    const [PDJWs, setPDJWs] = useState([]);
    useEffect(() => {
        dbService
        .collection("PDJWs")
        .where("likeCount", ">=", 5)
        .orderBy("likeCount", "desc")
        .onSnapshot(
          (snapshot) => {
            const PDJWArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPDJWs(PDJWArray);
          }
        );
      }, []);
      
    return (
        <div className="container">
            <ul style={{marginRight :10}}>
               <li>
              <Link style={{
            marginLeft: -90,
            marginBottom:-16.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 15,
          }} to="/">
                일반글
              </Link>
            </li>
                <li>
              <Link style={{
            marginLeft: 100,
            marginBottom:30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 15,
          }} to="/Hot">
                인기글
              </Link>
            </li>  
            </ul>
           

        
            <NPDJWFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {PDJWs.map((PDJW) => (
                    <NPDJW 
                    key={PDJW.id} 
                    PDJWObj={PDJW}
                    isOwner={PDJW.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
    }
export default Hot;