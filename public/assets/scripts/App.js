import $ from "jquery";

import MobileMenu from "./modules/MobileMenu";
import StickyHeader from "./modules/StickyHeader";
import ReloadAnimation from "./modules/ReloadAnimation";
import ToggleSwitch from "./modules/ToggleSwitch";
import SubMenu from "./modules/SubMenu";
import LatestWork from "./modules/LatestWork";
import BusinessCard from "./modules/BusinessCard";
import Inbox from "./modules/Inbox";
import MobileReady from "./modules/MobileReady";
import CountUp from "./modules/CountUp";
import RevealOnScroll from "./modules/RevealOnScroll";
import AboutMe from "./modules/AboutMe";
import Portfolio from "./modules/Portfolio";
import FlashMessages from "./modules/FlashMessages";
import CopyClipboard from "./modules/CopyClipboard";
import Replies from "./modules/Replies";
import Warning from "./modules/Warning";
import Likes from "./modules/Likes";

// import BackToTop from "./modules/BackToTop";
// import Testimonials from "./modules/Testimonials";

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".skills__designer__categories__group"), "80%", "reveal-item--is-visible", "reveal-item");
new RevealOnScroll($(".digital-services__left__group"), "60%", "reveal-item--is-visible", "reveal-item");
new RevealOnScroll($(".pro-skills__skill__progress-bar__fill"), "80%", "fill-bar--is-visible", "fill-bar");
new RevealOnScroll($(".counter"), "80%", "reveal-counter--is-visible", "reveal-counter");
new RevealOnScroll($(".about-me__right__container"), "80%", "slide-item--is-visible", "slide-item");
var stickyHeader = new StickyHeader();