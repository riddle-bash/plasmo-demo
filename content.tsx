import { useEffect, useState } from "react"

import Container from "~src/components/layouts/Container"

import "./styles.css"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

function IndexPopup() {
  const [data, setData] = useState("")
  const [pressedKeys, setPressedKeys] = useState("<Press keyboard to show>")
  const [highlightedText, setHighlightedText] = useState(
    "<Highlight with mouse to show>"
  )

  useEffect(() => {
    function handleSelection() {
      const selectedText = window.getSelection().toString()
      setHighlightedText(selectedText)
    }

    document.addEventListener("mouseup", handleSelection)

    return () => {
      document.removeEventListener("mouseup", handleSelection)
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      const keyPressed = event.key
      setPressedKeys((prevKeys) => prevKeys + keyPressed + " ")
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const [tasks, setTasks] = useState([])
  async function submitHandler() {
    setTasks([...tasks, data])
    setData("")
  }

  function removeTask(index) {
    setTasks(tasks.filter((task: string, i: number) => i !== index))
  }

  return (
    <Container>
      <div className="">
        <input
          className="rounded-md my-3 p-2 border-2 border-gray-300 hover:bg-gray-100"
          onChange={(e) => setData(e.target.value)}
          value={data}
          placeholder="Add new task"
        />
      </div>
      <div className="justify-center w-full flex">
        <button
          type="submit"
          disabled={data.length === 0}
          onClick={submitHandler}
          className="bg-green-100 rounded-full px-4 py-2 disabled:bg-gray-400 hover:bg-green-700 hover:text-white text-gray-800 disabled:text-gray-500 font-medium">
          Add task
        </button>
      </div>
      <div className="flex flex-col gap-1 py-5">
        {tasks?.length !== 0 ? (
          tasks?.map((task, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-100 rounded-xl px-4 py-1 items-center hover:bg-gray-200">
              <p>{task}</p>

              <button
                aria-label="Remove task"
                type="button"
                className="items-center justify-center px-2 py-0.5 rounded-full bg-red-100 hover:bg-red-500 hover:text-white"
                onClick={() => removeTask(index)}>
                <span className="">X</span>
              </button>
            </div>
          ))
        ) : (
          <p className="mx-auto w-fit my-8">No tasks yet!</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        <span className="text-md font-medium">Your keyboard listener:</span>
        <div className="rounded-2xl bg-white p-2 w-full text-center flex flex-col gap-1">
          <p>{pressedKeys}</p>
        </div>
        <span className="text-md font-medium">Your mouse listener:</span>
        <div className="rounded-2xl bg-white p-2 w-full text-center flex flex-col gap-1">
          <p>{highlightedText}</p>
        </div>
      </div>
    </Container>
  )
}

export default IndexPopup
