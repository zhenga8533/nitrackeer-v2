import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
    return (
        <>
            <div className='dashboard'>
                <p>testing</p>
                <Outlet />
            </div>
        </>
    )
};
