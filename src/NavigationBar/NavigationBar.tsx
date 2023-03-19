import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export interface ViewProps {
  label: string
  path: string
}

interface NavigationBarProps {
  pages: ViewProps[]
  children: JSX.Element
}

function NavigationButton(props: ViewProps) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(props.path)
  }, [props.path, navigate])

  return (
    <button
      className={styles.naviButton}
      onClick={handleClick}
    >
      Go to {props.label}
    </button>
  )
}

export default function NavigationBar(props: NavigationBarProps) {
  return (
    <div>
      <div className={styles.naviContainer}>
        {props.pages.map(x => (
          <NavigationButton
            label={x.label}
            path={x.path}
          />
        ))}
        <img
          src='bluey.avif'
          alt='Bluey!'
        />
      </div>
      <div>{props.children}</div>
    </div>
  )
}
