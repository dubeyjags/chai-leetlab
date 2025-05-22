import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const signupSchema = z.object({
    username: z.string().min(3, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {signup, isSigninup} = useAuthStore();

    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    })
    const onSubmit = async (data) => {
        try {
          await signup(data)
         console.log('Signup data', data);
         
        } catch (error) {
            console.error('Signup error', error)
          
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            // onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Enter your username"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
            <div className="relative">
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

        </div>
        </div>
        <button
          type="submit"
          disabled={isSigninup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {isSigninup ? 'Signing up...' : 'Signup'}
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
        </p>
        <p className="mt-4 text-center text-gray-600">
          <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">Forgot Password?</a>
        </p>
      </form>
    </div>
  )
}

export default Signup