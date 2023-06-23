import SimpleGreetingForm from './memo/MemoExample'
import { LazyExample } from './lazy/LazyLoaded'
import { MemoExampleWithUseMemo } from './memo/ProfileWithMemo'
import TabContainer from './transition/App'
import DeferredValueExample from './hooks/HooksMiscExamples'

export default function MiscExamples() {
  return (
    <div className='examplesContainer'>
      <DeferredValueExample />
      <LazyExample />
      <SimpleGreetingForm />
      <MemoExampleWithUseMemo />
      <TabContainer />
    </div>
  )
}
