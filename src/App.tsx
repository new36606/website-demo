import React, { useEffect, useMemo, useRef, useState } from 'react';

type Lang = 'en' | 'th';
type Page = 'home' | 'about' | 'services' | 'warehouse' | 'network' | 'news' | 'contact';
type LocalText = { en: string; th: string };
type FeatureItem = LocalText & { icon: string; enText: string; thText: string };
type Article = { title: string; source: string; date: string; summary: string; url: string };

type Copy = {
  nav: Record<Page, string>;
  language: string;
  quote: string;
  heroBadge: string;
  heroTitle: string;
  heroText: string;
  explore: string;
  contactSales: string;
  operationsLabel: string;
  operationsTitle: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutDescription: string;
  whyEyebrow: string;
  whyTitle: string;
  whyText: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  viewAll: string;
  learnMore: string;
  warehouseEyebrow: string;
  warehouseTitle: string;
  warehouseDescription: string;
  warehousePanelTitle: string;
  warehousePanelText: string;
  networkEyebrow: string;
  networkTitle: string;
  networkDescription: string;
  networkMapInstruction: string;
  networkMapFooter: string;
  networkMapNote: string;
  newsEyebrow: string;
  newsTitle: string;
  newsDescription: string;
  eservices: string;
  ctaBadge: string;
  ctaTitle: string;
  ctaText: string;
  applyCareer: string;
  requestQuote: string;
  contactEyebrow: string;
  contactTitle: string;
  contactDescription: string;
  sendInquiry: string;
  contactIntro: string;
  submitInquiry: string;
  namePlaceholder: string;
  companyPlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  formNote: string;
  footerText: string;
  quickLinks: string;
  businessActions: string;
  latestNewsletter: string;
  globalNetwork: string;
  careers: string;
  operationCards: Array<[string, string]>;
};

const LOGO_ASSET = '/globelink-logo.png';
const WORLD_MAP_ASSET = '/world-map-with-labels.svg';
const pages: Page[] = ['home', 'about', 'services', 'warehouse', 'network', 'news', 'contact'];

const PAGE_IMAGES: Record<Page, string> = {
  home: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2400&q=80',
  about: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=80',
  services: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=80',
  warehouse: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=2400&q=80',
  network: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80',
  news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2400&q=80',
  contact: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=80',
};

const fallbackArticles: Article[] = [
  {
    title: 'Ocean freight planning remains important for resilient supply chains',
    source: 'Globelink News Desk',
    date: 'Latest update',
    summary: 'Freight teams continue to monitor schedules, port conditions, and consolidation options to keep international cargo planning reliable.',
    url: 'https://www.freightwaves.com/',
  },
  {
    title: 'LCL consolidation helps shippers manage smaller cargo volumes',
    source: 'Logistics Insight',
    date: 'Latest update',
    summary: 'Less-than-container-load services remain useful for businesses that need flexible routing without waiting to fill a full container.',
    url: 'https://www.joc.com/',
  },
  {
    title: 'Warehouse and CFS support improve cargo handling visibility',
    source: 'Supply Chain Brief',
    date: 'Latest update',
    summary: 'Container freight station support can improve documentation, cargo preparation, labeling, and operational coordination before shipment.',
    url: 'https://www.supplychaindive.com/',
  },
];

