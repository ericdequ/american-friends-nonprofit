/**
 * ============================================================
 *  PHOTO GALLERY: edit this file to change the photos.
 * ============================================================
 *
 * These photos appear in "Photos from Ukraine" on the home page (the first
 * few) and on the full gallery page at /gallery (all of them).
 *
 * Tips:
 *  - Photos live in public/actual/. The README lists what's in each one.
 *  - Order here is the order on the site. The first one shows big.
 *  - category: "relief" (aid, volunteers, rebuilding) or "damage".
 *  - alt: describes the photo for people using screen readers.
 *  - caption: the short line shown on the photo.
 *  - A video needs a "poster" (a still picture shown before it plays).
 *  - Each photo can be shared on its own: /gallery#file-name-without-.jpg
 */

export type GalleryCategory = "relief" | "damage";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Videos only: the still picture shown before it plays. */
  poster?: string;
};

export const gallery = {
  // Home page section
  eyebrow: "Photos from Ukraine",
  title: "The damage, and the people rebuilding",
  intro:
    "Real photos from volunteers and partners on the ground. Tap any photo to see it full size or share it.",

  // The /gallery page
  page: {
    title: "Photos from Ukraine",
    intro:
      "What the war has done to homes, shops and streets, and the volunteers delivering aid and helping people rebuild. Every photo here was taken on the ground in Ukraine. Please share them.",
  },

  // The filter buttons above the photos
  categories: [
    { key: "relief", label: "Relief & rebuilding" },
    { key: "damage", label: "The damage" },
  ] as { key: GalleryCategory; label: string }[],

  // The yellow donate tile mixed in with the photos
  donateTile: {
    title: "Help families rebuild",
    cta: "Donate",
  },

  items: [
    {
      src: "/videos/aid-loading-van.mp4",
      poster: "/videos/aid-loading-van-poster.jpg",
      alt: "Video: volunteers move boxes of supplies into a humanitarian van with a pallet jack",
      caption: "Loading a humanitarian van with supplies",
      category: "relief",
    },
    {
      src: "/actual/damage-gutted-apartment-building.jpg",
      alt: "An apartment building with its windows blown out and upper floors gutted",
      caption: "An apartment building with its upper floors destroyed",
      category: "damage",
    },
    {
      src: "/actual/aid-volunteer-carrying-boxes-to-van.jpg",
      alt: "A volunteer carries a stack of three boxes to a white van",
      caption: "Loading up for a delivery",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-shopping-center.jpg",
      alt: "A multi-story shopping center burned down to its frame",
      caption: "A burned-out shopping center",
      category: "damage",
    },
    {
      src: "/actual/team-volunteers-with-stacked-aid-boxes.jpg",
      alt: "Volunteers stand in a hallway stacked high with boxes of supplies",
      caption: "Volunteers with a hallway full of supplies",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-cars.jpg",
      alt: "Two burned-out cars in front of a destroyed market",
      caption: "Burned-out cars beside a destroyed market",
      category: "damage",
    },
    {
      src: "/actual/aid-volunteer-with-flag-at-unloaded-truck.jpg",
      alt: "A smiling volunteer holds a Ukrainian flag in front of an empty truck",
      caption: "Truck unloaded, flag up",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-office-building-street.jpg",
      alt: "A long, fire-blackened office building along a city street",
      caption: "A fire-gutted office block on a main road",
      category: "damage",
    },
    {
      src: "/actual/training-first-aid-casualty-practice.jpg",
      alt: "Volunteers practice treating a mock casualty on the floor with an emergency blanket",
      caption: "First-aid training with a mock casualty",
      category: "relief",
    },
    {
      src: "/actual/damage-house-with-blown-out-windows.jpg",
      alt: "A home with its windows blown out and covered in plastic sheeting",
      caption: "A home with its windows blown out",
      category: "damage",
    },
    {
      src: "/actual/aid-semi-truck-loaded-with-supplies.jpg",
      alt: "A semi-truck loaded with boxes of aid supplies",
      caption: "A full truckload of supplies",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-market-alley.jpg",
      alt: "A narrow market alley lined with burned, collapsed shop stalls",
      caption: "What’s left of a row of market stalls",
      category: "damage",
    },
    {
      src: "/actual/cleanup-volunteers-clearing-debris.jpg",
      alt: "Volunteers clear old mattresses and broken furniture out of a building in the snow",
      caption: "Clearing out a building in the snow",
      category: "relief",
    },
    {
      src: "/actual/damage-collapsed-building-rubble.jpg",
      alt: "A building collapsed into a pile of rubble and twisted metal",
      caption: "A building reduced to rubble",
      category: "damage",
    },
    {
      src: "/actual/aid-truck-packed-with-equipment.jpg",
      alt: "The back of a truck packed with wrapped equipment and boxes",
      caption: "A truck packed with equipment",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-office-building-facade.jpg",
      alt: "Melted cladding hangs from the front of a burned office building",
      caption: "Melted cladding on a burned office building",
      category: "damage",
    },
    {
      src: "/actual/training-first-aid-head-bandage.jpg",
      alt: "A volunteer wraps a bandage around another volunteer’s head during training",
      caption: "Practicing a head bandage",
      category: "relief",
    },
    {
      src: "/actual/mosque-damaged-ceiling-and-chandelier.jpg",
      alt: "Torn ceiling panels and blown-out windows inside a mosque",
      caption: "Blast damage inside a mosque",
      category: "damage",
    },
    {
      src: "/actual/cleanup-carrying-mattress-out-of-building.jpg",
      alt: "A volunteer carries a mattress over a pile of debris outside an old building",
      caption: "Carrying old mattresses out by hand",
      category: "relief",
    },
    {
      src: "/actual/mosque-courtyard-crater-and-shrapnel-marks.jpg",
      alt: "A crater in a courtyard next to a wall pitted with shrapnel marks",
      caption: "A crater and shrapnel marks outside the same mosque",
      category: "damage",
    },
    {
      src: "/actual/aid-unloading-truck-at-depot.jpg",
      alt: "Volunteers unload a box truck at a depot",
      caption: "Unloading at the depot",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-shop-interior.jpg",
      alt: "The charred inside of a shop, its ceiling and shelves burned away",
      caption: "Inside a burned-out shop",
      category: "damage",
    },
    {
      src: "/actual/team-volunteer-in-helmet-and-vest.jpg",
      alt: "A volunteer takes a selfie wearing a helmet and protective vest",
      caption: "Helmet and vest on for safety",
      category: "relief",
    },
    {
      src: "/actual/damage-building-with-burned-upper-floors.jpg",
      alt: "A tall city building with its top floors burned out",
      caption: "Burned-out top floors above a city street",
      category: "damage",
    },
    {
      src: "/actual/cleanup-old-mattresses-stacked-in-snow.jpg",
      alt: "Old mattresses stacked in the snow, ready to be hauled away",
      caption: "Old mattresses stacked for removal",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-market-street.jpg",
      alt: "A row of burned market stalls along a street",
      caption: "A market street after the fire",
      category: "damage",
    },
    {
      src: "/actual/training-first-aid-mock-casualty.jpg",
      alt: "A smiling volunteer sits on the floor during a first-aid drill",
      caption: "Smiling through a first-aid drill",
      category: "relief",
    },
    {
      src: "/actual/damage-burned-room-interior.jpg",
      alt: "A room where everything has burned, with debris on the floor",
      caption: "A room where everything burned",
      category: "damage",
    },
    {
      src: "/actual/team-volunteer-in-vyshyvanka-at-dinner.jpg",
      alt: "A volunteer in an embroidered vyshyvanka shirt smiles at the dinner table",
      caption: "Dinner in a traditional vyshyvanka shirt",
      category: "relief",
    },
  ] as GalleryItem[],
};

/** The name used in share links: the file name without its extension. */
export const galleryId = (item: GalleryItem) => item.src.split("/").pop()!.replace(/\.[^.]+$/, "");

export const isVideo = (item: GalleryItem) => /\.(mp4|webm|mov)$/i.test(item.src);
