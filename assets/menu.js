/* ============================================================
   RYORI SUSHI · ZION HOUSE  —  edit this file to update the site
   ------------------------------------------------------------
   1. CONFIG:  phone, address, hours, social links
   2. GALLERY: photo filenames, in display order
   3. PROMOS:  homepage "Novedades" poster cards
   4. COMBOS:  the boats / combo deals
   5. MENU:    every section and dish (es + en)
   isNew: true on a MENU item adds a small "NUEVO"/"NEW" badge
   Prices are COP numbers, the site formats them as $23.000
   spicy: true adds the chili icon

   Google reviews are NOT edited here — data/reviews.json is written
   daily by .github/workflows/google-reviews.yml and loaded at runtime.
   ============================================================ */

const CONFIG = {
  // WhatsApp number in international format, digits only (57 = Colombia)
  whatsapp: "573147196115",
  // The cart handles orders now — this is only for the "questions" WhatsApp links
  whatsappMessage: {
    es: "Hola Ryori Sushi! Tengo una pregunta.",
    en: "Hi Ryori Sushi! I have a question."
  },
  address: { es: "Cra. 86 #45B-16, La América, Medellín, Antioquia", en: "Cra. 86 #45B-16, La América, Medellín, Antioquia" },
  hours: {
    es: "Lunes a jueves · 3:00 – 10:30 PM\nViernes y sábado · 1:00 – 11:00 PM\nDomingo · 1:00 – 10:00 PM",
    en: "Monday to Thursday · 3:00 – 10:30 PM\nFriday & Saturday · 1:00 – 11:00 PM\nSunday · 1:00 – 10:00 PM"
  },
  // Coordinates (keep in sync with mapEmbed below) — used for the directions button
  lat: 6.2549258,
  lng: -75.6031431,
  // Google Maps embed URL (Maps > Share > Embed a map > copy the src). Leave "" to hide.
  mapEmbed: "https://maps.google.com/maps?q=6.2549258,-75.6031431&z=17&output=embed",
  // TripAdvisor "write a review" link (leave "" to hide the review button)
  tripadvisor: "https://www.tripadvisor.com/UserReviewEdit-g297478-d34664505",
  // TripAdvisor reviews page — not linked anywhere yet, for a future "see reviews" button
  tripadvisorPage: "https://www.tripadvisor.com/Restaurant_Review-g297478-d34664505-Reviews-Ryori_Sushi_Zion_House-Medellin_Antioquia_Department.html",
  // Google "write a review" link — placeid must match .github/workflows/google-reviews.yml
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJU5zQT28pRI4RQEGHsRRapmA",
  instagram: "https://www.instagram.com/ryorisushi.co",
  facebook: "https://www.facebook.com/profile.php?id=61583867097496",
  tiktok: "https://www.tiktok.com/@ryori.sushi8",
  // Chef / owner card in the Visit section. Leave name "" to show the role in its place.
  chef: {
    name: "",
    role: { es: "Chef y fundador", en: "Chef & founder" },
    bio: { es: "Cocina asiática convertida en algo diferente.", en: "Asian cooking turned into something different." }
  }
};

// Gallery photos, in the order they're shown — add/remove/reorder here
const GALLERY = [
  "assets/img/gallery/01-platter-smoke.webp",
  "assets/img/gallery/04-gunkan.webp",
  "assets/img/gallery/05-panko-dip.webp",
  "assets/img/gallery/06-platter-chopsticks.webp",
  "assets/img/gallery/07-calamari-avocado.webp",
  "assets/img/gallery/08-tower.webp",
  "assets/img/gallery/09-roll-dip.webp",
  "assets/img/gallery/11-dessert-drizzle.webp",
  "assets/img/gallery/12-dessert-tower.webp",
  "assets/img/gallery/13-roll-chopsticks.webp",
  "assets/img/gallery/14-nigiri-chopsticks.webp",
  "assets/img/gallery/15-smoke-service.webp",
  "assets/img/gallery/16-nitrogen-pour.webp"
];

