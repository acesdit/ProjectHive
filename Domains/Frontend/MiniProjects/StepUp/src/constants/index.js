import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";


export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#contact-us", label: "Contact Us" },
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const products = [
    {
        imgURL: shoe4,
        name: "Step Jordan-01",
        price: "$200.20",
    },
    {
        imgURL: shoe5,
        name: "Step Jordan-102",
        price: "$210.20",
    },
    {
        imgURL: shoe6,
        name: "Step Jordan-120",
        price: "$220.20",
    },
    {
        imgURL: shoe7,
        name: "Step Jordan-001",
        price: "$230.20",
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Step Force 1", link: "#" },
            { name: "Step Max 1", link: "#" },
            { name: "Step Jordan 1", link: "#" },
            { name: "Step Force 2", link: "#" },
            { name: "Step Waffle Racer", link: "#" },
            { name: "Step Cortez", link: "#" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "#" },
            { name: "FAQs", link: "#" },
            { name: "How it works", link: "#" },
            { name: "Privacy policy", link: "#" },
            { name: "Payment policy", link: "#" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@stepup.com", link: "#" }
        ],
    },
];

export const socialMedia = [
    { src: facebook, link:"#",alt: "facebook logo" },
    { src: twitter,  link:"#",alt: "twitter logo" },
    { src: instagram,link:"#", alt: "instagram logo" },
];