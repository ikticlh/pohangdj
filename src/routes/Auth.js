import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    
    return(
       <div className="authContainer">
       <FontAwesomeIcon
         icon={faComments}
         color={"#EDEDED"}
         size="3x"
         style={{ marginBottom: 30 }}
       />
        <AuthForm />
        </div>
    )

    }
export default Auth;