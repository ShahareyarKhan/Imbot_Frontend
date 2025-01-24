import { useState, useRef, useEffect, useContext } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaRobot, FaSearch, FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState([]);
  const searchBoxRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.post('https://imbot-backend.vercel.app/api/auth/search', { query });
        if (response.data.success) {
          setSearchResults(response.data.users);
        }
      } catch (error) {
        console.error('Search failed', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className={`sticky top-0 bg-[#06012b] z-40 ${window.location.pathname.split('/')[1]==='bot' ? 'hidden' : 'block'}`}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-14">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <FaRobot className='text-3xl text-indigo-500' />
          </a>
        </div>
        {localStorage.getItem("token") && (
          <div
            className="w-[50%] flex lg:hidden items-center pr-2 rounded bg-white max-w-[300px]"
            onClick={() => setSearchBox(true)}
          >
            <input
              type="text"
              className='p-1.5 w-[100%] bg-white px-2 rounded outline-none text-black text-sm'
              placeholder='Search User'
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className='text-black' />
          </div>
        )}
        <div className="flex lg:hidden items-center gap-5">
          {!localStorage.getItem("token") ? (
            <a href="/login" className="text-xs font-semibold leading-6 bg-indigo-300 px-2 py-1 rounded text-black" style={{ transition: 'all 0.4s ease' }}>
              Log in
            </a>
          ) : (
            <div className='flex gap-6'>
              <div className="text-sm font-semibold leading-6 rounded text-white flex items-center cursor-pointer" style={{ transition: 'all 0.4s ease' }}>
                <FaUserCircle className='text-2xl text-indigo-400 bg-black rounded-full' onMouseEnter={() => setProfile(true)} onMouseLeave={() => setProfile(false)} />
              </div>
            </div>
          )}
          <div type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <Bars3Icon aria-hidden="true" className="h-7 text-indigo-600 w-7" />
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="/#home" className="nav-link text-sm font-semibold leading-6 text-gray-300">Home</a>
          <a href="/#features" className="nav-link text-sm font-semibold leading-6 text-gray-300">Features</a>
          <a href="/#pricing" className="nav-link text-sm font-semibold leading-6 text-gray-300">Pricing</a>
          <a href="/#contact" className="nav-link text-sm font-semibold leading-6 text-gray-300">Contact</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
          {!localStorage.getItem("token") ? (
            <a href="/login" className="text-sm font-semibold leading-6 px-4 p-1 rounded text-white border hover:shadow-lg shadow-white hover:rounded-xl" style={{ transition: 'all 0.4s ease' }}>
              Log in
            </a>
          ) : (
            <div className='flex gap-6'>
              <div className='flex items-center pr-2 rounded bg-white' onClick={() => setSearchBox(true)}>
                <input
                  type="text"
                  className='p-1.5 min-w-[230px] bg-white px-2 rounded outline-none text-black text-sm'
                  placeholder='Search User'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <FaSearch className='text-black' />
              </div>
              <div className="text-sm font-semibold leading-6 rounded text-white flex items-center cursor-pointer" style={{ transition: 'all 0.4s ease' }}>
                <FaUserCircle className='text-3xl text-indigo-400 bg-black rounded-full' onMouseEnter={() => setProfile(true)} onMouseLeave={() => setProfile(false)} />
              </div>
            </div>
          )}
        </div>

        {profile && (
          <div className='absolute top-[54px] z-50 rounded bg-[#0f1c5c] min-w-[150px] right-4 py-3' onMouseEnter={() => setProfile(true)} onMouseLeave={() => setProfile(false)}>
            <div className='p-2 hover:bg-[#334c65] px-3 font-semibold text-sm cursor-pointer'>Settings</div>
            <a href='/your-bots' className='block p-2 hover:bg-[#334c65] px-3 font-semibold text-sm cursor-pointer'>Your bots</a>
            <a href={`/profile/${user && user._id}`} className='block p-2 hover:bg-[#334c65] px-3 font-semibold text-sm cursor-pointer'>Profile</a>
            <div className='p-2 hover:bg-[#334c65] px-3 font-semibold text-sm cursor-pointer' onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}>Logout</div>
          </div>
        )}
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden ">
        <div className="fixed inset-0 " />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#07062b] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <FaRobot className='text-3xl text-indigo-700' />
            </a>
            <div type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-500">
              <XMarkIcon aria-hidden="true" className="h-6 w-6 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a href="#home" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:text-white" onClick={() => { setMobileMenuOpen(false) }}>Home</a>
                <a href="#features" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:text-white" onClick={() => { setMobileMenuOpen(false) }}>Features</a>
                <a href="#pricing" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:text-white" onClick={() => { setMobileMenuOpen(false) }}>Pricing</a>
                <a href="#contact" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:text-white" onClick={() => { setMobileMenuOpen(false) }}>Contact</a>
              </div>
              <div className="py-6 text-center"></div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {searchBox && (
        <div ref={searchBoxRef} className='w-[100%] md:w-[400px] absolute top-[58px] flex justify-center items-center md:right-[100px]'>
          <div className='z-50 bg-[#150f48] w-[90%] max-w-[400px] mx-auto right-4 py-3 min-h-[90px] px-4'>
            <p className='text-white text-sm font-semibold'>Search results</p>
            <hr className='my-2' />
            <div className='flex flex-col gap-2'>
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <a href={`/profile/${user._id}`} key={user._id} className='flex gap-2'>
                    <div className='flex flex-col'>
                      <p className='text-white text-sm font-semibold'>{user.name}</p>
                      <p className='text-gray-400 text-xs font-semibold'>@{user.email}</p>
                    </div>
                  </a>
                ))
              ) : (
                <p className='text-gray-400 text-xs font-semibold'>No results found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
