import { Link } from 'react-router'

export const Home = () => {
  return (
    <div className='flex gap-4 flex-col justify-center items-center mt-20 text-2xl'>
        <p>Home</p>
        <Link to='/dashboard' className='border-1 bg-green-400 rounded p-1'>Dashboard</Link>
    
    </div>
  )
}
