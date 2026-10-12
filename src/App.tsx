import {useState, useRef, useEffect} from 'react'
type ChatMessage = {
  text: string
  mode: 'Você' | 'Robô'
}
function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [mode, setMode] = useState<'Você' | 'Robô'>('Você')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
   const chat = document.getElementById('chat-messages')
    if (chat) {
      chat.scrollTop = chat.scrollHeight
    }
  }, [messages])

  function handleSend() {
    if (!message.trim())
      return
    setMessages([...messages, { text: message, mode }])
    setMessage('')
  }
  function handleDelete(index: number) {
    setMessages(messages.filter((_, i) => i !== index))
  }
  return (
    
    <main className=" min-h-screen bg-blue-100 p-4 flex items-center justify-center">
         
      <section className="flex h-150 w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <header>
           <h1 className="text-2xl font-bold text-blue-500">
                 Chat Offline  
            </h1>

            <p className="mt-2 text-gray-600">
                Bem-vindo ao seu chat offline!
            </p>

            
        </header>
      
        <div 
        id="chat-messages"
        className="flex flex-1 flex-col gap-4 overflow-y-auto bg-gray-50 p-5">
           

{messages.map((msg, index) => (
  <div
    key={index}
    className={`flex w-full ${
      msg.mode === 'Robô' ? 'justify-start' : 'justify-end'
    }`}
  >
    <div className="group relative w-fit max-w-[75%]">
      <div
        className={`wrap-break-word whitespace-pre-wrap rounded-2xl p-3 ${
          msg.mode === 'Robô'
            ? 'bg-gray-200 text-gray-800'
            : 'bg-blue-600 text-white'
        }`}
      >
        {msg.text}
      </div>

      <button
        type="button"
        onClick={() =>
          setOpenMenu(openMenu === index ? null : index)
        }
        className="absolute top-1/2 -translate-y-1/2 rounded px-2 py-1 text-gray-500 opacity-0 transition hover:bg-gray-200 hover:text-gray-800 group-hover:opacity-100
        "
        style={{
          [msg.mode === 'Robô' ? 'right' : 'left']: '-36px',
        }}
        aria-label="Opções da mensagem"
      >
        ⋮
      </button>

      {openMenu === index && (
        <div
          className={`absolute top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white p-1 shadow-lg ${
            msg.mode === 'Robô' ? 'left-0' : 'right-0'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              handleDelete(index)
              setOpenMenu(null)
            }}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Excluir 
          </button>
        </div>
      )}
    </div>
  </div>
))}

              <div ref={messagesEndRef} />  
        </div>

        <form 
            onSubmit={function (event) {
            event.preventDefault()
            handleSend()
          }}
            className="flex flex-col items-center gap-3 border-t border-gray-200 p-4"
        >
          <div className="flex w-full max-w-2xl justify-center gap-2">
            <button
            type="button"
            onClick={() => setMode( 'Você')}
            className={`rounded-lg  px-3 py-2 text-sm ${
              mode === 'Você'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700'
            }`}
            >
              Você
            </button>
            <button
            type='button'
            onClick={() => setMode('Robô')}
            className={`rounded-lg  px-3 py-2 text-sm ${
              mode === 'Robô'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700'
            }`}
            >
              🤖 Robô
            </button>
          </div>
          <div className="flex w-full max-w-2xl gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3  font-medium text-white" 
            >
              Enviar
            </button>
          </div>
        </form>

      </section>
    </main>
  )
}


export default App