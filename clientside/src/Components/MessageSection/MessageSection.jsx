
import react from 'react';
import axios from 'axios';
import WriteMessage from '../WriteMessage/WriteMessage';

// leftSection of Chat page

const MessageSection = () => {

    // const baseUrl = 'http://localhost:3002'

    // const { state, dispatch } = useContext(GlobalContext);

    return (
        <>
            <div className='flex justify-center h-screen items-center border border-t-0 border-b-0 border-r-[#1f2124] border-l-0 w-2/3'>
                <div className='flex flex-col space-y-8 h-full w-full'>
                    {/* <div className=''>
                        <div className='text-3xl font-bold'>Select a message</div>
                        <div className='text-sm'>
                            Choose from your existing conversations, start a new one, or just keep swimming.
                        </div>
                    </div>
                    <div>
                        <button className='text-xl font-bold rounded-3xl px-6 bg-[#1d9bf0] p-3'>
                            New message
                        </button>
                    </div> */}
                    <WriteMessage />
                </div>
            </div>
        </>

    );
}

export default MessageSection;