import { useAuth } from '../context/Auth'

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-full">
      <h1 className="text-4xl font-bold text-red-500">Hello{user ? ` ${user.email}` : ''}!</h1>
    </div>
  )
}
