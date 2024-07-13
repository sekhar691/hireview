import React, { useEffect, useContext, useState, useRef } from 'react'

import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs';
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai';
import { SlCallEnd } from 'react-icons/sl';

import { PeerContext } from "../PeerJS/PeerProvider";
import { useNavigate } from "react-router-dom"





const Media = () => {
  const [stream, setStream] = useState();
  const [video, setvideo] = useState(true);
  const [audio, setaudio] = useState(true);
  const [meetstarted, setMeetstarted] = useState(false);

  const navigate = useNavigate();
  const { peer, clientid, setClientid, myName, clientiName, receivingCall, setReceivingCall, receivingConn, setReceivingConn, callAccepted, setCallAccepted } = useContext(PeerContext);

  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    var getUserMedia = navigator.getUserMedia || navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ audio: true, video: true }, (mediaStream) => {
      setStream(mediaStream)
      myVideoRef.current.srcObject = mediaStream;
      // myVideoRef.current.play();
    });


    peerInstance.current = peer;
  }, []);




  const answerCall = (call) => {
    call.answer(stream)

    call.on('stream', function (remoteStream) {
      userVideoRef.current.srcObject = remoteStream
    })
    receivingConn.send({ "interviewer": myName })
    setMeetstarted(true)
  };

  const callUser = (id) => {

    const conn = peer.connect(id);
    const call = peerInstance.current.call(id, stream)
    setCallAccepted(true)
    call.on('stream', (remoteStream) => {
      userVideoRef.current.srcObject = remoteStream
    });
    conn.on('close', function () {
      setCallAccepted(false)
      setReceivingConn(null)
      setClientid('')
      setMeetstarted(false)
      conn.close();
      call.close();
      navigate("/")
    });
    conn.on('open', function () {
      conn.send({ "candidate": myName })
    });
    setReceivingConn(conn)
    setMeetstarted(true)
  };



  const leaveCall = () => {
    console.log(receivingConn)
    if (receivingCall) {
      receivingCall.close();
    }
    setCallAccepted(false)
    if (receivingConn) {
      receivingConn.close();
    }
    setReceivingCall(null)
    setReceivingConn(null)
    setMeetstarted(false)
    navigate("/")
  };





  const handleVideo = () => {
    if (video) {
      setvideo(false);
      stream.getTracks().forEach(function (track) {
        if (track.readyState === "live" &&
          track.kind === "video") {
          track.enabled = false;
        }
      });
    } else {
      setvideo(true);
      stream.getTracks().forEach(function (track) {
        if (track.readyState === "live" &&
          track.kind === "video") {
          track.enabled = true;
        }
      });
    }
  };
  const handleAudio = () => {
    if (audio) {
      setaudio(false);
      stream.getTracks().forEach(function (track) {
        if (track.readyState === "live" &&
          track.kind === "audio") {
          track.enabled = false;
        }
      });
    } else {
      setaudio(true);
      stream.getTracks().forEach(function (track) {
        if (track.readyState === "live" &&
          track.kind === "audio") {
          track.enabled = true;
        }
      });
    }
  };

  return (
    <div className='border-2 rounded-lg p-2'>

      {clientid && !callAccepted && (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex justify-between items-center space-x-4 my-5">
          {/* <div className="shrink-0">
          <img className="h-12 w-12" src={imageUrl.src} alt={imageAlt}>
        </div> */}
          <div>
            <div className="text-xl font-medium text-black">{"Interviewer is Waiting"}</div>
            <p className="text-slate-500">{"All the Best"}</p>
          </div>
          <button
            onClick={() => callUser(clientid)}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Start Call
          </button>
        </div>)}


      {receivingCall && callAccepted && !meetstarted && (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex justify-between items-center space-x-4 my-5">
          <div>
            <div className="text-xl font-medium text-black">{clientiName} is Incomming Call</div>
            <p className="text-slate-500">{"message"}</p>
          </div>
          <button
            onClick={() => answerCall(receivingCall)}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Accept
          </button>
        </div>)}

      {callAccepted && meetstarted && (
        <div>
          <label className="block text-xl text-left font-medium leading-6 text-gray-900 mb-2">
            {clientiName}
          </label>
          <div className='flex justify-center'>
            <video className='w-9/12 rounded-lg' preload="none" autoPlay ref={userVideoRef} />
          </div>
        </div>)}
      <br />
      <label className="block text-xl text-left font-medium leading-6 text-gray-900 mb-2">
        {myName}
      </label>
      <div className='flex justify-around pb-5'>
        <video className='w-7/12 rounded-lg' preload="none" muted autoPlay ref={myVideoRef} />
        <div className='w-1/4 flex flex-col justify-between items-center py-5'>
          {video ? (
            <button
              onClick={handleVideo}
              className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800">
              <BsFillCameraVideoFill />
            </button>
          ) : (
            <button
              onClick={handleVideo}
              className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800">
              <BsFillCameraVideoOffFill />
            </button>
          )}
          {audio ? (
            <button
              onClick={handleAudio}
              className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800">
              <AiOutlineAudio />
            </button>
          ) : (
            <button
              onClick={handleAudio}
              className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800">
              <AiOutlineAudioMuted />
            </button>
          )}


          {!clientid && (
            <button
              onClick={leaveCall}
              className="inline-flex items-center justify-center w-12 h-12 mr-2 text-white transition-colors duration-150 bg-red-700 rounded-full focus:shadow-outline hover:bg-red-800">
              <SlCallEnd />
            </button>)}
        </div>
      </div>
    </div>
  )
}

export default Media