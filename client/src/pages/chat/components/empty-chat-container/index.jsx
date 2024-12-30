import Lottie from 'react-lottie'
import animationData from '../../../../assets/lottie-json.json'
const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25]  md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
        }}
        height={300}
        width={300}
      />
      <h2 className=" poppins-medium h-1">
        Hi<span className='text-purple-500'>!</span> Welcome to <span className='text-purple-500'>Synchronous</span> Chat App<span className='text-purple-500'>. </span>
      </h2>
    </div>
  )
}

export default EmptyChatContainer