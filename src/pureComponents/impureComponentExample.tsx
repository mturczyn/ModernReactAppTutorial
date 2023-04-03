let nmb = 0

function ConsecutiveNumber() {
  nmb = nmb + 1
  return <h2>This supposed be conseutive numbers #{nmb}</h2>
}

export default function NumberList() {
  return (
    <>
      <h1>Impure components</h1>
      <p>
        Below is example of impure component that uses variable declare outside
        of it
      </p>
      <ConsecutiveNumber />
      <ConsecutiveNumber />
      <ConsecutiveNumber />
      <ConsecutiveNumber />
    </>
  )
}
