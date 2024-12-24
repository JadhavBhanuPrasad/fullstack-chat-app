import { useEffect } from "react"
import { useAppStore } from "../../store/index.js"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Chat = () => {
    const navigate = useNavigate()
    const {userInfo} = useAppStore()
    useEffect(() => {
      if (!userInfo.profileSetup) {
        toast('Please complete your profile setup')
        navigate('/profile')
      }
    }, [userInfo, navigate])
    return (
      <div>Chat</div>
    )
  }
  
  export default Chat