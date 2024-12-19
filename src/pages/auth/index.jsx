import Victory from "../../assets/victory.svg";
import BackgroundImg from "../../assets/login2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignUp = () => {

  }
  const handleLogin = () => {

  }
  return (
    <div className="flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6x1">Welcome</h1>
              <img src={Victory} alt="victory icon" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none grid w-full grid-cols-2">
                <TabsTrigger
                  value="login"
                  className="bg-white border-b-2 hover:border-transparent focus:outline-none data-[state=active]:border-b-purple-500 rounded-none "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="bg-white border-b-2 hover:border-transparent focus:outline-none data-[state=active]:border-b-purple-500 rounded-none"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className=" flex flex-col gap-3">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  className="rounded-full p-2 border-2"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  value={password}
                  type="password"
                  className="rounded-full p-2 border-2"
                  onChange={(e) => setPassword(e.target.password)}
                />

                <Button className="rounded-full p-2 text-white" onClick={handleLogin}>Login</Button>
              </TabsContent>
              <TabsContent value="signup" className=" flex flex-col gap-3">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  className="rounded-full p-2 border-2"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  value={password}
                  type="password"
                  className="rounded-full p-2 border-2"
                  onChange={(e) => setPassword(e.target.password)}
                />
                <Input
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  type="password"
                  className="rounded-full p-2 border-2"
                  onChange={(e) => setConfirmPassword(e.target.password)}
                />
                <Button className="rounded-full p-2 text-white" onClick={handleSignUp}>Sign Up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={BackgroundImg} alt="" className="h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
