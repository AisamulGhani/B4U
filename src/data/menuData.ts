import imgB1 from "@/assets/menu/b1.jpg";
import imgB2 from "@/assets/menu/b2.jpg";
import imgF1 from "@/assets/menu/f1.jpg";
import imgBg1 from "@/assets/menu/bg1.jpg";
import imgBg2 from "@/assets/menu/bg2.jpg";
import imgBg3 from "@/assets/menu/bg3.jpg";
import imgBg4 from "@/assets/menu/bg4.jpg";
import imgBg5 from "@/assets/menu/bg5.jpg";
import imgBg6 from "@/assets/menu/bg6.jpg";
import imgBg7 from "@/assets/menu/bg7.jpg";
import imgBg8 from "@/assets/menu/bg8.jpg";
import imgBg9 from "@/assets/menu/bg9.jpg";
import imgBg10 from "@/assets/menu/bg10.jpg";
import imgBg11 from "@/assets/menu/bg11.jpg";
import imgBg12 from "@/assets/menu/bg12.jpg";
import imgBg13 from "@/assets/menu/bg13.jpg";
import imgSw1 from "@/assets/menu/sw1.jpg";
import imgSw2 from "@/assets/menu/sw2.jpg";
import imgSw3 from "@/assets/menu/sw3.jpg";
import imgSw4 from "@/assets/menu/sw4.jpg";
import imgCh1 from "@/assets/menu/ch1.jpg";
import imgCh2 from "@/assets/menu/ch2.jpg";
import imgCh3 from "@/assets/menu/ch3.jpg";
import imgCh4 from "@/assets/menu/ch4.jpg";
import imgCh5 from "@/assets/menu/ch5.jpg";
import imgCh6 from "@/assets/menu/ch6.jpg";
import imgCh7 from "@/assets/menu/ch7.jpg";
import imgSp1 from "@/assets/menu/sp1.jpg";
import imgSp2 from "@/assets/menu/sp2.jpg";
import imgO1 from "@/assets/menu/o1.jpg";
import imgO2 from "@/assets/menu/o2.jpg";
import imgO3 from "@/assets/menu/o3.jpg";
import imgO4 from "@/assets/menu/o4.jpg";
import imgO5 from "@/assets/menu/o5.jpg";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  emoji: string;
  image: string;
  badge?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "broast",
    name: "Broast",
    emoji: "🍗",
    items: [
      { id: "b1", name: "Chicken Crispy Broast (Chest + Wing)", price: 500, description: "Perfectly seasoned crispy broast — juicy chest & wing combo served with golden fries and a soft fresh bun.", category: "Broast", emoji: "🍗", image: imgB1, badge: "Best Seller" },
      { id: "b2", name: "Chicken Crispy Broast (Leg + Thigh)", price: 450, description: "Tender leg & thigh pieces with a signature crispy coating, served with fries and a fresh bun.", category: "Broast", emoji: "🍗", image: imgB2 },
    ],
  },
  {
    id: "fish",
    name: "Fish",
    emoji: "🐟",
    items: [
      { id: "f1", name: "Finger Fish (6 Pieces)", price: 600, description: "Six golden-fried fish fingers with a light crispy crust — served with homemade tartar sauce and fries.", category: "Fish", emoji: "🐟", image: imgF1, badge: "Popular" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    emoji: "🍔",
    items: [
      { id: "bg1", name: "Crispy Zinger Burger", price: 450, description: "A fiery crispy fillet burger loaded with fresh lettuce, creamy mayo — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg1, badge: "Best Seller" },
      { id: "bg2", name: "Crispy Zinger Burger w/ Cheese", price: 500, description: "Classic zinger with a melty cheese slice on top — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg2 },
      { id: "bg3", name: "Chatpatta Burger", price: 350, description: "Tangy spiced patty with chatpatta masala kick — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg3 },
      { id: "bg4", name: "Chatpatta Burger w/ Cheese", price: 400, description: "Extra indulgent chatpatta with a cheese layer — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg4 },
      { id: "bg5", name: "Chicken Burger", price: 300, description: "Classic grilled chicken patty with lettuce and mayo — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg5 },
      { id: "bg6", name: "Chicken Burger w/ Cheese", price: 350, description: "Soft chicken patty topped with cheese — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg6 },
      { id: "bg7", name: "Egg & Chicken Burger", price: 350, description: "Wholesome combo of chicken patty and a fried egg — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg7 },
      { id: "bg8", name: "Jumbo Chicken Burger", price: 550, description: "Go big! A hearty jumbo chicken fillet in a toasted bun — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg8, badge: "Popular" },
      { id: "bg9", name: "Jumbo Chicken Burger w/ Cheese", price: 600, description: "Our largest chicken burger with double cheese — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg9 },
      { id: "bg10", name: "Beef Burger", price: 300, description: "Juicy beef patty with fresh veggies and sauce — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg10 },
      { id: "bg11", name: "Beef Burger w/ Cheese", price: 350, description: "Rich beef burger with melted cheese — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg11 },
      { id: "bg12", name: "Jumbo Beef Burger", price: 550, description: "A massive beef burger for serious appetites — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg12 },
      { id: "bg13", name: "Jumbo Beef Burger w/ Cheese", price: 600, description: "The ultimate beef burger experience with melted cheese — served with coleslaw & fries.", category: "Burgers", emoji: "🍔", image: imgBg13 },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    emoji: "🥪",
    items: [
      { id: "sw1", name: "Chicken Sandwich", price: 350, description: "Tender chicken strips in toasted bread with fresh veggies — served with coleslaw & fries.", category: "Sandwiches", emoji: "🥪", image: imgSw1 },
      { id: "sw2", name: "Chicken Sandwich w/ Cheese", price: 400, description: "Creamy cheese elevates this chicken sandwich — served with coleslaw & fries.", category: "Sandwiches", emoji: "🥪", image: imgSw2 },
      { id: "sw3", name: "Club Sandwich", price: 350, description: "Triple-decker classic with chicken, egg, and veggies — served with coleslaw & fries.", category: "Sandwiches", emoji: "🥪", image: imgSw3, badge: "Popular" },
      { id: "sw4", name: "Club Sandwich w/ Cheese", price: 400, description: "Loaded club sandwich with extra cheese goodness — served with coleslaw & fries.", category: "Sandwiches", emoji: "🥪", image: imgSw4 },
    ],
  },
  {
    id: "chinese",
    name: "Chinese",
    emoji: "🥢",
    items: [
      { id: "ch1", name: "Chicken Shashlik", price: 650, description: "Saucy shashlik chicken skewers in tangy sauce — served with aromatic fried rice.", category: "Chinese", emoji: "🥢", image: imgCh1 },
      { id: "ch2", name: "Chicken Chilli Veg", price: 650, description: "Succulent chicken with vibrant vegetables in chilli sauce — served with fried rice.", category: "Chinese", emoji: "🥢", image: imgCh2 },
      { id: "ch3", name: "Chicken Chilli Dry", price: 700, description: "Bold dry chilli chicken with a smoky edge — served with fried rice.", category: "Chinese", emoji: "🥢", image: imgCh3, badge: "Spicy 🌶️" },
      { id: "ch4", name: "Chicken Manchurian", price: 650, description: "Classic crispy Manchurian chicken balls in rich gravy — served with fried rice.", category: "Chinese", emoji: "🥢", image: imgCh4, badge: "Best Seller" },
      { id: "ch5", name: "Chicken Chowmein", price: 650, description: "Stir-fried noodles with tender chicken and crunchy veggies in signature sauce.", category: "Chinese", emoji: "🥢", image: imgCh5 },
      { id: "ch6", name: "Chicken Vegetable", price: 400, description: "Light and healthy chicken with mixed vegetables — served with fried rice.", category: "Chinese", emoji: "🥢", image: imgCh6 },
      { id: "ch7", name: "Plain Vegetable", price: 350, description: "Fresh seasonal vegetables stir-fried in savory sauce — served with fried rice.", category: "Chinese", emoji: "🥢", image: imgCh7 },
    ],
  },
  {
    id: "soup",
    name: "Soup",
    emoji: "🍲",
    items: [
      { id: "sp1", name: "Chicken Corn Soup", price: 160, description: "Warm, velvety chicken broth with sweet corn kernels — soul-satisfying comfort in a bowl.", category: "Soup", emoji: "🍲", image: imgSp1 },
      { id: "sp2", name: "Chicken Hot & Sour Soup", price: 200, description: "Zesty hot & sour broth with silky egg strands and tender chicken — a bold warming bowl.", category: "Soup", emoji: "🍲", image: imgSp2, badge: "Popular" },
    ],
  },
  {
    id: "other",
    name: "Sides & Add-ons",
    emoji: "🍟",
    items: [
      { id: "o1", name: "French Fries", price: 140, description: "Light, crispy golden fries seasoned to perfection.", category: "Sides & Add-ons", emoji: "🍟", image: imgO1 },
      { id: "o2", name: "Mayo Fries", price: 180, description: "Crispy fries drizzled with rich creamy mayo sauce.", category: "Sides & Add-ons", emoji: "🍟", image: imgO2, badge: "Popular" },
      { id: "o3", name: "Extra Bun", price: 30, description: "Soft, fresh baked bun — great with any broast or soup.", category: "Sides & Add-ons", emoji: "🍞", image: imgO3 },
      { id: "o4", name: "Fish Sauce", price: 50, description: "Our homemade tartar fish sauce — creamy, tangy & delicious.", category: "Sides & Add-ons", emoji: "🫙", image: imgO4 },
      { id: "o5", name: "Coleslaw (Salad)", price: 40, description: "Fresh, creamy coleslaw salad — the perfect crunchy side.", category: "Sides & Add-ons", emoji: "🥗", image: imgO5 },
    ],
  },
];

export const bestSellers = menuCategories.flatMap(c => c.items).filter(i => i.badge === "Best Seller");
