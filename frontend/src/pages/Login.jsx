import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../store/useAuthStore'

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

const Login = () => {
  const {login, isloggedIn} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema)
    })
    const onSubmit = async (data) => {
        try {
          await login(data)
          console.log('Login data', data);
        } catch (error) {
            console.error('Login error', error)
        }
    }
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="mb-4 position-relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password')}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button
          type="submit"
          disabled={isloggedIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {!isloggedIn ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a>
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Forgot your password? <a href="/reset-password" className="text-blue-500 hover:text-blue-700">Reset it</a>    
        </p>
      </form>
    </div>
  )
}

export default Login