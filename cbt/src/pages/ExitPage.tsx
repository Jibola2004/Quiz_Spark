import { Link } from "react-router"

const ExitPage = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center mt-10">
     <p className="text-2xl">Thank you for Taking this quiz.</p>
     <Link to={'/'} className="underline text-xl">Return Home</Link>
    </div>
  )
}

export default ExitPage