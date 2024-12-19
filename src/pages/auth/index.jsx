import Victory from '../../assets/victory.svg'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
 


const Auth = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6x1">Welcome</h1>
              <img src={Victory} alt="victory icon" className='h-[100px]'/>
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
          <Tabs  className="w-3/4">
      <TabsList className="bg-transparent rounded-none grid w-full grid-cols-2">
        <TabsTrigger value="login" className="bg-white border-b-2 hover:border-transparent focus:outline-none data-[state=active]:border-b-purple-500 rounded-none ">Login</TabsTrigger>
        <TabsTrigger value="signup" className="bg-white border-b-2 hover:border-transparent focus:outline-none data-[state=active]:border-b-purple-500 rounded-none">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
            <div className="space-y-1">
              <Input id="name" className="rounded-full p-2 border-2" />
            </div>
            <div className="space-y-1">
              <Input id="username" type="password" className="rounded-full p-2 border-2" />
            </div>

            <Button>Login</Button>

      </TabsContent>
      <TabsContent value="signup">

            <div className="space-y-1">
              <Input id="name" className="rounded-full p-2 border-2" />
            </div>
            <div className="space-y-1">
              <Input id="username" type="password" className="rounded-full p-2 border-2" />
            </div>
            <div className="space-y-1">
              <Input id="username" type="confirmPassword" className="rounded-full p-2 border-2" />
            </div>

            <Button>Sign Up</Button>


      </TabsContent>
    </Tabs>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth


