import { useEffect } from "react"
import { useAppStore } from "../../store/index.js"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ChatContainer from "../chat/components/chat-container/index.jsx"
import ContactsContainer from "./components/contacts-container/index.jsx"
import EmptyChatContainer from "./components/empty-chat-container/index.jsx"


const Chat = () => {
    const navigate = useNavigate()
    const {userInfo,selectedChatType} = useAppStore()
    
  console.log(selectedChatType)
    useEffect(() => {
      if (!userInfo.profileSetup) {
        toast('Please complete your profile setup')
        navigate('/profile')
      }
    }, [userInfo, navigate])
    return (
      <div className="flex h-[100vh] text-white overflow-hidden">
        <ContactsContainer />
        {
          selectedChatType === undefined ? (<EmptyChatContainer />) : ( <ChatContainer/>)
        }
       
      </div>
    )
  }
  
  export default Chat