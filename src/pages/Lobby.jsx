
import styles from "../index.css"
import React, { useState, useContext } from 'react'
import { PeerContext } from '../PeerJS/PeerProvider';
import { useNavigate } from "react-router-dom"

const Lobby = () => {
  const navigate = useNavigate();
  const { setMyName, clentid, setClientid } = useContext(PeerContext);
  const [interviewer, setInterviewer] = useState("")
  const [candidate, setCandidate] = useState("")
  const create = () => {
    setMyName(interviewer)
    setInterviewer('')
    setClientid('')
    navigate("/interview")
  }
  const join = () => {
    setMyName(candidate)
    setCandidate('')
    navigate("/interview")
  }


  return (
    <section className='px-3 w-full flex justify-center items-center flex-col'>
      <h1 className='head_text text-center'>
        <span className='orange_gradient text-center'> Interviews reimagined: live, interactive, and code-driven.</span>
        {/* Interviews reimagined: live, interactive, and code-driven. */}

        <br className='max-md:hidden' />
      </h1>
      <div className="bg-white py-24 sm:py-32 w-full">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create a Interview! </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={create}>
                <div>
                  <label htmlFor="email" className="block text-lg text-left font-medium leading-6 text-gray-900">
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={interviewer}
                      onChange={(event) => { setInterviewer(event.target.value); }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create
                  </button>
                </div>
              </form>
              <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center'>
                Unleash Candidates potential with our integrated platform for interactive interviews and real-time coding.
              </p>
            </div>
          </div>
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Join Room!</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={join}>
                <div>
                  <label htmlFor="email" className="block text-lg text-left font-medium leading-6 text-gray-900">
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={candidate}
                      onChange={(event) => { setCandidate(event.target.value); }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg text-left font-medium leading-6 text-gray-900">
                    Room Link
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={clentid}
                      onChange={(event) => { setClientid(event.target.value); }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
      <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center'>
        Connecting talents and opportunities through live interviews and code editing.
      </p>
    </section>
  )
};

export default Lobby;