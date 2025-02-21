import React from 'react';
import AllTask from './AllTask/AllTask';
import AddTask from './AddTask/AddTask';

const HomePage = () => {
    return (
        <div>
            <div className='text-center mt-4'>
            <AddTask></AddTask>
            </div>
            <AllTask></AllTask>
        </div>
    );
};

export default HomePage;