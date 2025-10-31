import React from 'react'
import { headerLogo } from '../assets/images'
import { navLinks } from '../constants'
import { hamburger } from '../assets/icons'

const Nav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
        document.getElementById('overlay').classList.remove('hidden');
    };

    return (
        <>
            <header className='padding-x py-4 z-50 w-full bg-transparent'>
                <nav className='flex justify-between items-center max-container'>
                    <a href="#home" className='left-0'>
                        <h1 className='text-3xl font-palanquin font-extrabold '>Step <span className='text-red-700'>Up</span> </h1>
                    </a>

                    <ul className='flex-1 flex justify-center items-center gap-16 max-md:hidden'>
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className='font-montserrat leading-normal text-lg text-slate-900'>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='hidden max-md:block' onClick={toggleSidebar}>
                        <img src={hamburger} alt="hamburger" width={25} height={25} />
                    </div>
                </nav>
            </header>
            {isSidebarOpen && (
                <>
                    <div
                        id="overlay"
                        className={`fixed inset-0 bg-black bg-opacity-20  ${isSidebarOpen ? 'block' : 'hidden'
                            }`}
                        onClick={toggleSidebar}
                    ></div>
                    <aside className='fixed top-0 right-0 w-60 max-md:w-43 h-full bg-white shadow-xl z-50'>
                        <button onClick={toggleSidebar} className='absolute top-4 right-10'>
                            <span className='text-2xl text-black hover:text-slate-gray'>X</span>
                        </button>
                        <ul className='flex flex-col mt-10 justify-start p-4'>
                            {navLinks.map((item) => (
                                <li key={item.label} className='m-5'>
                                    <a href={item.href} className='asidebar text-black hover:text-slate-gray text-2xl font-palanquin font-bold'>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </>
            )}
        </>
    )
}

export default Nav
