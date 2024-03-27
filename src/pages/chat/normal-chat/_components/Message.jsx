import React, {useEffect, useState} from 'react';

import styled from "styled-components";
import {PiArrowClockwise, PiArrowRight, PiCopy, PiDownloadSimple} from "react-icons/pi";
import Button from "react-bootstrap/Button";
import useStartChat from "../../_hooks/useStartChat";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import DownloadMessage from "./DownloadMessage";

import Carousel from 'react-bootstrap/Carousel';
// Import your icon components
import MouseOverPopover from './mousepopover'; // Import the MouseOverPopover component
import {useSelector} from "react-redux";
import useReloadMessage from "../../_hooks/useReloadMessage";
import toast from "react-hot-toast";
import motqinLogo from '../../../../assets/logo.svg'
import avatar from '../../../../assets/Images/Avatar.jpg'
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const AutoType = ({text, speed}) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const markdownText = convertToMarkdown(text); // Convert text to Markdown
        const interval = setInterval(() => {
            if (currentIndex < markdownText.length) {
                setDisplayText(prevText => prevText + markdownText[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, currentIndex]);

    const convertToMarkdown = (text) => {
        // Perform Markdown conversion using markdown-it
        return md.render(text);
    };

    return (<>
        <div dangerouslySetInnerHTML={{__html: displayText}}/>
    </>);
};


const ScrollIndicatior = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`
const Avatar = styled.img`
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 1000px;
    background-size: cover;
    background-position: center;
    border: 2px solid #6f42c1;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: flex-start;
    width: 85%;
`

const MessageText = styled.div`
    font-size: 16px;
    margin-bottom: 4px;
    color: ${props => props.writing ? "rgba(0,27,121,0.5)" : '#001B79'};
`

const IconRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`

const MessageActionBtn = styled(Button)`
    color: #5225CE;
    cursor: pointer;
    font-size: 20px;
    border: none;

    &:active {
        border: none;
    }
`
const LoadingInde = styled.div`
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
`

function Message({response, isResponding, Animate, fromUser}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const {startChat} = useStartChat();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const chatId = useSelector(state => state.chat.currentConversation);
    const {reloadMessage, isReloadingNewMessage, newMessage} = useReloadMessage();
    const [isAnimate, setIsAnimate] = useState(Animate)
    const extraMessages = response.reloaded_message ? response.reloaded_message : [];


    const messages = [response.content, ...extraMessages]

    return (<Row>

        <Avatar src={response.is_from_user ? avatar : motqinLogo} alt={'user image'}
                className={'align-items-end'}/>

        <div>
            <Carousel slide={false} controls={false} indicators={false} activeIndex={activeIndex}>
                {messages.map(message => (<Carousel.Item key={message} className='bg-white'>
                    {!response.is_from_user ? (<MessageText writing={isResponding}>
                            {isAnimate === true ? (<>
                                <AutoType text={message} speed={16}/>
                            </>) : (
                                <>
                                    {message}
                                </>)
                            }
                        </MessageText>) :
                        <MessageText writing={isResponding}>
                            {message}
                        </MessageText>
                    }
                    {!response.is_from_user && !isResponding && <>
                        <IconRow>
                            <MouseOverPopover content="المحرر">
                                <MessageActionBtn variant={''} onClick={() => {

                                    navigate('/editor', {state: {message}})

                                }}>
                                    <PiArrowRight/>
                                </MessageActionBtn>
                            </MouseOverPopover>

                            <MouseOverPopover content="نسخ النص">
                                <MessageActionBtn variant={''} onClick={async () => {
                                    await toast.promise(navigator.clipboard.writeText(messages[activeIndex]), {
                                        success: () => 'تم نسخ النص بنجاح', error: () => 'حدث خطأ أثناء نسخ النص'
                                    })
                                }}>
                                    <PiCopy/>
                                </MessageActionBtn>
                            </MouseOverPopover>

                            {isReloadingNewMessage ?

                                <MessageActionBtn variant={''}>
                                    <LoadingInde><AiOutlineLoading3Quarters/></LoadingInde>
                                </MessageActionBtn>

                                : <MouseOverPopover content="أعادة أرسال">
                                    <MessageActionBtn variant={''} onClick={() => {
                                        reloadMessage({messageId: response.id, chatId}, {
                                            onSuccess(data) {
                                                // console.log(data);
                                                if (data) setActiveIndex((state) => data?.response.length)
                                                setIsAnimate(true)
                                            }
                                        })
                                    }}>
                                        <PiArrowClockwise/>
                                    </MessageActionBtn>
                                </MouseOverPopover>

                            }
                            <MouseOverPopover content="تنزيل الأجابة">
                                <DownloadMessage message={messages[activeIndex]}
                                                 trigger={<MessageActionBtn variant={''}>
                                                     <PiDownloadSimple/>
                                                 </MessageActionBtn>}
                                />
                            </MouseOverPopover>

                            {(messages.length > 1) && <ScrollIndicatior>
                                <MessageActionBtn
                                    variant={''}
                                    onClick={() => setActiveIndex((state) => {
                                        if (state === messages.length - 1) return state;
                                        return state + 1
                                    })}> {'<'} </MessageActionBtn>
                                <span
                                    style={{color: "rgba(82, 37, 206, 1)"}}> {messages.length} / {activeIndex + 1}</span>
                                <MessageActionBtn
                                    onClick={() => setActiveIndex((state) => {
                                        if (state === 0) return state;
                                        return state - 1
                                    })}
                                    variant={''}
                                > {'>'} </MessageActionBtn>
                            </ScrollIndicatior>}
                        </IconRow>


                    </>}
                </Carousel.Item>))}
            </Carousel>


        </div>
    </Row>);
}


export default Message;