import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../core';
import moment from 'moment'

const WriteMessage = () => {

    let { id } = useParams()

    const [writeMessage, setWriteMessage] = useState('')
    const [prevMessage, setPrevMessage] = useState('')
    const [conversation, setConversation] = useState('')

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

        getMessage()

    }, [])





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
            // setUser(response.data)

        } catch (error) {
            console.log('error getting users', error)
        }

    }




    return (
        <>
            <form onSubmit={sendMessage}>
                <input type='text' placeholder='Enter Text' className='text-black' onChange={(e) => {
                    setWriteMessage(e.target.value)
                }} />
                <button className='' type='submit' > submit </button>
            </form>
            {(conversation?.length) ?
                conversation?.map((eachMessage, index) => {
                    return <div className='flex flex-col' key={index}>
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
        </>


    )
}

export default WriteMessage
