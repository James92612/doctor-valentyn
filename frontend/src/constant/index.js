import React from "react";

import {
  service1, service2, service3, service4, service5, service6,
  special1, special2, special3, special4, special5,
} from "../images";
import { FaAddressBook, FaBloggerB, FaChrome, FaHome, FaPhoneAlt, FaRegNewspaper, FaUserAstronaut, FaUserMd, FaWrench } from "react-icons/fa";

const supportInfo = {
  email: 'support@gmail.com',
  phone: '+49 1234 56789',
  address: 'Schwarzwaldstrasse 20, Gernsbach, Baden-Württemberg, Germany'
}

const navLinkInfo = [
  {
    title: 'Home',
    link: '/',
    icon: <FaHome />
  },
  {
    title: 'About',
    link: '/about',
    icon: <FaAddressBook />
  },
  {
    title: 'Service',
    link: '/service',
    icon: <FaWrench />
  },
  {
    title: 'Contact',
    link: '/contact',
    icon: <FaPhoneAlt />
  },
  {
    title: 'Blog',
    link: '/blog',
    icon: <FaBloggerB />
  },
]

const serviceInfo = [
  {
    img: service1,
    title: 'Strategy',
    content: 'Our team of strategists and analysts use in-depth user and market research, intuitive information architecture, and product roadmaps to help lay the groundwork for success.'
  },
  {
    img: service2,
    title: 'GOAL-DRIVEN DESIGN',
    content: 'Our digital economy runs on results. We believe in goal-driven design, pinpointing the intersection between business goals, user goals, and the products designed to bring them together.'
  },
  {
    img: service3,
    title: 'Content',
    content: 'With a focus on customer engagement, we create immersive brand experiences and content that captivates, compels, and converts. It‘s not enough to tell your brand"s story.'
  },
  {
    img: service4,
    title: 'LEAN TEAMS',
    content: 'Each team has a concise number of multi-disciplinary team members who wear a lot of hats. This approach cuts down on overhead and eliminates unnecessary communication channels that cost time and money.'
  },
  {
    img: service5,
    title: 'TECHNOLOGY AGNOSTIC',
    content: 'Hammers ≠ screwdrivers, and businesses run on a variety of solutions. We don’t subscribe to a specific set of technologies. Our engineering team delivers the right products that make sense for you.'
  },
  {
    img: service6,
    title: 'FEWER PRESENTATIONS',
    content: 'Creating exceptional products demands dedication, iterative testing, and a collaborative partnership with our clients. Our mission is to craft superior products by leveraging rigorous effort, continuous improvement, and transparent collaboration.'
  },
]

const specialInfo = [
  {
    img: special1,
    title: 'Portrait',
  },
  {
    img: special2,
    title: 'Sports',
  },
  {
    img: special3,
    title: 'Travel',
  },
  {
    img: special4,
    title: 'Wildlife',
  },
  {
    img: special5,
    title: 'Under Water',
  },
]

const adminSideBarInfo = [
  {
    title: 'Dashboard',
    link: '/admin/dashboard',
    icon: <FaChrome />
  },
  {
    title: 'New Blogs',
    link: '/admin/newBlogs',
    icon: <FaRegNewspaper />
  },
  {
    title: 'Users',
    link: '/users',
    icon: <FaUserAstronaut />
  },

]

const adminInfo = [
  {
    all: 'All Blogs: ' + (487 + 16),
    number: 487,
    title: 'Blogs',
    color: 'primary',
    progress: (487 / (487 + 16) * 100).toFixed(2) + '%',
  },
  {
    all: 'All Blogs: ' + (487 + 16),
    number: 16,
    title: 'New Blogs',
    color: 'success',
    progress: (16 / (487 + 16) * 100).toFixed(2) + '%',
  },
  {
    all: 'All Users: ' + 201,
    number: 168,
    title: 'Now Users',
    color: 'danger',
    progress: (168 / 201 * 100).toFixed(2) + '%',
  },
  {
    all: 'USD $',
    number: '$62523',
    title: 'Revenue',
    color: 'warning',
    progress: '100%'
  },
]

const blogType = [
  'All', 'Ukraine', 'Russia', 'Trump', 'Racism', 'LGTBI', 'Other',
]

const blogType1 = [
  'Ukraine', 'Russia', 'Trump', 'Racism', 'LGTBI', 'Other',
]

const profileFieldInfo = [
  {
    label: 'First Name ',
    name: 'firstName',
  },
  {
    label: 'Last Name ',
    name: 'lastName',
  },
  {
    label: 'Email ',
    name: 'email',
  },
  {
    label: 'Phone Number ',
    name: 'mobile',
  },
  {
    label: 'Gender ',
    name: 'gender',
  },
  {
    label: 'City ',
    name: 'city',
  },
  {
    label: 'State ',
    name: 'state',
  },
  {
    label: 'Zip Code ',
    name: 'zipcode',
  },
  {
    label: 'Country ',
    name: 'country',
  },
  {
    label: 'Address ',
    name: 'address',
  },
  {
    label: 'Link',
    name: 'link'
  }
]

export {
  supportInfo, navLinkInfo, serviceInfo, specialInfo,
  adminSideBarInfo, adminInfo, blogType, blogType1, profileFieldInfo
}