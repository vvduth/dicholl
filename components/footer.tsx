import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t'>
        <div className="p-5 flex-center">
            {currentYear} &copy; Dichol
        </div>
    </footer>
  )
}

export default Footer
