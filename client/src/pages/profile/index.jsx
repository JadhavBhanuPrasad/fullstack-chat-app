import { useAppStore } from "../../store/index.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IoArrowBack} from "react-icons/io5"
import {FaTrash, FaPlus} from "react-icons/fa"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {getColor} from '../../lib/utils.ts'
const Profile = () => {
  const navigate = useNavigate()
  const {userInfo, setUserInfo} = useAppStore()
  const [hovered, setHovered] = useState(false)
  const [image, setImage] = useState(null)
  const [firstName, setFirstName] = useState("")  
  const [lastName, setLastName] = useState("")
  const [selectedColor, setSelectedColor] = useState(0)

  return (
    <div className=" bg-[#1b1c24] h-[full] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl  text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-24 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-24 w-24 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />
              ) : (
                <div
                  className={`uppercase h-24 w-24 md:w-48 md:h-48 flex items-center justify-center text-5xl md:text-4xl font-bold text-white border-[1px] rounded-full ${getColor(selectedColor)}`}>
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full ">
                {
                  image ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className="text-white text-3xl cursor-pointer" />
                }
              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile