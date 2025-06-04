import { ModeToggle } from '../mode-toggle'
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ProfileCard } from '../profile/ProfileModal'
import { useState } from 'react'
import Timer from '../Timer'

const QuizTitle = ({state}:{state:object}) => {
  type LocationState = {
  timer: number;
};
 const typedState = state as LocationState | null;

  const value = typedState?.timer || 0;
  console.log('time:',value)

  
  return (
    <div className='w-full h-6 flex justify-between items-center px-4'>
      <h1 className='text-2xl italic'>QuizSpark</h1>
      {/*<p className='text-2xl text-green-600'>45:00</p>*/}
      <Timer initialTime={value * 60} onComplete={() => alert('Time is up!')} />
      <div className='space-x-3 flex'>
       
        <p className='text-lg'>John Doe</p>
        <ProfileMenu/>
        
      </div>
    </div>
  )
}

export default QuizTitle


function ProfileMenu(){
  const [open,setOpen]=useState<boolean>(false)
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger>
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={()=>setOpen(!open)}>
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Change Theme <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


<ProfileCard open={open} setOpen={setOpen}/>
</>
  )
}