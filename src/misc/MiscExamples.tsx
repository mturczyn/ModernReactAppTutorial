import SimpleGreetingForm from './memo/MemoExample'
import { LazyExample } from './lazy/LazyLoaded'
import { MemoExampleWithUseMemo } from './memo/ProfileWithMemo'
import TabContainer from './transition/App'
import SuspenseExampleWithSuspensibleComponent from './suspenseAndDeferredValue/SuspenseExampleWithSuspensibleComponent'
import { DeferredValueExample } from './suspenseAndDeferredValue/DeferredValueExample'
import WecomingPanelWithLazyLoading from './suspenseAndDeferredValue/componentsForLazyLoad/WelcomingPanelWithLazyLoading'
import UseIdExample from './UseIdExample'
import styles from '../styles.module.css'

export default function MiscExamples() {
  return (
    <div className={styles.examplesContainer}>
      <SuspenseExampleWithSuspensibleComponent />
      <DeferredValueExample />
      <LazyExample />
      <SimpleGreetingForm />
      <MemoExampleWithUseMemo />
      <TabContainer />
      <WecomingPanelWithLazyLoading />
      <UseIdExample />
    </div>
  )
}