const copy: Record<Lang, Copy> = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', warehouse: 'Warehouse', network: 'Network', news: 'News', contact: 'Contact' },
    language: 'Language',
    quote: 'Get a Quote',
    heroBadge: 'Thailand Logistics & Freight Solutions',
    heroTitle: 'A sharper digital presence for a global freight and logistics brand.',
    heroText: 'A modern bilingual website concept for Globelink Thailand with stronger hierarchy, clearer calls-to-action, and a professional B2B logistics experience.',
    explore: 'Explore Services',
    contactSales: 'Contact Sales',
    operationsLabel: 'Operations Snapshot',
    operationsTitle: 'Built for speed, trust, and global coordination',
    aboutEyebrow: 'About',
    aboutTitle: 'From static company profile to a confident, modern logistics website',
    aboutDescription: 'The redesign keeps the NVOCC positioning, freight strength, global coverage, and total logistics message while improving readability and conversion flow.',
    whyEyebrow: 'Why choose us',
    whyTitle: 'Trust signals built for B2B logistics',
    whyText: 'A cleaner way to communicate network reach, operating capability, and customer confidence.',
    servicesEyebrow: 'Our Services',
    servicesTitle: 'Globelink (Thailand) Co., Ltd. Services',
    servicesDescription: 'Globelink (Thailand) Co., Ltd. provides a wide range of sea freight forwarding services including our core business as an NVOCC operator, cargo transshipment, and consolidation services for less than container load (LCL) and full container load (FCL) cargo from and to most major ports all over the world.',
    viewAll: 'View all solutions',
    learnMore: 'Learn more',
    warehouseEyebrow: 'Warehouse & CFS',
    warehouseTitle: 'Warehouse Capability',
    warehouseDescription: 'Globelink (Thailand) Co., Ltd. also operates a CFS (Container Freight Station) at the Bangkok port area and offers services such as container haulage and trucking, stuffing and unstuffing of containers, cargo and container photo documentation, documentation clearance, and cargo re-palletizing, re-packing, and labeling.',
    warehousePanelTitle: 'CFS support at Bangkok port area',
    warehousePanelText: 'Warehouse and CFS services are clearly presented so customers can easily understand the practical support available before, during, and after container handling.',
    networkEyebrow: 'Network',
    networkTitle: 'A cleaner global network section',
    networkDescription: 'This section displays a labeled SVG world map visual with precise country pins and a concise global network message.',
    networkMapInstruction: 'Global office network map',
    networkMapFooter: 'More than 100 offices in 30 countries',
    networkMapNote: 'Hover a pin to view the country name. Thailand is highlighted as the local hub.',
    newsEyebrow: 'News & Updates',
    newsTitle: 'Latest logistics news from trusted sources',
    newsDescription: 'Automatic RSS news cards show a short summary and link users back to the original article. If the live feed is unavailable, curated fallback updates are shown.',
    eservices: 'eServices',
    ctaBadge: 'Careers & Enquiries',
    ctaTitle: 'Make key actions impossible to miss',
    ctaText: 'Careers, quote requests, and contact actions are brought forward with stronger hierarchy and better conversion placement.',
    applyCareer: 'Apply for Career',
    requestQuote: 'Request Quote',
    contactEyebrow: 'Contact',
    contactTitle: 'A better contact experience for real business inquiries',
    contactDescription: 'A polished inquiry section for shipping lanes, consolidation options, warehouse support, and partnerships.',
    sendInquiry: 'Send an inquiry',
    contactIntro: 'A modern B2B logistics site should make it easy to ask about shipping lanes, consolidation options, warehouse support, and partnerships.',
    submitInquiry: 'Submit Inquiry',
    namePlaceholder: 'Your name',
    companyPlaceholder: 'Company',
    emailPlaceholder: 'Email address',
    phonePlaceholder: 'Phone number',
    subjectPlaceholder: 'Subject',
    messagePlaceholder: 'Tell us about your shipment or service requirement',
    formNote: 'This form is a design prototype and does not submit data yet.',
    footerText: 'Modern logistics website concept for a more premium, responsive, and conversion-aware digital experience.',
    quickLinks: 'Quick links',
    businessActions: 'Business actions',
    latestNewsletter: 'Latest newsletter',
    globalNetwork: 'Global network',
    careers: 'Careers',
    operationCards: [
      ['NVOCC operator', 'Core sea freight forwarding support for international cargo movement.'],
      ['LCL / FCL cargo', 'Consolidation services for less-than-container-load and full-container-load shipments.'],
      ['Cargo transshipment', 'Coordination for cargo moving through major ports and trade routes.'],
      ['Warehouse / CFS', 'Bangkok port area support for handling, documentation, and labeling.'],
    ],
  },
  th: {
    nav: { home: 'หน้าแรก', about: 'เกี่ยวกับเรา', services: 'บริการ', warehouse: 'คลังสินค้า', network: 'เครือข่าย', news: 'ข่าวสาร', contact: 'ติดต่อเรา' },
    language: 'ภาษา',
    quote: 'ขอใบเสนอราคา',
    heroBadge: 'โลจิสติกส์และขนส่งระหว่างประเทศ',
    heroTitle: 'เชื่อมโยงการขนส่งทั่วโลกให้เป็นเรื่องง่ายสำหรับธุรกิจคุณ',
    heroText: 'เว็บไซต์สองภาษาสำหรับ Globelink Thailand ที่นำเสนอบริการขนส่งทางทะเล เครือข่ายทั่วโลก และช่องทางติดต่ออย่างเป็นระบบ เข้าใจง่าย และดูเป็นมืออาชีพ',
    explore: 'ดูบริการของเรา',
    contactSales: 'ติดต่อทีมงาน',
    operationsLabel: 'ภาพรวมการให้บริการ',
    operationsTitle: 'รวดเร็ว ชัดเจน และประสานงานได้ครอบคลุมทั่วโลก',
    aboutEyebrow: 'เกี่ยวกับเรา',
    aboutTitle: 'ยกระดับภาพลักษณ์บริษัทให้ทันสมัยและน่าเชื่อถือยิ่งขึ้น',
    aboutDescription: 'นำเสนอจุดแข็งของบริษัท ทั้งบทบาทด้าน NVOCC บริการขนส่งทางทะเล เครือข่ายทั่วโลก และบริการโลจิสติกส์ที่เกี่ยวข้อง ให้ลูกค้าเข้าใจได้ง่ายและติดต่อได้สะดวกขึ้น',
    whyEyebrow: 'ทำไมต้องเลือกเรา',
    whyTitle: 'ความพร้อมที่ช่วยให้ลูกค้ามั่นใจในการขนส่ง',
    whyText: 'สื่อสารจุดแข็งด้านเครือข่าย ทีมปฏิบัติการ และการดูแลลูกค้าในรูปแบบที่ชัดเจนและเป็นมืออาชีพ',
    servicesEyebrow: 'บริการของเรา',
    servicesTitle: 'บริการของ Globelink (Thailand) Co., Ltd.',
    servicesDescription: 'Globelink (Thailand) Co., Ltd. ให้บริการขนส่งสินค้าทางทะเลอย่างครบวงจร ครอบคลุมธุรกิจหลักในฐานะ NVOCC operator บริการถ่ายลำสินค้า และบริการรวมสินค้า ทั้งแบบ LCL และ FCL ไปยังท่าเรือสำคัญทั่วโลก',
    viewAll: 'ดูบริการทั้งหมด',
    learnMore: 'ดูรายละเอียด',
    warehouseEyebrow: 'คลังสินค้าและ CFS',
    warehouseTitle: 'บริการคลังสินค้าและ CFS',
    warehouseDescription: 'Globelink (Thailand) Co., Ltd. ให้บริการ CFS (Container Freight Station) ในพื้นที่ท่าเรือกรุงเทพฯ รองรับการขนส่งตู้คอนเทนเนอร์ การบรรจุและนำสินค้าออกจากตู้ การถ่ายภาพสินค้าและตู้คอนเทนเนอร์ งานเอกสาร การจัดพาเลทใหม่ การบรรจุใหม่ และการติดฉลากสินค้า',
    warehousePanelTitle: 'บริการ CFS ในพื้นที่ท่าเรือกรุงเทพฯ',
    warehousePanelText: 'สรุปบริการคลังสินค้าและ CFS เพื่อให้ลูกค้าเห็นภาพการสนับสนุนงานปฏิบัติการ ตั้งแต่การจัดการตู้สินค้า งานเอกสาร ไปจนถึงการเตรียมสินค้าเพื่อส่งต่อ',
    networkEyebrow: 'เครือข่าย',
    networkTitle: 'เครือข่ายทั่วโลกที่เชื่อมต่อการขนส่งของคุณ',
    networkDescription: 'แสดงภาพรวมสำนักงานและพันธมิตรในต่างประเทศ พร้อมไฮไลต์ประเทศไทยในฐานะศูนย์กลางการประสานงานในภูมิภาค',
    networkMapInstruction: 'แผนที่เครือข่ายสำนักงานทั่วโลก',
    networkMapFooter: 'สำนักงานมากกว่า 100 แห่งใน 30 ประเทศ',
    networkMapNote: 'เลื่อนเมาส์บนหมุดเพื่อดูชื่อประเทศ โดยประเทศไทยถูกไฮไลต์เป็นศูนย์กลางการประสานงาน',
    newsEyebrow: 'ข่าวสารและอัปเดต',
    newsTitle: 'อัปเดตข่าวสารด้านโลจิสติกส์',
    newsDescription: 'แสดงสรุปข่าวสารด้านโลจิสติกส์จากแหล่งข้อมูลที่เกี่ยวข้อง พร้อมลิงก์ไปยังบทความต้นฉบับ หากฟีดสดไม่พร้อมใช้งาน ระบบจะแสดงข่าวสำรองแทน',
    eservices: 'บริการออนไลน์',
    ctaBadge: 'สมัครงานและสอบถามข้อมูล',
    ctaTitle: 'ทำให้ช่องทางสำคัญเข้าถึงได้ง่ายขึ้น',
    ctaText: 'ลูกค้าสามารถขอใบเสนอราคา ติดต่อทีมงาน หรือดูข้อมูลสมัครงานได้สะดวกขึ้น ด้วยปุ่มที่ชัดเจนและวางไว้ในตำแหน่งที่เหมาะสม',
    applyCareer: 'สมัครงาน',
    requestQuote: 'ขอใบเสนอราคา',
    contactEyebrow: 'ติดต่อเรา',
    contactTitle: 'ติดต่อ Globelink Thailand ได้สะดวกยิ่งขึ้น',
    contactDescription: 'ส่งคำถามเกี่ยวกับเส้นทางขนส่ง การรวมสินค้า งานคลังสินค้า หรือความร่วมมือทางธุรกิจได้ผ่านแบบฟอร์มติดต่อ',
    sendInquiry: 'ส่งคำถามถึงเรา',
    contactIntro: 'กรอกข้อมูลเบื้องต้นเกี่ยวกับเส้นทางขนส่ง สินค้า หรือบริการที่ต้องการ แล้วทีมงานจะติดต่อกลับเพื่อให้ข้อมูลเพิ่มเติม',
    submitInquiry: 'ส่งคำถาม',
    namePlaceholder: 'ชื่อผู้ติดต่อ',
    companyPlaceholder: 'ชื่อบริษัท',
    emailPlaceholder: 'อีเมล',
    phonePlaceholder: 'เบอร์โทรศัพท์',
    subjectPlaceholder: 'หัวข้อที่ต้องการสอบถาม',
    messagePlaceholder: 'ระบุรายละเอียดสินค้า เส้นทาง หรือบริการที่ต้องการ',
    formNote: 'แบบฟอร์มนี้เป็นต้นแบบการออกแบบ ยังไม่ได้เชื่อมต่อระบบส่งข้อมูลจริง',
    footerText: 'เว็บไซต์โลจิสติกส์สองภาษาที่ออกแบบให้ทันสมัย รองรับทุกอุปกรณ์ และช่วยให้ลูกค้าติดต่อบริษัทได้ง่ายขึ้น',
    quickLinks: 'เมนูหลัก',
    businessActions: 'ช่องทางสำคัญ',
    latestNewsletter: 'ข่าวสารล่าสุด',
    globalNetwork: 'เครือข่ายทั่วโลก',
    careers: 'ร่วมงานกับเรา',
    operationCards: [
      ['NVOCC operator', 'บริการหลักด้านขนส่งทางทะเลสำหรับสินค้าระหว่างประเทศ'],
      ['LCL / FCL cargo', 'บริการรวมสินค้าและขนส่งสินค้าทั้งแบบไม่เต็มตู้และเต็มตู้'],
      ['Cargo transshipment', 'ประสานงานการถ่ายลำสินค้าในท่าเรือและเส้นทางการค้าสำคัญ'],
      ['Warehouse / CFS', 'บริการสนับสนุนในพื้นที่ท่าเรือกรุงเทพฯ ครอบคลุมสินค้า เอกสาร และฉลาก'],
    ],
  },
};

