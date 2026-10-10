/** Label for links into the demo. Phones get a static walkthrough instead, so the wording changes. */
export function DemoLabel({ wide = "Try the demo" }: { wide?: string }) {
  return (
    <>
      <span className="wide-only">{wide}</span>
      <span className="narrow-only">See how it works</span>
    </>
  );
}
