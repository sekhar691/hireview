import React, { useEffect, useContext, useState, useCallback, useRef } from 'react'
import { PeerContext } from "../PeerJS/PeerProvider";
import axios from 'axios'
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

const sampleDoc = { "cpp": '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\ncout<<"Hello World";\nreturn 0;\n}', "python3": "print('Hello World')", "java": 'public class Main\n{\npublic static void main(String[] args) {\nSystem.out.println("Hello World");\n}\n}\n' }
const api_key = process.env.REACT_APP_API_Key

const Editor = () => {
  const { myName, setClientName, receivingCall, receivingConn } = useContext(PeerContext);
  const [language, setlanguage] = useState("cpp");
  const [doc, setDoc] = useState(sampleDoc["cpp"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {

    receivingConn.on('data', function (data) {
      if (data.candidate) {
        setClientName(data.candidate)
        receivingConn.send({ "interviewer": myName })
      }
      else if (data.interviewer) {
        setClientName(data.interviewer)
      }
      else if (data.input != null) {
        setInput(data.input)
      }
      else if (data.output != null) {
        setOutput(data.output)
      }
      else if (data.language == null) {
        setDoc(data.doc)
      }
      else {
        setlanguage(data.language)
        setDoc(sampleDoc[data.language])
      }
    });

  }, [receivingCall, receivingConn, doc, language])





  const onChangeCode = useCallback((value, viewUpdate) => {
    setDoc(value)
    receivingConn.send({ "doc": value, "language": null, "output": null, "input": null });

  }, [receivingConn]);

  const changeInput = useCallback((event) => {
    setInput(event.target.value)
    receivingConn.send({ "input": event.target.value, "doc": null, "language": null, "output": null });

  }, [receivingConn]);

  const handleChange = useCallback((event) => {
    setlanguage(event.target.value);
    setDoc(sampleDoc[event.target.value])
    receivingConn.send({ "doc": null, "language": event.target.value });

  }, [receivingConn, doc, language]);


  const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    data: {
      language: language,
      version: 'latest',
      code: doc,
      input: input
    }
  };

  const compile = async () => {
    try {
      const response = await axios.request(options);
      setOutput(response.data.output)
      receivingConn.send({ "doc": null, "language": null, "output": response.data.output, "input": null });
      console.log(response.data.output);
    } catch (error) {
      setOutput("Error while compiling!")
      console.error(error);
    }
  }


  const EXTENSIONS = {
    "cpp": [cpp()],
    "python3": [python()],
    "java": [java()],
  };

  return (
    <div>

      <div className='p-1 flex justify-between items-center border-2 rounded-t-lg'>
        <select
          value={language}
          onChange={handleChange}
          id="country"
          name="country"
          className="h-full rounded-md border-2 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        >
          <option value={"cpp"} >Cpp</option>
          <option value={"python3"}>Python</option>
          <option value={"java"}>Java</option>
        </select>
        <button
          type="submit"
          onClick={compile}
          className="block  rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Run Code
        </button>
      </div>
      <CodeMirror
        value={doc}
        height="400px"
        theme="dark"
        extensions={[EXTENSIONS[language]]}
        onChange={onChangeCode}
      />

      <div className='flex border-2 rounded-b-lg'>
        <div className='w-1/3'>
          <div className="col-span-full m-3">
            <label htmlFor="input" className="block text-lg font-medium leading-6 text-gray-900">
              Input
            </label>
            <div className="mt-2">
              <textarea
                id="input"
                name="input"
                rows={7}
                value={input}
                onChange={changeInput}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className='w-2/3'>
          <div className="col-span-full m-3">
            <label htmlFor="output" className="block text-lg font-medium leading-6 text-gray-900">
              Output
            </label>
            <div className="mt-2">
              <textarea
                id="output"
                name="output"
                rows={7}
                value={output}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor