import React, { useState } from "react";

function Login_modal(props){
    const [usernamecontent, setusernamecontent] = useState("");
    const [password, setpasswordcontent] = useState("")

    function handle_login(){
        if(props.currentuser.username == usernamecontent && props.currentuser.password == password){
            props.setauthenticated(true);
            props.setloginmodal(false)
            props.setnoticemessage("Successfully Authentiated!")
            props.setnoticemodal(true)
        }else{
            props.setnoticemessage("Incorrect Credentials")
            props.setnoticemodal(true)
        }
    }

    return <div className="modal__backdrop">
                <div className="modal__container animate-top">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
                        <button type="button" class="close" onClick={()=>{props.setloginmodal(false)}}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="login-form">
                            <input type="text" onChange={(e)=>{setusernamecontent(e.target.value)}} class="form-control login-textbox" placeholder="Username" />
                            <input type="password" onChange={(e)=>{setpasswordcontent(e.target.value)}} class="form-control login-textbox" placeholder="Password" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" onClick={()=>{handle_login();}}>Login</button>
                    </div>
                </div>
            </div>
}

export default Login_modal;
                