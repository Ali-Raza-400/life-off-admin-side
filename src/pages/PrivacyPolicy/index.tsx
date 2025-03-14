import Link from "antd/es/typography/Link";

export default function Index() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>

      {/* Effective Date */}
      <p className="text-green-600 mb-8">Effective Date: March 7, 2025</p>

      {/* Introduction */}
      <div className="space-y-6 text-gray-700">
        <p className="text-justify">
          This Privacy Notice ("Privacy Notice") explains how Groupon, Inc., its affiliates, and its subsidiaries
          ("Groupon," "us," "our," and "we") use your information and applies to all who use our websites and platforms,
          including mobile applications, tools, technologies, electronic services, social networking sites, interactive
          features, online services or any of our described online activities we own or control (collectively, the
          "Service"). For terms that govern the use of the Service, please review the{" "}
          <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
            Service's Terms of Use
          </Link>
          .
        </p>

        <p className="text-justify">
          By using the Service, you acknowledge you have read the terms of this Privacy Notice. If you do not want your
          information handled as described in this Privacy Notice, please do not provide us with your information or
          interact with the Service.
        </p>

        <p className="text-justify">
          We may modify this Privacy Notice at any time. If we make any material changes, we will notify you by email
          (sent to the email address specified in your account) or by means of notice on the Service prior to the change
          becoming effective. You can determine when this Privacy Notice was last revised by referring to the "Effective
          Date" above.
        </p>

        {/* Types of Information Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Types of Information We Collect</h2>
          <p className="mb-4">We may collect the following categories of personal information from and about you:</p>

          <ul className="space-y-4 list-disc pl-6">
            <li>
              <span className="font-semibold">Identifiers</span> such as your name, postal addresses, email addresses,
              social networking website user account names, telephone numbers, or other addresses at which you are able
              to receive communications.
            </li>

            <li>
              <span className="font-semibold">Demographic information:</span> such as your age, birthdate, and gender.
            </li>

            <li>
              <span className="font-semibold">Commercial information</span> such as information that enables us to
              determine lifestyle, interests, and activities, including purchasing tendencies and order history (such as
              the Groupon vouchers you purchase and redeem); areas of interest; information collected through your
              interactions with social networks; information about persons for whom you have purchased Groupon vouchers
              as gifts or who have bought Groupon vouchers as gifts for you; and information about friends who refer you
              or whom you have referred.
            </li>

            <li>
              <span className="font-semibold">Identifiers</span> such as your name, postal addresses, email addresses,
              social networking website user account names, telephone numbers, or other addresses at which you are able
              to receive communications.
            </li>

            <li>
              <span className="font-semibold">Financial information</span> such as information collected from you as
              needed to process payments for Groupon vouchers or other products or services that you buy, or as provided
              by you to administer your participation in optional services and programs, such as your payment card
              number, expiration date, and card verification number.
            </li>

            <li>
              <span className="font-semibold">Internet and network activity information</span> such as information about
              your browsing behavior, search history, and interactions with websites and advertisements, including data
              from cookies, pixel tags, and web beacons.
            </li>

            <li>
              <span className="font-semibold">Inferences regarding preferences and other characteristics</span> such as
              our assessment of the types of products or services you may have an interest in.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-6">How Groupon Collects Information</h2>
          <p className="text-justify">
            We may collect personal information about you from a variety of sources, including:
          </p>
          {/* Additional content for How Groupon Collects Information section would go here */}
        </section>

        {/* Additional Information */}
        <p className="text-sm text-gray-600 mt-8">
          In addition, the Site also provides a platform through which you can purchase products from Groupon ("
          Products ") and participate in other available programs. Certain Merchant Offerings, Products, other available
          programs and pricing on the Site may change at any time in Groupon's sole discretion, without notice.
        </p>
      </div>
    </div>
  )
}

