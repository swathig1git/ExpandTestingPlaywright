
export interface ProductType {
  name: string;
  startFrom: string;
  categoryUrl: string;
  searchTerm: string;
  expectedSizeType: string; // could also use 'numeric' | 'alpha' if limited
  browseByList: string[];   // ✅ array of strings
  urlForBrowseByList: string[];
  filterList: string[];
  bannerCategories? : string[];
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
    browseByList:["Best Sellers", "New Arrivals", "Only at Saks", "Activewear", "Coats", "Dresses", "Jackets & Blazers", "Jeans", "Jumpsuits & Rompers", "Lingerie & Shapewear", "Matching Sets", "Pants", "Shorts", "Skirts", "Pajamas & Robes", "Sweaters", "Sweatshirts", "Swimsuits & Cover-Ups", "Tops"],
    urlForBrowseByList:["best-sellers","new-arrivals","only-at-saks","activewear","coats","dresses","jackets-and-blazers","jeans","jumpsuits-rompers","lingerie-and-shapewear","matching-sets","pants","shorts","skirts","pajamas-robes","sweaters","sweatshirts","swimsuits-and-cover-ups","tops"],
    filterList: ["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Fine Fashion","Gender","Heel Height","Length","Lens Type","Material","Neckline","Occasion","Pattern Print","Rise","Style","Toe Style","Wash","Price"],
    bannerCategories: ["Dresses", "Tops", "Jackets & Blazers", "Jeans", "Coats"]

  },
{
    name: 'Men Clothing',
    startFrom: 'Men > Clothing',
    categoryUrl: 'https://ca.saks.com/en-ca/men/clothing',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Suits & Suit Separates", "Activewear", "Coats & Jackets", "Puffer Jackets", "Jeans", "Loungewear & Pyjamas", "Pants", "Shorts", "Sportcoats & Blazers", "Suits & Suit Separates", "Sweaters", "Sweatshirts & Hoodies", "Swimwear", "Shirts", "Tuxedos & Formal Wear", "Underwear & Socks", "Matching Sets"],
    urlForBrowseByList:["new-arrivals","suits-suit-separates","activewear","coats-jackets","puffer-jackets","jeans","loungewear-and-pyjamas","pants","shorts","sportcoats-and-blazers","suits","sweaters","sweatshirts-and-hoodies","swimwear","shirts","tuxedos-and-formal-wear","underwear-socks","matching-sets"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Cuff","Fine Fashion","Gender","Heel Height","Length","Lens Type","Material","Neckline","Pattern Print","Rise","Style","Toe Style","Wash","Price"]

},
{
    name: 'Women Dresses',
    startFrom: 'Women > Dresses',
    categoryUrl: 'https://ca.saks.com/en-ca/women/clothing/dresses',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Bridal Dresses", "Cocktail Dresses", "Day & Casual", "Evening Gowns", "Florals & Prints", "Mother of the Bride", "Wedding Guest Dresses", "Workwear", "Mini Dresses", "Midi Dresses", "Maxi Dresses", "Sale", "Shop All Dresses"],
    urlForBrowseByList:["new-arrivals","best-sellers","only-at-saks","bridal-dresses","cocktail-dresses","day-and-casual","evening-gowns","florals-and-prints","mother-of-the-bride","wedding-guest-dresses","workwear","mini-dresses","midi-dresses","maxi-dresses","sale", "dresses"],
    filterList:["Category","Designers","Product Type","Colour","Size","Length","Material","Neckline","Occasion","Pattern Print","Style","Wash","Price"],
    bannerCategories:["Evening Gowns", "Cocktail & Party","Maxi Dresses", "Day & Casual", "Wedding Guest Dresses"]

},
{
    name: 'Women Shoes',
    startFrom: 'Women > Shoes',
    categoryUrl: 'https://ca.saks.com/en-ca/women/shoes',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Bridal Shoes", "Boots & Booties", "Flats", "Heels & Pumps", "Oxfords & Loafers", "Sandals", "Slides & Mules", "Slippers", "Sneakers"],
    urlForBrowseByList:["new-arrivals","best-sellers","only-at-saks","bridal-shoes","boots","flats","heels-and-pumps","oxfords-and-loafers","sandals","slides-and-mules","slippers","sneakers"],
    filterList:["Category","Designers","Product Type","Colour","Size","Collection","Gender","Heel Height","Material","Style","Toe Style","Price"],
    bannerCategories:["Boots & Booties", "Loafers", "Flats", "Sneakers", "Heels & Pumps"]

},
{
    name: 'Men Shoes',
    startFrom: 'Men > Shoes',
    categoryUrl: 'https://ca.saks.com/en-ca/men/shoes',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Only at Saks", "Best Sellers", "New Arrivals", "Boots", "Dress Shoes", "Loafers & Slip Ons", "Oxfords & Derbys", "Slides & Sandals", "Slippers", "Sneakers"],
    urlForBrowseByList:["only-at-saks","best-sellers","new-arrivals","boots","dress-shoes","loafers-slip-ons","oxfords-and-derbys","slides-and-sandals","slippers","sneakers"],
    filterList:["Category","Designers","Product Type","Colour","Size","Gender","Heel Height","Material","Style","Toe Style","Price"]

},
{
    name: 'Women Handbags',
    startFrom: 'Women > Handbags',
    categoryUrl: 'https://ca.saks.com/en-ca/women/handbags',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Backpacks", "Bag Accessories", "Belt Bags", "Bucket Bags", "Clutches & Pouches", "Crossbody Bags", "Diaper Bags", "Evening Bags", "Mini Bags", "Shoulder Bags", "Slouchy Hobo Bags", "Straw & Raffia Bags", "Top Handles & Satchels", "Totes", "Vanity Bags", "Wallets & Card Cases"],
    urlForBrowseByList:["new-arrivals","best-sellers","only-at-saks","backpacks","bag-accessories","belt-bags","bucket-bags","clutches-and-pouches","crossbody-bags","diaper-bags","evening-bags","mini-bags","shoulder-bags","hobo-bags","straw-and-raffia-bags","top-handles-and-satchels","totes","producttype=vanity-bags","wallets-and-card-cases"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Fine Fashion","Gender","Material","Occasion","Style","Price"],
    bannerCategories:["Shoulder Bags", "Totes", "Crossbody Bags", "Suede Handbags", "Evening Bags"]

},
{
    name: 'Women Jewellery',
    startFrom: 'Women > Jewellery',
    categoryUrl: 'https://ca.saks.com/en-ca/women/jewelry',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Bracelets", "Brooches", "Charms", "Earrings", "Necklaces", "Rings", "Watches", "Fashion Jewellery", "Fine Jewellery", "Statement Jewellery"],
    urlForBrowseByList:["new-arrivals","best-sellers","bracelets","brooches","charms","earrings","necklaces","rings","watches","fashion-jewelry","fine-jewelry","statement-jewelry"],       
    filterList:["Category","Designers","Product Type","Colour","Size","Collection","Fine Fashion","Gender","Length","Material","Pattern Print","Style","Price"]

},
{
    name: 'Women Accessories',
    startFrom: 'Women > Accessories',
    categoryUrl: 'https://ca.saks.com/en-ca/women/accessories',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Belts", "Capes & Ponchos", "Gloves", "Hair Accessories", "Hats", "Luggage & Travel", "Scarves & Wraps", "Sunglasses & Opticals", "Tech Accessories", "Wallets & Card Cases"],
    urlForBrowseByList:["new-arrivals","best-sellers","only-at-saks","belts","capes-and-ponchos","gloves","hair-accessories","hats","luggage-and-travel","scarves-and-wraps","sunglasses-and-opticals","tech-accessories","wallets-and-card-cases"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Fine Fashion","Gender","Heel Height","Length","Lens Type","Material","Neckline","Pattern Print","Style","Price"]

},
{
    name: 'Men Accessories',
    startFrom: 'Men > Accessories',
    categoryUrl: 'https://ca.saks.com/en-ca/men/accessories',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Luggage & Travel", "Only at Saks", "Best Sellers", "New Arrivals", "Bags", "Belts", "Cuff Links & Tie Bars", "Hats, Scarves & Gloves", "Jewellery", "Sunglasses & Opticals", "Ties & Formal Accessories", "Watches", "Wallets & Card Cases"],
    urlForBrowseByList:["luggage-travel-gear","only-at-saks","best-sellers","new-arrivals","bags","belts","cuff-links-and-tie-bars","hats-scarves-and-gloves","jewelry","sunglasses-and-opticals","ties-and-formal-accessories","watches","wallets-and-card-cases"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Fine Fashion","Gender","Lens Type","Material","Pattern Print","Style","Price"]

},
{
    name: 'Women Beauty',
    startFrom: 'Women > Beauty',
    categoryUrl: 'https://ca.saks.com/en-ca/women/beauty',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Bath & Body", "Candles & Diffusers", "Gift Sets", "Hair Care & Styling Tools", "Makeup", "Skincare", "Wellness"],
    urlForBrowseByList:["newestCreated","best-sellers","bath-and-body","candles-and-diffusers","gift-sets","hair-care-and-styling-tools","makeup","skincare","wellness"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Coverage","Finish","Gender","Material","Style","Price"]

},
{
    name: 'Men Grooming',
    startFrom: 'Men > Grooming',
    categoryUrl: 'https://ca.saks.com/en-ca/men/grooming',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Bath & Body", "Best Sellers", "Cleansers", "Cologne", "Moisturizers", "Sale", "Shave & Beard Care", "Skincare"],
    urlForBrowseByList:["bath-body","best-sellers","cleansers","cologne","moisturizers","sale","shave-beard-care","skin-care"],
    filterList:["Category","Designers","Product Type","Colour","Size","Coverage","Finish","Gender","Price"]

},
{
    name: 'Women Kids',
    startFrom: 'Women > Kids',
    categoryUrl: 'https://ca.saks.com/en-ca/women/kids',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Only at Saks", "Girls", "Girls' Shoes", "Boys", "Boys' Shoes", "Baby", "Blankets & Swaddles", "Gear & Essentials", "Toys & Games", "Books"],
    urlForBrowseByList:["new-arrivals","best-sellers","only-at-saks","girls","girls-shoes","boys","boys-shoes","baby","blankets-and-swaddles","gear-and-essentials","toys-and-games","books"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Fine Fashion","Gender","Heel Height","Material","Neckline","Occasion","Pattern Print","Style","Toe Style","Price"]

},
{
    name: 'Women Home',
    startFrom: 'Women > Home',
    categoryUrl: 'https://ca.saks.com/en-ca/women/home',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["New Arrivals", "Best Sellers", "Bed & Bath", "Dining & Entertaining", "Home Decor", "Kitchen", "Luggage & Travel"],
    urlForBrowseByList:["new-arrivals","best-sellers","bed-and-bath","dining-and-entertaining", "decor", "kitchen", "luggage-travel"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Gender","Material","Style","Price"]

},
{
    name: 'Women Gifts',
    startFrom: 'Women > Gifts',
    categoryUrl: 'https://ca.saks.com/en-ca/women/gifting',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Bestselling Gifts", "Cashmere Sweaters", "Gifts for Her", "Gifts On Sale", "Gifts for Mom", "Baby Shower Gifts", "Wedding Gifts", "Accessory Gifts", "Housewarming Gifts", "Beauty Gifts", "Gifts for Kids", "Home Gifts", "Jewellery Gifts"],
    urlForBrowseByList:["bestselling-gifts","cashmere-sweaters","gifts-for-her","gifts-on-sale","gifts-for-mom","baby-shower-gifts","wedding-gifts","accessory-gifts","housewarming-gifts","beauty-gifts","gifts-for-kids","home-gifts","jewelry-gifts"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Coverage","Fine Fashion","Finish","Gender","Heel Height","Length","Lens Type","Material","Neckline","Occasion","Pattern Print","Rise","Style","Toe Style","Wash","Price"],
    bannerCategories:["Gifts for Her", "Gifts for Him", "Beauty Gifts", "Bestselling Gifts", "Stocking Stuffers"]

},
{
    name: 'Men Gifts',
    startFrom: 'Men > Gifts',
    categoryUrl: 'https://ca.saks.com/en-ca/men/gifting',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Bestselling Gifts", "Cashmere Sweaters", "Gifts On Sale", "Slippers & Sleepwear", "Accessory Gifts", "Grooming Gifts", "Gifts for Him", "Jewellery Gifts", "Gifts for Dad"],
    urlForBrowseByList:["best-sellers","cashmere-sweaters","gifts-on-sale","slippers-and-sleepwear","accessory-gifts","grooming-gifts","gifts-for-him","jewelry-gifts","gifts-for-dad"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Coverage","Cuff","Fine Fashion","Finish","Gender","Heel Height","Length","Lens Type","Material","Pattern Print","Style","Toe Style","Price"]

},
{
    name: 'Women Sale',
    startFrom: 'Women > Sale',
    categoryUrl: 'https://ca.saks.com/en-ca/women/sale',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Clothing", "Shoes", "Handbags", "Jewellery", "Accessories", "Best Sellers", "New Arrivals", "Beauty", "Kids", "Home"],
    urlForBrowseByList:["womens-clothing","shoes","handbags","jewelry","accessories","best-sellers","newestCreated","beauty","kids","home"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Collection","Coverage","Fine Fashion","Finish","Gender","Heel Height","Length","Lens Type","Material","Neckline","Occasion","Pattern Print","Rise","Style","Toe Style","Wash","Price"]

},
{
    name: 'Men Sale',
    startFrom: 'Men > Sale',
    categoryUrl: 'https://ca.saks.com/en-ca/men/sale',
    searchTerm: 'Gucci Marmont',
    expectedSizeType: 'numeric', // e.g., 0, 2, 4
    browseByList:["Best Sellers", "New Arrivals", "Clothing", "Shoes", "Accessories"],
    urlForBrowseByList:["best-sellers","newestCreated","clothing","shoes","accessories"],
    filterList:["Category","Designers","Product Type","Colour","Size","Bag Size","Cuff","Fine Fashion","Gender","Heel Height","Length","Lens Type","Material","Pattern Print","Rise","Style","Toe Style","Wash","Price"]

},

] as const;
