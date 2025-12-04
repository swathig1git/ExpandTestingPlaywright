
export interface ProductType {
  name: string;
  startFrom: string;
  categoryUrl: string;
  searchTerm: string;
  expectedSizeType: string; // could also use 'numeric' | 'alpha' if limited
  browseByList: string[];   // ✅ array of strings
}

// This is the magic — one object per product type
export const PRODUCT_TYPES: ProductType[] =
[
  {
    name: 'Women Clothing',
    startFrom: 'Women > Designers',
    categoryUrl: 'https://ca.saks.com/en-ca/women/clothing',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Best Sellers", "New Arrivals", "Only at Saks", "Activewear", "Coats", "Dresses", "Jackets & Blazers", "Jeans", "Jumpsuits & Rompers", "Lingerie & Shapewear", "Matching Sets", "Pants", "Shorts", "Skirts", "Pajamas & Robes", "Sweaters", "Sweatshirts", "Swimsuits & Cover-Ups", "Tops"]
  },
{
    name: 'Men Clothing',
    startFrom: 'Men > Clothing',
    categoryUrl: 'https://ca.saks.com/en-ca/men/clothing',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Suits & Suit Separates", "Activewear", "Coats & Jackets", "Puffer Jackets", "Jeans", "Loungewear & Pyjamas", "Pants", "Shorts", "Sportcoats & Blazers", "Suits & Suit Separates", "Sweaters", "Sweatshirts & Hoodies", "Swimwear", "Shirts", "Tuxedos & Formal Wear", "Underwear & Socks", "Matching Sets"]
},
{
    name: 'Women Dresses',
    startFrom: 'Women > Dresses',
    categoryUrl: 'https://ca.saks.com/en-ca/women/clothing/dresses',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Bridal Dresses", "Cocktail Dresses", "Day & Casual", "Evening Gowns", "Florals & Prints", "Mother of the Bride", "Wedding Guest Dresses", "Workwear", "Mini Dresses", "Midi Dresses", "Maxi Dresses", "Sale", "Shop All Dresses"]
},
{
    name: 'Women Shoes',
    startFrom: 'Women > Shoes',
    categoryUrl: 'https://ca.saks.com/en-ca/women/shoes',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Bridal Shoes", "Boots & Booties", "Flats", "Heels & Pumps", "Oxfords & Loafers", "Sandals", "Slides & Mules", "Slippers", "Sneakers"]
},
{
    name: 'Men Shoes',
    startFrom: 'Men > Shoes',
    categoryUrl: 'https://ca.saks.com/en-ca/men/shoes',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Only at Saks", "Best Sellers", "New Arrivals", "Boots", "Dress Shoes", "Loafers & Slip Ons", "Oxfords & Derbys", "Slides & Sandals", "Slippers", "Sneakers"]
},
{
    name: 'Women Handbags',
    startFrom: 'Women > Handbags',
    categoryUrl: 'https://ca.saks.com/en-ca/women/handbags',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Backpacks", "Bag Accessories", "Belt Bags", "Bucket Bags", "Clutches & Pouches", "Crossbody Bags", "Diaper Bags", "Evening Bags", "Mini Bags", "Shoulder Bags", "Slouchy Hobo Bags", "Straw & Raffia Bags", "Top Handles & Satchels", "Totes", "Vanity Bags", "Wallets & Card Cases"]
},
{
    name: 'Women Jewellery',
    startFrom: 'Women > Jewellery',
    categoryUrl: 'https://ca.saks.com/en-ca/women/jewelry',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Bracelets", "Brooches", "Charms", "Earrings", "Necklaces", "Rings", "Watches", "Fashion Jewellery", "Fine Jewellery", "Statement Jewellery"]
},
{
    name: 'Women Accessories',
    startFrom: 'Women > Accessories',
    categoryUrl: 'https://ca.saks.com/en-ca/women/accessories',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Belts", "Capes & Ponchos", "Gloves", "Hair Accessories", "Hats", "Luggage & Travel", "Scarves & Wraps", "Sunglasses & Opticals", "Tech Accessories", "Wallets & Card Cases"]
},
{
    name: 'Men Accessories',
    startFrom: 'Men > Accessories',
    categoryUrl: 'https://ca.saks.com/en-ca/men/accessories',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Luggage & Travel", "Only at Saks", "Best Sellers", "New Arrivals", "Bags", "Belts", "Cuff Links & Tie Bars", "Hats, Scarves & Gloves", "Jewellery", "Sunglasses & Opticals", "Ties & Formal Accessories", "Watches", "Wallets & Card Cases"]
},
{
    name: 'Women Beauty',
    startFrom: 'Women > Beauty',
    categoryUrl: 'https://ca.saks.com/en-ca/women/beauty',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Bath & Body", "Candles & Diffusers", "Gift Sets", "Hair Care & Styling Tools", "Makeup", "Skincare", "Wellness"]
},
{
    name: 'Men Grooming',
    startFrom: 'Men > Grooming',
    categoryUrl: 'https://ca.saks.com/en-ca/men/grooming',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Bath & Body", "Best Sellers", "Cleansers", "Cologne", "Deodorant", "Moisturizers", "Sale", "Shave & Beard Care", "Skincare"]
},
{
    name: 'Women Kids',
    startFrom: 'Women > Kids',
    categoryUrl: 'https://ca.saks.com/en-ca/women/kids',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Girls", "Girls' Shoes", "Boys", "Boys' Shoes", "Baby", "Blankets & Swaddles", "Gear & Essentials", "Toys & Games", "Books"]
},
{
    name: 'Women Home',
    startFrom: 'Women > Home',
    categoryUrl: 'https://ca.saks.com/en-ca/women/home',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Bed & Bath", "Dining & Entertaining", "Home Decor", "Kitchen", "Luggage & Travel"]
},
{
    name: 'Women Gifts',
    startFrom: 'Women > Gifts',
    categoryUrl: 'https://ca.saks.com/en-ca/women/gifting',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Bestselling Gifts", "Cashmere Sweaters", "Gifts for Her", "Gifts On Sale", "Gifts for Mom", "Baby Shower Gifts", "Wedding Gifts", "Accessory Gifts", "Housewarming Gifts", "Beauty Gifts", "Gifts for Kids", "Home Gifts", "Jewellery Gifts"]
},
{
    name: 'Men Gifts',
    startFrom: 'Men > Gifts',
    categoryUrl: 'https://ca.saks.com/en-ca/men/gifting',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Bestselling Gifts", "Cashmere Sweaters", "Gifts On Sale", "Slippers & Sleepwear", "Accessory Gifts", "Grooming Gifts", "Gifts for Him", "Jewellery Gifts", "Gifts for Dad"]
},
{
    name: 'Women Sale',
    startFrom: 'Women > Sale',
    categoryUrl: 'https://ca.saks.com/en-ca/women/sale',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Clothing", "Shoes", "Handbags", "Jewellery", "Accessories", "Best Sellers", "New Arrivals", "Beauty", "Kids", "Home"]
},
{
    name: 'Men Sale',
    startFrom: 'Men > Sale',
    categoryUrl: 'https://ca.saks.com/en-ca/men/sale',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Best Sellers", "New Arrivals", "Clothing", "Shoes", "Accessories"]
},

] as const;
