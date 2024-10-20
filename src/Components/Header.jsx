import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {  PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { FaRobot } from 'react-icons/fa'



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 px-12 lg:px-14">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
          <FaRobot className='text-3xl text-indigo-500'/>
            
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

          <a href="#" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Pricing
          </a>
          
          <a href="#" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Features
          </a>
          <a href="#" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Documentation
          </a>
          <a href="#" className="nav-link text-sm font-semibold leading-6 text-gray-300">
            Contact
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold leading-6 text-gray-400">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#07062b] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <FaRobot className='text-3xl text-indigo-700'/>
            </a>
            <div
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5  rounded-md p-2.5 text-gray-500"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6 cursor-pointer" />
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
