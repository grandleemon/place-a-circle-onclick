import {useEffect, useRef, useState} from 'react'
import './App.css'

type CircleCoordinates = {
  screenX: number
  screenY: number
}

function App() {
  const [coordinates, setCoordinates] = useState<CircleCoordinates[]>([])
  const [deletedCoordinates, setDeletedCoordinates] = useState<CircleCoordinates[]>([])
  const undoRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    window.addEventListener('mousedown', ({x, y, target}) => {
      if (target === undoRef.current || target === restoreRef.current) return;
      setCoordinates(prevState => [...prevState, {screenX: x, screenY: y}])
    })
  }, [])

  const handleRemoveCoordinate = () => {
    const copy = [...coordinates]
    const lastEl = copy.pop()
    setCoordinates(copy)
    setDeletedCoordinates(prevState => [...prevState, lastEl!])
  }

  const handleRestoreCoordinate = () => {
    const coordinatesCopy = [...coordinates]
    const deletedCoordinatesCopy = [...deletedCoordinates]
    const firstEl = deletedCoordinatesCopy.pop()
    coordinatesCopy.push(firstEl!)
    setCoordinates(coordinatesCopy)
    setDeletedCoordinates(deletedCoordinatesCopy)
  }

  return (
    <div className="App">
      <div className='btns'>
        <button onClick={handleRemoveCoordinate} ref={undoRef} disabled={!coordinates.length}>undo</button>
        <button onClick={handleRestoreCoordinate} ref={restoreRef} disabled={!deletedCoordinates.length}>next</button>
      </div>
      {coordinates.map((coordinate, i) => (
        <div key={i} className='circle' style={{top: coordinate.screenY - 50, left: coordinate.screenX - 50}}></div>
      ))}
    </div>
  )
}

export default App
