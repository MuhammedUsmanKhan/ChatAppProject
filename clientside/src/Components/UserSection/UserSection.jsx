import react, { useEffect, useState } from 'react';
import { MailPlus, Settings } from "lucide-react";
import axios from 'axios';
import { baseUrl } from '../../core';
import { Link } from 'react-router-dom';

// leftSection of Chat page

const UserSection = () => {

    // const baseUrl = 'http://localhost:3002'
    const [searchTerm, setSearchTerm] = useState('');
    const [User, setUser] = useState(null);
    // const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = async (e) => {
        if (e) { e.preventDefault(); }
        try {

            const response = await axios.get(`${baseUrl}/api/v1/users?q=${searchTerm}`, {
                withCredentials: true
            })
            console.log('response', response.data)
            setUser(response.data)

        } catch (error) {
            console.log('error getting users', error)
        }

    }

    return (
        <>
            <div className='flex flex-col w-1/3 border border-t-0 border-b-0 border-r-[#1f2124] border-l-[#1f2124] '>
                <div className='flex justify-between p-4'>
                    <div className='text-2xl font-bold'>Messages</div>
                    <div className='flex items-center space-x-4 text-2xl'>
                        <Settings />
                        <MailPlus />
                    </div>
                </div>
                <form className='p-4 space-y-6 ' onSubmit={getUsers}>
                    <div className='flex justify-between w-full'>
                        <input type='search' className='rounded-full text-black pl-3 w-2/3 ' onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }} />
                        <button className='bg-[#1d9bf0] p-2 px-3 font-semibold rounded-full' type='submit'>Search</button>
                    </div>

                    {/* <button className='font-bold p-3 px-8 bg-[#1d9bf0] rounded-3xl'>Write a message</button> */}
                </form>
                {
                    User?.map((eachUser, index) => {
                        return <div key={index} className=''>
                            <Link to={`/userchat/${eachUser.id}`}>
                                <h2>{eachUser.username}</h2>
                                <div className='flex flex-col'>
                                    <span>{eachUser.email}</span>
                                    {eachUser.me ? <span>me</span> : null}
                                </div>
                            </Link>
                        </div>
                    })
                }
                {User?.length === 0 ? 'no user found' : null}
                {User?.length === null ? 'loading' : null}
            </div>
        </>

    );
}

export default UserSection;