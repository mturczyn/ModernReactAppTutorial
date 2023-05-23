import Section, { Heading } from './Section'

export default function PassingPropsWithContext({ children }: any) {
  return (
    <div>
      <p>
        Below we are setting level of header with context, which is passed as
        prop to wrapper component around header element.
      </p>
      <Section>
        <Heading>Heading 1</Heading>
        <Heading>Heading 1</Heading>
        <Heading>Heading 1</Heading>
        <Section>
          <Heading>Heading 2</Heading>
          <Heading>Heading 2</Heading>
          <Heading>Heading 2</Heading>
          <Section>
            <Heading>Heading 3</Heading>
            <Heading>Heading 3</Heading>
            <Heading>Heading 3</Heading>
          </Section>
        </Section>
      </Section>
    </div>
  )
}
