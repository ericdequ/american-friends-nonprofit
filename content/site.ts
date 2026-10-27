/**
 * ============================================================
 *  SITE CONTENT: edit this file to change the website.
 * ============================================================
 *
 * Every word, link and list on the site lives here. You don't need to
 * touch any other file to update text, add a project, or plug in the
 * real donation links.
 *
 * Tips:
 *  - Keep the quotes "..." around text. If your text contains a quote,
 *    use ’ (curly apostrophe) or \" instead.
 *  - Anything in [square brackets] is a placeholder that still needs
 *    real info before launch.
 *  - A link set to "" (empty) shows as "Coming soon" on the site,
 *    so the page never has a broken button.
 *  - To add another project / FAQ / board member, copy one { ... }
 *    block, paste it below, and change the text. Mind the commas.
 */

// Main contact email, used in several places.
const EMAIL = "[hello@yourdomain.org]";

export const site = {
  // ---------- Basics ----------
  name: "American Friends for Ukraine",
  shortName: "American Friends",
  tagline: "From American hearts to Ukrainian hands.",
  description:
    "American Friends for Ukraine is a U.S. nonprofit that raises funds from American donors to support vetted humanitarian projects in Ukraine.",
  email: EMAIL,
  mailingAddress: "[Street address, City, State ZIP]",
  // Your web address once you have a domain, e.g. "https://americanfriendsforukraine.org"
  siteUrl: "",

  // Shows a thin "preview" bar at the top of the site. Set to false at launch.
  showPreviewBanner: true,

  // ---------- Google & link sharing ----------
  seo: {
    // The title shown in Google results and browser tabs (aim for under 60 characters).
    title: "American Friends for Ukraine | Donate to Humanitarian Aid",
    // The summary shown under the title in Google and in link previews (aim for 120–160 characters).
    description:
      "A U.S. nonprofit raising funds from American donors for vetted humanitarian projects in Ukraine: medical supplies, relief and recovery for families.",
    // Words people might search for. Helps a little; the description matters more.
    keywords: [
      "Ukraine humanitarian aid",
      "donate to Ukraine",
      "Ukraine charity",
      "medical supplies Ukraine",
      "American Friends for Ukraine",
      "Ukraine nonprofit",
      "tax-deductible Ukraine donation",
    ],
    // Your X / Twitter handle, e.g. "@AmFriendsUkraine" (leave "" if none).
    twitterHandle: "",
    // From Google Search Console → Settings → Ownership verification → HTML tag.
    // Paste only the code inside content="...". Leave "" until you have it.
    googleVerification: "",
  },

  // ---------- Legal / tax status ----------
  legal: {
    // "pending" until the IRS determination letter arrives, then "approved".
    taxStatus: "pending" as "pending" | "approved",
    ein: "[XX-XXXXXXX]",
  },

  // ---------- Donations ----------
  // Every "Donate" button on the site opens the donation pop-up. It works with
  // any platform (Zeffy, Givebutter, Donorbox, Classy, Every.org, PayPal,
  // Stripe, GoFundMe, …). Fill in ONE of the three options below.
  // The pop-up picks the first one that's filled in: A, then B, then C.
  donate: {
    // A) Full embed code: paste exactly what your platform gives you under
    //    "Embed", "Widget" or "Add to website" (the <script> and <div>/<iframe> code).
    //    Put it between the backticks ` `.
    embedCode: ``,

    // B) Embed link: the address inside the platform's <iframe src="...">.
    //    e.g. "https://www.zeffy.com/embed/donation-form/your-form"
    //         "https://donorbox.org/embed/your-campaign"
    //         "https://givebutter.com/embed/c/your-campaign"
    embedUrl: "",

    // C) Plain checkout link: the pop-up shows amount buttons, then opens this
    //    link in a new tab. e.g. "https://www.paypal.com/donate/?hosted_button_id=XXXX"
    primaryUrl: "",
    // Optional: separate link for monthly giving (adds a One-time / Monthly switch).
    monthlyUrl: "",
    // Optional: if your platform can pre-fill the amount from the link, its name
    // goes here (e.g. "amount" makes ...?amount=50). Leave "" if unsure.
    amountParam: "",

    // Suggested amounts shown as quick buttons.
    suggestedAmounts: [25, 50, 100, 250, 500],
    // The amount selected when the pop-up opens.
    defaultAmount: 100,
    // What a gift can do, shown under the amounts. Keep these accurate!
    impact: {
      25: "[Example] Bandages and antiseptic for a field medic",
      50: "[Example] A family hygiene kit",
      100: "[Example] A trauma first-aid kit",
      250: "[Example] Fuel for the supply caravan for a day",
      500: "[Example] A month of medicine for a rural clinic",
    } as Record<number, string>,

    // Cards in the "Donate" section. A card with url "" opens the donation pop-up.
    options: [
      {
        title: "Give online",
        description: "One-time gift by card, Apple Pay or Google Pay.",
        cta: "Donate now",
        url: "",
      },
      {
        title: "Give monthly",
        description: "A steady monthly gift helps partners plan ahead.",
        cta: "Start monthly gift",
        url: "",
      },
      {
        title: "Mail a check",
        description:
          "Make checks payable to “American Friends for Ukraine” and mail to the address below.",
        cta: "",
        url: "",
      },
      {
        title: "Stock, DAF or company match",
        description:
          "Give through a donor-advised fund or employer match using our EIN. Email us for stock transfer details.",
        cta: "Email us",
        url: `mailto:${EMAIL}`,
      },
    ],
  },

  // ---------- Hero (top of the page) ----------
  hero: {
    eyebrow: "U.S. nonprofit · Humanitarian aid for Ukraine",
    headline: "Help Americans stand with Ukraine.",
    body: "We raise funds here in the United States and put them to work through trusted partners on the ground: medical supplies, relief and recovery for Ukrainian families.",
    // Short checkmark points under the buttons. Keep each one to a few words.
    points: ["U.S. nonprofit", "Board-reviewed projects", "Updates for every donor"],
    // Big photo on the right (under the text on phones). Any photo in public/actual/ works.
    // imageFocus: which part of the photo to keep when it's cropped ("50% 30%" = middle, upper third).
    image: "/actual/aid-volunteer-carrying-boxes-to-van.jpg",
    imageAlt: "A volunteer carries a stack of aid boxes to a delivery van in Ukraine",
    imageFocus: "50% 18%",
  },

  // ---------- Mission ----------
  mission: {
    title: "Our mission",
    // Replace with the board-approved mission statement.
    statement:
      "[Draft] American Friends for Ukraine connects American generosity with proven humanitarian work in Ukraine. We raise tax-deductible donations in the U.S., vet the projects we support, and report back to donors on how every dollar is used.",
    // Photo next to the mission statement.
    image: "/actual/aid-volunteer-with-flag-at-unloaded-truck.jpg",
    imageAlt: "A volunteer holds a Ukrainian flag in front of a truck after unloading aid",
    imageFocus: "50% 35%",
  },

  // ---------- How it works ----------
  // Photo next to the three steps.
  stepsImage: "/actual/team-volunteers-with-stacked-aid-boxes.jpg",
  stepsImageAlt: "Volunteers in a hallway stacked high with boxes of supplies",
  stepsImageFocus: "50% 40%",
  steps: [
    {
      title: "You give",
      body: "Americans donate to American Friends for Ukraine, a U.S. nonprofit, so the gift can be tax-deductible.",
    },
    {
      title: "We review and fund",
      body: "Our board reviews partner projects in Ukraine and decides which to fund, with clear budgets and goals.",
    },
    {
      title: "Aid reaches Ukraine",
      body: "Partners deliver the work on the ground, and we share updates, photos and reports with donors.",
    },
  ],

  // ---------- Projects ----------
  // status options: "Upcoming", "Active", "Completed"
  projects: [
    {
      title: "Medical Supply Caravan",
      status: "Upcoming",
      partner: "[Partner organization name]",
      body: "A convoy of vehicles loaded with medical supplies, driving from Western Europe into Ukraine to restock clinics and hospitals that need it most.",
      goal: "[$XX,XXX goal]",
      // Optional photo: any file in public/, e.g. "/actual/photo-name.jpg". "" shows a placeholder.
      // This one is from an earlier aid delivery. Swap it for a caravan photo when you have one.
      image: "/actual/aid-semi-truck-loaded-with-supplies.jpg",
      imageAlt: "A semi-truck loaded with boxes of aid supplies",
    },
    {
      title: "[Next project]",
      status: "Upcoming",
      partner: "[Partner organization name]",
      body: "[One or two sentences on what this project does and who it helps.]",
      goal: "",
      image: "",
      imageAlt: "",
    },
  ],

  // ---------- Why it matters (real photos from Ukraine) ----------
  // Photos live in public/actual/. To swap one, change the file name.
  // Exactly 4 photos: 1st and 4th show tall, 2nd and 3rd show wide.
  impact: {
    eyebrow: "Why it matters",
    title: "The war is still hitting homes, shops and streets.",
    body: "These photos were taken in Ukraine by [our volunteers / partners]. Families are living with damaged homes, broken windows and hours-long power cuts. Your gift helps them get through it and rebuild.",
    cta: "Help families rebuild",
    // Link under the button to the full photo gallery, showing only damage photos.
    moreLabel: "See all photos of the damage",
    moreHref: "/gallery#damage",
    photos: [
      {
        src: "/actual/damage-gutted-apartment-building.jpg",
        alt: "An apartment building with its windows blown out and upper floors gutted",
      },
      {
        src: "/actual/damage-burned-office-building-street.jpg",
        alt: "A long, fire-blackened office building along a city street",
      },
      {
        src: "/actual/damage-burned-cars.jpg",
        alt: "Two burned-out cars in front of a destroyed shopping center",
      },
      {
        src: "/actual/damage-house-with-blown-out-windows.jpg",
        alt: "A home with its windows blown out and covered in plastic sheeting",
      },
    ],
  },

  // ---------- Photo gallery ----------
  // The photos and their captions are in content/gallery.ts.

  // ---------- Partner ----------
  partner: {
    title: "Our partner on the ground",
    name: "[Partner organization name]",
    body: "[Short description of the Ukrainian partner organization: who they are, how long they’ve worked, and what they do. Because it’s a Ukrainian organization, U.S. donors can’t deduct gifts made to it directly. Giving through American Friends makes that possible.]",
    url: "",
    // Small picture under the partner name ("" to hide). A partner logo or team photo works well here.
    image: "/stock/us-and-ukraine-flags-on-poles.jpg",
  },

  // ---------- Board / team ----------
  team: [
    { name: "[Name]", role: "Board Chair" },
    { name: "[Name]", role: "Treasurer" },
    { name: "[Name]", role: "Secretary" },
  ],

  // ---------- FAQ ----------
  // Picture under the "Questions donors ask" heading on computers ("" to hide).
  faqImage: "/stock/helping-hands-with-ukraine-flag.jpg",
  faq: [
    {
      q: "Is my donation tax-deductible?",
      a: "[Confirm before launch] American Friends for Ukraine is a U.S. 501(c)(3) nonprofit, so donations are tax-deductible to the extent allowed by law. You’ll get an emailed receipt for your records.",
    },
    {
      q: "Why not give to the Ukrainian organization directly?",
      a: "Gifts to foreign charities generally aren’t tax-deductible for U.S. donors. As a U.S. nonprofit, we can accept deductible gifts and fund vetted projects in Ukraine.",
    },
    {
      q: "How do you decide which projects to fund?",
      a: "Our board reviews each project’s plan, budget and partner before approving funds, and asks partners to report on how the money was used.",
    },
    {
      q: "How much of my gift goes to the work?",
      a: "[Fill in once known, e.g. “We are volunteer-run, and X% of donations go directly to projects.”]",
    },
  ],

  // ---------- Spread the word (band near the bottom of the page) ----------
  // For people who can't give right now: share buttons that send friends to the photo gallery.
  share: {
    eyebrow: "Spread the word",
    title: "Can’t give right now? Share their story.",
    body: "Every share helps more people see what’s happening in Ukraine, and who’s helping. Send the photos to a friend or post them.",
    galleryLabel: "See the photos",
    image: "/stock/stand-with-ukraine-ribbon-heart-banner.jpg",
  },

  // ---------- Social links (leave "" to hide) ----------
  social: {
    instagram: "",
    facebook: "",
    x: "",
    linkedin: "",
  },
};

export type Site = typeof site;
