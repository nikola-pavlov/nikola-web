import MobileMenu from "./modules/MobileMenu";
import $ from "jquery";
import StickyHeader from "./modules/StickyHeader";
import ReloadAnimation from "./modules/ReloadAnimation";
import ToggleSwitch from "./modules/ToggleSwitch";
import SubMenu from "./modules/SubMenu";
import LatestWork from "./modules/LatestWork";
import BusinessCard from "./modules/BusinessCard";
import Inbox from "./modules/Inbox";
import Testimonials from "./modules/Testimonials";
import MobileReady from "./modules/MobileReady";
import CountUp from "./modules/CountUp";
import RevealOnScroll from "./modules/RevealOnScroll";

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".skills__designer__categories__group"), "80%");
new RevealOnScroll($(".digital-services__left__group"), "60%");
var stickyHeader = new StickyHeader();