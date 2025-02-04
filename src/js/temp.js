// Register some temp data, should be removed in production ( get information from a database )

export const products = [
    {
        id: "testing-product",
        title: "Testing Product",
        description: "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
        price: 150,
        image: "featured1.jpg",
        categories: ['men'],
        bestSeller: true
    },
    {
        id: "testing-women",
        title: "Testing Women Product",
        description: "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
        price: 200,
        image: "featured1.jpg",
        categories: ['women'],
        bestSeller: false
    },
]