import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatSideBar.css";
import { TfiSearch } from "react-icons/tfi";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setCurrentConversation, setNew } from "@/redux/slices/chatSlice";
import styled from "styled-components";
import { PiTrash } from "react-icons/pi";
import useDeleteChat from "../_hooks/useDeleteChat";
import Skeleton from "react-loading-skeleton";
import { BiPlusMedical } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { AiOutlinePlus } from "react-icons/ai";
import { getAllChats } from "@/redux/actions/chat";
import { MdEdit } from "react-icons/md";
import Model from "./../../../components/templates/model";

const ChatLink = styled.p`
  text-wrap: nowrap;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 0;
  z-index: 0;
  position: relative;
font-size:13px;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
width:90%
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

const SidebarLayout = styled.div`
  display: grid;
  height: calc(100dvh - 54px);
  grid-template-rows: auto 1fr;
  gap: 16px;
`;

const BtnActionGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 24px 0 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.5) 90%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const ChatActionBtn = styled.button`
  background-color: transparent;
  color: #5225ce;
  border: none;
  padding: 0px 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;

  &:focus {
    outline: none;
  }
`;

const StartChatBtn = styled.button`
  border: 1px solid rgba(105, 43, 239, 0.2);
  background-color: transparent;
  color: #001b79;
  padding: 8px 16px ;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
  position: relative;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #f3f3f3;
  }
`;

const PlusIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const ChatSideBar = ({ offCanvasSelect }) => {
  const [readOnly, setReadOnly] = useState(true); // Initial state is read-only
  const [formValues, setFormValues] = useState({}); // State to store input values

  const handleKeyDown = (event, chatId) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key
      console.log('Form submitted with value:', formValues[chatId]); // Log submitted value
      // You can submit the form or perform any other action here
    }
  };

  const handleButtonClick = (chatId) => {
    setReadOnly(false); // Set readOnly to false when button is clicked
    // Assuming you want to edit a specific chat, you might need to set some state to track which chat is being edited
  };

  const handleSubmit = (chatId, event) => {
    event.preventDefault();
    console.log('Form submitted with value:', formValues[chatId]);
    setReadOnly(true); // Set readOnly back to true after form submission

    console.log('readOnly state:', readOnly); // Check the updated state
  };
  const navigate = useNavigate();
  const [chats, setChats] = React.useState([]);
  const [staticData, setStaticData] = React.useState([]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useDeleteChat();

  const { isLoading: chatsLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getAllChats(),
    onSuccess: (data) => {
      setChats(data);
      setStaticData(data);
    },
  });

  const searchFunction = (searchTerm) => {
    const filteredChats = staticData.filter((chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setChats(filteredChats);
  };

  return (
    <SidebarLayout dir="rtl">
      <div className="fixed p-3">
        <StartChatBtn
          variant={"outline-primary"}
          onClick={() => {
            navigate(`/chat`);
            offCanvasSelect();
          }}
        >
          <span> محادثة جديدة </span>
          <PlusIcon>
            <BiPlusMedical />
            {/*<AiOutlinePlus />*/}
          </PlusIcon>
        </StartChatBtn>
        <div className="search-container  ">
          <Form.Control
            type="search"
            placeholder={"بحث"}
            aria-describedby="search"
            onChange={(e) => {
              searchFunction(e.target.value);
            }}
          />

          <TfiSearch
            style={{
              color: "#001B79",
              backgroundColor:"white"
            }}
            className="search-icon ms-2 "
            alt="search"
          />
        </div>
        {/*{openSideBar && <p className="head-of-chats">اخر محادثات</p>}*/}
      </div>
<span style={{"color":"rgba(0, 27, 121, 0.5)","fontSize":"15px","marginRight":"10px"}}>أخر المحادثات</span>
      <ChatsContainer>
        {chatsLoading ? (
          <>
            <Skeleton height={15} width={230} />
            <Skeleton height={15} width={170} />
            <Skeleton height={15} width={200} />
            <Skeleton height={15} width={150} />
            <Skeleton height={15} width={210} />
            <Skeleton height={15} width={200} />
          </>
        ) : (
          chats?.toReversed().map((chat) => (
            <div key={chat.id} className={"position-relative"}>
              <ChatLink
                onClick={async () => {
                  dispatch(setNew(false));
                  dispatch(setCurrentConversation(chat.id));
                  navigate(`/chat/${chat.id}`);
                  offCanvasSelect();
                  // setShowChat(chat.id);
                }}
              >
              <form onSubmit={(e) => handleSubmit(chat.id, e)}>
             
              <input type="text" className="border-0 w-100" defaultValue={chat.title} // Use defaultValue instead of value value={formValues[chat.id] || ''} 
              onKeyDown={(e) => handleKeyDown(e, chat.id)}
              readOnly={readOnly} 
              onChange={(e) => setFormValues({ ...formValues, [chat.id]: e.target.value })} 
              style={{ color: 'rgba(0, 27, 121, 1)' }} // Add style to change placeholder color
              />
             
          </form>
          
              </ChatLink>
              <BtnActionGroup
                className={
                  "position-absolute top-50 translate-middle-y start-0 z-4 m-0"
                }
              >
                <Model
                  trigger={
                    <ChatActionBtn variant={""} className="">
                      <PiTrash />
                   
                    </ChatActionBtn>
                  }
                  onSubmit={() => {
                    mutate(chat.id, {
                      onSuccess: async () => {
                        await queryClient.invalidateQueries("chats");
                        console.log("deleted");
                      },
                    });
                    offCanvasSelect();
                  }}
                />
                <ChatActionBtn onClick={handleButtonClick}>
                <MdEdit/>
              </ChatActionBtn>
              
              </BtnActionGroup>
            </div>
          ))
        )}
      </ChatsContainer>
    </SidebarLayout>
  );
};

export default ChatSideBar;
