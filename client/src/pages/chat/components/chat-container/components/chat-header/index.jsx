import {RiCloseFill} from 'react-icons/ri'

const ChatHeader = () => {
  return (
    <div className="flex h-[10vh] items-center justify-between px-20 border-b border-[#2f303b]">
        <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center justify-center"></div>
            <div className="flex gap-5 items-center justify-center">
                <div className="text-neutral-500 cursor-pointer focus:border-none focus:outline-none hover:text-white duration-300 transition-all">
                    <RiCloseFill className='text-3xl' />
                </div>
            </div>

        </div>
    </div>
  )
}

export default ChatHeader