import SigninPg from '@/components/SigninPg'
import Header from '@/components/HeaderNavbar'
export default function Signin(){
    return(
        <div className='h-screen'>
            <Header/>
        <div className='flex h-4/5 flex-col items-center justify-center sm:px-0 px-4'>
            <SigninPg/>
        </div>
        </div>
    )
}