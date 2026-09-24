/**
 * MEHRAB PERFUME - STORE DATA & INITIAL MOCK DATA
 * "More Than Just a Scent."
 * 
 * Contact Information:
 * - WhatsApp: 01938199254
 * - WhatsApp URL: https://wa.me/8801938199254
 * - Email: mehrab140822@gmail.com
 * - Location: Uttara sector 3 takwa masjid fast gate, Dhaka, Bangladesh, 1230
 * - Facebook: https://www.facebook.com/share/1DG9Jf4tPr/
 */

const STORE_CONFIG = {
  brandName: "MEHRAB PERFUME",
  tagline: "More Than Just a Scent.",
  phone: "01938199254",
  whatsappNumber: "01938199254",
  whatsappUrl: "https://wa.me/8801938199254",
  email: "mehrab140822@gmail.com",
  address: "Uttara sector 3 takwa masjid fast gate, Dhaka, Bangladesh, 1230",
  facebookUrl: "https://www.facebook.com/share/1DG9Jf4tPr/",
  currency: "৳",
  freeShippingThreshold: 1500,
  shippingInsideDhaka: 60,
  shippingOutsideDhaka: 120,
};

// 50 Handcrafted Luxury Perfume Products across 4 Categories: Oud, Musk, Floral, Woody
const INITIAL_PRODUCTS = [
  // --- OUD COLLECTION (13 Products) ---
  {
    id: "mp-oud-01",
    name: "Imperial Dehn Al Oud",
    category: "Oud",
    badge: "Bestseller",
    price6ml: 550,
    price12ml: 990,
    price15ml: 1250,
    rating: 4.9,
    reviewsCount: 312,
    isActive: true,
    description: "Distilled from matured wild Aquilaria trees. Opens with a rich balsamic woody warmth, slowly unfolding into deep leathery accords and sweet golden amber base. Long-lasting non-alcoholic artisanal attar with extraordinary 24h sillage.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-02",
    name: "Royal Cambodian Oud",
    category: "Oud",
    badge: "Signature",
    price6ml: 650,
    price12ml: 1200,
    price15ml: 1450,
    rating: 5.0,
    reviewsCount: 189,
    isActive: true,
    description: "Prized Koh Kong Cambodian agarwood oil known for its sweet caramel undertone, earthy richness, and royal presence. Perfect for special ceremonies and evening occasions.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-03",
    name: "Kalimantan Black Oud",
    category: "Oud",
    badge: "Rare",
    price6ml: 580,
    price12ml: 1050,
    price15ml: 1300,
    rating: 4.8,
    reviewsCount: 94,
    isActive: true,
    description: "Deep, smokey, resinous Indonesian agarwood harvested from the dense rainforests of Kalimantan. Infused with black pepper and cedar nuances.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-04",
    name: "Oud Blanc & Vanilla",
    category: "Oud",
    badge: "Trending",
    price6ml: 480,
    price12ml: 880,
    price15ml: 1100,
    rating: 4.9,
    reviewsCount: 142,
    isActive: true,
    description: "A softer, contemporary modern take combining creamy Madagascar vanilla beans, soft white oud, and gentle crystalline amber. Loved by both men and women.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-05",
    name: "Assam Vintage Oud 1994",
    category: "Oud",
    badge: "Limited Edition",
    price6ml: 750,
    price12ml: 1400,
    price15ml: 1750,
    rating: 5.0,
    reviewsCount: 78,
    isActive: true,
    description: "30-year naturally aged Indian Assam oud oil. Potent, barnyard-sweet complexity that dries down into unmatched hypnotic regal musk and honeyed incense.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-06",
    name: "Oud Al Layl",
    category: "Oud",
    badge: "Night Exclusive",
    price6ml: 450,
    price12ml: 820,
    price15ml: 1020,
    rating: 4.7,
    reviewsCount: 165,
    isActive: true,
    description: "The mysterious scent of Arabian midnight. Heavy smoky oud layered over tonka bean, labdanum, and spicy nutmeg. Intense projection.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-07",
    name: "Golden Amber Oud",
    category: "Oud",
    badge: "Popular",
    price6ml: 490,
    price12ml: 890,
    price15ml: 1120,
    rating: 4.8,
    reviewsCount: 215,
    isActive: true,
    description: "Warm glowing amber blended seamlessly with refined Hindi agarwood and drops of Italian bergamot. Extremely smooth and inviting.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-08",
    name: "Oud Bukhoor Special",
    category: "Oud",
    badge: "Traditional",
    price6ml: 420,
    price12ml: 780,
    price15ml: 950,
    rating: 4.8,
    reviewsCount: 110,
    isActive: true,
    description: "Captures the comforting, serene aura of freshly burning luxury bukhoor chips in a traditional clay censer. Perfect for Friday prayers.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-09",
    name: "Oud Rose Damascena",
    category: "Oud",
    badge: "Romantic",
    price6ml: 520,
    price12ml: 950,
    price15ml: 1190,
    rating: 4.9,
    reviewsCount: 177,
    isActive: true,
    description: "The timeless oriental pairing: velvet Bulgarian and Taif rose petals wrapped in dark Malaysian agarwood and golden frankincense.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-10",
    name: "Oud Shamama Gold",
    category: "Oud",
    badge: "Heritage",
    price6ml: 460,
    price12ml: 840,
    price15ml: 1040,
    rating: 4.7,
    reviewsCount: 88,
    isActive: true,
    description: "Handmade hydro-distilled blend of 40 rare Indian botanicals, saffron, and aged agarwood oil aged in copper degs in Kannauj.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-11",
    name: "Sultani White Oud",
    category: "Oud",
    badge: "Clean Luxe",
    price6ml: 500,
    price12ml: 920,
    price15ml: 1150,
    rating: 4.9,
    reviewsCount: 130,
    isActive: true,
    description: "Crisp, airy white oud blended with clean aldehydes, white florals, and crystalline musk. Sophisticated and universally pleasing.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-12",
    name: "Oud Leather Noir",
    category: "Oud",
    badge: "Intense",
    price6ml: 560,
    price12ml: 1020,
    price15ml: 1280,
    rating: 4.8,
    reviewsCount: 151,
    isActive: true,
    description: "Tuscan saddle leather infused with wild sumatran oud, saffron stigmas, and raspberry nuances. Bold, daring, and authoritative.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-oud-13",
    name: "Misty Valley Oud",
    category: "Oud",
    badge: "New",
    price6ml: 440,
    price12ml: 790,
    price15ml: 990,
    rating: 4.7,
    reviewsCount: 64,
    isActive: true,
    description: "Fresh rainy mountain morning agarwood. Damp green moss, cedarwood, and delicate oud wood resin.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // --- MUSK COLLECTION (13 Products) ---
  {
    id: "mp-musk-01",
    name: "Royal White Musk",
    category: "Musk",
    badge: "Bestseller",
    price6ml: 390,
    price12ml: 690,
    price15ml: 850,
    rating: 4.9,
    reviewsCount: 420,
    isActive: true,
    description: "Mehrab Perfume's legendary signature white musk. Velvety, powdery clean scent with soft lily of the valley, white amber, and clean cotton vibe. Unbelievably fresh all day.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-02",
    name: "Black Kasturi Musk",
    category: "Musk",
    badge: "Regal",
    price6ml: 520,
    price12ml: 950,
    price15ml: 1190,
    rating: 5.0,
    reviewsCount: 230,
    isActive: true,
    description: "Deep, sensual, animalic botanical musk crafted in the ancient Kashmiri tradition. Radiates pure warmth, charisma, and unmatched depth.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-03",
    name: "Musk Tahara Premium",
    category: "Musk",
    badge: "Iconic",
    price6ml: 350,
    price12ml: 620,
    price15ml: 780,
    rating: 4.9,
    reviewsCount: 356,
    isActive: true,
    description: "Thick, creamy lotus-white attar renowned across the Middle East for purity and longevity. Delivers gentle floral soapiness and silky powdery elegance.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-04",
    name: "Silk Musk & Pear",
    category: "Musk",
    badge: "Trending",
    price6ml: 420,
    price12ml: 750,
    price15ml: 920,
    rating: 4.8,
    reviewsCount: 168,
    isActive: true,
    description: "Juicy ripe William pear and crisp freesia harmonized with crystalline white musk and delicate cedar wood. Airy, modern, and cheerful.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-05",
    name: "Amber Musk Supreme",
    category: "Musk",
    badge: "Luxury",
    price6ml: 460,
    price12ml: 830,
    price15ml: 1030,
    rating: 4.8,
    reviewsCount: 140,
    isActive: true,
    description: "Rich honeyed Baltic amber intertwined with creamy musks, sandalwood cream, and Madagascar bourbon vanilla.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-06",
    name: "Ghazal Kashmiri Musk",
    category: "Musk",
    badge: "Artisanal",
    price6ml: 490,
    price12ml: 890,
    price15ml: 1090,
    rating: 4.9,
    reviewsCount: 118,
    isActive: true,
    description: "Scent inspired by Urdu ghazals and royal darbars. Intoxicating warm spices, saffron strands, and intoxicating musk lingering in memory.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-07",
    name: "Crystal Musk Ice",
    category: "Musk",
    badge: "Fresh",
    price6ml: 380,
    price12ml: 680,
    price15ml: 840,
    rating: 4.7,
    reviewsCount: 195,
    isActive: true,
    description: "Cool refreshing mint leaf, frosted lavender, and sheer white musk. The ultimate summer refresher for the tropical heat of Bangladesh.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-08",
    name: "Musk Rose Gold",
    category: "Musk",
    badge: "Feminine",
    price6ml: 440,
    price12ml: 790,
    price15ml: 980,
    rating: 4.9,
    reviewsCount: 221,
    isActive: true,
    description: "Sparkling pink berries, Turkish rose petals, and delicate cashmeran musk that envelopes you in an irresistible soft cloud.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-09",
    name: "Majestic Red Musk",
    category: "Musk",
    badge: "Warm Spicy",
    price6ml: 470,
    price12ml: 840,
    price15ml: 1040,
    rating: 4.8,
    reviewsCount: 105,
    isActive: true,
    description: "Fiery ginger, cinnamon bark, and rich red musk blended with warm benzoin. A seductive evening fragrance for winter nights.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-10",
    name: "Al-Musk Al-Aswad",
    category: "Musk",
    badge: "Classic",
    price6ml: 500,
    price12ml: 910,
    price15ml: 1140,
    rating: 4.8,
    reviewsCount: 133,
    isActive: true,
    description: "Traditional Middle Eastern black musk. Thick, dark, intensely aromatic, and respected for its ceremonial richness.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-11",
    name: "Musk Malaki",
    category: "Musk",
    badge: "Royal",
    price6ml: 540,
    price12ml: 980,
    price15ml: 1220,
    rating: 5.0,
    reviewsCount: 89,
    isActive: true,
    description: "Royal blend crafted with white ambergris, musk accords, and pure sandalwood drops. A masterwork of balance and longevity.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-12",
    name: "Powder Musk Delight",
    category: "Musk",
    badge: "Gentle",
    price6ml: 360,
    price12ml: 650,
    price15ml: 810,
    rating: 4.7,
    reviewsCount: 162,
    isActive: true,
    description: "Baby powder cleanliness with delicate hints of violet, almond milk, and creamy musk. Intimate and calming.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-musk-13",
    name: "Golden Musk Nectar",
    category: "Musk",
    badge: "New",
    price6ml: 410,
    price12ml: 740,
    price15ml: 920,
    rating: 4.8,
    reviewsCount: 52,
    isActive: true,
    description: "Sweet wild clover honey, ripe peach skins, and golden musk. Warm, cozy, and delightfully addictive.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // --- FLORAL COLLECTION (12 Products) ---
  {
    id: "mp-floral-01",
    name: "Taif Rose Imperial",
    category: "Floral",
    badge: "Bestseller",
    price6ml: 490,
    price12ml: 890,
    price15ml: 1100,
    rating: 4.9,
    reviewsCount: 275,
    isActive: true,
    description: "Famous Saudi Arabian mountain roses harvested at dawn in Taif. Fresh dew-kissed petals, spicy nuances, and unforgettable floral nobility.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-02",
    name: "Midnight Jasmine Sambac",
    category: "Floral",
    badge: "Signature",
    price6ml: 450,
    price12ml: 820,
    price15ml: 1020,
    rating: 4.8,
    reviewsCount: 198,
    isActive: true,
    description: "Pure nocturnal blooming Arabian jasmine (Motia / Beli). Deeply intoxicating white floral scent with green leaves and a hint of warm honey.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-03",
    name: "Ruh Khus & Neroli",
    category: "Floral",
    badge: "Exclusive",
    price6ml: 480,
    price12ml: 880,
    price15ml: 1090,
    rating: 4.9,
    reviewsCount: 147,
    isActive: true,
    description: "Green vetiver roots cold-distilled with bitter orange blossoms (Neroli). Cooling, earthy, citrusy, and refreshing.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-04",
    name: "Bakhoor Al-Zahra",
    category: "Floral",
    badge: "Festive",
    price6ml: 420,
    price12ml: 760,
    price15ml: 940,
    rating: 4.7,
    reviewsCount: 110,
    isActive: true,
    description: "Bouquet of gardenia, tuberose, and orange flowers resting on a soft incense wood background. Fills any room with joyful celebration.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-05",
    name: "Golden Tuberose Noir",
    category: "Floral",
    badge: "Extrait",
    price6ml: 510,
    price12ml: 930,
    price15ml: 1160,
    rating: 4.9,
    reviewsCount: 88,
    isActive: true,
    description: "Carnal, hypnotic Rajnigandha (tuberose) blossoms enhanced by cardamom pods, dark chocolate, and creamy sandalwood.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-06",
    name: "Saffron Blossom Gold",
    category: "Floral",
    badge: "Rare",
    price6ml: 580,
    price12ml: 1050,
    price15ml: 1300,
    rating: 5.0,
    reviewsCount: 139,
    isActive: true,
    description: "Pure Kashmiri Zafran blossoms paired with Damascus rose and sweet ambery resins. A true royal treat for special occasions.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-07",
    name: "White Lotus Serenity",
    category: "Floral",
    badge: "Spiritual",
    price6ml: 410,
    price12ml: 740,
    price15ml: 920,
    rating: 4.8,
    reviewsCount: 95,
    isActive: true,
    description: "Sacred water lotus floating on serene pond waters, touched with green bamboo, morning dew, and gentle powdery musk.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-08",
    name: "Ispahan Rose Macaron",
    category: "Floral",
    badge: "Sweet Floral",
    price6ml: 440,
    price12ml: 790,
    price15ml: 980,
    rating: 4.9,
    reviewsCount: 164,
    isActive: true,
    description: "Rose water infused with sweet lychee fruit, raspberry drizzle, and roasted almond powder. Delicious and romantic.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-09",
    name: "Frangipani Island Breeze",
    category: "Floral",
    badge: "Tropical",
    price6ml: 390,
    price12ml: 690,
    price15ml: 860,
    rating: 4.7,
    reviewsCount: 82,
    isActive: true,
    description: "Sunny yellow plumeria (Kathgolap) blossoms, coconut cream, and bright mandarin peel. Evokes tropical resort vacations.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-10",
    name: "Velvet Gardenia Royale",
    category: "Floral",
    badge: "Classy",
    price6ml: 470,
    price12ml: 850,
    price15ml: 1050,
    rating: 4.8,
    reviewsCount: 73,
    isActive: true,
    description: "Opulent white gardenia petals, sparkling green leaves, and soft cashmere wood. Highly sophisticated and memorable.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-11",
    name: "Orange Blossom Elixir",
    category: "Floral",
    badge: "Bright",
    price6ml: 410,
    price12ml: 730,
    price15ml: 910,
    rating: 4.7,
    reviewsCount: 65,
    isActive: true,
    description: "Sun-drenched Mediterranean orange groves in full bloom. Uplifting, joyful, and radiant with sunny citrus zest.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-floral-12",
    name: "Wild Lily of Kashmir",
    category: "Floral",
    badge: "New",
    price6ml: 430,
    price12ml: 780,
    price15ml: 970,
    rating: 4.8,
    reviewsCount: 48,
    isActive: true,
    description: "Mountain valley wild lilies, crisp alpine air, and delicate white cedar. Crisp and refreshing like morning dew.",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // --- WOODY COLLECTION (12 Products) ---
  {
    id: "mp-woody-01",
    name: "Mysore Sandalwood Pure",
    category: "Woody",
    badge: "Bestseller",
    price6ml: 580,
    price12ml: 1050,
    price15ml: 1300,
    rating: 5.0,
    reviewsCount: 388,
    isActive: true,
    description: "Authentic Santalum album aged heartwood from southern India. Creamy, buttery, meditative sacred sandalwood that calms the soul and lasts 24 hours.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-02",
    name: "Atlas Cedarwood Supreme",
    category: "Woody",
    badge: "Signature",
    price6ml: 420,
    price12ml: 750,
    price15ml: 930,
    rating: 4.8,
    reviewsCount: 167,
    isActive: true,
    description: "Moroccan Atlas mountains dry cedarwood, aromatic juniper berries, and smoky frankincense tears. Sharp, clean, and masculine.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-03",
    name: "Vetiver Bourbon Noir",
    category: "Woody",
    badge: "Distinguished",
    price6ml: 460,
    price12ml: 830,
    price15ml: 1040,
    rating: 4.9,
    reviewsCount: 135,
    isActive: true,
    description: "Haitian and Bourbon vetiver roots with smoky peaty nuances, cracked black pepper, and earthy patchouli. Deeply grounding and elegant.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-04",
    name: "Tobacco Vanille Royale",
    category: "Woody",
    badge: "Trending",
    price6ml: 540,
    price12ml: 980,
    price15ml: 1220,
    rating: 5.0,
    reviewsCount: 290,
    isActive: true,
    description: "Rich cured pipe tobacco leaves, sweet creamy tonka bean, dried dates, and woody cacao. The definitive cold weather statement perfume.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-05",
    name: "Smoked Guaiacwood & Amber",
    category: "Woody",
    badge: "Warm Wood",
    price6ml: 470,
    price12ml: 840,
    price15ml: 1050,
    rating: 4.8,
    reviewsCount: 115,
    isActive: true,
    description: "Exotic Palo Santo and Guaiac woods, warm birch tar smoke, and melted golden amber resin. Resinous, cozy, and comforting.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-06",
    name: "Dark Patchouli 1980",
    category: "Woody",
    badge: "Vintage",
    price6ml: 440,
    price12ml: 790,
    price15ml: 990,
    rating: 4.7,
    reviewsCount: 142,
    isActive: true,
    description: "Naturally fermented Indonesian patchouli leaves aged for over four decades in iron barrels. Earthy, dark cocoa and damp forest floor nuances.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-07",
    name: "Kyoto Hinoki Forest",
    category: "Woody",
    badge: "Zen",
    price6ml: 490,
    price12ml: 880,
    price15ml: 1100,
    rating: 4.9,
    reviewsCount: 88,
    isActive: true,
    description: "Japanese cypress wood (Hinoki), cedar needles, crushed moss, and mineral spring water. Pure meditative clarity.",
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-08",
    name: "Oakmoss & Suede",
    category: "Woody",
    badge: "Classic Chypre",
    price6ml: 450,
    price12ml: 810,
    price15ml: 1010,
    rating: 4.8,
    reviewsCount: 97,
    isActive: true,
    description: "Green velvet forest oakmoss, soft suede leather, bergamot rind, and dry vetiver. An aristocratic gentlemen's cologne profile.",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-09",
    name: "Frankincense & Myrrh Gold",
    category: "Woody",
    badge: "Sacred",
    price6ml: 500,
    price12ml: 900,
    price15ml: 1120,
    rating: 4.9,
    reviewsCount: 160,
    isActive: true,
    description: "Omani Royal Hojari frankincense tears blended with sweet Yemeni myrrh resin and dry cedarwood. Deeply reverent and peaceful.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-10",
    name: "Smoked Birch Leather",
    category: "Woody",
    badge: "Bold",
    price6ml: 460,
    price12ml: 830,
    price15ml: 1040,
    rating: 4.7,
    reviewsCount: 81,
    isActive: true,
    description: "Russian birch tar smoke, black leather jacket vibes, clove buds, and dark amber woods. Distinctive and uncompromising.",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-11",
    name: "Golden Sandal Rose",
    category: "Woody",
    badge: "Harmony",
    price6ml: 520,
    price12ml: 940,
    price15ml: 1180,
    rating: 4.9,
    reviewsCount: 124,
    isActive: true,
    description: "Rich Mysore sandalwood infused with fresh Indian Gulab petals and sweet cardamoms. Velvety, smooth, and alluring.",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mp-woody-12",
    name: "Nordic Pine & Amber",
    category: "Woody",
    badge: "New",
    price6ml: 410,
    price12ml: 730,
    price15ml: 910,
    rating: 4.7,
    reviewsCount: 56,
    isActive: true,
    description: "Frosty Scandinavian pine needles, resinous sap, fir balsam, and warm amber crystals. Invigorating and deeply refreshing.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Editable Combo Offers System
const INITIAL_COMBOS = [
  {
    id: "combo-01",
    badge: "EXCLUSIVE OFFER",
    eyebrow: "ROYAL SIGNATURE PAIRING",
    title: "Imperial Oud & White Musk Royal Duo",
    description: "Experience the royal harmony of pure Aged Cambodian Oud (12ml) paired with Silky Royal White Musk (12ml) in a velvet-lined collector box. The ultimate gift of distinction.",
    metaLabel: "Bundle Savings",
    metaValue: "Save 25% (৳1,450 ৳1,900)",
    buttonText: "Claim Royal Duo",
    theme: "gold",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    isActive: true
  },
  {
    id: "combo-02",
    badge: "GIFT SETS",
    eyebrow: "THE CONNOISSEUR'S COLLECTION",
    title: "Four Seasons Discovery Attar Set",
    description: "Curated miniature discovery box featuring our 4 most loved iconic fragrances: Dehn Al Oud, Kasturi Deer Musk, Taif Rose & Mysore Sandalwood (6ml each).",
    metaLabel: "Best Gift Value",
    metaValue: "4 × 6ml Set for ৳1,650",
    buttonText: "Explore Gift Box",
    theme: "dark",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    isActive: true
  },
  {
    id: "combo-03",
    badge: "LIMITED EDITION",
    eyebrow: "FESTIVE RAMADAN & EID SPECIAL",
    title: "Sultanate Evening Trio Gift Box",
    description: "Three majestic 12ml perfumes designed for unmatched sillage and celebrations: Oud Al Layl, Amber Musk Supreme, and Tobacco Vanille Royale.",
    metaLabel: "Limited Eid Edition",
    metaValue: "৳2,250 ৳2,900",
    buttonText: "Order Special Trio",
    theme: "amber",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    isActive: true
  }
];

// Sample Initial Orders (for demonstration in Admin and testing)
const INITIAL_ORDERS = [
  {
    id: "MP-7829104",
    userId: "demo-cust-1",
    customerName: "Mohammad Tanvir Rahman",
    email: "tanvir.rahman@gmail.com",
    phone: "01711223344",
    address: "House 14, Road 7, Sector 3, Uttara, Dhaka",
    items: [
      {
        id: "mp-oud-01",
        name: "Imperial Dehn Al Oud",
        size: "12ml",
        quantity: 1,
        price: 990,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "mp-musk-01",
        name: "Royal White Musk",
        size: "6ml",
        quantity: 2,
        price: 390,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
      }
    ],
    totalAmount: 1830,
    paymentMethod: "Cash on Delivery",
    status: "Pending",
    createdAt: "2026-09-23T14:30:00.000Z",
    updatedAt: "2026-09-23T14:30:00.000Z"
  },
  {
    id: "MP-6491028",
    userId: "demo-cust-2",
    customerName: "Sayeda Nusrat Jahan",
    email: "nusrat.jahan@hotmail.com",
    phone: "01822334455",
    address: "Flat 4B, Concord Tower, Gulshan-2, Dhaka",
    items: [
      {
        id: "mp-floral-01",
        name: "Taif Rose Imperial",
        size: "12ml",
        quantity: 1,
        price: 890,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
      }
    ],
    totalAmount: 950,
    paymentMethod: "Cash on Delivery",
    status: "Confirmed",
    createdAt: "2026-09-22T10:15:00.000Z",
    updatedAt: "2026-09-22T11:00:00.000Z"
  },
  {
    id: "MP-5182903",
    userId: "demo-cust-3",
    customerName: "Farhan Ahmed",
    email: "farhan.ahmed@yahoo.com",
    phone: "01933445566",
    address: "Holding 88, Nasirabad, Chattogram",
    items: [
      {
        id: "mp-woody-01",
        name: "Mysore Sandalwood Pure",
        size: "15ml",
        quantity: 1,
        price: 1300,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
      }
    ],
    totalAmount: 1420,
    paymentMethod: "Online Payment",
    status: "Delivered",
    createdAt: "2026-09-20T16:00:00.000Z",
    updatedAt: "2026-09-22T18:00:00.000Z"
  }
];

// Helper to initialize local storage data if not present
function initializeStoreData() {
  if (!localStorage.getItem("mp_products")) {
    localStorage.setItem("mp_products", JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem("mp_combos")) {
    localStorage.setItem("mp_combos", JSON.stringify(INITIAL_COMBOS));
  }
  if (!localStorage.getItem("mp_orders")) {
    localStorage.setItem("mp_orders", JSON.stringify(INITIAL_ORDERS));
  }
  if (!localStorage.getItem("mp_cart")) {
    localStorage.setItem("mp_cart", JSON.stringify([]));
  }
}

// Automatically seed on script load
try {
  initializeStoreData();
} catch (e) {
  console.warn("Storage initialization notice:", e);
}

// Export for module systems or global window access
if (typeof window !== "undefined") {
  window.STORE_CONFIG = STORE_CONFIG;
  window.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  window.INITIAL_COMBOS = INITIAL_COMBOS;
  window.INITIAL_ORDERS = INITIAL_ORDERS;
  window.initializeStoreData = initializeStoreData;
}
