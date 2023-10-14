import { ChatMessage } from "../api/model";

export const handleBotResponse = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const decoder = new TextDecoder();
    let botResponse = '';
  
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      botResponse += decodedChunk;
  
      // Update the last message (bot response) in the messages hook
      setMessages((prevMessages) => {
        const lastMessageIndex = prevMessages.length - 1;
        if (lastMessageIndex >= 0) {
          const newMessages = [...prevMessages];
          newMessages[lastMessageIndex].content = botResponse;
          return newMessages;
        } else {
          return prevMessages;
        }
      });
    }
  
    setIsLoading(false);
  };