
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {useAppStore} from "../../../../../../store/index.js";
import {HOST} from "../../../../../../../utils/constants.js";
import { useNavigate } from "react-router-dom";
import {FiEdit2} from "react-icons/fi";
import { IoMdPower } from "react-icons/io";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {LOGOUT_ROUTE} from "../../../../../../../utils/constants.js";
import { apiClient } from "../../../../../../../lib/api-client.js";

const ProfileInfo = () => {
  const navigate = useNavigate();
const { userInfo, setUserInfo } = useAppStore();

  const logOut = async () => {
    try{
      const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    }
    catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <div className="absolute bottom-0 flex items-center justify-between px-10 w-full h-16 bg-[#2a2b33] z-0">
      <div className="flex gap-3 items-center justify-center">
        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
          {userInfo.image ? (
            <AvatarImage
              src={`${HOST}/${userInfo.image}`}
              alt="profile"
              className="object-cover w-full h-full bg-black"
            />
          ) : (
            <div
              className={`uppercase h-12 w-12 flex items-center justify-center text-lg font-bold  rounded-full bg-[#9b5de52a] text-[#9b5de5]  border-[#9b5de5bb]`}
            >
              {userInfo.firstName
                ? userInfo.firstName.split("").shift()
                : userInfo.email.split("").shift()}
            </div>
          )}
        </Avatar>
        <div>
          {userInfo.firstName && userInfo.lastName ? <span> {userInfo.firstName} {userInfo.lastName}</span> : <span>{userInfo.email}</span>}
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => navigate("/profile")} className="bg-transparent border-none px-0">
            <FiEdit2 className="text-white text-xl font-medium  hover:text-purple-500 duration-300 transition-all" />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] text-white p-2 border-none rounded-md">
            <p>Edit Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={logOut} className="bg-transparent border-none px-0">
            <IoMdPower className="text-white text-xl font-medium  hover:text-purple-500 duration-300 transition-all" />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] text-white p-2 border-none rounded-md">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  )
}

export default ProfileInfo