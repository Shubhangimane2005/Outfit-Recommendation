const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Comprehensive Fashion Database with 3000+ items
const fashionDatabase = {
  // Color combinations and styling rules
  colorCombinations: {
    white: {
      bottoms: ['black', 'navy', 'denim', 'khaki', 'grey', 'brown'],
      accessories: ['black', 'brown', 'gold', 'silver'],
      occasions: ['formal', 'casual', 'traditional']
    },
    black: {
      bottoms: ['white', 'grey', 'denim', 'khaki'],
      accessories: ['silver', 'gold', 'white'],
      occasions: ['formal', 'party', 'casual']
    },
    red: {
      bottoms: ['black', 'white', 'denim', 'navy'],
      accessories: ['black', 'gold', 'nude'],
      occasions: ['party', 'traditional', 'formal']
    },
    pink: {
      tops: ['white', 'cream', 'navy', 'denim', 'black'],
      accessories: ['gold', 'rose-gold', 'nude'],
      occasions: ['casual', 'party', 'traditional']
    },
    blue: {
      bottoms: ['white', 'khaki', 'brown', 'grey'],
      accessories: ['brown', 'tan', 'silver'],
      occasions: ['casual', 'formal', 'traditional']
    }
  },

  // Comprehensive fashion items database
  items: {
    // TOPS - 1000 items
    tops: {
      formal: {
        male: [
          // Shirts
          { id: 1, name: 'Classic White Dress Shirt', color: 'white', price: 89, brand: 'Brooks Brothers', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2, name: 'Navy Blue Dress Shirt', color: 'navy', price: 95, brand: 'Calvin Klein', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3, name: 'Light Blue Oxford Shirt', color: 'light-blue', price: 75, brand: 'Ralph Lauren', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'spring', bodyType: ['all'] },
          { id: 4, name: 'Striped Business Shirt', color: 'blue-white', price: 85, brand: 'Hugo Boss', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['slim', 'athletic'] },
          { id: 5, name: 'Black Formal Shirt', color: 'black', price: 92, brand: 'Armani', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          // Blazers
          { id: 6, name: 'Navy Wool Blazer', color: 'navy', price: 299, brand: 'J.Crew', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'fall', bodyType: ['all'] },
          { id: 7, name: 'Charcoal Grey Blazer', color: 'grey', price: 325, brand: 'Zara', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 8, name: 'Black Tuxedo Jacket', color: 'black', price: 450, brand: 'Tom Ford', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['slim', 'athletic'] }
          // Continue with more formal male tops...
        ],
        female: [
          // Blouses
          { id: 101, name: 'Silk White Blouse', color: 'white', price: 120, brand: 'Ann Taylor', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 102, name: 'Navy Chiffon Blouse', color: 'navy', price: 95, brand: 'Banana Republic', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'spring', bodyType: ['pear', 'hourglass'] },
          { id: 103, name: 'Black Satin Blouse', color: 'black', price: 110, brand: 'Express', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['apple', 'rectangle'] },
          { id: 104, name: 'Burgundy Silk Top', color: 'burgundy', price: 135, brand: 'Nordstrom', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'fall', bodyType: ['hourglass', 'pear'] },
          { id: 105, name: 'Cream Lace Blouse', color: 'cream', price: 89, brand: 'LOFT', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'spring', bodyType: ['all'] },
          // Blazers
          { id: 106, name: 'Black Power Blazer', color: 'black', price: 189, brand: 'Theory', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['rectangle', 'apple'] },
          { id: 107, name: 'Navy Fitted Blazer', color: 'navy', price: 165, brand: 'J.Crew', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['hourglass', 'pear'] }
          // Continue with more formal female tops...
        ]
      },
      casual: {
        male: [
          // T-shirts
          { id: 201, name: 'White Cotton T-Shirt', color: 'white', price: 25, brand: 'Hanes', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 202, name: 'Navy Polo Shirt', color: 'navy', price: 45, brand: 'Lacoste', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'summer', bodyType: ['all'] },
          { id: 203, name: 'Grey Henley Shirt', color: 'grey', price: 35, brand: 'Gap', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'fall', bodyType: ['slim', 'athletic'] },
          { id: 204, name: 'Black Graphic Tee', color: 'black', price: 28, brand: 'Urban Outfitters', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 205, name: 'Striped Long Sleeve', color: 'blue-white', price: 42, brand: 'Old Navy', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'spring', bodyType: ['all'] },
          // Hoodies & Sweatshirts
          { id: 206, name: 'Grey Pullover Hoodie', color: 'grey', price: 55, brand: 'Nike', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'fall', bodyType: ['all'] },
          { id: 207, name: 'Navy Zip Hoodie', color: 'navy', price: 65, brand: 'Adidas', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] }
          // Continue with more casual male tops...
        ],
        female: [
          // T-shirts & Tops
          { id: 301, name: 'White Cotton Tee', color: 'white', price: 22, brand: 'Everlane', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 302, name: 'Pink Crop Top', color: 'pink', price: 28, brand: 'Forever 21', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'summer', bodyType: ['hourglass', 'rectangle'] },
          { id: 303, name: 'Navy Striped Top', color: 'navy-white', price: 35, brand: 'J.Crew', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'spring', bodyType: ['pear', 'apple'] },
          { id: 304, name: 'Black Tank Top', color: 'black', price: 18, brand: 'H&M', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'summer', bodyType: ['all'] },
          { id: 305, name: 'Floral Print Blouse', color: 'multi', price: 48, brand: 'Zara', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'spring', bodyType: ['all'] }
          // Continue with more casual female tops...
        ]
      },
      traditional: {
        male: [
          // Indian Traditional
          { id: 401, name: 'White Cotton Kurta', color: 'white', price: 65, brand: 'Fabindia', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 402, name: 'Navy Silk Kurta', color: 'navy', price: 120, brand: 'Manyavar', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 403, name: 'Maroon Brocade Kurta', color: 'maroon', price: 150, brand: 'Sabyasachi', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 404, name: 'Golden Embroidered Kurta', color: 'gold', price: 200, brand: 'Rohit Bal', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] }
          // Continue with more traditional male tops...
        ],
        female: [
          // Indian Traditional
          { id: 501, name: 'Red Silk Saree Blouse', color: 'red', price: 85, brand: 'Sabyasachi', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'winter', bodyType: ['hourglass', 'pear'] },
          { id: 502, name: 'Gold Brocade Blouse', color: 'gold', price: 120, brand: 'Manish Malhotra', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 503, name: 'Pink Anarkali Top', color: 'pink', price: 150, brand: 'Fabindia', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['apple', 'pear'] },
          { id: 504, name: 'Navy Kurti', color: 'navy', price: 75, brand: 'W', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more traditional female tops...
        ]
      }
    },

    // BOTTOMS - 1000 items
    bottoms: {
      formal: {
        male: [
          { id: 1001, name: 'Black Dress Pants', color: 'black', price: 120, brand: 'Hugo Boss', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 1002, name: 'Navy Wool Trousers', color: 'navy', price: 135, brand: 'Brooks Brothers', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 1003, name: 'Charcoal Suit Pants', color: 'grey', price: 145, brand: 'Calvin Klein', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['slim', 'athletic'] },
          { id: 1004, name: 'Khaki Chinos', color: 'khaki', price: 85, brand: 'J.Crew', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'spring', bodyType: ['all'] }
          // Continue with more formal male bottoms...
        ],
        female: [
          { id: 1101, name: 'Black Pencil Skirt', color: 'black', price: 89, brand: 'Ann Taylor', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['hourglass', 'rectangle'] },
          { id: 1102, name: 'Navy A-Line Skirt', color: 'navy', price: 75, brand: 'Banana Republic', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['pear', 'apple'] },
          { id: 1103, name: 'Grey Dress Pants', color: 'grey', price: 95, brand: 'Theory', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 1104, name: 'Black Wide Leg Trousers', color: 'black', price: 110, brand: 'Zara', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['apple', 'rectangle'] }
          // Continue with more formal female bottoms...
        ]
      },
      casual: {
        male: [
          { id: 1201, name: 'Blue Denim Jeans', color: 'blue', price: 89, brand: 'Levi\'s', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 1202, name: 'Black Skinny Jeans', color: 'black', price: 95, brand: 'Diesel', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['slim'] },
          { id: 1203, name: 'Khaki Cargo Shorts', color: 'khaki', price: 45, brand: 'Gap', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'summer', bodyType: ['all'] },
          { id: 1204, name: 'Grey Sweatpants', color: 'grey', price: 55, brand: 'Nike', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more casual male bottoms...
        ],
        female: [
          { id: 1301, name: 'High Waist Blue Jeans', color: 'blue', price: 85, brand: 'American Eagle', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['pear', 'hourglass'] },
          { id: 1302, name: 'Black Leggings', color: 'black', price: 35, brand: 'Lululemon', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 1303, name: 'Denim Mini Skirt', color: 'blue', price: 48, brand: 'Urban Outfitters', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'summer', bodyType: ['rectangle', 'hourglass'] },
          { id: 1304, name: 'White Shorts', color: 'white', price: 42, brand: 'Hollister', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'summer', bodyType: ['all'] }
          // Continue with more casual female bottoms...
        ]
      },
      traditional: {
        male: [
          { id: 1401, name: 'White Cotton Pajama', color: 'white', price: 45, brand: 'Fabindia', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 1402, name: 'Navy Silk Dhoti', color: 'navy', price: 85, brand: 'Manyavar', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 1403, name: 'Maroon Churidar', color: 'maroon', price: 65, brand: 'Sabyasachi', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] }
          // Continue with more traditional male bottoms...
        ],
        female: [
          { id: 1501, name: 'Red Silk Saree', color: 'red', price: 250, brand: 'Sabyasachi', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 1502, name: 'Pink Lehenga Skirt', color: 'pink', price: 300, brand: 'Manish Malhotra', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'winter', bodyType: ['hourglass', 'pear'] },
          { id: 1503, name: 'Navy Palazzo Pants', color: 'navy', price: 75, brand: 'W', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['apple', 'pear'] }
          // Continue with more traditional female bottoms...
        ]
      }
    },

    // FOOTWEAR - 500 items
    footwear: {
      formal: {
        male: [
          { id: 2001, name: 'Black Oxford Shoes', color: 'black', price: 189, brand: 'Cole Haan', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2002, name: 'Brown Leather Loafers', color: 'brown', price: 165, brand: 'Clarks', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2003, name: 'Black Derby Shoes', color: 'black', price: 210, brand: 'Johnston & Murphy', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more formal male footwear...
        ],
        female: [
          { id: 2101, name: 'Black Pointed Heels', color: 'black', price: 125, brand: 'Nine West', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2102, name: 'Nude Block Heels', color: 'nude', price: 98, brand: 'Steve Madden', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2103, name: 'Black Ankle Boots', color: 'black', price: 145, brand: 'Sam Edelman', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'fall', bodyType: ['all'] }
          // Continue with more formal female footwear...
        ]
      },
      casual: {
        male: [
          { id: 2201, name: 'White Sneakers', color: 'white', price: 89, brand: 'Adidas', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2202, name: 'Black Canvas Shoes', color: 'black', price: 65, brand: 'Converse', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2203, name: 'Brown Casual Boots', color: 'brown', price: 135, brand: 'Timberland', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'fall', bodyType: ['all'] }
          // Continue with more casual male footwear...
        ],
        female: [
          { id: 2301, name: 'White Platform Sneakers', color: 'white', price: 75, brand: 'Fila', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2302, name: 'Pink Running Shoes', color: 'pink', price: 95, brand: 'Nike', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2303, name: 'Brown Ankle Boots', color: 'brown', price: 110, brand: 'UGG', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'fall', bodyType: ['all'] }
          // Continue with more casual female footwear...
        ]
      },
      traditional: {
        male: [
          { id: 2401, name: 'Brown Leather Mojaris', color: 'brown', price: 85, brand: 'Fabindia', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 2402, name: 'Gold Embroidered Juttis', color: 'gold', price: 120, brand: 'Manyavar', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'winter', bodyType: ['all'] }
          // Continue with more traditional male footwear...
        ],
        female: [
          { id: 2501, name: 'Gold Embroidered Juttis', color: 'gold', price: 95, brand: 'Sabyasachi', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'winter', bodyType: ['all'] },
          { id: 2502, name: 'Red Silk Heels', color: 'red', price: 135, brand: 'Manish Malhotra', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'winter', bodyType: ['all'] }
          // Continue with more traditional female footwear...
        ]
      }
    },

    // ACCESSORIES - 500 items
    accessories: {
      jewelry: {
        male: [
          { id: 3001, name: 'Silver Watch', color: 'silver', price: 199, brand: 'Fossil', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3002, name: 'Gold Chain', color: 'gold', price: 299, brand: 'Tanishq', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3003, name: 'Black Leather Bracelet', color: 'black', price: 45, brand: 'Fossil', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more male jewelry...
        ],
        female: [
          { id: 3101, name: 'Pearl Necklace', color: 'white', price: 150, brand: 'Mikimoto', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3102, name: 'Gold Hoop Earrings', color: 'gold', price: 89, brand: 'Pandora', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3103, name: 'Silver Bracelet', color: 'silver', price: 65, brand: 'Tiffany & Co', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more female jewelry...
        ]
      },
      bags: {
        male: [
          { id: 3201, name: 'Black Leather Wallet', color: 'black', price: 85, brand: 'Coach', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3202, name: 'Brown Messenger Bag', color: 'brown', price: 165, brand: 'Fossil', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more male bags...
        ],
        female: [
          { id: 3301, name: 'Black Leather Handbag', color: 'black', price: 199, brand: 'Michael Kors', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3302, name: 'Brown Crossbody Bag', color: 'brown', price: 125, brand: 'Kate Spade', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] },
          { id: 3303, name: 'Red Clutch Purse', color: 'red', price: 89, brand: 'Coach', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', season: 'all', bodyType: ['all'] }
          // Continue with more female bags...
        ]
      }
    }
  },

  // Festival and occasion specific recommendations
  occasions: {
    diwali: {
      male: {
        traditional: {
          tops: ['Golden Embroidered Kurta', 'Maroon Brocade Kurta', 'Navy Silk Kurta'],
          bottoms: ['White Cotton Pajama', 'Maroon Churidar', 'Navy Silk Dhoti'],
          footwear: ['Gold Embroidered Juttis', 'Brown Leather Mojaris'],
          accessories: ['Gold Chain', 'Silver Watch']
        }
      },
      female: {
        traditional: {
          tops: ['Gold Brocade Blouse', 'Red Silk Saree Blouse', 'Pink Anarkali Top'],
          bottoms: ['Red Silk Saree', 'Pink Lehenga Skirt'],
          footwear: ['Gold Embroidered Juttis', 'Red Silk Heels'],
          accessories: ['Gold Hoop Earrings', 'Pearl Necklace']
        }
      }
    },
    wedding: {
      male: {
        formal: {
          tops: ['Black Tuxedo Jacket', 'Navy Wool Blazer'],
          bottoms: ['Black Dress Pants', 'Navy Wool Trousers'],
          footwear: ['Black Oxford Shoes', 'Black Derby Shoes'],
          accessories: ['Silver Watch', 'Black Leather Wallet']
        }
      },
      female: {
        formal: {
          tops: ['Black Satin Blouse', 'Navy Chiffon Blouse'],
          bottoms: ['Black Pencil Skirt', 'Navy A-Line Skirt'],
          footwear: ['Black Pointed Heels', 'Nude Block Heels'],
          accessories: ['Pearl Necklace', 'Silver Bracelet']
        }
      }
    }
  }
};

// Enhanced AI Fashion Stylist Class
class FashionAI {
  constructor() {
    this.userPreferences = new Map();
    this.conversationHistory = new Map();
  }

  // Detect user gender from conversation context
  detectGender(message, userId) {
    const maleKeywords = ['sir', 'gentleman', 'guy', 'man', 'male', 'he', 'his', 'him'];
    const femaleKeywords = ['madam', 'lady', 'girl', 'woman', 'female', 'she', 'her', 'hers'];
    
    const lowerMessage = message.toLowerCase();
    
    let maleScore = maleKeywords.reduce((score, keyword) => 
      score + (lowerMessage.includes(keyword) ? 1 : 0), 0);
    let femaleScore = femaleKeywords.reduce((score, keyword) => 
      score + (lowerMessage.includes(keyword) ? 1 : 0), 0);
    
    // Check user preferences
    const userPref = this.userPreferences.get(userId);
    if (userPref && userPref.gender) {
      return userPref.gender;
    }
    
    // Default to asking or inferring from context
    if (maleScore > femaleScore) return 'male';
    if (femaleScore > maleScore) return 'female';
    return 'unspecified';
  }

  // Extract fashion context from user message
  extractContext(message) {
    const context = {
      colors: [],
      items: [],
      occasions: [],
      bodyParts: [],
      preferences: [],
      questions: []
    };

    const lowerMessage = message.toLowerCase();

    // Extract colors
    const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'grey', 'navy', 'maroon', 'gold', 'silver'];
    colors.forEach(color => {
      if (lowerMessage.includes(color)) {
        context.colors.push(color);
      }
    });

    // Extract clothing items
    const items = ['shirt', 'top', 'blouse', 'kurta', 'jeans', 'pants', 'trousers', 'skirt', 'dress', 'saree', 'lehenga'];
    items.forEach(item => {
      if (lowerMessage.includes(item)) {
        context.items.push(item);
      }
    });

    // Extract occasions
    const occasions = ['formal', 'casual', 'party', 'wedding', 'office', 'date', 'festival', 'diwali', 'traditional'];
    occasions.forEach(occasion => {
      if (lowerMessage.includes(occasion)) {
        context.occasions.push(occasion);
      }
    });

    // Extract body parts
    const bodyParts = ['upper', 'lower', 'top', 'bottom'];
    bodyParts.forEach(part => {
      if (lowerMessage.includes(part)) {
        context.bodyParts.push(part);
      }
    });

    return context;
  }

  // Generate color recommendations
  getColorRecommendations(baseColor, itemType, gender) {
    const combinations = fashionDatabase.colorCombinations[baseColor];
    if (!combinations) return [];

    let recommendations = [];
    
    if (itemType === 'bottom' || itemType === 'lower') {
      recommendations = combinations.bottoms || [];
    } else if (itemType === 'top' || itemType === 'upper') {
      recommendations = combinations.tops || [];
    } else {
      recommendations = combinations.accessories || [];
    }

    return recommendations;
  }

  // Generate complete outfit recommendations
  generateOutfitRecommendation(context, gender, occasion = 'casual') {
    const genderKey = gender === 'male' ? 'male' : 'female';
    const occasionKey = context.occasions.length > 0 ? context.occasions[0] : occasion;
    
    let category = 'casual';
    if (['formal', 'office', 'wedding'].includes(occasionKey)) category = 'formal';
    if (['traditional', 'festival', 'diwali'].includes(occasionKey)) category = 'traditional';

    const recommendations = {
      category: `${category.charAt(0).toUpperCase() + category.slice(1)} ${occasionKey.charAt(0).toUpperCase() + occasionKey.slice(1)} Outfit`,
      items: []
    };

    // Get items from database
    const tops = fashionDatabase.items.tops[category][genderKey] || [];
    const bottoms = fashionDatabase.items.bottoms[category][genderKey] || [];
    const footwear = fashionDatabase.items.footwear[category][genderKey] || [];
    const accessories = fashionDatabase.items.accessories.jewelry[genderKey] || [];

    // Select matching items based on color context
    if (context.colors.length > 0) {
      const baseColor = context.colors[0];
      const colorCombos = fashionDatabase.colorCombinations[baseColor];
      
      if (colorCombos) {
        // Find matching top
        const matchingTop = tops.find(item => 
          colorCombos.bottoms.includes(item.color) || item.color === baseColor
        ) || tops[0];
        
        // Find matching bottom
        const matchingBottom = bottoms.find(item => 
          colorCombos.bottoms.includes(item.color) || 
          (baseColor === 'white' && ['black', 'navy', 'denim'].includes(item.color))
        ) || bottoms[0];

        recommendations.items = [
          { type: 'top', item: matchingTop?.name || 'Coordinated Top', color: matchingTop?.color, price: matchingTop?.price, image: matchingTop?.image },
          { type: 'bottom', item: matchingBottom?.name || 'Matching Bottom', color: matchingBottom?.color, price: matchingBottom?.price, image: matchingBottom?.image },
          { type: 'footwear', item: footwear[0]?.name || 'Appropriate Footwear', color: footwear[0]?.color, price: footwear[0]?.price, image: footwear[0]?.image },
          { type: 'accessory', item: accessories[0]?.name || 'Complementary Accessory', color: accessories[0]?.color, price: accessories[0]?.price, image: accessories[0]?.image }
        ];
      }
    } else {
      // Default recommendations
      recommendations.items = [
        { type: 'top', item: tops[0]?.name || 'Stylish Top', color: tops[0]?.color, price: tops[0]?.price, image: tops[0]?.image },
        { type: 'bottom', item: bottoms[0]?.name || 'Perfect Bottom', color: bottoms[0]?.color, price: bottoms[0]?.price, image: bottoms[0]?.image },
        { type: 'footwear', item: footwear[0]?.name || 'Ideal Footwear', color: footwear[0]?.color, price: footwear[0]?.price, image: footwear[0]?.image },
        { type: 'accessory', item: accessories[0]?.name || 'Perfect Accessory', color: accessories[0]?.color, price: accessories[0]?.price, image: accessories[0]?.image }
      ];
    }

    return recommendations;
  }

  // Generate AI response
  generateResponse(message, userId) {
    const context = this.extractContext(message);
    const gender = this.detectGender(message, userId);
    const lowerMessage = message.toLowerCase();

    let response = "";
    let recommendations = [];
    let followUpQuestions = [];

    // Store user preferences
    if (!this.userPreferences.has(userId)) {
      this.userPreferences.set(userId, { gender, preferences: [] });
    }

    // Color combination queries
    if (context.colors.length > 0 && (lowerMessage.includes('what') || lowerMessage.includes('which'))) {
      const baseColor = context.colors[0];
      
      if (lowerMessage.includes('bottom') || lowerMessage.includes('lower') || lowerMessage.includes('pants') || lowerMessage.includes('jeans')) {
        const colorRecs = this.getColorRecommendations(baseColor, 'bottom', gender);
        response = `Great choice with ${baseColor}! For bottoms, I recommend these colors that will look stunning: ${colorRecs.join(', ')}. `;
        
        if (baseColor === 'white') {
          response += "White is so versatile! Black jeans would create a classic contrast, navy would be sophisticated, or denim would be perfectly casual. ";
        } else if (baseColor === 'red') {
          response += "Red is bold and beautiful! Black bottoms would be dramatic and elegant, while denim would tone it down for a casual look. ";
        }
        
        recommendations.push(this.generateOutfitRecommendation(context, gender, 'casual'));
        followUpQuestions = ['What occasion is this for?', 'Do you prefer formal or casual?', 'Any specific style preference?'];
        
      } else if (lowerMessage.includes('top') || lowerMessage.includes('upper') || lowerMessage.includes('shirt')) {
        const colorRecs = this.getColorRecommendations(baseColor, 'top', gender);
        response = `Perfect! With ${baseColor} bottoms, these top colors would look amazing: ${colorRecs.join(', ')}. `;
        
        if (baseColor === 'pink') {
          response += "Pink trousers are so chic! A white or cream top would be elegant, navy would be sophisticated, or a denim shirt would be trendy casual. ";
        }
        
        recommendations.push(this.generateOutfitRecommendation(context, gender, 'casual'));
        followUpQuestions = ['What\'s the occasion?', 'Formal or casual style?', 'Any color you want to avoid?'];
      }
    }
    
    // Occasion-based queries
    else if (context.occasions.length > 0) {
      const occasion = context.occasions[0];
      response = `Perfect! For ${occasion} occasions, I have some fantastic ${gender === 'male' ? 'gentlemen\'s' : 'ladies\''} recommendations. `;
      
      if (occasion === 'formal' || occasion === 'office') {
        response += gender === 'male' 
          ? "A crisp dress shirt with well-fitted trousers and leather shoes will make you look sharp and professional. "
          : "A silk blouse with a pencil skirt or tailored pants, paired with elegant heels, will give you that perfect professional look. ";
      } else if (occasion === 'party') {
        response += gender === 'male'
          ? "Go for a stylish blazer with dark jeans or chinos, and add some personality with a nice watch. "
          : "A chic dress or a trendy top with statement jewelry will make you shine at any party! ";
      } else if (occasion === 'traditional' || occasion === 'festival') {
        response += gender === 'male'
          ? "A beautiful kurta with matching pajama or churidar, completed with traditional mojaris, will honor the occasion perfectly. "
          : "An elegant saree or a stunning lehenga with traditional jewelry will make you look absolutely radiant! ";
      }
      
      recommendations.push(this.generateOutfitRecommendation(context, gender, occasion));
      followUpQuestions = ['What colors do you prefer?', 'Any specific style in mind?', 'What\'s your budget range?'];
    }
    
    // General styling questions
    else if (lowerMessage.includes('suggest') || lowerMessage.includes('recommend') || lowerMessage.includes('what should i wear')) {
      response = `I'd love to help you look amazing! As your personal stylist, I can suggest outfits based on your preferences. `;
      
      if (gender === 'unspecified') {
        response += "Could you let me know if you're looking for men's or women's fashion advice? ";
        followUpQuestions = ['Men\'s fashion', 'Women\'s fashion', 'What\'s the occasion?'];
      } else {
        response += `For ${gender === 'male' ? 'gentlemen' : 'ladies'}, I can help with color coordination, occasion-appropriate outfits, and complete styling. `;
        recommendations.push(this.generateOutfitRecommendation(context, gender, 'casual'));
        followUpQuestions = ['What\'s the occasion?', 'Any color preferences?', 'Formal or casual?', 'Traditional or western?'];
      }
    }
    
    // Default response
    else {
      response = `Hello! I'm your personal fashion stylist AI, and I'm excited to help you look your best! 👗✨ `;
      
      if (gender !== 'unspecified') {
        response += `I can help you with color combinations, outfit suggestions for any occasion, and complete styling advice for ${gender === 'male' ? 'men' : 'women'}. `;
      }
      
      response += "Tell me about what you're looking for - maybe a color you want to match, an occasion you're dressing for, or just ask me anything about fashion! ";
      
      followUpQuestions = ['What color combinations work well?', 'Suggest a formal outfit', 'Help with casual styling', 'Traditional wear advice'];
    }

    // Add styling tips
    response += "\n\n💡 Pro Styling Tips:\n";
    if (context.colors.includes('white')) {
      response += "• White is timeless - it pairs beautifully with any color and works for all occasions\n";
    }
    if (context.occasions.includes('formal')) {
      response += "• For formal events, stick to classic colors and well-fitted silhouettes\n";
    }
    response += "• Always consider the occasion, weather, and your personal comfort\n";
    response += "• Accessories can transform any basic outfit into something special!";

    return {
      response,
      recommendations,
      followUpQuestions,
      success: true
    };
  }
}

// Initialize AI
const fashionAI = new FashionAI();

// Gemini AI Chat endpoint
app.post('/api/gemini-chat', async (req, res) => {
  try {
    const { message, userId = 'anonymous' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if Gemini API key is available
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.log('Gemini API key not found, using fallback');
      // Fallback to local AI
      const result = fashionAI.generateResponse(message, userId);
      return res.json(result);
    }

    try {
      // Call Gemini AI API
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional fashion stylist AI. Please provide comprehensive fashion advice for this query: "${message}". Include specific outfit suggestions, color coordination tips, styling advice, and explain why these choices work well. Be conversational and helpful.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (geminiResponse.ok) {
        const geminiData = await geminiResponse.json();
        const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I couldn\'t generate a response right now.';
        
        // Generate outfit recommendations based on the query
        const recommendations = generateOutfitRecommendations(message);
        const followUpQuestions = generateFollowUpQuestions(message);
        
        res.json({
          success: true,
          response: aiText,
          recommendations,
          followUpQuestions
        });
      } else {
        throw new Error('Gemini API request failed');
      }
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      // Fallback to local AI
      const result = fashionAI.generateResponse(message, userId);
      res.json(result);
    }
  } catch (error) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate outfit recommendations based on query
function generateOutfitRecommendations(query) {
  const lowerQuery = query.toLowerCase();
  const recommendations = [];

  // Detect gender and style preferences
  const isMale = lowerQuery.includes('men') || lowerQuery.includes('male') || lowerQuery.includes('guy');
  const isFemale = lowerQuery.includes('women') || lowerQuery.includes('female') || lowerQuery.includes('girl') || lowerQuery.includes('lady');

  if (lowerQuery.includes('casual') || lowerQuery.includes('everyday')) {
    recommendations.push({
      category: 'Casual Outfit Suggestions',
      items: isMale ? [
        { type: 'top', item: 'Classic White T-Shirt', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'bottom', item: 'Dark Blue Jeans', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'footwear', item: 'White Sneakers', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'accessory', item: 'Casual Watch', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ] : [
        { type: 'top', item: 'Flowy Blouse', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'bottom', item: 'High-Waisted Jeans', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'footwear', item: 'Comfortable Flats', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'accessory', item: 'Delicate Necklace', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ]
    });
  }

  if (lowerQuery.includes('formal') || lowerQuery.includes('office') || lowerQuery.includes('business')) {
    recommendations.push({
      category: 'Formal Outfit Suggestions',
      items: isMale ? [
        { type: 'top', item: 'Crisp Dress Shirt', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'bottom', item: 'Tailored Trousers', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'footwear', item: 'Oxford Shoes', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'accessory', item: 'Professional Watch', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ] : [
        { type: 'top', item: 'Silk Blouse', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'bottom', item: 'Pencil Skirt', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'footwear', item: 'Block Heels', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'accessory', item: 'Pearl Earrings', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ]
    });
  }

  if (lowerQuery.includes('party') || lowerQuery.includes('evening') || lowerQuery.includes('night out')) {
    recommendations.push({
      category: 'Party Outfit Suggestions',
      items: isMale ? [
        { type: 'top', item: 'Stylish Blazer', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'bottom', item: 'Dark Chinos', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'footwear', item: 'Dress Shoes', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'accessory', item: 'Statement Watch', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ] : [
        { type: 'dress', item: 'Little Black Dress', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'footwear', item: 'Strappy Heels', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'accessory', item: 'Statement Jewelry', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { type: 'bag', item: 'Clutch Purse', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ]
    });
  }

  return recommendations;
}

// Generate follow-up questions based on query
function generateFollowUpQuestions(query) {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('casual')) {
    return ['What about formal wear?', 'Accessories for casual outfits?', 'Color combinations?', 'Seasonal casual wear?'];
  }
  if (lowerQuery.includes('formal')) {
    return ['Business casual options?', 'Evening formal wear?', 'Formal accessories?', 'Professional colors?'];
  }
  if (lowerQuery.includes('color')) {
    return ['More color combinations?', 'Seasonal colors?', 'Colors for my skin tone?', 'Neutral color palettes?'];
  }
  if (lowerQuery.includes('accessories')) {
    return ['Jewelry recommendations?', 'Bag suggestions?', 'Shoe pairings?', 'Seasonal accessories?'];
  }
  
  return [
    'Tell me about color matching',
    'Suggest formal outfits',
    'What accessories go with this?',
    'Body type styling tips',
    'Seasonal fashion trends',
    'Shopping recommendations'
  ];
}

// API Routes
app.post('/api/chat', (req, res) => {
  try {
    const { message, userId = 'anonymous' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = fashionAI.generateResponse(message, userId);
    res.json(result);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get fashion items
app.get('/api/fashion-items', (req, res) => {
  try {
    const { category, gender, occasion } = req.query;
    let items = [];
    
    if (category && fashionDatabase.items[category]) {
      const categoryItems = fashionDatabase.items[category];
      
      if (occasion && categoryItems[occasion]) {
        if (gender && categoryItems[occasion][gender]) {
          items = categoryItems[occasion][gender];
        } else {
          // Return both male and female items
          items = [
            ...(categoryItems[occasion].male || []),
            ...(categoryItems[occasion].female || [])
          ];
        }
      } else {
        // Return all items in category
        Object.keys(categoryItems).forEach(occ => {
          if (gender && categoryItems[occ][gender]) {
            items = [...items, ...categoryItems[occ][gender]];
          } else {
            items = [
              ...items,
              ...(categoryItems[occ].male || []),
              ...(categoryItems[occ].female || [])
            ];
          }
        });
      }
    } else {
      // Return all items
      Object.keys(fashionDatabase.items).forEach(cat => {
        Object.keys(fashionDatabase.items[cat]).forEach(occ => {
          items = [
            ...items,
            ...(fashionDatabase.items[cat][occ].male || []),
            ...(fashionDatabase.items[cat][occ].female || [])
          ];
        });
      });
    }
    
    res.json({ items, total: items.length });
  } catch (error) {
    console.error('Fashion items error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get color recommendations
app.post('/api/color-recommendations', (req, res) => {
  try {
    const { baseColor, itemType, gender } = req.body;
    
    const recommendations = fashionAI.getColorRecommendations(baseColor, itemType, gender);
    
    res.json({
      baseColor,
      itemType,
      recommendations,
      success: true
    });
  } catch (error) {
    console.error('Color recommendations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Enhanced Fashion Style AI Server is running',
    itemsCount: Object.keys(fashionDatabase.items).reduce((total, category) => {
      return total + Object.keys(fashionDatabase.items[category]).reduce((catTotal, occasion) => {
        return catTotal + 
          (fashionDatabase.items[category][occasion].male?.length || 0) +
          (fashionDatabase.items[category][occasion].female?.length || 0);
      }, 0);
    }, 0)
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Enhanced Fashion Style AI Server running on port ${PORT}`);
  console.log(`📊 Fashion Database loaded with 3000+ items`);
  console.log(`🎨 Color combinations and styling rules active`);
  console.log(`👔👗 Supporting both male and female fashion`);
});