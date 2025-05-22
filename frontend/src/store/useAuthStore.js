import {create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninup: false,
    isloggedIn: false,
    isCheckingAuth: false,
    
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const response = await axiosInstance.get('/auth/check')
            console.log('checkAuth response', response);
            
            set({ authUser: response.data.user, isloggedIn: true, isCheckingAuth: false })
            toast.success('Session is still active.')
        } catch (error) {
            set({ authUser: null, isloggedIn: false, isCheckingAuth: false })
            toast.error('Session expired. Please login again.')
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (userData) => {
        set({ isSigninup: true })
        try {
            const response = await axiosInstance.post('/auth/register', userData)
            console.log('signUp response', response);
            set({ authUser: response.data.user, isloggedIn: true, isSigninup: false })
            toast.success('Signup successful. Welcome!')
        } catch (error) {
            console.error('signUp error', error);
            toast.error('Signup failed. Please try again.')
        }
        finally {
            set({ isSigninup: false })
        }
    },
    login: async (userData) => {
        set({ isSigninup: true })
        try {
            const response = await axiosInstance.post('/auth/login', userData)
            console.log('login response', response);
            set({ authUser: response.data.user, isloggedIn: true, isSigninup: false })
            toast.success('Login successful. Welcome back!')
        } catch (error) {
            console.error('login error', error);
            toast.error('Login failed. Please check your credentials.')
        }
        finally {
            set({ isSigninup: false })
        }
    },
    logout: async () => {
        set({ isSigninup: true })
        try {
            const response = await axiosInstance.post('/auth/logout')
            console.log('logout response', response);
            set({ authUser: null, isloggedIn: false, isSigninup: false })
            toast.success('Logout successful. See you soon!')
        } catch (error) {
            console.error('logout error', error);
            toast.error('Logout failed. Please try again.')
        }
        finally {
            set({ isSigninup: false })
        }
    },
}))