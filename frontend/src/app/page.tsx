import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex flex-1 justify-center items-center bg-white'>
      <div className='flex flex-col items-center space-y-6'>
        <div className='text-6xl hover:text-8xl text-gray-800 font-bold uppercase drop-shadow-lg animate-pulse hover:text-red-800 transition-all duration-1000'>Accident ?</div>
        <div className='flex flex-row space-x-4 text-black'>
            <a href='/home'>
              <div className=' p-2 border-2 border-black rounded-md hover:bg-black hover:text-white transition-all'>Home</div>
            </a>
            <a href='/upload'>
            <div className=' p-2 border-2 border-black rounded-md hover:bg-black hover:text-white transition-all'>Upload</div>
            </a>
        </div>
      </div>
    </div>
  )
}
