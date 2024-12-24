import { useAppStore } from "../../store/index.js";

const Profile = () => {
  const {userInfo} = useAppStore()
  return (
    <>
      <h1>Profile</h1>
      <p>Email: {userInfo.email}</p>  
      <code>
        {JSON.stringify(userInfo, null, 2)}
      </code>
    </>
  )
}

export default Profile