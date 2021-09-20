import React, { useState } from "react";

function Signup_modal(props){
    const [emailcontent, setemailcontent] = useState("");
    const [usernamecontent, setusernamecontent] = useState("");
    const [password, setpasswordcontent] = useState("")

    return <div className="modal__backdrop">
			<div className="modal__container animate-top">
            <div class="modal-header">
                    <h5 class="modal-title" id="signup-modal">Signup</h5>
                    <button type="button" onClick={()=>{props.setsignupmodal(false)}} class="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="login-form">
                        <input type="email" onChange={(e)=>{setemailcontent(e.target.value)}} class="form-control login-textbox" placeholder="Email" />
                        <input type="text" onChange={(e)=>{setusernamecontent(e.target.value)}} class="form-control login-textbox" placeholder="Username" />
                        <input type="password" onChange={(e)=>{setpasswordcontent(e.target.value)}} class="form-control login-textbox" placeholder="Password" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" onClick={(e)=>{e.preventDefault(); props.setauthenticated(true); props.setcurrentuser({email:emailcontent, username:usernamecontent, password:password}); props.setsignupmodal(false)}} class="btn" >Sign Up</button>
                </div>
			</div>
		</div>
}

export default Signup_modal;