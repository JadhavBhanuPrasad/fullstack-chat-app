import { useState , useRef , useEffect  } from 'react'
import {GrAttachment} from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import {IoSend} from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react';

const MessageBar = () => {
    const [message, setMessage] = useState("")
    const emojiRef = useRef()
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const handleAddEmoji = (e) => { 
        setMessage(message + e.emoji)
    }
    const handleSendMessage = () => {
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emojiRef]);
  return (
      <div className=" bg-[#1c1d25] h-[10vh] flex justify-center items-center px-8 mb-6 gap-6">
          <div className="flex w-[80%] bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
              <input
                  type="text"
                  className="flex-1 p-5 bg-transparent rounded:md foucs:border-none focus:outline-none"
                  placeholder="Enter Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
              />
              <button className='text-neutral-500 px-0 bg-transparent border-none focus:outline-none hover:text-white duration-300 transition-all'>
                  <GrAttachment className='text-3xl' />
              </button>
              <button className='text-neutral-500 px-0 bg-transparent border-none focus:outline-none hover:text-white duration-300 transition-all'
                  onClick={() => setEmojiPickerOpen(true)}>
                      <RiEmojiStickerLine className='text-3xl' />
                  </button>
                  <div className='absolute bottom-16 right-0' ref={emojiRef}>
                  <EmojiPicker 
                    theme='dark'
                    open={emojiPickerOpen}
                    onEmojiClick={handleAddEmoji}
                    />
                  </div>
              
          </div>
          <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] duration-300 transition-all'
              onClick={handleSendMessage}>
              <IoSend className='text-2xl' />
          </button>
      </div>
  )
}

export default MessageBar