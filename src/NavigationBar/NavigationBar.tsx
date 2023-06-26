import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export interface ViewProps {
  label: string
  path: string
}

interface NavigationBarProps {
  pages: ViewProps[]
  className: string
}

function NavigationButton(props: ViewProps) {
  const navigate = useNavigate()
  const [clicked, setClikced] = useState<boolean>()

  const handleClick = useCallback(() => {
    navigate(props.path)
  }, [props.path, navigate])

  return (
    <button
      style={clicked ? { backgroundColor: '#007910' } : {}}
      className={styles.naviButton}
      onClick={handleClick}
      onMouseDown={() => setClikced(true)}
      onMouseUp={() => setClikced(false)}
    >
      {props.label}
    </button>
  )
}

export default function NavigationBar(props: NavigationBarProps) {
  return (
    <div>
      <div className={props.className}>
        <img
          src='bluey.avif'
          alt='Bluey!'
        />
        <div>
          {props.pages.map(x => (
            <NavigationButton
              label={x.label}
              path={x.path}
              key={x.path}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
