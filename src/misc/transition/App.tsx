import { useState } from 'react'
import TabButton from './TabButton'
import AboutTab from './AboutTab'
import PostsTab from './PostsTab'
import ContactTab from './ContactTab'

export default function TabContainer() {
  const [tab, setTab] = useState('about')
  const [shouldUseTransition, setShouldUseTransition] = useState(false)

  return (
    <div>
      <p>
        Below Posts tab is loading very long time. When there's some processing
        blocking UI processing it will hang the UI and make it unresponsive.
      </p>
      <p>
        To the rescure we have transition exposed with React's useTransition to
        "schedule some job" and not block UI from processing (reacting to
        hovers, clicks, etc.).
      </p>
      <label>
        Use transition{' '}
        <input
          type='checkbox'
          value={shouldUseTransition.toString()}
          onChange={(e: any) => setShouldUseTransition(e.target.checked)}
        />
      </label>
      <br />
      <TabButton
        shouldUseTransition={shouldUseTransition}
        isActive={tab === 'about'}
        onClick={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        shouldUseTransition={shouldUseTransition}
        isActive={tab === 'posts'}
        onClick={() => setTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        shouldUseTransition={shouldUseTransition}
        isActive={tab === 'contact'}
        onClick={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </div>
  )
}
