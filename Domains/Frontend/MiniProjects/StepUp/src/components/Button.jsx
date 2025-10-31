import React from 'react'

const Button = ({ label, iconURL ,fullWidth}) => {
    return (
        <button className={`flex items-center text-lg leading-none bg-slate-gray 
        rounded-full text-white justify-center gap-2 px-7 py-4 
        border font-montserrat
        ${fullWidth ? 'w-full' : ''}`}>
            {label}
        </button>
    )
}

export default Button
