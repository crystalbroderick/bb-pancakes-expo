import SafeScreen from "@/components/SafeScreen"
import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
export default function AppLayout(){
    const {session} = useAuth()
    return !session ? <Redirect href="/signin"/> : <SafeScreen><Stack.Screen name="(tabs)" options={{ headerShown: true }} /></SafeScreen>
}