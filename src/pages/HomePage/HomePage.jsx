import React from 'react';
import AddTask from './AddTask/AddTask';
import AllTask from './AllTask/AllTask';

const HomePage = () => {
    return (
        <div>
            <AddTask></AddTask>
            <AllTask></AllTask>
        </div>
    );
};

export default HomePage;