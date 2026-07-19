import Image from "next/image";

export function BoringWorksSignature({ withTagline = false }: { withTagline?: boolean }) {
  return <div className="footer-signature">
    <span className="footer-brandline">
      <Image className="footer-logo" src="/brand/boring-works-logo.svg" alt="boring works" width={299} height={44} />
      <span className="footer-product" aria-label="Bugshot">/ Bugshot</span>
    </span>
    {withTagline && <p>Screenshots in. Useful reports out. No drama.</p>}
  </div>;
}
