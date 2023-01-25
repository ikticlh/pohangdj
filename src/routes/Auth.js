import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";

const Auth = () => {
    
    return(
       <div className="authContainer">
       <FontAwesomeIcon
         icon={faAddressCard}
         color={"#EDEDED"}
         size="4x"
         style={{ marginBottom: 30 }}
       />
        <AuthForm />
        </div>
    )

    }
export default Auth;