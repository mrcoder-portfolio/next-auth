import Link from "next/link";
import { getSession, useSession , signOut } from "next-auth/react"

export default function Home() {
  const {data: session} = useSession()
  function handleSignOut(){
    signOut()
  }
  return session ? User({session , handleSignOut}) : Guest()
}

// Guest

function Guest() {
  return (
    <>
    <div className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold underline">Guest Homepage</h3>

      <div className="flex justify-center space-x-4">
        <Link href={'/register'}><a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-100">Signup</a></Link>
        <Link href={'/login'}><a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-100">Login</a></Link>
      </div>
    </div>
    </>
    )
}

// Authorize User
function User({session , handleSignOut}){
  return(
    <>
      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Authorize Homepage</h3>

        <div className="details">
          <h6>{session.user.name}</h6>
          <h6>{session.user.email}</h6>
        </div>
        <div className="flex justify-center">
          <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-200 ">Sign Out</button>
        </div>
        <div className="flex justify-center">
          <Link href={'/profile'}><a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-100">Profile</a></Link>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})
  if(!session){
    return{
      redirect:{
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {session}
  }
}