// Homepage promo posters. tab: switches the menu to that tab and scrolls there.
// scroll: scrolls straight to that section id. Reorder/swap freely.
const PROMOS = [
  { image: "assets/img/promo/promo-arroz-cantones.webp",
    alt: { es: "Promoción del nuevo Arroz Cantonés, $26.000", en: "Promo for the new Cantonese Rice, $26,000" },
    tab: "arroces" },
  { image: "assets/img/promo/promo-nigiri.webp",
    alt: { es: "Promoción de nigiris: fresco, simple, perfecto", en: "Nigiri promo: fresh, simple, perfect" },
    tab: "entradas" },
  { image: "assets/img/promo/promo-compartir.webp",
    alt: { es: "Promoción de platos para compartir: experiencias para recordar", en: "Sharing platters promo: experiences to remember" },
    scroll: "combos" }
];

const COMBOS = [
  {
    name: { es: "Barco Ikigai", en: "Ikigai Boat" }, price: 115000,
    people: { es: "Para 4–5 personas", en: "For 4–5 people" },
    items: {
      es: ["1 entrada de calamar apanado en panko, bañada con reducción de gulupa", "1 entrada de kanikama en panko, relleno de queso fundido y terminado con reducción de gulupa", "2 nigiris de kanikama con salsa dinamita 🌶", "40 bocados de sushi a elección"],
      en: ["1 order of panko-crusted calamari, drizzled with passion fruit reduction", "1 order of panko-crusted kanikama, stuffed with melted cheese and finished with passion fruit reduction", "2 kanikama nigiri with dynamite sauce 🌶", "40 pieces of sushi, your choice"]
    }
  },
  {
    name: { es: "Barco Kaizen", en: "Kaizen Boat" }, price: 85000,
    people: { es: "Para 3–4 personas", en: "For 3–4 people" },
    items: {
      es: ["1 entrada de calamar apanado en panko con reducción de gulupa", "2 nigiris de kanikama con salsa dinamita 🌶", "30 bocados de sushi a elección"],
      en: ["1 order of panko-crusted calamari with passion fruit reduction", "2 kanikama nigiri with dynamite sauce 🌶", "30 pieces of sushi, your choice"]
    }
  },
  {
    name: { es: "Combo Geisha Rox", en: "Geisha Rox Combo" }, price: 43000,
    people: { es: "Para 1–2 personas", en: "For 1–2 people" },
    items: {
      es: ["1 entrada de calamar apanado en panko con reducción de gulupa", "2 nigiris de kanikama coronados con salsa dinamita 🌶", "10 bocados de sushi a elección"],
      en: ["1 order of panko-crusted calamari with passion fruit reduction", "2 kanikama nigiri topped with dynamite sauce 🌶", "10 pieces of sushi, your choice"]
    }
  }
];

