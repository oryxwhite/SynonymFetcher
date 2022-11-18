import { useEffect, useState, KeyboardEvent } from 'react'

interface Word {
  word: string,
  scoore: number,
  tags: string[]
}

function App() {
  const [input, setInput] = useState<string>('')
  const[syns, setSyns] = useState<string[]>([])
  const API = 'https://api.datamuse.com/words?ml='

  const handleSubmit = async () => {
    const data = await fetch(API + input.split(' ').join('+'))
    const wordArray: Word[]= await data.json()

    setSyns(wordArray.slice(0, 9).map(word => word.word))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const renderWords = syns.map((word, index) => {
    return <li key={index}>{word}</li>
  })

  return (
    <div className="flex flex-col h-screen bg-[#211720] items-center">
      <input onKeyDown={handleKeyDown} id='word' type='text' placeholder='Enter a word or phrase here' className='shadow appearance-none border bg-[#211720] rounded w-4/12 mt-20 py-2 px-3 text-[#BBF0F2] text-sm leading-tight focus:outline-none focus:shadow-outline' onChange={e => setInput(e.target.value)}></input>
      <button onClick={handleSubmit} className="shadow bg-[#DC944C] hover:bg-[#C47527] focus:shadow-outline focus:outline-none text-sm mt-4 text-white font-bold py-2 px-4 rounded" type="button">Submit</button>
      <ul className='mt-20 text-[#BBF0F2] '>
        {renderWords}
      </ul>
    </div>
  )
}

export default App