const stats: Array<LocalText & { value: string }> = [
  { value: '100+', en: 'Global offices', th: 'สำนักงานทั่วโลก' },
  { value: '30', en: 'Countries covered', th: 'ครอบคลุม 30 ประเทศ' },
  { value: 'PAT Gateway', en: 'Bangkok HQ', th: 'สำนักงานใหญ่กรุงเทพฯ' },
  { value: 'LCL / FCL', en: 'Core focus', th: 'รองรับ LCL และ FCL' },
];

const trustStripItems: LocalText[] = [
  { en: 'NVOCC Network', th: 'เครือข่าย NVOCC' },
  { en: 'LCL / FCL Coverage', th: 'รองรับ LCL / FCL' },
  { en: 'Bangkok CFS Support', th: 'บริการ CFS กรุงเทพฯ' },
  { en: '100+ Offices', th: 'สำนักงาน 100+ แห่ง' },
];

const aboutCards: FeatureItem[] = [
  { icon: 'building', en: 'Company overview', th: 'ภาพรวมบริษัท', enText: 'Clear positioning with supporting metrics above the fold.', thText: 'นำเสนอข้อมูลบริษัทและจุดแข็งหลักให้เข้าใจได้ตั้งแต่แรกเห็น' },
  { icon: 'globe', en: 'Global reach', th: 'เครือข่ายระหว่างประเทศ', enText: 'Cleaner international footprint and network presentation.', thText: 'แสดงเครือข่ายสำนักงานและพันธมิตรทั่วโลกให้ชัดเจนขึ้น' },
  { icon: 'package', en: 'Core capabilities', th: 'บริการหลัก', enText: 'NVOCC, transshipment, LCL, FCL, and warehouse capability in readable cards.', thText: 'สรุปบริการ NVOCC การถ่ายลำ LCL FCL และคลังสินค้าให้อ่านง่าย' },
  { icon: 'mail', en: 'Stronger conversion', th: 'ติดต่อได้ง่ายขึ้น', enText: 'Quote, contact, newsletter, and career actions are easier to find.', thText: 'จัดวางปุ่มขอราคา ติดต่อ ข่าวสาร และสมัครงานให้เข้าถึงได้สะดวก' },
];

