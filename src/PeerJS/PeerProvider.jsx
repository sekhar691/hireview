import React, { createContext, useState } from 'react'
import { Peer } from "peerjs";


export const PeerContext = createContext(null);

export const PeerProvider = (props) => {
  const [myid, setMyid] = useState('');
  const [myName, setMyName] = useState('');
  const [clientid, setClientid] = useState('');
  const [clientiName, setClientName] = useState('');
  const [receivingCall, setReceivingCall] = useState(null);
  const [receivingConn, setReceivingConn] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);


  const peer = new Peer();


  return (
    <PeerContext.Provider value={{ peer, setClientid,setMyName, clientiName,setClientName, clientid, myid,myName,  setMyid, receivingCall, setReceivingCall, receivingConn,setReceivingConn,callAccepted, setCallAccepted }}>
    {props.children}
  </PeerContext.Provider>
  );
};
