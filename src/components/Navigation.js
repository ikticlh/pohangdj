import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => (
<div>
    <nav>
        <ul>
            <li>
                <Link to="/">홈</Link>
            </li>
        </ul>     
    </nav>
    { userObj.displayName == null ? (
        <nav>
        <ul>
           <li>
               <Link to="/profile">프로필</Link>
           </li>
       </ul>
    </nav>
    ) : (
    <nav>
         <ul>
            <li>
                <Link to="/profile">{userObj.displayName}의 프로필</Link>
            </li>
        </ul>
    </nav>
    )}
    </div>
    );
    export default Navigation