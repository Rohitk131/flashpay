import Link from 'next/link'
export default function Header(){
    return(
        <div className="flex justify-start pt-4">
      <header className="px-4 lg:px-6 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <Link className="flex items-center justify-center" href="/">
          <img src='https://i.ibb.co/x8Hv1xg/flashpay-05-removebg-preview-1.png' width={40} height={40} />
          <span className="ml-2 text-xl font-bold">Flash Pay</span>
        </Link>
      </header>
      </div>

    )
}