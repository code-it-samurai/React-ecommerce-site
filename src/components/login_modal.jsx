import React from "react";

function Login_modal(props){
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
                            <input type="text" class="form-control login-textbox" placeholder="Username" />
                            <input type="password" class="form-control login-textbox" placeholder="Password" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
}

export default Login_modal;
                