import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../core';
import moment from 'moment'

const WriteMessage = () => {

    let { id } = useParams()

    const [writeMessage, setWriteMessage] = useState('')
    const [insertMessage, setInsertMessage] = useState(false)
    const [prevMessage, setPrevMessage] = useState('')
    const [conversation, setConversation] = useState('')
    const [getRecipientProfile, setRecipientProfile] = useState('')

    const getProfile = async (e) => {

        try {

            const response = await axios.get(`${baseUrl}/api/v1/profile/${id}`, {
                withCredentials: true
            })
            console.log('response', response.data)
            setRecipientProfile(response.data)
            // console.log(conversation)

        } catch (error) {
            console.log('error getting users', error)
        }

    }

    const getMessage = async (e) => {

        try {

            const response = await axios.get(`${baseUrl}/api/v1/message/${id}`, {
                withCredentials: true
            })
            console.log('response', response.data)
            setConversation(response.data)
            console.log(conversation)

        } catch (error) {
            console.log('error getting users', error)
        }

    }


    useEffect(() => {

        getProfile()
        getMessage()

    }, [id])


    useEffect(() => {
        if (insertMessage) {
            getMessage()
            setInsertMessage(false)
        }
    }, [insertMessage])


    const sendMessage = async (e) => {
        if (e) { e.preventDefault(); }
        try {

            const response = await axios.post(`${baseUrl}/api/v1/message`, {
                toUserId: id,
                text: writeMessage,
            }, {
                withCredentials: true
            })
            console.log('response', response.data)
            setInsertMessage(true)

            // setUser(response.data)

        } catch (error) {
            console.log('error getting users', error)
        }

    }


    return (
        <>
            <div className=' flex flex-col justify-between h-full w-full  '>
                <div className='p-2 font-bold border-b border-b-[#1f2124]'>{getRecipientProfile.username}</div>
                <div className='overflow-y-scroll h-2/3'>
                    {(conversation?.length) ?
                        conversation?.map((eachMessage, index) => {
                            return <div className='flex flex-col ' key={index}>
                                <div>
                                    {eachMessage.fromUser.username}
                                </div>
                                <span>
                                    {moment(eachMessage.createdAt).fromNow()}
                                </span>
                                <div>
                                    {eachMessage.text}
                                </div>
                            </div>
                        })
                        :
                        null
                    }
                    {conversation?.length === 0 ? 'no messages found' : null}
                    {conversation?.length === null ? 'loading' : null}
                </div>
                <form onSubmit={sendMessage}>
                    <input type='text' placeholder='Enter Text' className='text-black w-11/12 p-2' onChange={(e) => {
                        setWriteMessage(e.target.value)
                    }} />
                    <button className='' type='submit' > submit </button>
                </form>
            </div>
        </>


    )
}

export default WriteMessage
