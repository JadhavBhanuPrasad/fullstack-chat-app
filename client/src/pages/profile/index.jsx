import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getColor, colors } from "@/lib/utils";
import { toast } from "sonner";
import { HOST } from "../../../utils/constants.js";
import { ADD_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE , DELETE_IMAGE_ROUTE} from "../../../utils/constants.js";
import { apiClient } from "../../../lib/api-client.js";
import { useAppStore } from "../../store/index.js";
const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if(userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if(userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => { 
    if (firstName.length === 0) {
      toast("First Name is required")
      return false
    }
    if(lastName.length === 0) {
      toast("Last Name is required")
      return false
    }
    return true
  }
  const saveChanges = async () => {
    if(validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, 
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );

        setUserInfo({...response.data});
        toast("Profile updated successfully!");
        navigate("/chat");
      } catch (error) {
        console.error("Error during profile update:", error)
        toast("Profile update failed. Please try again.")
      }
    }
  }

  const handleNavigate = () => {
    if(userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please complete your profile setup to continue.")
    }
  }

  const handleDeleteImage = async (event) => {
    event.stopPropagation();
    try {
      const response = await apiClient.delete(DELETE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if(response.status === 200) {
        setUserInfo({...userInfo, image: null});
        toast("Image deleted successfully!");
        setImage(null);
      }
    } catch (error) {
      console.error("Error during image delete:", error);
      toast("Image delete failed. Please try again.");
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (event) => {

      try {
        const file = event.target.files[0];
        if(file) {
          const formData = new FormData();
          formData.append("profile-image", file);
          const response = await apiClient.post(ADD_IMAGE_ROUTE, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          
          if(response.status === 200 && response.data.image) {
            setUserInfo({...userInfo, image: response.data.image});
            setImage(`${HOST}/${response.data.image}`);
          } 
        }
      }
      catch (error) {
        console.error("Error during image upload:", error);
        toast("Image upload failed. Please try again.");
      }

  }

  return (
    <div className=" bg-[#1b1c24] h-[full] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl  text-white/90 cursor-pointer"  />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-24 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-24 w-24 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-24 w-24 md:w-48 md:h-48 flex items-center justify-center text-5xl md:text-4xl font-bold text-white border-[1px] rounded-full ${getColor(selectedColor)}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer"
              onClick={image ? handleDeleteImage : handleFileInputClick} 
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
            type="file"
            ref={fileInputRef} 
            className="hidden"
            name="profile-image"
            onChange={handleImageChange}
            accept=".png, .jpg, .jpeg, .svg"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-5 min-w-32 md:min-w-64">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
              />
            </div>
            <div className="w-full flex items-center justify-center gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`h-8 w-8 rounded-full cursor-pointer ${selectedColor === index ? "ring-2 ring-white/30" : ""
                    } ${color}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">  
          <Button className="w-full h-16 bg-purple-700 text-white hover:bg-purple-900 transition-all duration-300"
          onClick={saveChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
