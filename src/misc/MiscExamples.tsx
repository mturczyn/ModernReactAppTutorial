import SimpleGreetingForm from './memo/MemoExample'
import { LazyExample } from './lazy/LazyLoaded'
import { MemoExampleWithUseMemo } from './memo/ProfileWithMemo'
import TabContainer from './transition/App'
import SuspenseExampleWithSuspensibleComponent from './suspenseAndDeferredValue/SuspenseExampleWithSuspensibleComponent'
import { DeferredValueExample } from './suspenseAndDeferredValue/DeferredValueExample'

export default function MiscExamples() {
  return (
    <div className='examplesContainer'>
      <SuspenseExampleWithSuspensibleComponent />
      <DeferredValueExample />
      <LazyExample />
      <SimpleGreetingForm />
      <MemoExampleWithUseMemo />
      <TabContainer />
    </div>
  )
}
