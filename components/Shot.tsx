// A real app screenshot (example student) in light and dark; CSS shows the one that matches the page theme.
// Files live in public/screens as <name>-light.jpg and <name>-dark.jpg.
export function Shot({ name, w, h, alt, priority }: { name: string; w: number; h: number; alt: string; priority?: boolean }) {
  const loading = priority ? "eager" : "lazy";
  return (
    <>
      <img className="on-light" src={`/screens/${name}-light.jpg`} width={w} height={h} alt={alt} loading={loading} decoding="async" />
      <img className="on-dark" src={`/screens/${name}-dark.jpg`} width={w} height={h} alt={alt} loading={loading} decoding="async" />
    </>
  );
}
