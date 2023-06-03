import { useIsOnline, useIsOnlineBetter } from '../learningHooks/useIsOnline'

export function IsOnlineIndicator() {
  const isOnline = useIsOnline()
  const isOnlineBetter = useIsOnlineBetter()

  return (
    <>
      <h1>This is online indicator, isOnline: {isOnline ? 'true' : 'false'}</h1>
      <h2>
        This is online indicator using built in hook useSyncExternalStore,
        isOnline: {isOnlineBetter ? 'true' : 'false'}
      </h2>
      <p>
        Above indicator uses effect to mount to borwser's API to check for
        online status.
      </p>
    </>
  )
}
