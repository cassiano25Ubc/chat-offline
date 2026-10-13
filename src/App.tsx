import {useState, useRef, useEffect} from 'react'
import { useChatStore } from './store/chatStore'

function App() {
  const conversations = useChatStore(
    (state) => state.conversations
  )

  const createConversation = useChatStore(
    (state) => state.createConversation
  )
  const selectConversation = useChatStore(
    (state) => state.selectConversation
  )
  const selectedConversation = useChatStore(
    (state) => state.selectedConversation
  )
  const addMessage = useChatStore((state) => state.addMessage)
  const removeMessage = useChatStore((state) => state.removeMessage)
  const deleteConversation = useChatStore((state) => state.deleteConversation)
  const messages = conversations.find(
    (conversation) => conversation.id === selectedConversation
  )?.messages ?? []

  const [message, setMessage] = useState('')
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [openConversationMenu, setOpenConversationMenu] = useState<string | null>(null)
  const [mode, setMode] = useState<'Você' | 'Robô'>('Você')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const chat = document.getElementById('chat-messages')
    if (chat) {
      chat.scrollTop = chat.scrollHeight
    }
  }, [messages, selectedConversation])

  function handleSend() {
    if (!message.trim() || !selectedConversation) return
    addMessage(message, mode)
    setMessage('')
  }
  function handleDelete(index: number) {
    removeMessage(index)
  }

  function handleDeleteConversation(id: string) {
    deleteConversation(id)
    setOpenConversationMenu(null)
  }
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff_0%,_#dbeafe_22%,_#e2e8f0_100%)] p-4 text-slate-800">
      <div className="mx-auto grid h-[calc(100vh-2rem)] max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="flex min-h-0 min-w-0 flex-col rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-500">
                Offline
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-800">Conversas</h2>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600">
              💬
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              createConversation()
              setMessage('')
              setOpenMenu(null)
            }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span className="text-lg leading-none">＋</span>
            Nova conversa
          </button>

          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="flex flex-col gap-2">
              {conversations.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  Nenhuma conversa ainda.
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div key={conversation.id} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        selectConversation(conversation.id)
                        setMessage('')
                        setOpenMenu(null)
                      }}
                      className={`w-full rounded-2xl p-3 pr-10 text-left transition ${
                        selectedConversation === conversation.id
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold">Conversa {conversation.id}</span>
                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                          {conversation.messages.length}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {conversation.messages.length > 0
                          ? 'Última atividade recente'
                          : 'Sem mensagens'}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        setOpenConversationMenu(
                          openConversationMenu === conversation.id ? null : conversation.id
                        )
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                      aria-label={`Opções da conversa ${conversation.id}`}
                    >
                      ⋮
                    </button>

                    {openConversationMenu === conversation.id && (
                      <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                        <button
                          type="button"
                          onClick={() => handleDeleteConversation(conversation.id)}
                          className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Excluir conversa
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <header className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-500">
                Sala ativa
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-800">
                {selectedConversation ? `Conversa ${selectedConversation}` : 'Selecione uma conversa'}
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Offline
            </div>
          </header>

          <div
            id="chat-messages"
            className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[linear-gradient(180deg,_#f8fbff_0%,_#f8fafc_100%)] p-5"
          >
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="max-w-sm rounded-3xl border border-dashed border-slate-200 bg-white/80 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                    ✉️
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700">Nenhuma mensagem ainda</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Comece uma conversa escolhendo o remetente e enviando sua primeira mensagem.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex w-full ${
                    msg.mode === 'Robô' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className="group relative w-fit max-w-[78%]">
                    <div
                      className={`wrap-break-word whitespace-pre-wrap rounded-[22px] px-4 py-3 shadow-sm ${
                        msg.mode === 'Robô'
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenMenu(openMenu === index ? null : index)}
                      className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-slate-500 opacity-0 transition hover:bg-slate-200 hover:text-slate-800 group-hover:opacity-100"
                      style={{
                        [msg.mode === 'Robô' ? 'right' : 'left']: '-36px',
                      }}
                      aria-label="Opções da mensagem"
                    >
                      ⋮
                    </button>

                    {openMenu === index && (
                      <div
                        className={`absolute top-full z-10 mt-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ${
                          msg.mode === 'Robô' ? 'left-0' : 'right-0'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(index)
                            setOpenMenu(null)
                          }}
                          className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Excluir mensagem
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
            className="border-t border-slate-200 bg-slate-50/80 p-4"
          >
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode('Você')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    mode === 'Você'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Você
                </button>
                <button
                  type="button"
                  onClick={() => setMode('Robô')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    mode === 'Robô'
                      ? 'bg-slate-700 text-white shadow-md shadow-slate-500/20'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🤖 Robô
                </button>
              </div>

              <div className="flex w-full gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-3 py-3 text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!selectedConversation || !message.trim()}
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}


export default App