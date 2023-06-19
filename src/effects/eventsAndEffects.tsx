import { useState, useEffect } from 'react'

const serverUrl = 'example.chat.url'

export function ChatApp() {
  const [roomId, setRoomId] = useState('general')
  const [isDark, setIsDark] = useState(false)
  const [hackyChat, setHackyChat] = useState(false)

  return (
    <>
      <label>
        <input
          type='checkbox'
          checked={hackyChat}
          onChange={e => setHackyChat(e.target.checked)}
        ></input>
        Use correct (hacky) chat
      </label>
      {hackyChat ? (
        <>
          <p>
            This chat room works correctly, due to hacky solution of surpressing
            exhaustive dependencies for useEffect, as one reactive value
            incorrectly triggered reconnecting the chat. Now switching theme
            does not trigger reconnecting to chat.
          </p>
          <p>
            Other way is to use Effect Events (useEffectEvent, which is still
            experimental React feature).
          </p>
        </>
      ) : (
        <p>
          Below application presents how changing theme with checkbox will cause
          the chat to reconnect without no reason. This is because it uses
          effect which has theme as dependency. That's why this effect triggers
          (message shown depends on this theme).
        </p>
      )}
      <label>
        Choose the char room:
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <label>
        <input
          type='checkbox'
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        ></input>
        User dark theme
      </label>
      <hr />
      {hackyChat ? (
        <HackyChatRoom
          roomId={roomId}
          theme={isDark ? 'dark' : 'light'}
        />
      ) : (
        <ChatRoom
          roomId={roomId}
          theme={isDark ? 'dark' : 'light'}
        />
      )}
    </>
  )
}

function ChatRoom({ roomId, theme }: any) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      alert('Connected! Theme being used is ' + theme)
    })
    connection.connect()
    return () => connection.disconnect()
  }, [roomId, theme])

  return <h1>Welcome to {roomId} room</h1>
}

/**
 * This chat room works correctly, due to hacky solution of surpressing
 * exhaustive dependencies for useEffect, as one reactive value incorrectly
 * triggered reconnecting the chat.
 */
function HackyChatRoom({ roomId, theme }: any) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      alert('Connected! Theme being used is ' + theme)
    })
    connection.connect()
    return () => connection.disconnect()
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, [roomId])

  return <h1>HackyChat: Welcome to {roomId} room</h1>
}

function createConnection(url: any, roomId: any) {
  return new Connection(url, roomId)
}

class Connection {
  constructor(url: any, roomId: any) {
    this.url = url
    this.roomId = roomId
  }

  callback: any
  roomId: any
  url: any

  on(action: any, callback: any) {
    this.callback = callback
  }

  connect() {
    console.log('connecting connection')
    this.callback()
  }
  disconnect() {
    console.log('disconnecting connection')
  }
}
