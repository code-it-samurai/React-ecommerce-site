import React, { useState } from "react";

function Notice_modal(props){
    return <div className="modal__backdrop">
			<div className="modal__container animate-top">
            <div class="modal-header">
                    <h5 class="modal-title" id="signup-modal">Notice</h5>
                    <button type="button" onClick={()=>{props.setnoticemodal(false)}} class="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h3>{props.noticemessage}</h3>
                </div>
                <div class="modal-footer">
                    <button onClick={(e)=>{e.preventDefault(); props.setnoticemodal(false)}} class="btn" >Close</button>
                </div>
			</div>
		</div>
}

export default Notice_modal;