const serviceItems: FeatureItem[] = [
  { icon: 'ship', en: 'NVOCC Operator', th: 'บริการ NVOCC', enText: 'Core sea freight forwarding service with strong experience as an NVOCC operator.', thText: 'บริการขนส่งทางทะเลในฐานะ NVOCC operator สำหรับสินค้าระหว่างประเทศ' },
  { icon: 'building', en: 'Cargo Transshipment', th: 'บริการถ่ายลำสินค้า', enText: 'Cargo transshipment services for smooth movement through major ports and trade routes.', thText: 'ประสานงานการถ่ายลำสินค้าเพื่อให้ขนส่งต่อได้อย่างราบรื่น' },
  { icon: 'package', en: 'LCL Cargo Services', th: 'บริการ LCL', enText: 'Consolidation services for less-than-container-load cargo, including comprehensive LCL export and import support.', thText: 'บริการรวมสินค้าสำหรับสินค้าที่ไม่เต็มตู้ พร้อมรองรับงานนำเข้าและส่งออก' },
  { icon: 'anchor', en: 'FCL Cargo Services', th: 'บริการ FCL', enText: 'Full-container-load cargo services from and to most major ports around the world.', thText: 'บริการขนส่งสินค้าเต็มตู้ไปยังท่าเรือสำคัญทั่วโลก' },
];

const whyChooseItems: FeatureItem[] = [
  { icon: 'globe', en: 'Global network', th: 'เครือข่ายทั่วโลก', enText: 'Reliable international coordination across offices and partners.', thText: 'เชื่อมต่อสำนักงานและพันธมิตรในหลายประเทศเพื่อการประสานงานที่ต่อเนื่อง' },
  { icon: 'ship', en: 'Neutral NVOCC expertise', th: 'ความเชี่ยวชาญด้าน NVOCC', enText: 'A service model built around consolidation and flexible routing.', thText: 'รองรับการรวมสินค้าและการวางแผนเส้นทางขนส่งที่ยืดหยุ่น' },
  { icon: 'anchor', en: 'Reliable schedules', th: 'วางแผนการขนส่งได้ชัดเจน', enText: 'Clear service structure for planning shipments.', thText: 'ช่วยให้ลูกค้าวางแผนเส้นทาง ตารางเวลา และรูปแบบการขนส่งได้ง่ายขึ้น' },
  { icon: 'building', en: 'Local operations', th: 'ทีมปฏิบัติการในประเทศ', enText: 'Bangkok support for documentation, warehouse, and customers.', thText: 'ทีมงานกรุงเทพฯ พร้อมดูแลงานเอกสาร คลังสินค้า และการประสานงานกับลูกค้า' },
];

const warehouseFeatureItems: LocalText[] = [
  { en: 'Containers haulage / trucking', th: 'ขนส่งตู้คอนเทนเนอร์ / รถบรรทุก' },
  { en: 'Stuffing / unstuffing of container', th: 'บรรจุและนำสินค้าออกจากตู้คอนเทนเนอร์' },
  { en: 'Cargo & container photo taking using digital camera', th: 'ถ่ายภาพสินค้าและตู้คอนเทนเนอร์ด้วยกล้องดิจิทัล' },
  { en: 'Documentation clearance', th: 'ดำเนินการด้านเอกสารและการเคลียร์สินค้า' },
  { en: 'Cargo re-palletizing, re-packing & labeling', th: 'จัดพาเลทใหม่ บรรจุใหม่ และติดฉลากสินค้า' },
];

const officeCards: Array<LocalText & { icon: string; text: string }> = [
  { icon: 'mapPin', en: 'Bangkok Office', th: 'สำนักงานกรุงเทพฯ', text: '1011 Supalai Grand Tower, Unit 1403, 14th Floor, Rama III Road, Chongnonsri, Yannawa, Bangkok 10120, Thailand' },
  { icon: 'phone', en: 'Telephone', th: 'โทรศัพท์', text: '+66 2 229 9888' },
  { icon: 'mail', en: 'General enquiries', th: 'อีเมลสำหรับสอบถาม', text: 'hello@globelink-thailand.com' },
];

