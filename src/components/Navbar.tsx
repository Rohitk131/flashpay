"use client"; 
import { useRouter } from 'next/navigation';

interface NavbarProps {
  username: string;
}

export default function Navbar({ username }: NavbarProps) {
  const router = useRouter(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/signin'); 
  };

  return (
    <div className="flex justify-center items-center pt-2 px-2 sm:px-0 flex-col">
      <div className="flex flex-col sm:flex-row p-2 shadow-2xl rounded-xl sm:rounded-full w-full sm:w-1/2 justify-between bg-black items-center px-7 mx-2">
        <div className="flex flex-row items-center mb-2 sm:mb-0">
          <img src="https://i.ibb.co/x8Hv1xg/flashpay-05-removebg-preview-1.png" width={40} height={40} />
          <h1 className="text-2xl font-bold text-white pl-2">FlashPay</h1>
        </div>
        <div className="flex flex-row items-center justify-between w-full sm:w-auto">
          <div className="flex flex-row items-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
              width={30}
              height={30}
              className="rounded-full bg-white"
              
            />
            <h1 className="text-white text-lg font-semibold ml-4 sm:block">
              Hello, {username}
            </h1>
          </div>
          <button
            className="bg-lime-500 text-white p-2 rounded-full shadow-xl ml-4 sm:ml-8 px-4 hover:bg-lime-700 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      
    </div>
  );
}
