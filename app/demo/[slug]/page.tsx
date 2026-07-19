import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { demoExamples, getDemoExample } from "../demo-data";
import styles from "../demo.module.css";

type PageProps = { params: Promise<{ slug: string }> };

function DemoExampleFooter() {
  return <footer className={styles.exampleFooter}><Link href="/demo">Bugshot Demo Lab</Link><nav><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></nav></footer>;
}

export function generateStaticParams() {
  return demoExamples.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const example = getDemoExample((await params).slug);
  return { title: example ? `${example.shortTitle} · Bugshot Demo` : "Bugshot Demo", robots: { index: false, follow: false } };
}

function WeakCta() {
  return <main className={styles.saasPage}>
    <nav className={styles.saasNav}><a className={styles.saasLogo} href="#">plane</a><div><a href="#">Product</a><a href="#">Solutions</a><a href="#">Resources</a><a href="#">Pricing</a></div><a className={styles.saasLogin} href="#">Log in</a></nav>
    <section className={styles.saasHero}>
      <div className={styles.saasCopy}>
        <p className={styles.saasEyebrow}>WORK BETTER</p>
        <h1>Everything your team needs to move projects forward</h1>
        <p>Plan tasks, share ideas, and keep everyone aligned in one flexible workspace.</p>
        <p>Bring projects, documents, and conversations together without changing how your team works.</p>
        <div className={styles.weakActions}><a className={styles.weakPrimary} href="#">Learn more</a><a href="#">View features</a><a href="#">Contact sales</a></div>
      </div>
      <div className={styles.saasVisual} aria-hidden="true"><div className={styles.visualTop}><i /><i /><i /></div><div className={styles.visualBody}><aside><b /><span /><span /><span /><span /></aside><section><span /><h2>Q3 launch plan</h2><div className={styles.fakeRows}><i /><i /><i /><i /></div></section></div><div className={styles.floatingNote}>3 tasks need attention</div></div>
    </section>
    <div className={styles.saasProof}><span>Used by calm teams at</span><b>Northstar</b><b>Object</b><b>Fieldwork</b><b>Common</b></div>
  </main>;
}

function MobileOverflow() {
  return <main className={styles.mobileStage}>
    <section className={styles.browserWindow} aria-label="Desktop browser showing a 390 pixel responsive viewport">
      <header className={styles.browserChrome}>
        <span className={styles.browserDots} aria-hidden="true"><i /><i /><i /></span>
        <div className={styles.browserAddress}><span aria-hidden="true">◇</span> bugshot.demo/product</div>
        <strong>Responsive · 390 × 844</strong>
      </header>
      <div className={styles.browserViewport}>
        <div className={styles.shopPhone}>
          <div className={styles.shopWide}>
            <header className={styles.shopHeader}><a href="#"><strong>FIELD</strong> / GOODS</a><button aria-label="Shopping bag">BAG · 0</button></header>
            <nav className={styles.shopNav}><a href="#">Products</a><a href="#">Collections</a><a href="#">About us</a><a href="#">Support</a></nav>
            <div className={styles.productImage} aria-label="Product image placeholder"><div className={styles.bagHandle} /><div className={styles.bagBody}><span>FIELD</span></div><i className={styles.bagShadow} /></div>
            <section className={styles.productInfo}><p className={styles.productLabel}>EVERYDAY CARRY · 01</p><div className={styles.productTitle}><h1>Everyday Work Bag</h1><strong>EUR 149.00</strong></div><p>Hard-wearing canvas, padded laptop sleeve, and enough room for the daily essentials.</p><label>Choose color</label><div className={styles.swatches}><button>Forest</button><button>Navy</button><button>Black</button></div><button className={styles.cartButton}>Add to cart</button></section>
          </div>
        </div>
      </div>
    </section>
    <p className={styles.viewportHint}>Desktop browser · responsive preview · horizontal and vertical scrollbars intentionally visible</p>
  </main>;
}

function UnlabelledForm() {
  return <main className={styles.editorialPage}>
    <header className={styles.editorialHeader}><a href="#" className={styles.editorialLogo}>NORTH<br />NOTE</a><nav><a href="#">Stories</a><a href="#">Objects</a><a href="#">Places</a></nav><button>Menu</button></header>
    <section className={styles.editorialIntro}><p>ISSUE NO. 18 · THE WORK EDIT</p><h1>Ideas for slower,<br />better work.</h1><span>Independent stories about craft, spaces, and the people shaping a more thoughtful working day.</span></section>
    <section className={styles.newsletterCard}>
      <p className={styles.newsletterNumber}>18 / NOTES</p><div><h2>Stay in the loop</h2><p>Get our latest updates.</p></div>
      <form><input type="text" placeholder="Name" aria-label="" /><input type="email" placeholder="Email" aria-label="" /><button type="button">Submit</button></form>
    </section>
    <p className={styles.issueLine}>New issue every season · Printed in Rotterdam</p>
  </main>;
}

function CheckoutError() {
  return <main className={styles.checkoutPage}>
    <header className={styles.checkoutHeader}><a href="#"><strong>LUMA</strong> store</a><span>Secure checkout</span></header>
    <div className={styles.checkoutLayout}>
      <section className={styles.checkoutForm}>
        <a className={styles.backLink} href="#">← Return to cart</a><p className={styles.checkoutStep}>CHECKOUT · STEP 2 OF 2</p><h1>Delivery details</h1>
        <div className={styles.errorBlock} role="alert"><strong>Error 422.</strong> Invalid input.</div>
        <form>
          <div className={styles.twoFields}><label>First name<input defaultValue="Jordan" /></label><label>Last name<input defaultValue="Miller" /></label></div>
          <label>Street address<input defaultValue="48 Garden Avenue" /></label>
          <div className={styles.threeFields}><label>Postal code<input defaultValue="10A 4QX" /></label><label>City<input defaultValue="London" /></label><label>Country<select defaultValue="United Kingdom"><option>United Kingdom</option></select></label></div>
          <label>Phone number <span>Optional</span><input defaultValue="+44 7700 900321" /></label>
          <button className={styles.payButton} type="button">Continue to payment</button>
        </form>
      </section>
      <aside className={styles.orderSummary}><p>YOUR ORDER</p><div className={styles.orderProduct}><div className={styles.orderImage}><i /></div><div><strong>Arc table lamp</strong><span>Matte black · 1</span></div><b>£128</b></div><div className={styles.summaryLines}><p><span>Subtotal</span><b>£128</b></p><p><span>Delivery</span><b>Free</b></p><p><span>Total</span><b>£128</b></p></div><small>Taxes included. Your payment details are entered in the next step.</small></aside>
    </div>
  </main>;
}

export default async function DemoExamplePage({ params }: PageProps) {
  const { slug } = await params;
  if (!getDemoExample(slug)) notFound();
  const example = slug === "weak-cta" ? <WeakCta />
    : slug === "mobile-overflow" ? <MobileOverflow />
    : slug === "unlabelled-form" ? <UnlabelledForm />
    : <CheckoutError />;
  return <>{example}<DemoExampleFooter /></>;
}
