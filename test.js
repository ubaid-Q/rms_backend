/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const appetizers = await prisma.categories.create({
    data: {
      name: 'Appetizers',
    },
  });

  const mainCourses = await prisma.categories.create({
    data: {
      name: 'Main Courses',
    },
  });

  const desserts = await prisma.categories.create({
    data: {
      name: 'Desserts',
    },
  });

  const drinks = await prisma.categories.create({
    data: {
      name: 'Drinks',
    },
  });
  const menuItems = [
    {
      name: 'Margherita Pizza',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Classic Italian pizza topped with tomato sauce, mozzarella cheese, and basil leaves.',
      price: 12,
      categoriesId: mainCourses.id,
    },
    {
      name: 'Pepperoni Pizza',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Italian pizza topped with spicy pepperoni slices and mozzarella cheese.',
      price: 14,
      categoriesId: mainCourses.id,
    },
    {
      name: 'Caesar Salad',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Fresh romaine lettuce tossed with Caesar dressing, croutons, and Parmesan cheese.',
      price: 8,
      categoriesId: appetizers.id,
    },
    {
      name: 'Spaghetti Carbonara',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Italian pasta dish made with eggs, cheese, bacon, and black pepper.',
      price: 10,
      categoriesId: drinks.id,
    },
    {
      name: 'Chicken Alfredo',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Creamy pasta dish with grilled chicken, Parmesan cheese, and Alfredo sauce.',
      price: 15,
      categoriesId: drinks.id,
    },
    {
      name: 'Hamburger',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Classic beef burger with lettuce, tomato, onion, pickles, and ketchup.',
      price: 9,
      categoriesId: appetizers.id,
    },
    {
      name: 'Cheeseburger',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Beef burger topped with melted cheese, lettuce, tomato, onion, and pickles.',
      price: 10,
      categoriesId: appetizers.id,
    },
    {
      name: 'Chicken Sandwich',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Grilled chicken breast sandwich with lettuce, tomato, and mayonnaise on a bun.',
      price: 8,
      categoriesId: appetizers.id,
    },
    {
      name: 'Fish and Chips',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Deep-fried fish fillets served with crispy potato chips and tartar sauce.',
      price: 13,
      categoriesId: appetizers.id,
    },
    {
      name: 'Sushi Platter',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Assorted selection of fresh sushi rolls and sashimi pieces.',
      price: 18,
      categoriesId: appetizers.id,
    },
    {
      name: 'Beef Tacos',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Soft corn tortillas filled with seasoned ground beef, lettuce, cheese, and salsa.',
      price: 10,
      categoriesId: desserts.id,
    },
    {
      name: 'Chicken Burrito',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Large flour tortilla filled with grilled chicken, rice, beans, cheese, and salsa.',
      price: 11,
      categoriesId: desserts.id,
    },
    {
      name: 'Miso Soup',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Traditional Japanese soup made with fermented soybean paste, tofu, and seaweed.',
      price: 5,
      categoriesId: desserts.id,
    },
    {
      name: 'Caprese Salad',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Fresh salad made with ripe tomatoes, mozzarella cheese, basil leaves, and balsamic glaze.',
      price: 9,
      categoriesId: appetizers.id,
    },
    {
      name: 'Beef Stir-Fry',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Sliced beef sautéed with mixed vegetables in a savory soy sauce.',
      price: 12,
      categoriesId: desserts.id,
    },
    {
      name: 'Shrimp Tempura',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Japanese dish of battered and deep-fried shrimp served with dipping sauce.',
      price: 14,
      categoriesId: desserts.id,
    },
    {
      name: 'Vegetable Pad Thai',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Thai stir-fried rice noodles with tofu, bean sprouts, peanuts, and tamarind sauce.',
      price: 11,
      categoriesId: desserts.id,
    },
    {
      name: 'Chicken Tikka Masala',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Creamy Indian curry dish made with grilled chicken, tomatoes, and spices.',
      price: 13,
      categoriesId: desserts.id,
    },
    {
      name: 'Vegetable Biryani',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Fragrant Indian rice dish cooked with mixed vegetables, spices, and herbs.',
      price: 12,
      categoriesId: desserts.id,
    },
    {
      name: 'Tiramisu',
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      description:
        'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.',
      price: 7,
      categoriesId: desserts.id,
    },
  ];

  // Insert menu items into the database
  for (const menuItemData of menuItems) {
    await prisma.menuItem.create({
      data: menuItemData,
    });
  }

  console.log('Dummy menu items inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
