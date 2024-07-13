import React, { useEffect, useContext } from 'react'
import Editor from '../components/Editor';
import Media from '../components/Media';
import { PeerContext } from "../PeerJS/PeerProvider";

function Room() {
    const { peer, clientid, myid, setMyid, setReceivingCall, setReceivingConn, callAccepted, setCallAccepted } = useContext(PeerContext);


    useEffect(() => {
        peer.on('open', (id) => {
            setMyid(id)
        });
        
        peer.on('connection', (conn) => {
            setCallAccepted(true);
            setReceivingConn(conn)
        });

        peer.on('call', (call) => {
            setReceivingCall(call)
        });

    }, [])
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto grid  grid-cols-3 items-center gap-x-5 gap-y-10 px-20 py-6  lg:max-w-full lg:grid-cols-5 lg:px-5">
                    <div className='col-span-2'>
                        <Media />
                    </div>
                    <div className="grid col-span-3 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">
                        {clientid === "" && !callAccepted && (<div className='text-center'>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Share the below room id with the Candidate</h2>
                            <p className="mt-4 text-gray-500">
                                {myid}
                            </p>
                        </div>)}
                        {callAccepted && (<Editor />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room