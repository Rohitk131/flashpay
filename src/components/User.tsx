import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner'; 

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://flashpayapp.vercel.app/api/users', { params: { filter } });
        console.log(response.data); 
        setUsers(response.data.users); // Adjusted to match the new key "users" in the API response
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [filter]);
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="font-bold text-2xl mb-4 text-black">Your Friends</div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={handleSearchChange}
          className="w-full sm:w-1/2 lg:w-1/4 px-4 py-2 border rounded-full border-gray-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        {users.length > 0 ? (
          users.map(user => <UserCard key={user._id} user={user} router={router} />)
        ) : (
          <p className="text-gray-100">No users found</p>
        )}
      </div>
    </div>
  );
}

interface UserCardProps {
  user: User;
  router: any; // Use appropriate type if available
}

function UserCard({ user, router }: UserCardProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-2xl p-4 flex items-center justify-between flex-col sm:flex-row">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <div className="rounded-full h-12 w-12 sm:h-16 sm:w-16 bg-green-200 flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-800">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="flex flex-col ">
          <span className="text-md sm:text-lg font-semibold text-gray-900">
            {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
          </span>
          <span className="text-sm text-gray-600">
            {user.username}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full sm:w-auto">
        <button
          className="bg-green-500 p-2 sm:p-3 sm:px-4 rounded-2xl text-white font-semibold w-full sm:w-auto "
          onClick={() => {
            router.push(`/send?id=${user._id}&name=${user.firstName}`);
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
