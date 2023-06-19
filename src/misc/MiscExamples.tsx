import SimpleGreetingForm from './memo/MemoExample'
import { LazyExample } from './lazy/LazyLoaded'
import { MemoExampleWithUseMemo } from './memo/ProfileWithMemo'

export default function MiscExamples() {
  return (
    <>
      <LazyExample />
      <SimpleGreetingForm />
      <MemoExampleWithUseMemo />
    </>
  )
}
