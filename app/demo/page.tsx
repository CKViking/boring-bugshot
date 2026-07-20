import type { Metadata } from "next";
import Link from "next/link";

import { demoExamples, DemoSlug } from "./demo-data";
import styles from "./demo.module.css";

export const metadata: Metadata = {
  title: "Demo Lab · boring Bugshot",
  description: "Four intentionally broken pages for reproducible boring Bugshot demos.",
  robots: { index: false, follow: false },
};

function DemoPreview({ slug }: { slug: DemoSlug }) {
  if (slug === "weak-cta") return <div className={`${styles.preview} ${styles.weakPreview}`} aria-hidden="true"><div className={styles.weakMiniCopy}><small>WORK BETTER</small><h3>Everything your team needs to move projects forward</h3><i /><i /><div><b>Learn more</b><span>View features</span><span>Contact sales</span></div></div><div className={styles.weakMiniBoard}><header><i /><i /><i /></header><section><aside><b /><span /><span /><span /></aside><div><h4>Q3 launch plan</h4><i /><i /><i /></div></section></div></div>;
  if (slug === "mobile-overflow") return <div className={`${styles.preview} ${styles.overflowPreview}`} aria-hidden="true"><div className={styles.miniBrowserWindow}><div className={styles.miniAddress}>bugshot.demo/product</div><div className={styles.miniPhone}><div className={styles.miniPhoneWide}><header><b>FIELD / GOODS</b><span>BAG · 0</span></header><nav>Products　 Collections　 About us　 Support</nav><div className={styles.miniBagScene}><i /><b>FIELD</b></div><section><small>EVERYDAY CARRY · 01</small><h3>Everyday Work Bag</h3><strong>EUR 149.00</strong><button>Add to cart</button></section></div></div></div></div>;
  if (slug === "unlabelled-form") return <div className={`${styles.preview} ${styles.formPreview}`} aria-hidden="true"><header><b>NORTH<br />NOTE</b><span>Stories　 Objects　 Places</span></header><section><small>ISSUE NO. 18</small><h3>Ideas for slower,<br />better work.</h3><p>Independent stories about craft, spaces, and thoughtful working days.</p></section><div className={styles.miniNewsletter}><span>Stay in the loop</span><i>Name</i><i>Email</i><b>Submit</b></div></div>;
  return <div className={`${styles.preview} ${styles.checkoutPreview}`} aria-hidden="true"><section><small>CHECKOUT · STEP 2 OF 2</small><h3>Delivery details</h3><b className={styles.miniError}>Error 422. Invalid input.</b><div className={styles.miniFields}><i /><i /><i /><i /></div><button>Continue to payment</button></section><aside><small>YOUR ORDER</small><div><i /><b>Arc table lamp</b><span>£128</span></div><p><span>Subtotal</span><b>£128</b></p><p><span>Delivery</span><b>Free</b></p><p><span>Total</span><b>£128</b></p></aside></div>;
}

export default function DemoLab() {
  return <main className={styles.lab}>
    <header className={styles.labHeader}>
      <Link className={styles.labBrand} href="/"><strong>boring</strong> Bugshot</Link>
      <span>Demo Lab</span>
    </header>

    <section className={styles.labHero}>
      <p className={styles.labEyebrow}>CONTROLLED TEST PAGES</p>
      <h1>Four pages.<br />Four useful problems.</h1>
      <p>Every example below is intentionally broken. Open one, take a screenshot, and feed it into Bugshot. No external assets, trackers, APIs, or customer data.</p>
    </section>

    <section className={styles.howTo} aria-label="How to use the demo lab">
      <p><b>01</b><span>Open an example</span></p>
      <p><b>02</b><span>Match the suggested viewport</span></p>
      <p><b>03</b><span>Take a screenshot</span></p>
      <p><b>04</b><span>Paste the supplied context</span></p>
    </section>

    <section className={styles.demoGrid}>
      {demoExamples.map((example) => <article className={styles.demoCard} key={example.slug}>
        <DemoPreview slug={example.slug} />
        <div className={styles.demoInfo}>
          <div className={styles.demoMeta}><span>{example.number}</span><span>{example.type}</span><span>{example.language}</span><span>{example.viewport}</span></div>
          <h2>{example.title}</h2>
          <p>{example.description}</p>
          <div className={styles.contextBox}><small>CONTEXT TO PASTE INTO BUGSHOT</small><code>{example.context}</code></div>
          <Link className={styles.openExample} href={`/demo/${example.slug}`}>Open full-size example <span>↗</span></Link>
        </div>
      </article>)}
    </section>

    <footer className={styles.labFooter}><Link href="/" target="_blank" rel="noreferrer">← Back to boring Bugshot</Link><p>Built for repeatable screenshots. Broken on purpose.</p><nav><Link href="/impressum" target="_blank" rel="noreferrer">Impressum</Link><Link href="/datenschutz" target="_blank" rel="noreferrer">Datenschutz</Link></nav></footer>
  </main>;
}