const mapPins = [
  { name: 'Thailand', left: '71.6%', top: '56.7%', active: true },
  { name: 'Singapore', left: '70.9%', top: '63.2%', active: false },
  { name: 'Malaysia', left: '70.0%', top: '61.0%', active: false },
  { name: 'Indonesia', left: '73.2%', top: '68.7%', active: false },
  { name: 'China', left: '73.2%', top: '43.4%', active: false },
  { name: 'Japan', left: '82.7%', top: '41.2%', active: false },
  { name: 'India', left: '64.8%', top: '53.3%', active: false },
  { name: 'United Arab Emirates', left: '58.4%', top: '53.0%', active: false },
  { name: 'United Kingdom', left: '47.3%', top: '36.8%', active: false },
  { name: 'United States', left: '20.0%', top: '42.5%', active: false },
  { name: 'Australia', left: '80.7%', top: '78.5%', active: false },
];

const iconMap: Record<string, React.ReactNode> = {
  menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  ship: <><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 1 4 0 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1" /><path d="M4 18 2 10h20l-2 8" /><path d="M12 10V4" /></>,
  package: <><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
  anchor: <><circle cx="12" cy="5" r="3" /><path d="M12 8v13" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></>,
  warehouse: <><path d="M3 21V8l9-5 9 5v13" /><path d="M7 21V11h10v10" /><path d="M9 15h6" /></>,
  building: <><path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" /><path d="M3 21h18" /><path d="M8 7h1" /><path d="M12 7h1" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
  mapPin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /></>,
  check: <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-5" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /></>,
};

function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconMap[name] ?? iconMap.globe}</svg>;
}

function Button({ children, variant = 'solid', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'solid' | 'outline' | 'light' }) {
  const styles = {
    solid: 'border border-[#24207b] bg-[#24207b] text-white hover:bg-[#1c1867]',
    outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
    light: 'border border-white/30 bg-white text-[#24207b] hover:bg-slate-100',
  };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-[#24207b]/35 hover:shadow-md ${className}`}>{children}</div>;
}

function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`font-semibold text-slate-900 ${className}`}>{children}</h3>;
}

function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`mt-2 text-sm leading-6 text-slate-600 ${className}`}>{children}</p>;
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} />;
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <div className="inline-flex items-center gap-3 bg-white"><img src={LOGO_ASSET} alt="Globelink Thailand logo" className={compact ? 'h-10 w-auto object-contain' : 'h-14 w-auto object-contain'} draggable={false} />{!compact && <div className="leading-tight"><p className="text-sm font-bold tracking-tight text-[#24207b]">Globelink Thailand</p><p className="text-xs font-medium text-slate-500">In Unity, We Link The Globe</p></div>}</div>;
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[70vh] bg-white">{children}</main>;
}

function SafeImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={alt} className={`${className} bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#f4ffd6_100%)]`} />;
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="eager" referrerPolicy="no-referrer" />;
}

function isThaiText(text: string) {
  return /[\u0E00-\u0E7F]/.test(text);
}

function PageBackgroundHero({ image, title, eyebrow }: { image: string; title: string; eyebrow: string }) {
  const thai = isThaiText(`${eyebrow} ${title}`);
  return <section className="relative overflow-hidden border-b border-slate-200"><div className="absolute inset-0"><SafeImage src={image} alt={title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.84)_42%,rgba(36,32,123,0.55)_100%)]" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(216,245,0,0.20),transparent_30%)]" /></div><div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-32"><div className="max-w-4xl border-l-4 border-[#d8f500] pl-5 md:pl-7"><p className={thai ? 'text-xs font-bold text-[#24207b]' : 'text-xs font-bold uppercase tracking-[0.28em] text-[#24207b]'}>{eyebrow}</p><h1 className={thai ? 'mt-4 text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-slate-950 md:text-6xl' : 'mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl'}>{title}</h1></div></div></section>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const thai = isThaiText(`${eyebrow} ${title} ${description}`);
  return <div className="max-w-4xl border-l-4 border-[#d8f500] pl-5 md:pl-7"><p className={thai ? 'text-xs font-bold text-[#24207b]' : 'text-xs font-bold uppercase tracking-[0.28em] text-[#24207b]'}>{eyebrow}</p><h1 className={thai ? 'mt-4 text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-slate-950 md:text-6xl' : 'mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl'}>{title}</h1><p className={thai ? 'mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg' : 'mt-5 max-w-3xl text-sm leading-8 text-slate-600 md:text-base'}>{description}</p></div>;
}

function LanguageSelector({ language, setLanguage, label }: { language: Lang; setLanguage: (value: Lang) => void; label: string }) {
  return <select aria-label={label} value={language} onChange={(event) => setLanguage(event.target.value as Lang)} className="h-10 rounded-full border border-slate-200 bg-white px-3 text-sm"><option value="en">English</option><option value="th">ไทย</option></select>;
}

function FeatureCard({ item, language, compact = false }: { item: FeatureItem; language: Lang; compact?: boolean }) {
  return <Card><CardContent className={compact ? 'p-4' : 'p-5'}><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name={item.icon} /></div><h3 className="font-semibold text-slate-900">{item[language]}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{language === 'th' ? item.thText : item.enText}</p></CardContent></Card>;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}>{children}</div>;
}

