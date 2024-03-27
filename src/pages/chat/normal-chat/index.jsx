import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import MessageInput from "../_components/MessageInput";
import { Stack } from "react-bootstrap";
import Message from "./_components/Message";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import ChatSkeleton from "./_components/ChatSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversation } from "@/redux/slices/chatSlice";
import useActiveModel from "../_hooks/useActiveModel";

const Main = styled.div`
  padding: 14px;
  display: grid;

  gap: 14px;
  grid-template-rows: 1fr auto;
  height: calc(100vh - 54px);
  @media (min-width: 1200px) { /* Adjust the min-width value as needed */
  padding-left: 22%; /* Adjust the padding values for larger screens */
  padding-right:22%; /* Adjust the padding values for larger screens */
}
`;

const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow: scroll;
  height: 100%;
`;

function NormalChat() {
  const { chatId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [userMessage, setUserMessage] = React.useState("");
  const dispatch = useDispatch();
  const [Animate, setAnimate] = useState(false)
  const currentConversation = useSelector(
    (state) => state.chat.currentConversation
  );
  const { model } = useActiveModel();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const response = await axios.get(
        `https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/${
          currentConversation || chatId
        }/messages/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    staleTime: Infinity,
  });

  const messages = !isLoading || data ? data?.results?.toReversed() : [];

  const { mutate, isLoading: isWriting } = useMutation({
    mutationKey: ["chat"],
    mutationFn: async (message) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const data = {
        content: message,
        conversation: chatId,
        ai_model: model,
      };

      const chat = await axios.post(
        `https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/${chatId}/messages/create/`,
        data,
        { headers }
      );

      return chat.data;
    },
    onSuccess: async (data) => {
      setUserMessage("");
      setSearchParams({ message: "" });
      searchParams.delete("message");
      await queryClient.invalidateQueries("chat");
      console.log(data);
    },
  });

  console.log(currentConversation);
  useEffect(() => {
   
    refetch();
  }, [currentConversation]);

  useEffect(() => {
    dispatch(setCurrentConversation(chatId));
    if (!searchParams.get("message")) return;
    mutate(searchParams.get("message"));
   setAnimate(true)
      // Reset Animate after 1 second (adjust the delay as needed)
      setTimeout(() => {
        setAnimate(false);
      }, 10000);
  }, [searchParams.get("message")]);
  



  return (
    <Main>
      <MessageColumn gap={5} direction={"vertical"} dir={"rtl"}>
        {isLoading ? (
          <ChatSkeleton />
        ) : (
          <>
            {messages?.map((message) => {
              return <Message response={message}    Animate={Animate} key={message.id} />;
            })}

            {userMessage && (
              <Message
              response={{
                content: userMessage,
                id: 1234564,
                is_from_user: true,
                reloaded_message: [],
              }}
              Animate={Animate}
            />
            
            )
     
          }
            {isWriting && (
              <Message
                response={{
                  content: "",
                  id: 1234564,
                

                  is_from_user: false,
                  reloaded_message: [],
                }}
                Animate={Animate}
                isResponding={isWriting}
              />
            )}
          </>
        )}
      </MessageColumn>

  

      <Stack gap={3} direction={"horizontal"}>
        {/*<ChooseModel/>*/}
        <MessageInput
          onSubmit={(message) => {
      
            mutate(message);
            setAnimate(true)
            
    // Reset Animate after 8 second (adjust the delay as needed)
    setTimeout(() => {
      setAnimate(false);
    }, 8000);
    // Reset Animate after 1 second (adjust the delay as needed)

          }}
          isDisabled={isWriting}
        />
      </Stack>
    </Main>
  );
}

export default NormalChat;