import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { FaRobot, FaSearch, FaUserCircle } from 'react-icons/fa'


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profile, setprofile] = useState(false);
  return (
    <header className="">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl  items-center justify-between p-6 px-12 lg:px-14">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <FaRobot className='text-3xl text-indigo-500' />
          </a>
        </div>
        <div className="flex lg:hidden">
          <div
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="h-7 text-indigo-600 w-7" />
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">

          <a href="#home" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Home
          </a>

          <a href="#features" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Features
          </a>

          <a href="#pricing" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Pricing
          </a>

          <a href="#" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Contact
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
          {!localStorage.getItem("token") ? <a href="/login" className="text-sm font-semibold leading-6 px-4 p-1 rounded  text-white border hover:shadow-lg shadow-white hover:rounded-xl" style={{ transition: 'all 0.4s ease' }}>
            Log in
          </a> : <div className='flex gap-6'>

            <div className='flex items-center pr-2 rounded bg-white'>
              <input type="text" className='p-1.5 min-w-[230px] bg-white px-2 rounded outline-none text-black text-sm' placeholder='Search bot' />
              <FaSearch className='text-black' />
            </div>
            <div className="text-sm font-semibold leading-6 rounded  text-white flex items-center cursor-pointer " style={{ transition: 'all 0.4s ease' }}>
              <FaUserCircle className='text-3xl text-indigo-400 bg-black rounded-full' onMouseEnter={() => {
                setprofile(true);
              }} onMouseLeave={() => {
                setprofile(false);
              }} />
            </div>
          </div>}
        </div>

        {profile && <div className='absolute top-[56px] z-50 rounded bg-[#0f1c5c] min-w-[150px] right-4 py-3' onMouseEnter={() => setprofile(true)} onMouseLeave={() => setprofile(false)}>
          <div className='p-2 hover:bg-[#334c65]  px-3 font-semibold text-sm cursor-pointer'>Settings</div>
          <a href='/your-bots' className='block p-2 hover:bg-[#334c65]  px-3 font-semibold text-sm cursor-pointer'>Your bots</a>
          <a href="/profile" className='block p-2 hover:bg-[#334c65]  px-3 font-semibold text-sm cursor-pointer'>Profile</a>
          <div className='p-2 hover:bg-[#334c65]  px-3 font-semibold text-sm cursor-pointer' onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>Logout</div>
        </div>}
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#07062b] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <FaRobot className='text-3xl text-indigo-700' />
            </a>
            <div
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5  rounded-md p-2.5 text-gray-500"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:text-white"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:text-white"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:text-white"
                >
                  Company
                </a>
              </div>
              <div className="py-6 text-center">
                <a
                  href="#"
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500  border border-gray-800 create w-[90%] mx-auto "
                >
                  Log in
                </a>
              </div>


            </div>

          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