function WorldMap({ t }: { t: Copy }) {
  return <div className="rounded-[2rem] border border-slate-200 bg-white p-4 md:p-6"><div className="mb-4 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><p className="text-xs font-medium text-red-600">{t.networkMapInstruction}</p><p className="text-xs text-slate-400">SVG world map with labels</p></div><div className="relative mx-auto aspect-[1009.6727/665.96301] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner"><img src={WORLD_MAP_ASSET} alt="World map with labels" className="h-full w-full object-contain opacity-90" draggable={false} /><div className="pointer-events-none absolute inset-0">{mapPins.map((pin) => <div key={pin.name} className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pin.left, top: pin.top }}><div className={pin.active ? 'h-4 w-4 rounded-full bg-[#d8f500] shadow-[0_0_0_5px_rgba(216,245,0,0.28)] ring-2 ring-[#24207b]' : 'h-3 w-3 rounded-full bg-[#24207b] shadow-[0_0_0_4px_rgba(36,32,123,0.14)] ring-2 ring-white'} /><div className="absolute left-1/2 top-[-2.15rem] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg group-hover:block">{pin.name}</div></div>)}</div></div><p className="mt-4 text-2xl font-medium tracking-tight text-slate-950">{t.networkMapFooter}</p><p className="mt-3 text-xs text-slate-500">{t.networkMapNote}</p></div>;
}

function LiveNewsSection() {
  const [articles] = useState<Article[]>(fallbackArticles);
  return <div className="grid gap-6 md:grid-cols-3">{articles.map((item) => <Card key={item.url} className="h-full"><CardContent className="flex h-full flex-col p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.source}{item.date ? ` · ${item.date}` : ''}</p><h3 className="mt-4 text-xl font-semibold leading-snug text-slate-900">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.summary}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm font-semibold text-[#24207b]">Learn More →</a></CardContent></Card>)}</div>;
}

function HomePage({ t, language, setPage }: { t: Copy; language: Lang; setPage: (page: Page) => void }) {
  return <PageShell><section className="relative overflow-hidden border-b border-slate-200"><div className="absolute inset-0"><SafeImage src={PAGE_IMAGES.home} alt="Container ship and port logistics background" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.9)_42%,rgba(36,32,123,0.56)_100%)]" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(216,245,0,0.18),transparent_30%)]" /></div><div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24"><Reveal className="space-y-8"><div className={language === 'th' ? 'inline-flex items-center gap-3 text-xs font-bold text-[#24207b]' : 'inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#24207b]'}><span className="h-px w-10 bg-[#d8f500]" />{t.heroBadge}</div><div className="space-y-5"><h1 className={language === 'th' ? 'max-w-4xl text-5xl font-semibold leading-[1.16] tracking-[-0.02em] text-slate-950 md:text-7xl' : 'max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl'}>{t.heroTitle}</h1><p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{t.heroText}</p></div><div className="flex flex-col gap-4 sm:flex-row"><Button onClick={() => setPage('services')}>{t.explore}<Icon name="arrowRight" className="h-4 w-4" /></Button><Button variant="outline" onClick={() => setPage('contact')}>{t.contactSales}</Button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((item) => <Card key={item.en}><CardContent className="p-5"><p className="text-2xl font-semibold text-slate-900">{item.value}</p><p className="mt-1 text-sm text-slate-500">{item[language]}</p></CardContent></Card>)}</div><div className="grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">{trustStripItems.map((item) => <div key={item.en} className="flex items-center gap-2 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"><span className="h-2 w-2 rounded-full bg-[#d8f500] ring-4 ring-[#eef9a8]" /><p className="text-xs font-semibold text-[#24207b]">{item[language]}</p></div>)}</div></Reveal><Reveal delay={150}><Card className="self-start overflow-hidden border-t-4 border-t-[#24207b] shadow-xl shadow-slate-200/70"><CardContent className="p-0"><div className="bg-[#24207b] p-8 text-white"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-300">{t.operationsLabel}</p><h3 className="mt-2 text-2xl font-semibold">{t.operationsTitle}</h3></div><Icon name="ship" className="h-10 w-10 text-[#d8f500]" /></div></div><div className="grid gap-4 p-6 sm:grid-cols-2">{t.operationCards.map(([title, desc]) => <div key={title} className="rounded-2xl bg-slate-50 p-4"><p className="font-medium text-slate-900">{title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p></div>)}</div></CardContent></Card></Reveal></div></section></PageShell>;
}

