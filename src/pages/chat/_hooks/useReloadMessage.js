import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

export default function useReloadMessage() {
    const queryClient = useQueryClient();

    const {mutate: reloadMessage, data: newMessage, isLoading: isReloadingNewMessage} = useMutation({
        mutationFn: async ({chatId, messageId}) => {
            const headers = {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            console.log(`https://srv475086.hstgt.cloud/api/v1/chatbot/conversations/${chatId}/messages/${messageId}/reload-response/`)

            const chat = await axios.post(`https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/${chatId}/messages/${messageId}/reload-response/`, {}, {headers})

            return chat.data
        }, onSuccess: async (data) => {
            console.log(data);
            await queryClient.invalidateQueries('chat');
        }
    })

  return {reloadMessage, newMessage, isReloadingNewMessage};
}