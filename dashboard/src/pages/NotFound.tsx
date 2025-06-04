import { Link } from "react-router" 
import { Button } from "../components/ui/button"


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
      <p className="text-muted-foreground mt-4 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button className="px-6 py-2">Go Back Home</Button>
      </Link>
    </div>
  )
}

export default NotFound
