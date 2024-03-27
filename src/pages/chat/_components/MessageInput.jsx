import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { PiPaperPlaneRightFill, PiMicrophoneFill  } from "react-icons/pi";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";


const Message = styled(Form.Control)`
    padding-left: 38px;
    padding-right: 38px;
    font-size: 14px;
    &::placeholder {
        font-size: 12px;
        color: rgba(105,43,239,0.4);
    }
`

const MessageForm = styled(Form)`
    padding: 8px;
    border-radius: 8px;
    width: 100%;
    border: 1px solid rgba(0, 27, 121, 0.2);
`
const MessageBtn = styled.button`
    color: #5225CE;
    border: none;
    padding: 5px 10px;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        //background-color: ;
    }
`

function MessageInput({onSubmit, isDisabled}) {
    const [message, setMessage] = React.useState('')

    function handleSubmit(e) {
        e.preventDefault();
        if(!message || isDisabled) return
        setMessage('')
        onSubmit(message);
    }

    return (
        <MessageForm dir={'rtl'} onSubmit={handleSubmit}>
            <div className={'position-relative'}>
                <Message type="text" placeholder="أكتب رسالة لمتقن شات..." value={message} onChange={(e) => setMessage(e.target.value)} disabled={isDisabled} />
                <MessageBtn type={'submit'} variant={''} className={'position-absolute top-50 translate-middle-y end-0 color-main'} disabled={isDisabled}>
                    <PiPaperPlaneRightFill className={'flip-horizontal'} />
                </MessageBtn>
                <MessageBtn type={'button'} variant={''} className={'position-absolute  top-50 translate-middle-y start-0 color-main'} disabled={isDisabled}>
                    <PiMicrophoneFill />
                </MessageBtn>
            </div>
        </MessageForm>
    );
}

MessageInput.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default MessageInput;