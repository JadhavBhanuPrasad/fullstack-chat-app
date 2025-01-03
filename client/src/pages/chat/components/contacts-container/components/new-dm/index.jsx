import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import {HOST} from "../../../../../../../utils/constants.js";
  import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {ScrollArea} from "@/components/ui/scroll-area"
  import {Input} from "@/components/ui/input"
import { useState } from "react"
  import { FaPlus } from "react-icons/fa"
  import { IoClose } from "react-icons/io5";
  import Lottie from 'react-lottie'
import animationData from '../../../../../../assets/lottie-json.json'
import {SEARCH_CONTACTS_ROUTE} from "../../../../../../../utils/constants.js";
import { apiClient } from "../../../../../../../lib/api-client.js";
import {useAppStore} from "../../../../../../store/index.js";

const NewDm = () => {
    const [openNewContactModal, setOpenNewContactModal] = useState(false)
    const [searchContacts, setSearchContacts] = useState([])
    const { setSelectedChatType,setSelectedChatData,setSelectedChatMessages } = useAppStore();
    const searchContact = async (searchTerm) => {
        try {
            if(searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, {searchTerm: searchTerm}, {withCredentials: true})
                if(response.status === 200 && response.data.contacts) {
                    setSearchContacts(response.data.contacts)
                }
                else{
                    setSearchContacts([])
                }
            }
            else{
                setSearchContacts([])
            }
        }
        catch (error) {
            console.error("Error during search contacts:", error)
        }
    }
    const selectNewContact = (contact) => {
        setSelectedChatType("contact")
        setSelectedChatData(contact)
        setSelectedChatMessages([])
        setOpenNewContactModal(false)
    }
return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus onClick={() => setOpenNewContactModal(true)} className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-200 transition-all duration-200 cursor-pointer" />
                    {openNewContactModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                            <div className="flex flex-col items-center w-[90vw] h-[80vh] md:w-[60vw]  lg:w-[50vw]  xl:w-[40vw]  bg-[#181920] rounded shadow-lg p-6">
                                <div className="flex justify-between w-full items-center">
                                    <h2 className="text-xl font-semibold mb-4">Please select a contact</h2>
                                    <IoClose onClick={() => {setOpenNewContactModal(false); setSearchContacts([])} } className="text-3xl" />
                                </div>
                                <Input placeholder="Search contacts" className="rounded p-5 border-none focus:outline-none bg-[#2c2e3b]"
                                    onChange={(e) => searchContact(e.target.value)} />

                                {searchContacts.length === 0 && (
                                    <div className="flex-1 flex flex-col justify-center p-6 gap-10 items-center  duration-1000 transition-all z-10">
                                        <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: animationData,
                                            }}
                                            height={200}
                                            width={200}
                                        />
                                        <h2 className=" poppins-medium text-2xl">
                                            Hi<span className='text-purple-500'>!</span> Search new <span className='text-purple-500'>Contact</span><span className='text-purple-500'>. </span>
                                        </h2>
                                    </div>
                                )}
                                {searchContacts.length > 0 && (
                                    <ScrollArea className="w-full flex-1">
                                        {searchContacts.map((contact, index) => (
                                            <div key={index} className="flex gap-3 items-center mt-6" onClick={() => selectNewContact(contact)}>                                                            
                                                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                      {contact.image ? (
                                                        <AvatarImage
                                                          src={`${HOST}/${contact.image}`}
                                                          alt="profile"
                                                          className="object-cover w-full h-full bg-black"
                                                        />
                                                      ) : (
                                                        <div
                                                          className={`uppercase h-12 w-12 flex items-center justify-center text-lg font-bold  rounded-full bg-[#9b5de52a] text-[#9b5de5]  border-[#9b5de5bb]`}
                                                        >
                                                          {contact.firstName
                                                            ? contact.firstName.split("").shift()
                                                            : contact.email.split("").shift()}
                                                        </div>
                                                      )}
                                                </Avatar>
                                                <div>
                                                      {contact.firstName && contact.lastName ? <span> {contact.firstName} {contact.lastName}</span> : <span>{contact.email}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                )}
                            </div>
                        </div>
                    )}
                </TooltipTrigger>
                <TooltipContent className="text-white p-3 mb-2 bg-[#1c1b1e] border-none">
                    <p>Select New Contact</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </>
)
}

export default NewDm