const MENU = [
  {
    id: "entradas", title: { es: "Entradas", en: "Appetizers" }, img: "assets/img/gunkan.webp",
    groups: [
      { title: null, items: [
        { name: { es: "Calamar en Panko", en: "Panko Crusted Calamari" }, price: 15000,
          desc: { es: "Calamar apanado en panko, bañado en reducción de gulupa. Se sirve con salsa teriyaki o reducción de gulupa.", en: "Calamari breaded in panko, drizzled with a passion fruit (gulupa) reduction. Served with teriyaki sauce or passion fruit reduction." } },
        { name: { es: "Kanikama en Panko", en: "Panko Crusted Kanikama" }, price: 14000,
          desc: { es: "Palitos de kanikama apanados en panko, rellenos de queso fundido, acompañados de salsa teriyaki y mix de ajonjolí.", en: "Panko-breaded kanikama (crab stick) sticks filled with melted cheese, served with teriyaki sauce and a sesame seed mix." } }
      ]},
      { title: { es: "Gunkans", en: "Gunkan" }, items: [
        { name: { es: "Gunkans de Pollo", en: "Chicken Gunkan" }, price: 13000,
          desc: { es: "Tres unidades de gunkans envueltos en maduro o nori, con pollo glaseado en salsa teriyaki.", en: "Three gunkan pieces wrapped in ripe plantain or nori, with chicken glazed in teriyaki sauce." } },
        { name: { es: "Gunkans de Cerdo", en: "Pork Gunkan" }, price: 13000,
          desc: { es: "Tres unidades de gunkans envueltos en maduro o nori, con cerdo glaseado en salsa teriyaki.", en: "Three gunkan pieces wrapped in ripe plantain or nori, with pork glazed in teriyaki sauce." } },
        { name: { es: "Gunkans de Carne", en: "Beef Gunkan" }, price: 13000,
          desc: { es: "Tres unidades de gunkans envueltos en maduro o nori, con carne glaseada en salsa teriyaki.", en: "Three gunkan pieces wrapped in ripe plantain or nori, with beef glazed in teriyaki sauce." } },
        { name: { es: "Gunkans de Salmón Ahumado", en: "Smoked Salmon Gunkan" }, price: 16000,
          desc: { es: "Tres unidades de gunkans envueltos en maduro o nori, con topping de tartar de salmón ahumado, terminado con skin de salmón, mix de ajonjolí y salsa teriyaki.", en: "Three gunkan pieces wrapped in ripe plantain or nori, topped with smoked salmon tartare, finished with salmon skin, sesame seed mix, and teriyaki sauce." } }
      ]},
      { title: { es: "Nigiris", en: "Nigiri" }, items: [
        { name: { es: "Nigiri de Kanikama", en: "Kanikama Nigiri" }, price: 13000, spicy: true,
          desc: { es: "Dos unidades de nigiri de kanikama con topping de kanikama en salsa dinamita y mix de ajonjolí.", en: "Two pieces of kanikama nigiri topped with kanikama in dynamite sauce and a sesame seed mix." } },
        { name: { es: "Nigiri de Salmón Ahumado", en: "Smoked Salmon Nigiri" }, price: 15000,
          desc: { es: "Dos unidades de nigiri de salmón ahumado bañadas en reducción de gulupa y mix de ajonjolí.", en: "Two pieces of smoked salmon nigiri drizzled with passion fruit reduction and a sesame seed mix." } },
        { name: { es: "Nigiri de Aguacate", en: "Avocado Nigiri" }, price: 12000,
          desc: { es: "Dos unidades de nigiri de aguacate bañadas en salsa teriyaki y mix de ajonjolí.", en: "Two pieces of avocado nigiri drizzled with teriyaki sauce and a sesame seed mix." } }
      ]}
    ]
  },
  {
    id: "rolls", title: { es: "Sushi Rolls", en: "Sushi Rolls" }, img: "assets/img/rolls.webp",
    groups: [
      { title: null, items: [
        { name: { es: "Maduro Rolls", en: "Maduro Rolls" }, price: 23000,
          desc: { es: "Uramaki cubierto con mix de ajonjolí y maduro, relleno de camarón tempurizado, aguacate y queso crema, terminado con salsa teriyaki y mix de ajonjolí.", en: "Uramaki coated in a sesame seed mix and ripe plantain, filled with tempura shrimp, avocado, and cream cheese, finished with teriyaki sauce and a sesame seed mix." } },
        { name: { es: "Avocado Rolls", en: "Avocado Rolls" }, price: 23000,
          desc: { es: "Uramaki con mix de ajonjolí cubierto de aguacate, relleno de kanikama tempurizado, maduro y queso crema, terminado con salsa teriyaki y mix de ajonjolí.", en: "Uramaki with a sesame seed mix covered in avocado, filled with tempura kanikama, ripe plantain, and cream cheese, finished with teriyaki sauce and a sesame seed mix." } },
        { name: { es: "Akira Rolls", en: "Akira Rolls" }, price: 23000, spicy: true,
          desc: { es: "Uramaki con mix de ajonjolí, relleno de kanikama tempurizado, maduro y aguacate, con topping de kanikama en salsa dinamita.", en: "Uramaki with a sesame seed mix, filled with tempura kanikama, ripe plantain, and avocado, topped with kanikama in dynamite sauce." } },
        { name: { es: "Veggie Rolls", en: "Veggie Rolls" }, price: 22000,
          desc: { es: "Uramaki con mix de ajonjolí cubierto de maduro y aguacate, relleno de chop suey (vegetales salteados al wok).", en: "Uramaki with a sesame seed mix covered in ripe plantain and avocado, filled with chop suey (wok-sautéed vegetables)." } }
      ]},
      { title: { es: "Smoked Rolls", en: "Smoked Rolls" }, items: [
        { name: { es: "Maj Roll", en: "Maj Roll" }, price: 34000,
          desc: { es: "Uramaki con mix de ajonjolí, cubierto con salmón ahumado. Relleno de tartar de salmón ahumado, aguacate y skin de salmón, bañado en reducción de gulupa y mix de ajonjolí.", en: "Uramaki with a sesame seed mix, topped with smoked salmon. Filled with smoked salmon tartare, avocado, and salmon skin, drizzled with passion fruit reduction and a sesame seed mix." } },
        { name: { es: "Ossy Roll", en: "Ossy Roll" }, price: 28000,
          desc: { es: "Uramaki con mix de ajonjolí, cubierto con salmón ahumado y aguacate. Relleno de kanikama tempurizado, queso crema y maduro. Coronado con skin de salmón y terminado con reducción de gulupa, salsa teriyaki y mix de ajonjolí.", en: "Uramaki with a sesame seed mix, topped with smoked salmon and avocado. Filled with tempura kanikama, cream cheese, and ripe plantain. Crowned with salmon skin and finished with passion fruit reduction, teriyaki sauce, and a sesame seed mix." } },
        { name: { es: "Cesy Roll", en: "Cesy Roll" }, price: 34000, spicy: true,
          desc: { es: "Uramaki con mix de ajonjolí, relleno de camarón tempurizado, queso crema y aguacate, con topping de camarones tempurizados bañados en salsa dinamita.", en: "Uramaki with a sesame seed mix, filled with tempura shrimp, cream cheese, and avocado, topped with tempura shrimp in dynamite sauce." } }
      ]},
      { title: { es: "Tempura Rolls", en: "Tempura Rolls" }, items: [
        { name: { es: "Zion Rolls", en: "Zion Rolls" }, price: 25000,
          desc: { es: "Maki tempurizado relleno de kanikama tempurizado, aguacate y maduro, terminado con salsa teriyaki, reducción de gulupa y mix de ajonjolí.", en: "Tempura maki filled with tempura kanikama, avocado, and ripe plantain, finished with teriyaki sauce, passion fruit reduction, and a sesame seed mix." } },
        { name: { es: "Uri Rolls", en: "Uri Rolls" }, price: 26000, spicy: true,
          desc: { es: "Uramaki apanado en panko, relleno de pescado blanco tempurizado, aguacate y maduro, con topping de kanikama en salsa dinamita y terminado con mix de ajonjolí.", en: "Panko-breaded uramaki, filled with tempura white fish, avocado, and ripe plantain, topped with kanikama in dynamite sauce and finished with a sesame seed mix." } }
      ]}
    ]
  },
  {
    id: "arroces", title: { es: "Arroces", en: "Rice Dishes" }, img: "assets/img/rice.webp",
    groups: [{ title: null, items: [
      { name: { es: "Arroz House", en: "House Rice" }, price: 19000,
        desc: { es: "Arroz salteado al wok con pollo, cerdo, raíz china, zanahoria, brócoli, zucchini y cebollín en salsa de soya y teriyaki, terminado con mix de ajonjolí.", en: "Wok-fried rice with chicken, pork, Chinese water chestnut, carrot, broccoli, zucchini, and scallion in soy and teriyaki sauce, finished with a sesame seed mix." } },
      { name: { es: "Arroz Samurai", en: "Samurai Rice" }, price: 24000,
        desc: { es: "Arroz salteado al wok con pollo, cerdo, carne, zanahoria, zucchini, brócoli, raíz china y cebollín en salsa de soya y teriyaki.", en: "Wok-fried rice with chicken, pork, beef, carrot, zucchini, broccoli, Chinese water chestnut, and scallion in soy and teriyaki sauce." } },
      { name: { es: "Arroz Tory", en: "Tory Rice" }, price: 26000,
        desc: { es: "Arroz salteado al wok con pollo, camarón, tocineta, maíz, zanahoria, zucchini, brócoli, cebollín y raíz china en salsa de soya y teriyaki.", en: "Wok-fried rice with chicken, shrimp, bacon, corn, carrot, zucchini, broccoli, scallion, and Chinese water chestnut in soy and teriyaki sauce." } },
      { name: { es: "Arroz Kiro", en: "Kiro Rice" }, price: 28000,
        desc: { es: "Arroz salteado al wok con pollo, carne, cerdo, camarón, zanahoria, zucchini, brócoli, cebollín y raíz china en salsa de soya y teriyaki.", en: "Wok-fried rice with chicken, beef, pork, shrimp, carrot, zucchini, broccoli, scallion, and Chinese water chestnut in soy and teriyaki sauce." } },
      { name: { es: "Arroz Cantonés", en: "Cantonese Rice" }, price: 26000, isNew: true,
        desc: { es: "Arroz salteado al wok con pollo, carne y cerdo, zanahoria, brócoli y zucchini, coronado con vermicelli de arroz fritos.", en: "Wok-fried rice with chicken, beef, and pork, carrot, broccoli, and zucchini, topped with crispy fried rice vermicelli." } },
      { name: { es: "Arroz Thai", en: "Thai Rice" }, price: 35000,
        desc: { es: "Arroz cremoso al wok con camarón, calamar, palmito de cangrejo, cebollín y raíz china en crema de coco y salsa teriyaki, coronado con camarones apanados en panko y terminado con ajonjolí.", en: "Creamy wok-fried rice with shrimp, calamari, crab-stick heart of palm, scallion, and Chinese water chestnut in coconut cream and teriyaki sauce, topped with panko-crusted shrimp and finished with sesame seeds." } }
    ]}]
  },
  {
    id: "pastas", title: { es: "Pastas", en: "Pasta" }, img: "assets/img/pasta.webp",
    groups: [{ title: null, items: [
      { name: { es: "Pasta Zion", en: "Zion Pasta" }, price: 19000,
        desc: { es: "Fettuccine salteado al wok con pollo y cerdo, zanahoria, brócoli, zucchini, cebollín y raíz china en salsa de soya y teriyaki, terminado con mix de ajonjolí.", en: "Wok-tossed fettuccine with chicken and pork, carrot, broccoli, zucchini, scallion, and Chinese water chestnut in soy and teriyaki sauce, finished with a sesame seed mix." } },
      { name: { es: "Pasta Veggie", en: "Veggie Pasta" }, price: 19000,
        desc: { es: "Fettuccine salteado al wok con zanahoria, zucchini, brócoli, raíz china y cebollín en salsa de soya, terminado con mix de ajonjolí.", en: "Wok-tossed fettuccine with carrot, zucchini, broccoli, Chinese water chestnut, and scallion in soy sauce, finished with a sesame seed mix." } },
      { name: { es: "Pasta Koi", en: "Koi Pasta" }, price: 23000,
        desc: { es: "Fettuccine salteado al wok con pollo, cerdo, carne, zanahoria, brócoli, zucchini, raíz china y cebollín en salsa de soya, terminado con mix de ajonjolí.", en: "Wok-tossed fettuccine with chicken, pork, beef, carrot, broccoli, zucchini, Chinese water chestnut, and scallion in soy sauce, finished with a sesame seed mix." } },
      { name: { es: "Pasta Wok", en: "Wok Pasta" }, price: 25000,
        desc: { es: "Fettuccine salteado al wok con camarón, pollo, tocineta, maíz, zanahoria, brócoli, zucchini, cebollín y raíz china en salsa de soya, terminado con mix de ajonjolí.", en: "Wok-tossed fettuccine with shrimp, chicken, bacon, corn, carrot, broccoli, zucchini, scallion, and Chinese water chestnut in soy sauce, finished with a sesame seed mix." } }
    ]}]
  },
  {
    id: "postres", title: { es: "Postres", en: "Desserts" }, img: "assets/img/dessert.webp",
    groups: [{ title: null, items: [
      { name: { es: "Postre Kaizen", en: "Kaizen Dessert" }, price: 16000,
        desc: { es: "Bola de helado apanada en panko y frita, sobre una cama de fruta fresca, terminada con arequipe.", en: "A panko-crusted, fried scoop of ice cream over a bed of fresh fruit, finished with dulce de leche (caramel)." } },
      { name: { es: "Pohl Brownie", en: "Pohl Brownie" }, price: 16000,
        desc: { es: "Brownie de arequipe o de chocolate con una bola de helado, fruta fresca y arequipe.", en: "Dulce de leche or chocolate brownie topped with a scoop of ice cream, fresh fruit, and dulce de leche." } },
      { name: { es: "Banano Tempura", en: "Tempura Banano" }, price: 15000,
        desc: { es: "Bastones de maduro tempurizados, acompañados de helado, fruta fresca y arequipe.", en: "Tempura-battered ripe plantain (banana) sticks, served with ice cream, fresh fruit, and dulce de leche." } }
    ]}]
  },
  {
    id: "bebidas", title: { es: "Bebidas", en: "Drinks" }, img: "assets/img/drinks.webp",
    groups: [{ title: null, items: [
      { name: { es: "Sodas Saborizadas", en: "Flavored Sodas" }, price: 14000,
        desc: { es: "Curuba y romero · Lychee · Frutos rojos · Tamarindo. También productos Coca-Cola.", en: "Banana passionfruit & rosemary · Lychee · Mixed berries · Tamarind. Coca-Cola products also available." } }
    ]}]
  }
];
