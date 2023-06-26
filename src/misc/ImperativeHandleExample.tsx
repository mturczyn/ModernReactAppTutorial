import {
  forwardRef,
  useRef,
  useImperativeHandle,
  LegacyRef,
  useState,
} from 'react'

export default function ImperativeHandlesExample() {
  const postRef = useRef(null)
  const [showList, setShowList] = useState(false)

  function handleClick() {
    ;(postRef.current as any).scrollAndFocusAddComment()
  }

  return (
    <div>
      <p>
        This simple comment list was implemented using useImperativeHandle,
        which is just sort of "interfacing" ref, so with it you can just expose
        particular method, and not set the ref to concrete DOM element.
      </p>
      <p>
        Clicking "Write comment" should scroll to the comment input and set
        focus to it.
      </p>
      <button onClick={() => setShowList(!showList)}>
        {showList ? 'Hide' : 'Show'} comments
      </button>
      {showList && (
        <>
          <br />
          <button onClick={handleClick}>Write comment</button>
          <Post ref={postRef} />
        </>
      )}
    </div>
  )
}

const AddComment = forwardRef((props, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <input
      placeholder='Add comment...'
      ref={ref}
    />
  )
})

const CommentList = forwardRef((props, ref: any) => {
  const divRef = useRef(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom() {
          const node = divRef.current as any
          node.scrollTop = node.scrollHeight
        },
      }
    },
    []
  )

  let comments: any[] = []
  for (let i = 0; i < 50; i++) {
    comments.push(<p key={i}> Comment #{i}</p>)
  }

  return <div ref={divRef}>{comments}</div>
})

const Post = forwardRef((props, ref: any) => {
  const commentsRef = useRef(null)
  const addCommentRef = useRef(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollAndFocusAddComment() {
          ;(commentsRef.current as any).scrollToBottom()
          ;(addCommentRef.current as any).focus()
        },
      }
    },
    []
  )

  return (
    <>
      <article>
        <p>Welcome to my blog!</p>
      </article>
      <CommentList ref={commentsRef} />
      <AddComment ref={addCommentRef} />
    </>
  )
})
