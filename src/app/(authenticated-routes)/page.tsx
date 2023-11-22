import HomeComponent from "@/components/home/homeComponent";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  const response = await fetch('http://127.0.0.1:5000/users/home', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${session?.token}`
    },

  })

  const data = await response.json()
  if (response.status === 401) {
    return <HomeComponent />
  }

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center space-y-2">
      <h1 className="text-3xl text-black">Ola, {data.user.name}</h1>
    </div>
  )
}