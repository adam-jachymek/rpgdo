import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import SkillDashboard from './components/Skills/Dashboard/SkillDashboard';
import Profile from './Profile';
import { useQuery } from 'react-query';
import { fetchUser } from './api/requests';
import Tasks from './components/Tasks/Tasks';
import Header from './components/Header/Header';
import Skills from './components/Skills/Skills';
import Addresses from './components/Addresses/Addresses';
import TestMongo from './TestMongo';
import getToken from './api/getToken';

const AppRoutes = () => {

    const { isLoading: userLoading, data: userData, refetch: refetchUser, isError } = useQuery(['user'], fetchUser);

    console.log("userData", userData)

    // Implement routing for a few pages
    if (!getToken() || isError) {
        return (
            <Routes>
                <Route path='/'
                    element={
                        <Login refetchUser={refetchUser} />}
                />
                <Route path='/register'
                    element={
                        <Register />}
                />
            </Routes>
        )
    }

    return (
        <>
            <Header userData={userData} refetchUser={refetchUser} />
            <Routes>
                <Route path='/'
                    element={
                        <Tasks refetchUser={refetchUser} />}
                />
                <Route path='/login'
                    element={
                        <Login />}
                />

                <Route path='/skills'
                    element={
                        <Skills />}
                />
                <Route path='/profile'
                    element={
                        <Addresses />}
                />

                {/* Pass and use params through the url (eg. users/:userId) */}
                <Route path='/skill/:id'
                    element={
                        <SkillDashboard />}
                />
                {/* Redirect programmatically using “navigate” from React Router */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </>
    )
}

export default AppRoutes
