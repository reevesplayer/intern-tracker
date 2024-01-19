import React from 'react';

const HomePage = () => {
  return (
    <div className='w-11/12 flex flex-col gap-4 sm:w-5/6 mx-auto items-center justify-center h-screen'>
      <header>
        <h1 className='text-3xl sm:text-6xl text-center'>Intern Application Tracker</h1>
      </header>
      <div className='text-xl text-center'>
        <p>Using this web application, you can track your current internship job applications and edit their status accordingly.</p>
      </div>
    </div>
  );
}

export default HomePage;