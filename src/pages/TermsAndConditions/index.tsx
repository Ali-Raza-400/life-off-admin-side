import Link from "antd/es/typography/Link";

export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>

      <div className="space-y-6 text-gray-700">
        {/* Initial Agreement */}
        <p>
          By entering your email, logging into your account, or accepting notifications, you agree to receive
          personalized liveoff deals each day. You may unsubscribe at any time.
        </p>

        {/* Welcome Message */}
        <p>
          Welcome to the liveoffcoupon Site (defined below). By using it, you are agreeing to these Terms of Use
          (defined below). Please read them carefully. If you have any questions,{" "}
        <Link href="/contact" className="text-green-600 hover:text-green-700 underline">
            contact us here
          </Link>
          .
        </p>

        {/* Last Updated */}
        <p className="text-sm text-gray-500">These Terms of Use were last updated on January 7, 2025.</p>

        {/* Acceptance Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mt-8 mb-4">ACCEPTANCE OF TERMS OF USE</h2>
          <p className="text-justify">
            Liveoffcoupon, (" Liveoff " " we " or " us " or " our ") owns and operates the website, www.groupon.com, the
            mobile and touch versions and any sites we have now or in the future that reference these Terms of Use
            (collectively, "Site"). By (a) using the Site and Groupon's services through the Site, (b) signing up for an
            account and/or (c) completing a purchase on the Site, you agree to these Terms of Use (defined below) and
            any additional terms applicable to certain programs in which you may elect to participate. You also agree to
            our Privacy Statement, incorporated herein by reference and located within our{" "}
            <Link href="/privacy" className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </Link>{" "}
            ("Privacy Statement"), and acknowledge that you will regularly visit the Terms of Use (defined below) to
            familiarize yourself with any updates. The Privacy Statement, together with these terms of use, and any
            other terms contained herein or incorporated herein by reference, are collectively referred to as the "
            Terms of Use." The term "using" also includes any person or entity that accesses or uses the Site with
            crawlers, robots, data mining, or extraction tools or any other functionality.
          </p>

          <p className="text-justify font-medium">
            IF YOU DO NOT AGREE TO THESE TERMS OF USE, IMMEDIATELY STOP USING THE SITE AND DO NOT USE ANY GROUPON
            SERVICE, PARTICIPATE IN ANY PROGRAM OR PURCHASE ANY VOUCHER, PRODUCT OR OTHER GOOD OR SERVICE OFFERED
            THROUGH THE SITE.
          </p>

          <p className="text-justify">
            PLEASE REVIEW THE FOLLOWING SECTIONS OF THESE TERMS OF USE CAREFULLY: (A) DISPUTE RESOLUTION/ARBITRATION
            AGREEMENT, INCLUDING THE CLASS ACTION WAIVER DESCRIBED THEREIN, (B) LIMITATION OF LIABILITY, AND (C)
            INDEMNIFICATION/RELEASE.
          </p>
        </section>

        {/* About the Site Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mt-8 mb-4">About the Site</h2>
          <p className="text-justify">
            The Site is a platform through which certain merchants (" Merchants ") (a) sell vouchers for goods,
            services, or experiences (" Vouchers "), (b) sell travel goods and services (" Getaways "), (c) gift cards
            (" Merchant Gift Cards "), (c) sell goods and services directly to you (" Physical Products "), (d) make
            available coupons, promotional codes, giveaways, samples, and offers for software downloads (" Coupons "),
            (e) sell dining experiences for specific dates and times (" Reservations "), (f) sell food, beverage and
            other products for delivery and takeout (" Online Ordering "), (g) make available certain offers, including
            " card linked deals " (as defined in the Special Programs section of the Terms of Use), and (h) enable you
            to schedule use of your Voucher on a specific date and time (" Bookings ") (collectively (a)-(h): " Merchant
            Offerings "). Merchants are the sellers and issuers of the Merchant Offerings and are solely responsible for
            redeeming any Merchant Offering. Vouchers may be distributed by Groupon Merchant Services, LLC (" GMS ") or
            Groupon. More information about the distributor of a particular Voucher is available upon request. Groupon
            is not an agent of GMS, the Merchants, GMS is not an agent of Groupon or Merchants.
          </p>

          <p className="text-justify">
            In addition, the Site also provides a platform through which you can purchase products from Groupon ("
            Products ") and participate in other available programs. Certain Merchant Offerings, Products, and programs
            may be subject to additional terms, which may change at any time in Groupon's sole discretion, without
            notice.
          </p>
        </section>
      </div>
    </div>
  )
}

