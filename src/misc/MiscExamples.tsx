import SimpleGreetingForm from './memo/MemoExample'
import { LazyExample } from './lazy/LazyLoaded'
import { MemoExampleWithUseMemo } from './memo/ProfileWithMemo'
import TabContainer from './transition/App'

export default function MiscExamples() {
  return (
    <div className='examplesContainer'>
      <LazyExample />
      <SimpleGreetingForm />
      <MemoExampleWithUseMemo />
      <TabContainer />
    </div>
  )
}