function AboutPage({ t, language }: { t: Copy; language: Lang }) {
  return <PageShell><PageBackgroundHero image={PAGE_IMAGES.about} eyebrow={t.aboutEyebrow} title={t.aboutTitle} /><Reveal><section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"><SectionHeading eyebrow={t.aboutEyebrow} title={language === 'th' ? 'ภาพรวมบริษัทและจุดแข็งของบริการ' : 'Company profile and service focus'} description={t.aboutDescription} /><div className="grid gap-5 sm:grid-cols-2">{aboutCards.map((item) => <FeatureCard key={item.en} item={item} language={language} />)}</div></div></section></Reveal><Reveal><section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8"><div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-[#f7fbe6] p-6 shadow-sm md:p-8"><div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><Badge className="border border-slate-200 bg-white text-slate-500 uppercase tracking-[0.2em]">{t.whyEyebrow}</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{t.whyTitle}</h2></div><p className="max-w-xl text-sm leading-7 text-slate-600">{t.whyText}</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{whyChooseItems.map((item) => <FeatureCard key={item.en} item={item} language={language} />)}</div></div></section></Reveal></PageShell>;
}

function ServicesPage({ t, language }: { t: Copy; language: Lang }) {
  return <PageShell><PageBackgroundHero image={PAGE_IMAGES.services} eyebrow={t.servicesEyebrow} title={t.servicesTitle} /><Reveal><section className="mx-auto max-w-7xl border-y border-slate-200 bg-white px-4 py-16 md:px-6 lg:px-8"><div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow={t.servicesEyebrow} title={language === 'th' ? 'บริการขนส่งทางทะเลและการรวมสินค้า' : 'Sea freight and consolidation services'} description={t.servicesDescription} /><Button variant="outline">{t.viewAll}</Button></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{serviceItems.map((service) => <Card key={service.en} className="h-full"><CardHeader><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name={service.icon} /></div><CardTitle className="text-xl">{service[language]}</CardTitle><CardDescription>{language === 'th' ? service.thText : service.enText}</CardDescription></CardHeader><CardContent className="px-6 pb-6"><span className="text-sm font-medium text-slate-900">{t.learnMore}</span></CardContent></Card>)}</div></section></Reveal></PageShell>;
}

function WarehousePage({ t, language }: { t: Copy; language: Lang }) {
  return <PageShell><PageBackgroundHero image={PAGE_IMAGES.warehouse} eyebrow={t.warehouseEyebrow} title={t.warehouseTitle} /><Reveal><section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"><div><SectionHeading eyebrow={t.warehouseEyebrow} title={language === 'th' ? 'บริการ CFS และการจัดการสินค้าในพื้นที่ท่าเรือกรุงเทพฯ' : 'Bangkok CFS and cargo handling support'} description={t.warehouseDescription} /></div><div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name="warehouse" className="h-7 w-7" /></div><h3 className="text-3xl font-semibold tracking-tight text-slate-900">{t.warehousePanelTitle}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{t.warehousePanelText}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{warehouseFeatureItems.map((feature) => <div key={feature.en} className="flex gap-3 rounded-2xl bg-slate-50 p-4"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#24207b]" /><p className="text-sm text-slate-700">{feature[language]}</p></div>)}</div></div></div></section></Reveal></PageShell>;
}

function NetworkPage({ t }: { t: Copy }) {
  return <PageShell><PageBackgroundHero image={PAGE_IMAGES.network} eyebrow={t.networkEyebrow} title={t.networkTitle} /><Reveal><section className="mx-auto max-w-7xl border-y border-slate-200 bg-white px-4 py-16 md:px-6 lg:px-8"><div className="mb-8"><SectionHeading eyebrow={t.networkEyebrow} title={t.networkEyebrow === 'เครือข่าย' ? 'ภาพรวมสำนักงานและพันธมิตรทั่วโลก' : 'Office network and country coverage'} description={t.networkDescription} /></div><Card><CardContent className="p-6 md:p-8"><WorldMap t={t} /></CardContent></Card></section></Reveal></PageShell>;
}

function NewsPage({ t }: { t: Copy }) {
  return <PageShell><PageBackgroundHero image={PAGE_IMAGES.news} eyebrow={t.newsEyebrow} title={t.newsTitle} /><Reveal><section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8"><div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow={t.newsEyebrow} title={t.newsEyebrow === 'ข่าวสารและอัปเดต' ? 'สรุปข่าวสารด้านโลจิสติกส์' : 'Curated logistics updates'} description={t.newsDescription} /><Button variant="outline">{t.eservices}<Icon name="external" className="h-4 w-4" /></Button></div><LiveNewsSection /></section></Reveal></PageShell>;
}

function ContactPage({ t, language }: { t: Copy; language: Lang }) {
  return <PageShell><PageBackgroundHero image={PAGE_IMAGES.contact} eyebrow={t.contactEyebrow} title={t.contactTitle} /><Reveal><section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"><div className="space-y-6"><SectionHeading eyebrow={t.contactEyebrow} title={language === 'th' ? 'ข้อมูลสำนักงานและแบบฟอร์มติดต่อ' : 'Office details and inquiry form'} description={t.contactDescription} /><div className="grid gap-4">{officeCards.map((item) => <Card key={item.en}><CardContent className="flex gap-4 p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name={item.icon} /></div><div><p className="font-medium text-slate-900">{item[language]}</p><p className="mt-1 text-sm leading-7 text-slate-600">{item.text}</p></div></CardContent></Card>)}</div></div><Card className="self-start overflow-hidden"><div className="h-2 bg-gradient-to-r from-[#24207b] via-[#24207b] to-[#d8f500]" /><CardContent className="p-6 md:p-8"><div className="mb-6 flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#24207b] text-[#d8f500]"><Icon name="mail" /></div><div><h3 className="text-2xl font-semibold tracking-tight text-slate-900">{t.sendInquiry}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{t.contactIntro}</p></div></div><div className="grid gap-3 sm:grid-cols-2"><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.namePlaceholder} /><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.companyPlaceholder} /><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.emailPlaceholder} /><Input className="h-11 rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.phonePlaceholder} /></div><Input className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3" placeholder={t.subjectPlaceholder} /><Textarea className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3" placeholder={t.messagePlaceholder} /><div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-xs leading-6 text-slate-500">{t.formNote}</p><Button>{t.submitInquiry}</Button></div></div></CardContent></Card></div></section></Reveal></PageShell>;
}

