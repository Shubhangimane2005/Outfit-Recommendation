import React, { useState } from 'react';
import { User, Users, Calculator, Shirt, Sparkles, ArrowLeft, ArrowRight, Heart, Star, ShoppingBag, Camera, Watch, Gem } from 'lucide-react';

interface Measurements {
  chest?: number;
  bust?: number;
  waist: number;
  hips: number;
  shoulders: number;
  height: number;
  weight: number;
}

interface BodyTypeResult {
  type: string;
  description: string;
  characteristics: string[];
  stylingGoals: string[];
}

interface OutfitOption {
  id: number;
  name: string;
  image: string;
  items: string[];
  whyItWorks: string;
  stylingTips: string[];
  whatToAvoid: string[];
  accessories: {
    jewelry: Array<{ name: string; image: string; why: string }>;
    watches: Array<{ name: string; image: string; why: string }>;
    footwear: Array<{ name: string; image: string; why: string }>;
    bags: Array<{ name: string; image: string; why: string }>;
    eyewear: Array<{ name: string; image: string; why: string }>;
    other: Array<{ name: string; image: string; why: string }>;
  };
}

const BodyTypeAdvisor: React.FC = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [measurements, setMeasurements] = useState<Measurements>({
    waist: 0,
    hips: 0,
    shoulders: 0,
    height: 0,
    weight: 0
  });
  const [bodyType, setBodyType] = useState<BodyTypeResult | null>(null);
  const [selectedOutfitStyle, setSelectedOutfitStyle] = useState<string>('');
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitOption | null>(null);
  const [showAccessories, setShowAccessories] = useState(false);

  // Comprehensive outfit database for each body type and style
  const outfitDatabase = {
    // FEMALE BODY TYPES
    female: {
      hourglass: {
        casual: [
          {
            id: 1,
            name: "Wrap Top with High-Waisted Jeans",
            image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Wrap blouse", "High-waisted skinny jeans", "Block heels", "Statement earrings"],
            whyItWorks: "Wrap tops naturally accentuate your waistline - your best asset - while high-waisted jeans maintain your balanced proportions and create a seamless silhouette.",
            stylingTips: ["Always emphasize your waist", "Choose fitted styles that follow your curves", "Wrap styles are perfect for your body type"],
            whatToAvoid: ["Loose, shapeless clothing", "Drop-waist styles", "Oversized tops that hide your waist"],
            accessories: {
              jewelry: [
                { name: "Gold Hoop Earrings", image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Hoops complement your balanced features without overwhelming" },
                { name: "Delicate Chain Necklace", image: "https://images.pexels.com/photos/1927260/pexels-photo-1927260.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Draws attention to your décolletage area" }
              ],
              watches: [
                { name: "Rose Gold Watch", image: "https://images.pexels.com/photos/1927261/pexels-photo-1927261.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Feminine touch that complements casual elegance" }
              ],
              footwear: [
                { name: "Nude Block Heels", image: "https://images.pexels.com/photos/1927262/pexels-photo-1927262.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elongates legs while maintaining comfort for casual wear" },
                { name: "White Sneakers", image: "https://images.pexels.com/photos/1927263/pexels-photo-1927263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Modern casual option that keeps the look fresh" }
              ],
              bags: [
                { name: "Crossbody Bag", image: "https://images.pexels.com/photos/1927264/pexels-photo-1927264.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Practical yet stylish, doesn't interfere with your waistline" }
              ],
              eyewear: [
                { name: "Cat-Eye Sunglasses", image: "https://images.pexels.com/photos/1927265/pexels-photo-1927265.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Enhances your natural curves and adds vintage charm" }
              ],
              other: [
                { name: "Thin Belt", image: "https://images.pexels.com/photos/1927266/pexels-photo-1927266.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Further emphasizes your waist when worn with the wrap top" }
              ]
            }
          },
          {
            id: 2,
            name: "Fitted T-Shirt with A-Line Skirt",
            image: "https://images.pexels.com/photos/1926770/pexels-photo-1926770.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted cotton t-shirt", "A-line midi skirt", "Ballet flats", "Layered necklaces"],
            whyItWorks: "The fitted tee shows off your upper body curves while the A-line skirt flows beautifully over your hips, creating a perfect balance that celebrates your hourglass shape.",
            stylingTips: ["Tuck in your top to define the waist", "Choose skirts that hit at your natural waistline", "Soft, flowing fabrics work beautifully"],
            whatToAvoid: ["Straight-cut skirts", "Boxy t-shirts", "Low-rise bottoms"],
            accessories: {
              jewelry: [
                { name: "Layered Gold Necklaces", image: "https://images.pexels.com/photos/1927267/pexels-photo-1927267.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Creates visual interest and draws attention to your neckline" },
                { name: "Stud Earrings", image: "https://images.pexels.com/photos/1927268/pexels-photo-1927268.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic and elegant, won't compete with the necklaces" }
              ],
              watches: [
                { name: "Leather Strap Watch", image: "https://images.pexels.com/photos/1927269/pexels-photo-1927269.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Casual sophistication that matches the outfit's vibe" }
              ],
              footwear: [
                { name: "Pointed Ballet Flats", image: "https://images.pexels.com/photos/1927270/pexels-photo-1927270.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elongates the leg line while keeping comfort" },
                { name: "Low Wedge Sandals", image: "https://images.pexels.com/photos/1927271/pexels-photo-1927271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds height while maintaining the casual elegance" }
              ],
              bags: [
                { name: "Tote Bag", image: "https://images.pexels.com/photos/1927272/pexels-photo-1927272.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Practical for daily activities, structured enough to maintain elegance" }
              ],
              eyewear: [
                { name: "Round Sunglasses", image: "https://images.pexels.com/photos/1927273/pexels-photo-1927273.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Softens angular features and adds a retro touch" }
              ],
              other: [
                { name: "Silk Scarf", image: "https://images.pexels.com/photos/1927274/pexels-photo-1927274.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Can be worn around neck or tied to bag for added sophistication" }
              ]
            }
          },
          {
            id: 3,
            name: "Bodycon Dress with Denim Jacket",
            image: "https://images.pexels.com/photos/1926771/pexels-photo-1926771.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Bodycon midi dress", "Denim jacket", "Ankle boots", "Hoop earrings"],
            whyItWorks: "Bodycon dresses are made for hourglass figures - they hug your curves perfectly. The denim jacket adds casual flair while maintaining the dress's figure-flattering silhouette.",
            stylingTips: ["Choose stretchy fabrics that move with you", "Layer with structured jackets", "Keep accessories minimal to let the dress shine"],
            whatToAvoid: ["Oversized jackets that hide your shape", "Busy patterns that break up your silhouette", "Shapeless cardigans"],
            accessories: {
              jewelry: [
                { name: "Silver Hoop Earrings", image: "https://images.pexels.com/photos/1927275/pexels-photo-1927275.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds movement and frames your face beautifully" },
                { name: "Simple Ring Set", image: "https://images.pexels.com/photos/1927276/pexels-photo-1927276.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Subtle detail that doesn't overwhelm the look" }
              ],
              watches: [
                { name: "Silver Chain Watch", image: "https://images.pexels.com/photos/1927277/pexels-photo-1927277.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Matches the silver jewelry and adds casual elegance" }
              ],
              footwear: [
                { name: "Black Ankle Boots", image: "https://images.pexels.com/photos/1927278/pexels-photo-1927278.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds edge to the feminine dress and elongates legs" },
                { name: "White Sneakers", image: "https://images.pexels.com/photos/1927279/pexels-photo-1927279.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "For a more relaxed, street-style approach" }
              ],
              bags: [
                { name: "Mini Backpack", image: "https://images.pexels.com/photos/1927280/pexels-photo-1927280.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Trendy and practical, keeps hands free" }
              ],
              eyewear: [
                { name: "Aviator Sunglasses", image: "https://images.pexels.com/photos/1927281/pexels-photo-1927281.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic style that adds cool factor to the outfit" }
              ],
              other: [
                { name: "Layered Bracelets", image: "https://images.pexels.com/photos/1927282/pexels-photo-1927282.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds texture and interest to your wrist area" }
              ]
            }
          },
          {
            id: 4,
            name: "Crop Top with High-Waisted Pants",
            image: "https://images.pexels.com/photos/1926772/pexels-photo-1926772.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted crop top", "High-waisted wide-leg pants", "Platform sandals", "Statement necklace"],
            whyItWorks: "This combination perfectly showcases your waist - the crop top highlights your torso while high-waisted pants emphasize your waistline and create beautiful proportions.",
            stylingTips: ["Show just a hint of midriff", "High-waisted bottoms are your best friend", "Balance fitted tops with flowing bottoms"],
            whatToAvoid: ["Low-rise pants", "Oversized crop tops", "Tight pants with tight tops"],
            accessories: {
              jewelry: [
                { name: "Statement Choker", image: "https://images.pexels.com/photos/1927283/pexels-photo-1927283.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Draws attention to your neckline and balances the crop top" },
                { name: "Body Chain", image: "https://images.pexels.com/photos/1927284/pexels-photo-1927284.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Accentuates your waist and adds glamour to the midriff area" }
              ],
              watches: [
                { name: "Gold Bracelet Watch", image: "https://images.pexels.com/photos/1927285/pexels-photo-1927285.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Luxurious touch that complements the statement jewelry" }
              ],
              footwear: [
                { name: "Platform Sandals", image: "https://images.pexels.com/photos/1927286/pexels-photo-1927286.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds height and balances the wide-leg pants" },
                { name: "Strappy Heels", image: "https://images.pexels.com/photos/1927287/pexels-photo-1927287.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elegant option that elongates the legs" }
              ],
              bags: [
                { name: "Chain Clutch", image: "https://images.pexels.com/photos/1927288/pexels-photo-1927288.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Sophisticated evening option that doesn't compete with the outfit" }
              ],
              eyewear: [
                { name: "Oversized Sunglasses", image: "https://images.pexels.com/photos/1927289/pexels-photo-1927289.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Glamorous touch that adds mystery and style" }
              ],
              other: [
                { name: "Hair Accessories", image: "https://images.pexels.com/photos/1927290/pexels-photo-1927290.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Keeps hair styled and adds feminine detail" }
              ]
            }
          }
        ],
        formal: [
          {
            id: 5,
            name: "Tailored Blazer with Pencil Skirt",
            image: "https://images.pexels.com/photos/1926773/pexels-photo-1926773.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted blazer", "High-waisted pencil skirt", "Silk blouse", "Pointed-toe pumps"],
            whyItWorks: "This classic combination is perfect for hourglass figures - the fitted blazer follows your curves while the pencil skirt hugs your hips and emphasizes your waist.",
            stylingTips: ["Ensure blazer is tailored to your waist", "Choose skirts that hit at your natural waistline", "Tuck in blouses to maintain the silhouette"],
            whatToAvoid: ["Boxy blazers", "A-line skirts in formal settings", "Loose-fitting blouses"],
            accessories: {
              jewelry: [
                { name: "Pearl Earrings", image: "https://images.pexels.com/photos/1927291/pexels-photo-1927291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic and professional, adds elegance without distraction" },
                { name: "Tennis Bracelet", image: "https://images.pexels.com/photos/1927292/pexels-photo-1927292.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Sophisticated sparkle appropriate for business settings" }
              ],
              watches: [
                { name: "Classic Dress Watch", image: "https://images.pexels.com/photos/1927293/pexels-photo-1927293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Professional timepiece that complements formal attire" }
              ],
              footwear: [
                { name: "Black Pointed Pumps", image: "https://images.pexels.com/photos/1927294/pexels-photo-1927294.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elongates legs and maintains professional appearance" },
                { name: "Nude Block Heels", image: "https://images.pexels.com/photos/1927295/pexels-photo-1927295.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Comfortable alternative that still looks polished" }
              ],
              bags: [
                { name: "Structured Handbag", image: "https://images.pexels.com/photos/1927296/pexels-photo-1927296.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Professional and organized, perfect for business meetings" }
              ],
              eyewear: [
                { name: "Classic Frames", image: "https://images.pexels.com/photos/1927297/pexels-photo-1927297.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "If needed, adds intellectual sophistication" }
              ],
              other: [
                { name: "Silk Scarf", image: "https://images.pexels.com/photos/1927298/pexels-photo-1927298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Can be worn as neck accessory or tied to bag for elegance" }
              ]
            }
          },
          {
            id: 6,
            name: "Wrap Dress with Blazer",
            image: "https://images.pexels.com/photos/1926774/pexels-photo-1926774.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Wrap midi dress", "Structured blazer", "Leather pumps", "Delicate jewelry"],
            whyItWorks: "Wrap dresses are ideal for hourglass figures as they naturally cinch at the waist. Adding a blazer creates a professional look while maintaining your feminine silhouette.",
            stylingTips: ["Choose dresses with defined waistlines", "Layer with fitted blazers", "Keep jewelry minimal and elegant"],
            whatToAvoid: ["Oversized blazers", "Shapeless dresses", "Chunky jewelry that competes with the dress"],
            accessories: {
              jewelry: [
                { name: "Diamond Studs", image: "https://images.pexels.com/photos/1927299/pexels-photo-1927299.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Timeless elegance that works in any professional setting" },
                { name: "Thin Gold Chain", image: "https://images.pexels.com/photos/1927300/pexels-photo-1927300.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Subtle accent that doesn't compete with the wrap neckline" }
              ],
              watches: [
                { name: "Gold Dress Watch", image: "https://images.pexels.com/photos/1927301/pexels-photo-1927301.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Sophisticated timepiece that matches the jewelry tone" }
              ],
              footwear: [
                { name: "Leather Pumps", image: "https://images.pexels.com/photos/1927302/pexels-photo-1927302.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic professional footwear that elongates the silhouette" },
                { name: "Kitten Heels", image: "https://images.pexels.com/photos/1927303/pexels-photo-1927303.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Comfortable option for long work days" }
              ],
              bags: [
                { name: "Leather Briefcase", image: "https://images.pexels.com/photos/1927304/pexels-photo-1927304.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Professional and practical for business documents" }
              ],
              eyewear: [
                { name: "Blue Light Glasses", image: "https://images.pexels.com/photos/1927305/pexels-photo-1927305.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Functional and stylish for office work" }
              ],
              other: [
                { name: "Leather Belt", image: "https://images.pexels.com/photos/1927306/pexels-photo-1927306.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Can be added over the blazer to further define the waist" }
              ]
            }
          },
          {
            id: 7,
            name: "Sheath Dress with Statement Accessories",
            image: "https://images.pexels.com/photos/1926775/pexels-photo-1926775.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted sheath dress", "Statement necklace", "Classic pumps", "Structured blazer"],
            whyItWorks: "Sheath dresses follow your natural curves perfectly, creating a sleek professional silhouette. The fitted cut celebrates your hourglass shape while remaining office-appropriate.",
            stylingTips: ["Choose dresses that skim your body", "Add statement jewelry for personality", "Layer with fitted outerwear"],
            whatToAvoid: ["Loose-fitting dresses", "Overwhelming patterns", "Bulky cardigans"],
            accessories: {
              jewelry: [
                { name: "Statement Pearl Necklace", image: "https://images.pexels.com/photos/1927307/pexels-photo-1927307.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds sophistication and draws attention to your neckline" },
                { name: "Matching Pearl Earrings", image: "https://images.pexels.com/photos/1927308/pexels-photo-1927308.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Completes the pearl set for a coordinated look" }
              ],
              watches: [
                { name: "Pearl-Accented Watch", image: "https://images.pexels.com/photos/1927309/pexels-photo-1927309.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Coordinates with the pearl jewelry theme" }
              ],
              footwear: [
                { name: "Patent Leather Pumps", image: "https://images.pexels.com/photos/1927310/pexels-photo-1927310.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Polished finish that elevates the entire look" },
                { name: "Suede Block Heels", image: "https://images.pexels.com/photos/1927311/pexels-photo-1927311.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Textural interest while maintaining professionalism" }
              ],
              bags: [
                { name: "Top Handle Bag", image: "https://images.pexels.com/photos/1927312/pexels-photo-1927312.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elegant and professional, perfect for important meetings" }
              ],
              eyewear: [
                { name: "Tortoiseshell Frames", image: "https://images.pexels.com/photos/1927313/pexels-photo-1927313.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic pattern that adds warmth to the look" }
              ],
              other: [
                { name: "Brooch", image: "https://images.pexels.com/photos/1927314/pexels-photo-1927314.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Vintage touch that can be pinned to blazer lapel" }
              ]
            }
          },
          {
            id: 8,
            name: "Tailored Pantsuit",
            image: "https://images.pexels.com/photos/1926776/pexels-photo-1926776.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted blazer", "High-waisted trousers", "Silk camisole", "Oxford shoes"],
            whyItWorks: "A well-tailored pantsuit on an hourglass figure is powerful and elegant. The fitted blazer shows your waist while high-waisted trousers elongate your legs and maintain proportions.",
            stylingTips: ["Ensure perfect tailoring", "Choose high-waisted trousers", "Add feminine touches with silk tops"],
            whatToAvoid: ["Boxy suits", "Low-rise pants", "Oversized blazers"],
            accessories: {
              jewelry: [
                { name: "Cufflinks", image: "https://images.pexels.com/photos/1927315/pexels-photo-1927315.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Professional detail that adds sophistication to the cuffs" },
                { name: "Minimalist Earrings", image: "https://images.pexels.com/photos/1927316/pexels-photo-1927316.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Clean lines that complement the suit's structure" }
              ],
              watches: [
                { name: "Steel Professional Watch", image: "https://images.pexels.com/photos/1927317/pexels-photo-1927317.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Authoritative timepiece perfect for executive settings" }
              ],
              footwear: [
                { name: "Oxford Shoes", image: "https://images.pexels.com/photos/1927318/pexels-photo-1927318.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic professional footwear that complements the suit" },
                { name: "Pointed Loafers", image: "https://images.pexels.com/photos/1927319/pexels-photo-1927319.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Modern alternative that's comfortable for long days" }
              ],
              bags: [
                { name: "Executive Briefcase", image: "https://images.pexels.com/photos/1927320/pexels-photo-1927320.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Professional and authoritative, perfect for business" }
              ],
              eyewear: [
                { name: "Rectangular Frames", image: "https://images.pexels.com/photos/1927321/pexels-photo-1927321.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Strong lines that complement the suit's structure" }
              ],
              other: [
                { name: "Pocket Square", image: "https://images.pexels.com/photos/1927322/pexels-photo-1927322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds personality and sophistication to the blazer" }
              ]
            }
          }
        ],
        traditional: [
          {
            id: 9,
            name: "Fitted Saree with Blouse",
            image: "https://images.pexels.com/photos/1926777/pexels-photo-1926777.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Silk saree", "Fitted blouse", "Traditional jewelry", "Heeled sandals"],
            whyItWorks: "Sarees are perfect for hourglass figures as they naturally drape to accentuate the waist. A fitted blouse shows off your curves while the saree's flow celebrates your proportions.",
            stylingTips: ["Choose fitted blouses", "Drape to emphasize waist", "Select fabrics that flow beautifully"],
            whatToAvoid: ["Loose-fitting blouses", "Heavy fabrics that add bulk", "Unflattering draping styles"],
            accessories: {
              jewelry: [
                { name: "Gold Necklace Set", image: "https://images.pexels.com/photos/1927323/pexels-photo-1927323.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional elegance that complements the saree's richness" },
                { name: "Chandelier Earrings", image: "https://images.pexels.com/photos/1927324/pexels-photo-1927324.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Statement pieces that frame your face beautifully" }
              ],
              watches: [
                { name: "Gold Traditional Watch", image: "https://images.pexels.com/photos/1927325/pexels-photo-1927325.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Blends modern functionality with traditional aesthetics" }
              ],
              footwear: [
                { name: "Embellished Heels", image: "https://images.pexels.com/photos/1927326/pexels-photo-1927326.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds glamour and height to complement the saree's elegance" },
                { name: "Traditional Juttis", image: "https://images.pexels.com/photos/1927327/pexels-photo-1927327.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Authentic traditional footwear for cultural events" }
              ],
              bags: [
                { name: "Beaded Clutch", image: "https://images.pexels.com/photos/1927328/pexels-photo-1927328.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional craftsmanship that complements the saree" }
              ],
              eyewear: [
                { name: "Vintage Sunglasses", image: "https://images.pexels.com/photos/1927329/pexels-photo-1927329.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic style for outdoor traditional events" }
              ],
              other: [
                { name: "Hair Accessories", image: "https://images.pexels.com/photos/1927330/pexels-photo-1927330.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional hair ornaments complete the cultural look" }
              ]
            }
          },
          {
            id: 10,
            name: "Anarkali Suit",
            image: "https://images.pexels.com/photos/1926778/pexels-photo-1926778.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted Anarkali top", "Churidar pants", "Dupatta", "Traditional jewelry"],
            whyItWorks: "Anarkali suits are ideal for hourglass figures - they're fitted at the bust and waist, then flow out, creating a beautiful silhouette that celebrates your curves while providing elegant coverage.",
            stylingTips: ["Choose fitted bodices", "Let the dupatta drape gracefully", "Select rich fabrics and colors"],
            whatToAvoid: ["Overly loose fits", "Heavy embellishments that overwhelm", "Unflattering necklines"],
            accessories: {
              jewelry: [
                { name: "Kundan Set", image: "https://images.pexels.com/photos/1927331/pexels-photo-1927331.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional craftsmanship that adds royal elegance" },
                { name: "Maang Tikka", image: "https://images.pexels.com/photos/1927332/pexels-photo-1927332.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Forehead jewelry that completes the traditional look" }
              ],
              watches: [
                { name: "Antique Gold Watch", image: "https://images.pexels.com/photos/1927333/pexels-photo-1927333.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Vintage appeal that matches traditional jewelry" }
              ],
              footwear: [
                { name: "Embroidered Mojaris", image: "https://images.pexels.com/photos/1927334/pexels-photo-1927334.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional footwear with intricate detailing" },
                { name: "Block Heel Sandals", image: "https://images.pexels.com/photos/1927335/pexels-photo-1927335.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Comfortable option for long celebrations" }
              ],
              bags: [
                { name: "Potli Bag", image: "https://images.pexels.com/photos/1927336/pexels-photo-1927336.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional drawstring bag perfect for festivities" }
              ],
              eyewear: [
                { name: "Gold-Rimmed Glasses", image: "https://images.pexels.com/photos/1927337/pexels-photo-1927337.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "If needed, coordinates with gold jewelry" }
              ],
              other: [
                { name: "Bangles Set", image: "https://images.pexels.com/photos/1927338/pexels-photo-1927338.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional arm jewelry that adds authentic touch" }
              ]
            }
          },
          {
            id: 11,
            name: "Lehenga Choli",
            image: "https://images.pexels.com/photos/1926779/pexels-photo-1926779.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Fitted choli", "A-line lehenga", "Dupatta", "Heavy jewelry"],
            whyItWorks: "Lehengas are perfect for hourglass figures - the fitted choli shows off your waist and bust, while the A-line skirt flows beautifully over your hips, creating a stunning traditional silhouette.",
            stylingTips: ["Ensure choli fits perfectly", "Choose appropriate lehenga length", "Balance heavy and light elements"],
            whatToAvoid: ["Ill-fitting cholis", "Overwhelming embellishments", "Wrong proportions"],
            accessories: {
              jewelry: [
                { name: "Bridal Jewelry Set", image: "https://images.pexels.com/photos/1927339/pexels-photo-1927339.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Complete set that creates cohesive traditional elegance" },
                { name: "Nose Ring", image: "https://images.pexels.com/photos/1927340/pexels-photo-1927340.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Traditional accessory that adds authentic cultural touch" }
              ],
              watches: [
                { name: "Jeweled Watch", image: "https://images.pexels.com/photos/1927341/pexels-photo-1927341.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Ornate timepiece that blends with heavy jewelry" }
              ],
              footwear: [
                { name: "Bridal Heels", image: "https://images.pexels.com/photos/1927342/pexels-photo-1927342.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Ornate footwear perfect for special occasions" },
                { name: "Comfortable Flats", image: "https://images.pexels.com/photos/1927343/pexels-photo-1927343.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "For long celebrations where comfort is key" }
              ],
              bags: [
                { name: "Embroidered Clutch", image: "https://images.pexels.com/photos/1927344/pexels-photo-1927344.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Matches the lehenga's embellishment level" }
              ],
              eyewear: [
                { name: "Decorative Glasses", image: "https://images.pexels.com/photos/1927345/pexels-photo-1927345.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "If needed, ornate frames that complement jewelry" }
              ],
              other: [
                { name: "Waist Chain", image: "https://images.pexels.com/photos/1927346/pexels-photo-1927346.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Accentuates your waist and adds traditional glamour" }
              ]
            }
          },
          {
            id: 12,
            name: "Indo-Western Fusion",
            image: "https://images.pexels.com/photos/1926780/pexels-photo-1926780.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Crop top", "Palazzo pants", "Long jacket", "Contemporary jewelry"],
            whyItWorks: "This fusion style combines the best of both worlds - the crop top shows your waist, palazzo pants flow beautifully over your hips, and the long jacket adds elegance while maintaining your silhouette.",
            stylingTips: ["Mix traditional and modern elements", "Keep proportions balanced", "Choose complementary colors"],
            whatToAvoid: ["Clashing styles", "Overwhelming patterns", "Poor color coordination"],
            accessories: {
              jewelry: [
                { name: "Contemporary Earrings", image: "https://images.pexels.com/photos/1927347/pexels-photo-1927347.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Modern design that bridges traditional and contemporary" },
                { name: "Statement Ring", image: "https://images.pexels.com/photos/1927348/pexels-photo-1927348.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Bold piece that adds personality to the fusion look" }
              ],
              watches: [
                { name: "Designer Watch", image: "https://images.pexels.com/photos/1927349/pexels-photo-1927349.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Modern timepiece that complements the fusion aesthetic" }
              ],
              footwear: [
                { name: "Wedge Sandals", image: "https://images.pexels.com/photos/1927350/pexels-photo-1927350.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Comfortable height that works with palazzo pants" },
                { name: "Ankle Boots", image: "https://images.pexels.com/photos/1927351/pexels-photo-1927351.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Edgy touch that modernizes the traditional elements" }
              ],
              bags: [
                { name: "Structured Tote", image: "https://images.pexels.com/photos/1927352/pexels-photo-1927352.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Modern bag that balances the traditional elements" }
              ],
              eyewear: [
                { name: "Trendy Sunglasses", image: "https://images.pexels.com/photos/1927353/pexels-photo-1927353.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Contemporary style that completes the fusion look" }
              ],
              other: [
                { name: "Hair Band", image: "https://images.pexels.com/photos/1927354/pexels-photo-1927354.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Modern hair accessory that keeps the look fresh" }
              ]
            }
          }
        ],
        party: [
          {
            id: 13,
            name: "Bodycon Cocktail Dress",
            image: "https://images.pexels.com/photos/1926781/pexels-photo-1926781.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Bodycon mini dress", "Statement heels", "Bold jewelry", "Clutch purse"],
            whyItWorks: "Bodycon dresses are made for hourglass figures - they hug every curve perfectly, showing off your balanced proportions and creating a stunning party silhouette that's both sexy and elegant.",
            stylingTips: ["Choose quality stretch fabrics", "Add statement accessories", "Keep makeup bold but balanced"],
            whatToAvoid: ["Cheap fabrics that don't hold shape", "Overwhelming patterns", "Too many competing elements"],
            accessories: {
              jewelry: [
                { name: "Statement Earrings", image: "https://images.pexels.com/photos/1927355/pexels-photo-1927355.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Bold pieces that add glamour and frame your face" },
                { name: "Cocktail Ring", image: "https://images.pexels.com/photos/1927356/pexels-photo-1927356.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Eye-catching piece that adds sparkle to gestures" }
              ],
              watches: [
                { name: "Diamond Watch", image: "https://images.pexels.com/photos/1927357/pexels-photo-1927357.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Luxurious timepiece that adds glamour to the wrist" }
              ],
              footwear: [
                { name: "Strappy Heels", image: "https://images.pexels.com/photos/1927358/pexels-photo-1927358.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Sexy and elegant, elongates legs beautifully" },
                { name: "Platform Pumps", image: "https://images.pexels.com/photos/1927359/pexels-photo-1927359.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds dramatic height while maintaining comfort" }
              ],
              bags: [
                { name: "Beaded Clutch", image: "https://images.pexels.com/photos/1927360/pexels-photo-1927360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Glamorous evening bag that adds texture and sparkle" }
              ],
              eyewear: [
                { name: "Cat-Eye Glasses", image: "https://images.pexels.com/photos/1927361/pexels-photo-1927361.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "If needed, sexy frames that complement the dress style" }
              ],
              other: [
                { name: "Body Jewelry", image: "https://images.pexels.com/photos/1927362/pexels-photo-1927362.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds glamour and draws attention to your curves" }
              ]
            }
          },
          {
            id: 14,
            name: "Off-Shoulder Top with Skirt",
            image: "https://images.pexels.com/photos/1926782/pexels-photo-1926782.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Off-shoulder top", "High-waisted skirt", "Statement necklace", "Heeled sandals"],
            whyItWorks: "Off-shoulder tops highlight your décolletage and shoulders while the high-waisted skirt emphasizes your waist - perfect for showcasing your hourglass proportions at parties.",
            stylingTips: ["Show off your shoulders", "Emphasize the waist", "Add statement jewelry"],
            whatToAvoid: ["Covering your best features", "Loose-fitting tops", "Low-waisted bottoms"],
            accessories: {
              jewelry: [
                { name: "Choker Necklace", image: "https://images.pexels.com/photos/1927363/pexels-photo-1927363.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Draws attention to your neckline and complements off-shoulder style" },
                { name: "Chandelier Earrings", image: "https://images.pexels.com/photos/1927364/pexels-photo-1927364.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Dramatic pieces that move beautifully and catch light" }
              ],
              watches: [
                { name: "Bracelet Watch", image: "https://images.pexels.com/photos/1927365/pexels-photo-1927365.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elegant timepiece that looks like jewelry" }
              ],
              footwear: [
                { name: "Metallic Heels", image: "https://images.pexels.com/photos/1927366/pexels-photo-1927366.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds glamour and catches light on the dance floor" },
                { name: "Ankle Strap Heels", image: "https://images.pexels.com/photos/1927367/pexels-photo-1927367.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Sexy detail that elongates the ankle" }
              ],
              bags: [
                { name: "Chain Purse", image: "https://images.pexels.com/photos/1927368/pexels-photo-1927368.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elegant evening bag that can be worn crossbody or as clutch" }
              ],
              eyewear: [
                { name: "Glamour Sunglasses", image: "https://images.pexels.com/photos/1927369/pexels-photo-1927369.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "For outdoor parties or dramatic indoor effect" }
              ],
              other: [
                { name: "Hair Clips", image: "https://images.pexels.com/photos/1927370/pexels-photo-1927370.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Keeps hair styled and adds sparkly details" }
              ]
            }
          },
          {
            id: 15,
            name: "Sequin Wrap Dress",
            image: "https://images.pexels.com/photos/1926783/pexels-photo-1926783.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Sequin wrap dress", "Nude heels", "Delicate jewelry", "Evening clutch"],
            whyItWorks: "Sequin wrap dresses are perfect for hourglass figures - the wrap style accentuates your waist while sequins add glamour. The fitted silhouette celebrates your curves beautifully.",
            stylingTips: ["Let the dress be the star", "Keep accessories minimal", "Choose nude or metallic shoes"],
            whatToAvoid: ["Competing sparkly accessories", "Overwhelming jewelry", "Clashing metallics"],
            accessories: {
              jewelry: [
                { name: "Delicate Bracelet", image: "https://images.pexels.com/photos/1927371/pexels-photo-1927371.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Subtle sparkle that doesn't compete with sequins" },
                { name: "Simple Studs", image: "https://images.pexels.com/photos/1927372/pexels-photo-1927372.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic elegance that lets the dress shine" }
              ],
              watches: [
                { name: "Minimalist Watch", image: "https://images.pexels.com/photos/1927373/pexels-photo-1927373.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Clean design that doesn't compete with dress details" }
              ],
              footwear: [
                { name: "Nude Pumps", image: "https://images.pexels.com/photos/1927374/pexels-photo-1927374.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elongates legs and lets the dress be the focus" },
                { name: "Metallic Sandals", image: "https://images.pexels.com/photos/1927375/pexels-photo-1927375.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Coordinates with sequin sparkle" }
              ],
              bags: [
                { name: "Satin Clutch", image: "https://images.pexels.com/photos/1927376/pexels-photo-1927376.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elegant texture that complements without competing" }
              ],
              eyewear: [
                { name: "Classic Frames", image: "https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "If needed, simple frames that don't distract" }
              ],
              other: [
                { name: "Silk Scarf", image: "https://images.pexels.com/photos/1927378/pexels-photo-1927378.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Can be worn as hair accessory or light wrap" }
              ]
            }
          },
          {
            id: 16,
            name: "Crop Top with High-Waisted Pants",
            image: "https://images.pexels.com/photos/1926784/pexels-photo-1926784.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Embellished crop top", "High-waisted wide-leg pants", "Statement jewelry", "Platform heels"],
            whyItWorks: "This combination is ideal for hourglass figures - the crop top shows off your waist while high-waisted pants create beautiful proportions. Perfect for dancing and showing your confidence.",
            stylingTips: ["Show just the right amount of midriff", "Choose high-waisted bottoms", "Add statement accessories"],
            whatToAvoid: ["Too much skin showing", "Low-rise pants", "Overwhelming patterns"],
            accessories: {
              jewelry: [
                { name: "Body Chain", image: "https://images.pexels.com/photos/1927379/pexels-photo-1927379.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Accentuates your waist and adds party glamour" },
                { name: "Statement Earrings", image: "https://images.pexels.com/photos/1927380/pexels-photo-1927380.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Bold pieces that move with you while dancing" }
              ],
              watches: [
                { name: "Party Watch", image: "https://images.pexels.com/photos/1927381/pexels-photo-1927381.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Fun, colorful timepiece that matches party energy" }
              ],
              footwear: [
                { name: "Platform Heels", image: "https://images.pexels.com/photos/1927382/pexels-photo-1927382.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds height and drama, perfect for dancing" },
                { name: "Strappy Sandals", image: "https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Sexy details that complement the outfit's vibe" }
              ],
              bags: [
                { name: "Mini Bag", image: "https://images.pexels.com/photos/1927384/pexels-photo-1927384.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Trendy small bag that doesn't interfere with dancing" }
              ],
              eyewear: [
                { name: "Party Sunglasses", image: "https://images.pexels.com/photos/1927385/pexels-photo-1927385.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Fun, colorful frames for outdoor parties" }
              ],
              other: [
                { name: "Temporary Tattoos", image: "https://images.pexels.com/photos/1927386/pexels-photo-1927386.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Fun party accessory that adds personality" }
              ]
            }
          }
        ]
      },
      // Add other female body types (pear, apple, rectangle, inverted triangle) with similar structure
      pear: {
        casual: [
          {
            id: 17,
            name: "Boat Neck Top with Straight Jeans",
            image: "https://images.pexels.com/photos/1926785/pexels-photo-1926785.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Boat neck striped top", "Dark straight-leg jeans", "Statement necklace", "Pointed flats"],
            whyItWorks: "Boat necks broaden your shoulders to balance your wider hips, while dark straight-leg jeans create a streamlined silhouette. This combination creates visual balance for your pear shape.",
            stylingTips: ["Draw attention to your upper body", "Choose tops with horizontal details", "Opt for darker bottoms"],
            whatToAvoid: ["Tight tops with wide bottoms", "Hip-hugging styles", "Light-colored bottoms"],
            accessories: {
              jewelry: [
                { name: "Statement Necklace", image: "https://images.pexels.com/photos/1927387/pexels-photo-1927387.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Draws attention to your upper body and balances proportions" },
                { name: "Bold Earrings", image: "https://images.pexels.com/photos/1927388/pexels-photo-1927388.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds visual weight to your upper half" }
              ],
              watches: [
                { name: "Chunky Watch", image: "https://images.pexels.com/photos/1927389/pexels-photo-1927389.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Substantial piece that adds presence to your wrist" }
              ],
              footwear: [
                { name: "Pointed Flats", image: "https://images.pexels.com/photos/1927390/pexels-photo-1927390.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Elongates legs without adding bulk to lower body" },
                { name: "Ankle Boots", image: "https://images.pexels.com/photos/1927391/pexels-photo-1927391.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Creates a sleek line and balances proportions" }
              ],
              bags: [
                { name: "Structured Tote", image: "https://images.pexels.com/photos/1927392/pexels-photo-1927392.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds structure to your upper body area" }
              ],
              eyewear: [
                { name: "Bold Frame Glasses", image: "https://images.pexels.com/photos/1927393/pexels-photo-1927393.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Draws attention to your face and upper body" }
              ],
              other: [
                { name: "Bright Scarf", image: "https://images.pexels.com/photos/1927394/pexels-photo-1927394.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds color and interest to your neckline area" }
              ]
            }
          }
          // Add 3 more casual options for pear body type...
        ]
        // Add formal, traditional, party categories for pear body type...
      }
      // Continue with apple, rectangle, inverted triangle body types...
    },
    // MALE BODY TYPES
    male: {
      "inverted-triangle": {
        casual: [
          {
            id: 101,
            name: "Soft Henley with Chinos",
            image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
            items: ["Soft cotton henley", "Slim-fit chinos", "Canvas sneakers", "Leather bracelet"],
            whyItWorks: "Soft, unstructured henleys don't add bulk to your already broad shoulders, while slim chinos create a balanced silhouette by adding visual weight to your lower body.",
            stylingTips: ["Choose soft, draping fabrics", "Avoid shoulder padding", "Add visual weight to lower body"],
            whatToAvoid: ["Structured shoulders", "Tight-fitting tops", "Skinny pants that emphasize top-heavy proportions"],
            accessories: {
              jewelry: [
                { name: "Leather Bracelet", image: "https://images.pexels.com/photos/1927395/pexels-photo-1927395.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Adds masculine detail without bulk" },
                { name: "Simple Chain", image: "https://images.pexels.com/photos/1927396/pexels-photo-1927396.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Subtle neckline accent that doesn't add shoulder width" }
              ],
              watches: [
                { name: "Minimalist Watch", image: "https://images.pexels.com/photos/1927397/pexels-photo-1927397.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Clean design that doesn't add bulk to wrist" }
              ],
              footwear: [
                { name: "Canvas Sneakers", image: "https://images.pexels.com/photos/1927398/pexels-photo-1927398.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Casual and comfortable, adds visual weight to lower body" },
                { name: "Boat Shoes", image: "https://images.pexels.com/photos/1927399/pexels-photo-1927399.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic casual option that balances proportions" }
              ],
              bags: [
                { name: "Canvas Messenger Bag", image: "https://images.pexels.com/photos/1927400/pexels-photo-1927400.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Practical and doesn't add shoulder bulk" }
              ],
              eyewear: [
                { name: "Wayframe Sunglasses", image: "https://images.pexels.com/photos/1927401/pexels-photo-1927401.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Classic style that complements facial features" }
              ],
              other: [
                { name: "Baseball Cap", image: "https://images.pexels.com/photos/1927402/pexels-photo-1927402.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop", why: "Casual accessory that doesn't emphasize shoulder width" }
              ]
            }
          }
          // Add 3 more casual options for inverted triangle male body type...
        ]
        // Add formal, traditional, party categories...
      }
      // Continue with other male body types...
    }
  };

  const calculateBodyType = (measurements: Measurements, gender: 'male' | 'female'): BodyTypeResult => {
    if (gender === 'female') {
      const bustWaistRatio = (measurements.bust || 0) / measurements.waist;
      const waistHipRatio = measurements.waist / measurements.hips;
      const shoulderHipRatio = measurements.shoulders / measurements.hips;

      if (Math.abs(bustWaistRatio - 1.3) < 0.1 && Math.abs(waistHipRatio - 0.7) < 0.1) {
        return {
          type: 'hourglass',
          description: 'You have a classic hourglass figure with balanced bust and hips and a defined waist.',
          characteristics: ['Balanced bust and hip measurements', 'Defined waistline', 'Proportional shoulders'],
          stylingGoals: ['Emphasize your waist', 'Maintain balanced proportions', 'Choose fitted silhouettes']
        };
      } else if (measurements.hips > (measurements.bust || 0) * 1.05) {
        return {
          type: 'pear',
          description: 'You have a pear body shape with fuller hips and a smaller bust.',
          characteristics: ['Hips wider than bust', 'Defined waist', 'Narrower shoulders'],
          stylingGoals: ['Balance your proportions', 'Draw attention to upper body', 'Create shoulder width']
        };
      } else if ((measurements.bust || 0) > measurements.hips * 1.05) {
        return {
          type: 'inverted-triangle',
          description: 'You have an inverted triangle shape with broader shoulders and narrower hips.',
          characteristics: ['Broader shoulders', 'Fuller bust', 'Narrower hips'],
          stylingGoals: ['Balance your silhouette', 'Add volume to lower body', 'Soften shoulder line']
        };
      } else if (measurements.waist > measurements.hips * 0.8) {
        return {
          type: 'apple',
          description: 'You have an apple body shape with a fuller midsection.',
          characteristics: ['Fuller midsection', 'Less defined waist', 'Slender legs'],
          stylingGoals: ['Create waist definition', 'Draw attention away from midsection', 'Highlight your legs']
        };
      } else {
        return {
          type: 'rectangle',
          description: 'You have a rectangle body shape with balanced proportions throughout.',
          characteristics: ['Similar bust, waist, and hip measurements', 'Straight silhouette', 'Athletic build'],
          stylingGoals: ['Create curves', 'Define your waist', 'Add feminine details']
        };
      }
    } else {
      const shoulderWaistRatio = measurements.shoulders / measurements.waist;
      const waistHipRatio = measurements.waist / measurements.hips;

      if (shoulderWaistRatio > 1.3) {
        return {
          type: 'inverted-triangle',
          description: 'You have an inverted triangle body shape with broad shoulders and a narrow waist.',
          characteristics: ['Broad shoulders', 'Narrow waist', 'Athletic upper body'],
          stylingGoals: ['Balance your proportions', 'Add visual weight to lower body', 'Avoid adding shoulder bulk']
        };
      } else if (measurements.waist > measurements.hips * 1.1) {
        return {
          type: 'oval',
          description: 'You have an oval body shape with a fuller midsection.',
          characteristics: ['Fuller midsection', 'Less defined waist', 'Proportional shoulders and hips'],
          stylingGoals: ['Create vertical lines', 'Draw attention away from midsection', 'Define your silhouette']
        };
      } else if (measurements.hips > measurements.shoulders * 1.05) {
        return {
          type: 'triangle',
          description: 'You have a triangle body shape with fuller hips and narrower shoulders.',
          characteristics: ['Narrower shoulders', 'Fuller hips', 'Defined waist'],
          stylingGoals: ['Broaden your shoulders', 'Balance your proportions', 'Create upper body presence']
        };
      } else {
        return {
          type: 'rectangle',
          description: 'You have a rectangle body shape with balanced proportions.',
          characteristics: ['Balanced shoulders and hips', 'Straight silhouette', 'Athletic build'],
          stylingGoals: ['Create definition', 'Add visual interest', 'Enhance your natural build']
        };
      }
    }
  };

  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleCalculateBodyType = () => {
    const result = calculateBodyType(measurements, gender);
    setBodyType(result);
    setStep(4);
  };

  const handleOutfitStyleSelect = (style: string) => {
    setSelectedOutfitStyle(style);
    setStep(5);
  };

  const handleOutfitSelect = (outfit: OutfitOption) => {
    setSelectedOutfit(outfit);
    setStep(6);
  };

  const handleShowAccessories = () => {
    setShowAccessories(true);
    setStep(7);
  };

  const handleStartOver = () => {
    setStep(1);
    setGender('');
    setMeasurements({ waist: 0, hips: 0, shoulders: 0, height: 0, weight: 0 });
    setBodyType(null);
    setSelectedOutfitStyle('');
    setSelectedOutfit(null);
    setShowAccessories(false);
  };

  const handleTryDifferentOutfits = () => {
    setStep(4);
    setSelectedOutfitStyle('');
    setSelectedOutfit(null);
    setShowAccessories(false);
  };

  const getOutfitOptions = (): OutfitOption[] => {
    if (!bodyType || !selectedOutfitStyle) return [];
    
    const genderData = outfitDatabase[gender as keyof typeof outfitDatabase];
    if (!genderData) return [];
    
    const bodyTypeData = genderData[bodyType.type as keyof typeof genderData];
    if (!bodyTypeData) return [];
    
    const styleData = bodyTypeData[selectedOutfitStyle as keyof typeof bodyTypeData];
    return styleData || [];
  };

  const outfitStyles = [
    { id: 'casual', name: 'Casual', icon: '👕', description: 'Everyday comfortable wear' },
    { id: 'formal', name: 'Formal', icon: '👔', description: 'Professional and business attire' },
    { id: 'traditional', name: 'Traditional', icon: '🥻', description: 'Cultural and ethnic wear' },
    { id: 'party', name: 'Party', icon: '🎉', description: 'Evening and celebration outfits' },
    { id: 'all', name: 'All Types', icon: '✨', description: 'Show me everything!' }
  ];

  return (
    <section id="body-type-advisor" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="text-pink-600" size={16} />
            <span className="text-pink-800 font-medium text-sm">Personal Style Analysis</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600">
              Perfect Style
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized outfit recommendations based on your unique body type and style preferences
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 7 && (
                  <div className={`w-8 h-1 mx-2 ${
                    step > stepNum ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Gender Selection */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Select Your Gender</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setGender('female')}
                className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
                  gender === 'female'
                    ? 'border-pink-500 bg-pink-50 scale-105'
                    : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-25'
                }`}
              >
                <Users className="mx-auto mb-4 text-pink-600" size={48} />
                <h4 className="text-xl font-semibold mb-2">Female</h4>
                <p className="text-gray-600">Get styling advice for women's fashion</p>
              </button>
              
              <button
                onClick={() => setGender('male')}
                className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
                  gender === 'male'
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <User className="mx-auto mb-4 text-blue-600" size={48} />
                <h4 className="text-xl font-semibold mb-2">Male</h4>
                <p className="text-gray-600">Get styling advice for men's fashion</p>
              </button>
            </div>
            
            {gender && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continue <ArrowRight className="inline ml-2" size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Unit Selection */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Choose Measurement Unit</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setUnit('inches')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  unit === 'inches'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-white hover:border-pink-300'
                }`}
              >
                <h4 className="text-xl font-semibold mb-2">Inches</h4>
                <p className="text-gray-600">Imperial measurement system</p>
              </button>
              
              <button
                onClick={() => setUnit('cm')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  unit === 'cm'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 bg-white hover:border-pink-300'
                }`}
              >
                <h4 className="text-xl font-semibold mb-2">Centimeters</h4>
                <p className="text-gray-600">Metric measurement system</p>
              </button>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="inline mr-2" size={20} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                Continue <ArrowRight className="inline ml-2" size={20} />
              </button>
            </div>
          </div>
        )}
         
        {/* Step 3: Measurements */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Enter Your Measurements</h3>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
              <div className="grid md:grid-cols-2 gap-6">
                {gender === 'female' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bust ({unit})
                    </label>
                    <input
                      type="number"
                      value={measurements.bust || ''}
                      onChange={(e) => handleMeasurementChange('bust', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter bust measurement"
                    />
                    <p className="text-xs text-gray-500 mt-1">Measure around the fullest part of your bust</p>
                  </div>
                )}
                
                {gender === 'male' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chest ({unit})
                    </label>
                    <input
                      type="number"
                      value={measurements.chest || ''}
                      onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter chest measurement"
                    />
                    <p className="text-xs text-gray-500 mt-1">Measure around the fullest part of your chest</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Waist ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.waist || ''}
                    onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter waist measurement"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure at your natural waistline</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hips ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.hips || ''}
                    onChange={(e) => handleMeasurementChange('hips', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter hip measurement"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure around the fullest part of your hips</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shoulders ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.shoulders || ''}
                    onChange={(e) => handleMeasurementChange('shoulders', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter shoulder measurement"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure across your shoulders from point to point</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Height ({unit})
                  </label>
                  <input
                    type="number"
                    value={measurements.height || ''}
                    onChange={(e) => handleMeasurementChange('height', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your height"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your total height</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (lbs/kg)
                  </label>
                  <input
                    type="number"
                    value={measurements.weight || ''}
                    onChange={(e) => handleMeasurementChange('weight', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your weight"
                  />
                  <p className="text-xs text-gray-500 mt-1">Your current weight</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="inline mr-2" size={20} /> Back
              </button>
              <button
                onClick={handleCalculateBodyType}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center"
              >
                <Calculator className="mr-2" size={20} />
                Calculate Body Type
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Body Type Result & Outfit Style Selection */}
        {step === 4 && bodyType && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-teal-100 px-4 py-2 rounded-full mb-6">
                <Star className="text-green-600" size={16} />
                <span className="text-green-800 font-medium text-sm">Your Body Type Result</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
                {bodyType.type.replace('-', ' ')} Body Type
              </h3>
              <p className="text-lg text-gray-600 mb-6">{bodyType.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-2xl">
                  <h4 className="font-semibold text-blue-800 mb-3">Your Key Features</h4>
                  <ul className="space-y-2">
                    {bodyType.characteristics.map((char, index) => (
                      <li key={index} className="flex items-center text-blue-700">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h4 className="font-semibold text-purple-800 mb-3">Styling Goals</h4>
                  <ul className="space-y-2">
                    {bodyType.stylingGoals.map((goal, index) => (
                      <li key={index} className="flex items-center text-purple-700">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-2xl font-bold text-center mb-8">What Type of Outfits Do You Want?</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfitStyles.slice(0, 4).map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleOutfitStyleSelect(style.id)}
                  className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 group"
                >
                  <div className="text-4xl mb-4">{style.icon}</div>
                  <h5 className="text-xl font-semibold mb-2 group-hover:text-pink-600 transition-colors">
                    {style.name}
                  </h5>
                  <p className="text-gray-600">{style.description}</p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handleOutfitStyleSelect('all')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center"
              >
                <Sparkles className="mr-2" size={20} />
                Show Me All Types
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Outfit Options */}
        {step === 5 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedOutfitStyle.charAt(0).toUpperCase() + selectedOutfitStyle.slice(1)} Outfits for {bodyType?.type.replace('-', ' ')} Body Type
              </h3>
              <p className="text-lg text-gray-600">Choose your favorite outfit to see detailed styling advice</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {getOutfitOptions().slice(0, 4).map((outfit) => (
                <div key={outfit.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/50">
                  <div className="aspect-w-16 aspect-h-20 relative">
                    <img 
                      src={outfit.image} 
                      alt={outfit.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-bold text-white mb-2">{outfit.name}</h4>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Complete Look:</h5>
                      <div className="flex flex-wrap gap-2">
                        {outfit.items.map((item, index) => (
                          <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Why This Works:</h5>
                      <p className="text-gray-600 text-sm">{outfit.whyItWorks}</p>
                    </div>
                    
                    <button
                      onClick={() => handleOutfitSelect(outfit)}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                    >
                      <Shirt className="mr-2" size={20} />
                      Choose This Outfit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="inline mr-2" size={20} /> Back to Styles
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Detailed Outfit Information */}
        {step === 6 && selectedOutfit && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-white/50">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div>
                  <img 
                    src={selectedOutfit.image} 
                    alt={selectedOutfit.name}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedOutfit.name}</h3>
                    <p className="text-gray-600">{selectedOutfit.whyItWorks}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <Star className="mr-2" size={20} />
                      Styling Tips
                    </h4>
                    <ul className="space-y-2">
                      {selectedOutfit.stylingTips.map((tip, index) => (
                        <li key={index} className="flex items-start text-green-700">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <X className="mr-2" size={20} />
                      What to Avoid
                    </h4>
                    <ul className="space-y-2">
                      {selectedOutfit.whatToAvoid.map((avoid, index) => (
                        <li key={index} className="flex items-start text-red-700">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2"></span>
                          {avoid}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <ShoppingBag className="mr-2" size={20} />
                      Complete Item List
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOutfit.items.map((item, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleShowAccessories}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <Gem className="mr-2" size={20} />
                    Show Me Accessories
                  </button>
                  
                  <button
                    onClick={() => {
                      const chatButton = document.querySelector('[data-chat-toggle]') as HTMLButtonElement;
                      chatButton?.click();
                    }}
                    className="border-2 border-pink-500 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center"
                  >
                    <Camera className="mr-2" size={20} />
                    Chat with AI Stylist
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setStep(5)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="inline mr-2" size={20} /> Back to Outfits
              </button>
              <button
                onClick={handleTryDifferentOutfits}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Try Different Outfits
              </button>
              <button
                onClick={handleStartOver}
                className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
              >
                Complete Restart
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Accessories */}
        {step === 7 && selectedOutfit && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Perfect Accessories for Your Look</h3>
              <p className="text-lg text-gray-600">Complete your {selectedOutfit.name} with these carefully selected accessories</p>
            </div>

            <div className="space-y-8">
              {/* Jewelry */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Gem className="mr-3 text-pink-600" size={28} />
                  Jewelry
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOutfit.accessories.jewelry.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h5 className="font-semibold text-gray-800 mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Watches */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Watch className="mr-3 text-blue-600" size={28} />
                  Watches
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOutfit.accessories.watches.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h5 className="font-semibold text-gray-800 mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footwear */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Shirt className="mr-3 text-purple-600" size={28} />
                  Footwear
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOutfit.accessories.footwear.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h5 className="font-semibold text-gray-800 mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bags */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <ShoppingBag className="mr-3 text-green-600" size={28} />
                  Bags
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOutfit.accessories.bags.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h5 className="font-semibold text-gray-800 mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eyewear */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Camera className="mr-3 text-teal-600" size={28} />
                  Eyewear
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOutfit.accessories.eyewear.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h5 className="font-semibold text-gray-800 mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Accessories */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Heart className="mr-3 text-red-600" size={28} />
                  Other Accessories
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOutfit.accessories.other.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h5 className="font-semibold text-gray-800 mb-2">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setStep(6)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="inline mr-2" size={20} /> Back to Outfit
              </button>
              <button
                onClick={handleTryDifferentOutfits}
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Try Different Outfits
              </button>
              <button
                onClick={handleStartOver}
                className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
              >
                Complete Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BodyTypeAdvisor;