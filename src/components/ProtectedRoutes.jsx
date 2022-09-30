import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({userName}) => {

    return userName ? <Outlet/> : <Navigate to='/'/>

};