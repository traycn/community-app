import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";


const UserNav = async () => { 

  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings
  const userInfo = await fetchUser(user.id);

  // USER INFO:  {
  //   _id: new ObjectId("6535dfc95511b7094edfb8e9"),
  //   id: 'user_2X90k4ClanuIL5u1gr8qYy1pqFP',
  //   __v: 0,
  //   bio: 'The dev of this site.',
  //   image: 'https://uploadthing.com/f/d8f25f14-ac78-46b0-8306-bd40ea10c6b9-2474x.png',
  //   name: 'ToT',
  //   onboarded: true,
  //   threads: [],
  //   username: 'tdev',
  //   posts: [ new ObjectId("6536aa37de712d828f254459") ]
  // }

  return (

    <DropdownMenu>
      <DropdownMenuTrigger className="no-focus cursor-pointer object-contain">        
        <Avatar className="h-8 w-8">
          <AvatarImage src={`${userInfo?.image || ""}`} alt="User Profile Image" />
          <AvatarFallback>{`:-)`}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-48">
        <DropdownMenuLabel>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/edit/${user.id}`}>
            Edit Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {/* TODO: Link for App Support */}
          <Link href="#">
            Support
          </Link>
        </DropdownMenuItem>
        {/* TODO: Account Settings && Account Privacy
        <DropdownMenuItem>
          <Link href={`/profile/edit/${user.id}`}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/profile/edit/${user.id}`}>
            Privacy
          </Link>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )



}

export default UserNav;