function CTASection({ t, setPage }: { t: Copy; setPage: (page: Page) => void }) {
  return <Reveal><section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8"><Card className="overflow-hidden border-0 bg-gradient-to-r from-[#211d75] via-[#24207b] to-[#10123f] text-white shadow-2xl shadow-slate-200"><CardContent className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Badge className="bg-white/10 text-white">{t.ctaBadge}</Badge><h3 className="mt-4 text-3xl font-semibold tracking-tight">{t.ctaTitle}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{t.ctaText}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button variant="light" className="w-full px-6 lg:w-44" onClick={() => setPage('contact')}>{t.applyCareer}</Button><Button className="w-full border-2 border-[#d8f500] bg-[#d8f500] px-6 !text-black shadow-lg shadow-[#d8f500]/30 ring-2 ring-[#d8f500]/25 hover:bg-[#e6ff1a] hover:shadow-xl lg:w-44" onClick={() => setPage('contact')}>{t.requestQuote}</Button></div></CardContent></Card></section></Reveal>;
}

function runSmokeTests() {
  console.assert(LOGO_ASSET === '/globelink-logo.png', 'Logo should use the public PNG asset path.');
  console.assert(WORLD_MAP_ASSET === '/world-map-with-labels.svg', 'World map should use the public SVG asset path.');
  console.assert(Object.keys(PAGE_IMAGES).length === pages.length, 'All pages should have banner images.');
  console.assert(new Set(Object.values(PAGE_IMAGES)).size === pages.length, 'Every page should use a different banner image.');
  console.assert(Object.values(PAGE_IMAGES).every((url) => url.startsWith('https://images.unsplash.com/')), 'Page images should use direct images.unsplash.com URLs.');
  console.assert(fallbackArticles.length === 3, 'News should have three fallback articles if the API is unavailable.');
  console.assert(pages.length === 7, 'Website should have seven page routes.');
  console.assert(copy.en.nav.home === 'Home' && copy.th.nav.home === 'หน้าแรก', 'Both languages should define the home nav label.');
  console.assert(mapPins.some((pin) => pin.name === 'Thailand' && pin.active), 'Thailand should be highlighted on the network map.');
  console.assert(serviceItems.length === 4, 'There should be four main service cards.');
  console.assert(warehouseFeatureItems.length === 5, 'There should be five warehouse capability items.');
  console.assert(officeCards.length === 3, 'Office contact section should include three cards.');
}

runSmokeTests();

export default function App() {
  const initialPage = (() => {
    if (typeof window === 'undefined') return 'home' as Page;
    const hashPage = window.location.hash.replace('#/', '') as Page;
    return pages.includes(hashPage) ? hashPage : 'home';
  })();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>('en');
  const [page, setPageState] = useState<Page>(initialPage);
  const t = copy[language];

  const setPage = (nextPage: Page) => {
    setPageState(nextPage);
    setMobileOpen(false);
    window.history.pushState(null, '', `#/${nextPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hashPage = window.location.hash.replace('#/', '') as Page;
      if (pages.includes(hashPage)) setPageState(hashPage);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = useMemo(() => pages.map((pageKey) => [pageKey, t.nav[pageKey]] as const), [t.nav]);

  const renderPage = () => {
    if (page === 'about') return <AboutPage t={t} language={language} />;
    if (page === 'services') return <ServicesPage t={t} language={language} />;
    if (page === 'warehouse') return <WarehousePage t={t} language={language} />;
    if (page === 'network') return <NetworkPage t={t} />;
    if (page === 'news') return <NewsPage t={t} />;
    if (page === 'contact') return <ContactPage t={t} language={language} />;
    return <HomePage t={t} language={language} setPage={setPage} />;
  };

  return <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: language === 'th' ? "'Noto Sans Thai', 'Sarabun', system-ui, sans-serif" : 'Inter, system-ui, sans-serif' }}><header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8"><button onClick={() => setPage('home')} className="text-left"><BrandLogo /></button><nav className="hidden items-stretch gap-1 md:flex">{navItems.map(([pageKey, label]) => <button key={pageKey} onClick={() => setPage(pageKey)} className={page === pageKey ? 'border-b-2 border-[#24207b] px-3 py-5 text-sm font-semibold text-[#24207b] transition' : 'border-b-2 border-transparent px-3 py-5 text-sm text-slate-600 transition hover:border-[#d8f500] hover:text-[#24207b]'}>{label}</button>)}</nav><div className="hidden items-center gap-3 md:flex"><LanguageSelector language={language} setLanguage={setLanguage} label={t.language} /><Button onClick={() => setPage('contact')}>{t.quote}</Button></div><button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu"><Icon name="menu" /></button></div>{mobileOpen && <div className="border-t border-slate-200 bg-white md:hidden"><div className="mx-auto flex max-w-7xl flex-col px-4 py-3">{navItems.map(([pageKey, label]) => <button key={pageKey} onClick={() => setPage(pageKey)} className={page === pageKey ? 'rounded-xl bg-[#24207b] px-3 py-3 text-left text-sm font-semibold text-white' : 'rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 hover:text-[#24207b]'}>{label}</button>)}<div className="mt-3 flex gap-2"><LanguageSelector language={language} setLanguage={setLanguage} label={t.language} /><Button onClick={() => setPage('contact')}>{t.quote}</Button></div></div></div>}</header>{renderPage()}{page !== 'contact' && <CTASection t={t} setPage={setPage} />}<footer className="border-t-4 border-[#24207b] bg-slate-50"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8"><div><button onClick={() => setPage('home')} className="text-left"><BrandLogo /></button><p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{t.footerText}</p></div><div><p className="text-sm font-semibold text-slate-900">{t.quickLinks}</p><div className="mt-4 grid gap-3 text-sm text-slate-600">{navItems.map(([pageKey, label]) => <button key={pageKey} onClick={() => setPage(pageKey)} className="text-left transition duration-300 hover:text-slate-900">{label}</button>)}</div></div><div><p className="text-sm font-semibold text-slate-900">{t.businessActions}</p><div className="mt-4 grid gap-3 text-sm text-slate-600"><button onClick={() => setPage('contact')} className="text-left">{t.quote}</button><button onClick={() => setPage('news')} className="text-left">{t.latestNewsletter}</button><button onClick={() => setPage('network')} className="text-left">{t.globalNetwork}</button><button onClick={() => setPage('contact')} className="text-left">{t.careers}</button></div></div></div></footer></div>;
}
