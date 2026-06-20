// ─────────────────────────────────────────────────────────────────────────────
// Translations for Swapnil Dinesh Trading LLC
// Languages: English, Arabic, Hindi, Urdu, Russian, French, Chinese (Simplified)
// ─────────────────────────────────────────────────────────────────────────────

export const LANGUAGES = [
  { code: "en", label: "English",    nativeLabel: "English",    dir: "ltr", flag: "🇬🇧" },
  { code: "ar", label: "Arabic",     nativeLabel: "العربية",    dir: "rtl", flag: "🇦🇪" },
  { code: "hi", label: "Hindi",      nativeLabel: "हिन्दी",       dir: "ltr", flag: "🇮🇳" },
  { code: "ur", label: "Urdu",       nativeLabel: "اردو",        dir: "rtl", flag: "🇵🇰" },
  { code: "ru", label: "Russian",    nativeLabel: "Русский",     dir: "ltr", flag: "🇷🇺" },
  { code: "fr", label: "French",     nativeLabel: "Français",    dir: "ltr", flag: "🇫🇷" },
  { code: "zh", label: "Chinese",    nativeLabel: "中文",         dir: "ltr", flag: "🇨🇳" },
];

export const translations = {
  // ─── NAV ────────────────────────────────────────────────────────────────────
  nav: {
    home:          { en: "Home",       ar: "الرئيسية",  hi: "होम",        ur: "ہوم",       ru: "Главная",   fr: "Accueil",   zh: "首页" },
    about:         { en: "About",      ar: "حولنا",     hi: "हमारे बारे में", ur: "ہمارے بارے میں", ru: "О нас",     fr: "À propos",  zh: "关于我们" },
    products:      { en: "Products",   ar: "المنتجات",  hi: "उत्पाद",      ur: "مصنوعات",   ru: "Продукты",  fr: "Produits",  zh: "产品" },
    markets:       { en: "Markets",    ar: "الأسواق",   hi: "बाज़ार",      ur: "بازار",      ru: "Рынки",     fr: "Marchés",   zh: "市场" },
    services:      { en: "Services",   ar: "الخدمات",   hi: "सेवाएं",      ur: "خدمات",      ru: "Услуги",    fr: "Services",  zh: "服务" },
    quality:       { en: "Quality",    ar: "الجودة",    hi: "गुणवत्ता",    ur: "معیار",      ru: "Качество",  fr: "Qualité",   zh: "质量" },
    contact:       { en: "Contact",    ar: "اتصل بنا",  hi: "संपर्क",       ur: "رابطہ",      ru: "Контакты",  fr: "Contact",   zh: "联系" },
    requestQuote:  { en: "Request Quote", ar: "طلب عرض سعر", hi: "कोटेशन मांगें", ur: "قیمت درخواست کریں", ru: "Запросить цену", fr: "Demander un devis", zh: "询价" },
  },

  // ─── HERO / HOME ─────────────────────────────────────────────────────────────
  home: {
    heroTitle:     { en: "Global Fresh Produce", ar: "تجارة المنتجات الطازجة", hi: "वैश्विक ताज़ा उपज", ur: "عالمی تازہ پیداوار", ru: "Свежие продукты питания", fr: "Commerce mondial de", zh: "全球新鲜农产品" },
    heroTitle2:    { en: "Trading Excellence",   ar: "العالمية بامتياز",    hi: "व्यापार उत्कृष्टता", ur: "تجارتی عمدگی",       ru: "мирового класса",       fr: "produits frais",        zh: "卓越贸易" },
    heroDesc:      {
      en: "Supplying premium fruits and vegetables worldwide through trusted sourcing, strict quality assurance and efficient logistics — from Dubai to over 15 countries.",
      ar: "توريد الفواكه والخضروات الفاخرة في جميع أنحاء العالم من خلال الحصول على الموردين الموثوقين، وضمان الجودة الصارم، واللوجستيات الفعالة — من دبي إلى أكثر من 15 دولة.",
      hi: "विश्वसनीय सोर्सिंग, कड़े गुणवत्ता आश्वासन और कुशल लॉजिस्टिक्स के माध्यम से दुनिया भर में प्रीमियम फल और सब्जियां आपूर्ति — दुबई से 15 से अधिक देशों तक।",
      ur: "قابل اعتماد سورسنگ، سخت کوالٹی ایشورنس اور موثر لاجسٹکس کے ذریعے دنیا بھر میں پریمیم پھل اور سبزیاں فراہم کرنا — دبئی سے 15 سے زیادہ ممالک تک۔",
      ru: "Поставка премиальных фруктов и овощей по всему миру через надёжные источники, строгий контроль качества и эффективную логистику — из Дубая в более чем 15 стран.",
      fr: "Approvisionnement en fruits et légumes de qualité supérieure dans le monde entier grâce à une sourcing fiable, une assurance qualité stricte et une logistique efficace — de Dubaï vers plus de 15 pays.",
      zh: "通过可靠的采购、严格的质量保证和高效的物流，向全球供应优质水果和蔬菜——从迪拜到15多个国家。",
    },
    exploreProd:   { en: "Explore Products", ar: "استكشف المنتجات", hi: "उत्पाद देखें", ur: "مصنوعات دیکھیں", ru: "Смотреть продукты", fr: "Explorer les produits", zh: "浏览产品" },
    statPartners:  { en: "Trading Partners", ar: "شركاء تجاريون", hi: "व्यापारिक साझेदार", ur: "تجارتی شراکت دار", ru: "Торговых партнёров", fr: "Partenaires commerciaux", zh: "贸易伙伴" },
    statProducts:  { en: "Products",         ar: "منتجات",         hi: "उत्पाद",          ur: "مصنوعات",           ru: "Продуктов",          fr: "Produits",              zh: "产品" },
    statCountries: { en: "Countries Served", ar: "دولة نخدمها",    hi: "देश सेवित",       ur: "ممالک خدمت",        ru: "Стран обслуживаем",  fr: "Pays desservis",        zh: "服务国家" },
    statShipments: { en: "Shipments",        ar: "شحنات",          hi: "शिपमेंट",          ur: "شپمنٹس",            ru: "Поставок",           fr: "Expéditions",           zh: "货运" },
    whatWeDo:      { en: "What we do",        ar: "ما نقدمه",      hi: "हम क्या करते हैं",  ur: "ہم کیا کرتے ہیں",   ru: "Что мы делаем",      fr: "Ce que nous faisons",   zh: "我们的服务" },
    servicesTitle: { en: "End-to-end fresh produce trade", ar: "تجارة المنتجات الطازجة من البداية للنهاية", hi: "एंड-टू-एंड ताज़ा उपज व्यापार", ur: "مکمل تازہ پیداوار تجارت", ru: "Комплексная торговля свежей продукцией", fr: "Commerce de produits frais de bout en bout", zh: "端到端新鲜农产品贸易" },
    servicesSub:   { en: "From orchard to destination — sourcing, quality, logistics, and clearance under one roof.", ar: "من البستان إلى الوجهة — المصادر والجودة واللوجستيات والتخليص تحت سقف واحد.", hi: "बाग से गंतव्य तक — एक छत के नीचे सोर्सिंग, गुणवत्ता, लॉजिस्टिक्स और क्लियरेंस।", ur: "باغ سے منزل تک — ایک چھت کے نیچے سورسنگ، کوالٹی، لاجسٹکس اور کلیئرنس۔", ru: "От сада до пункта назначения — поставки, качество, логистика и таможня под одной крышей.", fr: "Du verger à la destination — approvisionnement, qualité, logistique et dédouanement sous un même toit.", zh: "从果园到目的地——一站式采购、质量、物流和清关。" },
    whyPartner:    { en: "Why partner with us", ar: "لماذا تتعاون معنا", hi: "हमारे साथ क्यों भागीदारी करें", ur: "ہمارے ساتھ شراکت کیوں", ru: "Почему с нами", fr: "Pourquoi nous choisir", zh: "为什么选择我们" },
    whyTitle:      { en: "Trusted by wholesalers, retailers and HORECA leaders", ar: "موثوق به من قبل تجار الجملة والتجزئة وقادة قطاع الضيافة", hi: "थोक विक्रेताओं, खुदरा विक्रेताओं और HORECA नेताओं द्वारा विश्वसनीय", ur: "تھوک فروشوں، خوردہ فروشوں اور HORECA رہنماؤں کا اعتماد", ru: "Доверяют оптовики, ритейлеры и лидеры HORECA", fr: "Approuvé par les grossistes, les détaillants et les leaders HORECA", zh: "受到批发商、零售商和酒店餐饮业领导者的信赖" },
    originCountries: { en: "15+ origin countries", ar: "أكثر من 15 دولة منشأ", hi: "15+ उद्गम देश", ur: "15+ اصل ممالک", ru: "15+ стран-поставщиков", fr: "15+ pays d'origine", zh: "15+来源国家" },
    originDesc:    { en: "Direct supplier relationships across India, Egypt, Turkey, China, South Africa, Pakistan, Netherlands, Italy, Spain and more — ensuring year-round availability.", ar: "علاقات مباشرة مع الموردين عبر الهند ومصر وتركيا والصين وجنوب أفريقيا وباكستان وهولندا وإيطاليا وإسبانيا والمزيد — لضمان التوفر على مدار العام.", hi: "भारत, मिस्र, तुर्की, चीन, दक्षिण अफ्रीका, पाकिस्तान, नीदरलैंड, इटली, स्पेन आदि में सीधे आपूर्तिकर्ता संबंध — साल भर उपलब्धता सुनिश्चित करना।", ur: "بھارت، مصر، ترکی، چین، جنوبی افریقہ، پاکستان، نیدرلینڈز، اٹلی، سپین اور مزید ممالک میں براہ راست سپلائر تعلقات — سال بھر دستیابی کو یقینی بنانا۔", ru: "Прямые партнёрства с поставщиками в Индии, Египте, Турции, Китае, ЮАР, Пакистане, Нидерландах, Италии, Испании и других странах.", fr: "Relations directes avec des fournisseurs en Inde, Égypte, Turquie, Chine, Afrique du Sud, Pakistan, Pays-Bas, Italie, Espagne et plus.", zh: "与印度、埃及、土耳其、中国、南非、巴基斯坦、荷兰、意大利、西班牙等地的直接供应商关系。" },
    readyOrder:    { en: "Ready to place your next order?", ar: "هل أنت مستعد لتقديم طلبك التالي؟", hi: "अपना अगला ऑर्डर देने के लिए तैयार हैं?", ur: "اپنا اگلا آرڈر دینے کے لیے تیار ہیں؟", ru: "Готовы разместить следующий заказ?", fr: "Prêt à passer votre prochaine commande?", zh: "准备好下订单了吗？" },
    readyDesc:     { en: "Get a tailored quotation within 24 hours. Containerized, palletized or LCL — we handle it end-to-end.", ar: "احصل على عرض أسعار مخصص خلال 24 ساعة. حاويات كاملة أو جزئية أو LCL — نتولى كل شيء من البداية للنهاية.", hi: "24 घंटे के भीतर एक अनुकूलित उद्धरण प्राप्त करें। कंटेनर, पैलेटाइज्ड या LCL — हम सब कुछ एंड-टू-एंड संभालते हैं।", ur: "24 گھنٹوں کے اندر ایک موزوں اقتباس حاصل کریں۔ کنٹینرائزڈ، پیلیٹائزڈ یا LCL — ہم سب کچھ سنبھالتے ہیں۔", ru: "Получите индивидуальное предложение в течение 24 часов. Контейнерные, паллетные или LCL — мы возьмём всё на себя.", fr: "Obtenez un devis personnalisé sous 24 heures. Conteneurisé, palettisé ou LCL — nous gérons tout de bout en bout.", zh: "24小时内获得定制报价。整箱、托盘或散货——我们全程处理。" },
    browseProducts: { en: "Browse Products", ar: "تصفح المنتجات", hi: "उत्पाद ब्राउज़ करें", ur: "مصنوعات براؤز کریں", ru: "Просмотреть продукты", fr: "Parcourir les produits", zh: "浏览产品" },
    insideOps:     { en: "Inside our operations", ar: "داخل عملياتنا", hi: "हमारे संचालन के अंदर", ur: "ہماری کارروائیوں کے اندر", ru: "Внутри нашей операции", fr: "À l'intérieur de nos opérations", zh: "我们的运营内部" },
    viewGallery:   { en: "View gallery →", ar: "عرض المعرض →", hi: "गैलरी देखें →", ur: "گیلری دیکھیں →", ru: "Смотреть галерею →", fr: "Voir la galerie →", zh: "查看图库 →" },
  },

  // ─── ABOUT ───────────────────────────────────────────────────────────────────
  about: {
    eyebrow:       { en: "About us",     ar: "من نحن",     hi: "हमारे बारे में", ur: "ہمارے بارے میں", ru: "О нас",      fr: "À propos",   zh: "关于我们" },
    heroTitle:     { en: "Bridging orchards and global markets from", ar: "ربط البساتين بالأسواق العالمية من", hi: "दुनिया के बागानों और वैश्विक बाज़ारों को जोड़ना", ur: "باغوں اور عالمی بازاروں کو جوڑنا", ru: "Соединяя сады и мировые рынки из", fr: "Relier les vergers aux marchés mondiaux depuis", zh: "从迪拜连接果园与全球市场" },
    dubai:         { en: "Dubai",        ar: "دبي",         hi: "दुबई",           ur: "دبئی",           ru: "Дубая",      fr: "Dubaï",       zh: "迪拜" },
    heroDesc:      { en: "Swapnil Dinesh Vegetable and Fruit Trading LLC SOC is a Dubai-based fresh produce trading company specializing in the import and export of premium fruits and vegetables across global markets.", ar: "شركة سوابنيل دينيش لتجارة الخضروات والفواكه المحدودة هي شركة مقرها دبي متخصصة في استيراد وتصدير الفواكه والخضروات الفاخرة عبر الأسواق العالمية.", hi: "स्वप्निल दिनेश वेजिटेबल एंड फ्रूट ट्रेडिंग LLC दुबई स्थित एक ताज़ा उत्पाद व्यापार कंपनी है जो वैश्विक बाजारों में प्रीमियम फल और सब्जियों के आयात-निर्यात में विशेषज्ञ है।", ur: "سوابنل دنیش ویجیٹیبل اینڈ فروٹ ٹریڈنگ LLC دبئی میں قائم ایک تازہ پیداوار تجارتی کمپنی ہے جو عالمی بازاروں میں پریمیم پھلوں اور سبزیوں کی درآمد و برآمد میں مہارت رکھتی ہے۔", ru: "Swapnil Dinesh Vegetable and Fruit Trading LLC — базирующаяся в Дубае компания по торговле свежей продукцией, специализирующаяся на импорте и экспорте премиальных фруктов и овощей по всему миру.", fr: "Swapnil Dinesh Vegetable and Fruit Trading LLC est une société de négoce de produits frais basée à Dubaï, spécialisée dans l'importation et l'exportation de fruits et légumes de qualité supérieure.", zh: "Swapnil Dinesh Vegetable and Fruit Trading LLC是一家总部位于迪拜的新鲜农产品贸易公司，专注于全球市场优质水果和蔬菜的进出口。" },
    basedIn:       { en: "Based in Dubai, UAE", ar: "مقرها في دبي، الإمارات", hi: "दुबई, UAE में स्थित", ur: "دبئی، UAE میں قائم", ru: "Дубай, ОАЭ", fr: "Basé à Dubaï, EAU", zh: "总部位于阿联酋迪拜" },
    operatingSince: { en: "Operating since 2018 · Jebel Ali Free Zone", ar: "تعمل منذ 2018 · منطقة جبل علي الحرة", hi: "2018 से संचालन · जेबेल अली फ्री ज़ोन", ur: "2018 سے آپریٹنگ · جبل علی فری زون", ru: "Работает с 2018 · Свободная зона Джебель Али", fr: "En activité depuis 2018 · Zone franche de Jebel Ali", zh: "自2018年运营 · 杰贝阿里自由区" },
    ourMission:    { en: "Our Mission", ar: "مهمتنا",   hi: "हमारा मिशन",     ur: "ہمارا مشن",       ru: "Наша миссия",   fr: "Notre mission",   zh: "我们的使命" },
    missionDesc:   { en: "Deliver fresh produce globally with reliability and quality — empowering food businesses with consistent supply, transparent pricing and dependable logistics.", ar: "تسليم المنتجات الطازجة عالمياً بموثوقية وجودة — تمكين شركات الغذاء بإمدادات متسقة وتسعير شفاف ولوجستيات موثوقة.", hi: "विश्वसनीयता और गुणवत्ता के साथ विश्व स्तर पर ताज़ा उत्पाद वितरित करें — खाद्य व्यवसायों को लगातार आपूर्ति, पारदर्शी मूल्य निर्धारण और विश्वसनीय लॉजिस्टिक्स के साथ सशक्त बनाएं।", ur: "قابل اعتماد اور معیار کے ساتھ عالمی سطح پر تازہ پیداوار فراہم کریں — مستقل سپلائی، شفاف قیمت اور قابل اعتماد لاجسٹکس کے ساتھ فوڈ کاروبار کو بااختیار بنائیں۔", ru: "Поставлять свежую продукцию по всему миру надёжно и качественно — обеспечивая продовольственный бизнес стабильными поставками, прозрачным ценообразованием и надёжной логистикой.", fr: "Livrer des produits frais dans le monde entier avec fiabilité et qualité — permettre aux entreprises alimentaires de bénéficier d'un approvisionnement régulier, de prix transparents et d'une logistique fiable.", zh: "以可靠性和质量在全球范围内交付新鲜农产品——为食品企业提供稳定的供应、透明的定价和可靠的物流。" },
    ourVision:     { en: "Our Vision",  ar: "رؤيتنا",   hi: "हमारी दृष्टि",    ur: "ہماری وژن",       ru: "Наша миссия",   fr: "Notre vision",    zh: "我们的愿景" },
    visionDesc:    { en: "Become a trusted international leader in fresh produce trading — recognized for integrity, quality assurance and operational excellence on every shipment.", ar: "أن نصبح رائداً دولياً موثوقاً في تجارة المنتجات الطازجة — معترفاً بنا من أجل النزاهة وضمان الجودة والتميز التشغيلي في كل شحنة.", hi: "ताज़ा उपज व्यापार में एक विश्वसनीय अंतर्राष्ट्रीय नेता बनना — प्रत्येक शिपमेंट पर ईमानदारी, गुणवत्ता आश्वासन और परिचालन उत्कृष्टता के लिए मान्यता प्राप्त करना।", ur: "تازہ پیداوار تجارت میں ایک قابل اعتماد بین الاقوامی رہنما بننا — ہر شپمنٹ پر دیانتداری، کوالٹی ایشورنس اور آپریشنل عمدگی کے لیے پہچانا جانا۔", ru: "Стать надёжным международным лидером в торговле свежей продукцией — получить признание за честность, контроль качества и операционное совершенство.", fr: "Devenir un leader international reconnu dans le commerce de produits frais — reconnu pour son intégrité, son assurance qualité et son excellence opérationnelle.", zh: "成为新鲜农产品贸易中值得信赖的国际领导者——以每次货运的诚信、质量保证和卓越运营获得认可。" },
    buildPartnership: { en: "Let's build a long-term trade partnership.", ar: "دعونا نبني شراكة تجارية طويلة الأمد.", hi: "आइए एक दीर्घकालिक व्यापार साझेदारी बनाएं।", ur: "آئیں ایک طویل مدتی تجارتی شراکت بنائیں۔", ru: "Давайте построим долгосрочное торговое партнёрство.", fr: "Construisons un partenariat commercial à long terme.", zh: "让我们建立长期贸易伙伴关系。" },
    partnerDesc:   { en: "Whether you're sourcing a single SKU or stocking a full container — we'll meet your specifications, packaging and timeline.", ar: "سواء كنت تشتري SKU واحداً أو تعبئ حاوية كاملة — سنلبي مواصفاتك وتغليفك وجدولك الزمني.", hi: "चाहे आप एकल SKU सोर्स कर रहे हों या एक पूरा कंटेनर स्टॉक कर रहे हों — हम आपकी विशिष्टताओं, पैकेजिंग और समयसीमा को पूरा करेंगे।", ur: "چاہے آپ ایک SKU سورس کر رہے ہیں یا ایک پورا کنٹینر اسٹاک کر رہے ہیں — ہم آپ کی تفصیلات، پیکیجنگ اور ٹائم لائن کو پورا کریں گے۔", ru: "Закупаете ли вы один артикул или загружаете полный контейнер — мы выполним ваши требования по спецификации, упаковке и срокам.", fr: "Que vous ayez besoin d'une seule référence ou d'un conteneur complet — nous respecterons vos spécifications, conditionnements et délais.", zh: "无论您是采购单个SKU还是整箱货——我们将满足您的规格、包装和时间要求。" },
    getInTouch:    { en: "Get in touch",  ar: "تواصل معنا", hi: "संपर्क करें",    ur: "رابطہ کریں",      ru: "Связаться",     fr: "Prendre contact",  zh: "联系我们" },
  },

  // ─── SERVICES ─────────────────────────────────────────────────────────────────
  services: {
    eyebrow:       { en: "Services",     ar: "الخدمات",    hi: "सेवाएं",         ur: "خدمات",          ru: "Услуги",        fr: "Services",       zh: "服务" },
    heroTitle:     { en: "One partner, every step of the trade", ar: "شريك واحد في كل خطوة من خطوات التجارة", hi: "एक भागीदार, व्यापार का हर कदम", ur: "ایک شراکت دار، تجارت کا ہر قدم", ru: "Один партнёр на каждом шагу торговли", fr: "Un partenaire à chaque étape du commerce", zh: "一个伙伴，贸易的每一步" },
    heroDesc:      { en: "A full-stack offering across sourcing, logistics, compliance and packaging — designed for international food businesses.", ar: "عرض متكامل عبر المصادر واللوجستيات والامتثال والتغليف — مصمم لشركات الغذاء الدولية.", hi: "सोर्सिंग, लॉजिस्टिक्स, अनुपालन और पैकेजिंग में पूर्ण-स्टैक ऑफ़रिंग — अंतर्राष्ट्रीय खाद्य व्यवसायों के लिए डिज़ाइन किया गया।", ur: "سورسنگ، لاجسٹکس، کمپلائنس اور پیکیجنگ میں مکمل اسٹیک پیشکش — بین الاقوامی فوڈ کاروبار کے لیے ڈیزائن کیا گیا۔", ru: "Полный спектр услуг по закупкам, логистике, соблюдению норм и упаковке — разработан для международного продовольственного бизнеса.", fr: "Une offre complète en matière d'approvisionnement, de logistique, de conformité et d'emballage — conçue pour les entreprises alimentaires internationales.", zh: "涵盖采购、物流、合规和包装的全方位服务——专为国际食品企业设计。" },
  },

  // ─── QUALITY ─────────────────────────────────────────────────────────────────
  quality: {
    eyebrow:       { en: "Quality Assurance", ar: "ضمان الجودة", hi: "गुणवत्ता आश्वासन", ur: "معیار یقین دہانی", ru: "Контроль качества", fr: "Assurance qualité", zh: "质量保证" },
  },

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────────
  products: {
    eyebrow:       { en: "Our Products",  ar: "منتجاتنا",    hi: "हमारे उत्पाद",  ur: "ہماری مصنوعات",   ru: "Наши продукты",  fr: "Nos produits",   zh: "我们的产品" },
    heroTitle:     { en: "Premium fresh produce, globally sourced", ar: "منتجات طازجة فاخرة من مصادر عالمية", hi: "प्रीमियम ताज़ा उपज, विश्व स्तर पर सोर्स किया गया", ur: "پریمیم تازہ پیداوار، عالمی سطح سے سورس کی گئی", ru: "Премиальные свежие продукты со всего мира", fr: "Produits frais de qualité supérieure, sourcés mondialement", zh: "全球采购的优质新鲜农产品" },
    allProducts:   { en: "All Products",  ar: "جميع المنتجات", hi: "सभी उत्पाद",    ur: "تمام مصنوعات",    ru: "Все продукты",   fr: "Tous les produits", zh: "所有产品" },
    fruits:        { en: "Fruits",        ar: "فواكه",         hi: "फल",             ur: "پھل",             ru: "Фрукты",         fr: "Fruits",          zh: "水果" },
    vegetables:    { en: "Vegetables",    ar: "خضروات",        hi: "सब्जियां",       ur: "سبزیاں",          ru: "Овощи",          fr: "Légumes",         zh: "蔬菜" },
    yearRound:     { en: "Year-round",    ar: "طوال العام",    hi: "साल भर",         ur: "سال بھر",         ru: "Круглый год",    fr: "Toute l'année",   zh: "全年供应" },
    seasonal:      { en: "Seasonal",      ar: "موسمي",          hi: "मौसमी",          ur: "موسمی",           ru: "Сезонный",       fr: "Saisonnier",      zh: "季节性" },
    origin:        { en: "Origin",        ar: "المنشأ",         hi: "मूल",            ur: "اصل",             ru: "Происхождение",  fr: "Origine",         zh: "产地" },
    availability:  { en: "Availability",  ar: "التوفر",         hi: "उपलब्धता",       ur: "دستیابی",         ru: "Доступность",    fr: "Disponibilité",   zh: "供应情况" },
  },

  // ─── MARKETS ──────────────────────────────────────────────────────────────────
  markets: {
    eyebrow:       { en: "Markets",       ar: "الأسواق",      hi: "बाज़ार",         ur: "بازار",           ru: "Рынки",          fr: "Marchés",         zh: "市场" },
    heroTitle:     { en: "Our global import & export markets", ar: "أسواق الاستيراد والتصدير العالمية", hi: "हमारे वैश्विक आयात और निर्यात बाजार", ur: "ہمارے عالمی درآمد اور برآمد بازار", ru: "Наши глобальные рынки импорта и экспорта", fr: "Nos marchés d'importation et d'exportation mondiaux", zh: "我们的全球进出口市场" },
    importMarkets: { en: "Import Markets", ar: "أسواق الاستيراد", hi: "आयात बाज़ार",  ur: "درآمد بازار",     ru: "Рынки импорта",  fr: "Marchés d'importation", zh: "进口市场" },
    exportMarkets: { en: "Export Markets", ar: "أسواق التصدير",  hi: "निर्यात बाज़ार", ur: "برآمد بازار",     ru: "Рынки экспорта", fr: "Marchés d'exportation", zh: "出口市场" },
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────────────
  contact: {
    eyebrow:       { en: "Contact",       ar: "اتصل بنا",     hi: "संपर्क",         ur: "رابطہ",           ru: "Контакты",       fr: "Contact",         zh: "联系" },
    heroTitle:     { en: "Let's talk trade", ar: "لنتحدث عن التجارة", hi: "व्यापार की बात करें", ur: "تجارت کی بات کریں", ru: "Поговорим о торговле", fr: "Parlons commerce", zh: "让我们谈谈贸易" },
    heroDesc:      { en: "Whether you're looking to sell your produce or source premium goods — tell us who you are and we'll get back within 24 hours.", ar: "سواء كنت تريد بيع منتجاتك أو الحصول على بضائع فاخرة — أخبرنا من أنت وسنرد خلال 24 ساعة.", hi: "चाहे आप अपनी उपज बेचना चाहते हों या प्रीमियम सामान सोर्स करना — हमें बताएं आप कौन हैं और हम 24 घंटे के भीतर वापस आएंगे।", ur: "چاہے آپ اپنی پیداوار بیچنا چاہتے ہیں یا پریمیم مال سورس کرنا — ہمیں بتائیں آپ کون ہیں اور ہم 24 گھنٹوں کے اندر واپس آئیں گے۔", ru: "Хотите продать продукцию или закупить premium-товары — расскажите нам о себе, и мы свяжемся с вами в течение 24 часов.", fr: "Que vous cherchiez à vendre vos produits ou à vous approvisionner — dites-nous qui vous êtes et nous vous répondrons dans les 24 heures.", zh: "无论您是想出售农产品还是采购优质商品——告诉我们您是谁，我们将在24小时内回复。" },
    firstTell:     { en: "First, tell us who you are", ar: "أولاً، أخبرنا من أنت", hi: "पहले, हमें बताएं आप कौन हैं", ur: "پہلے، ہمیں بتائیں آپ کون ہیں", ru: "Сначала расскажите нам о себе", fr: "Tout d'abord, dites-nous qui vous êtes", zh: "首先，告诉我们您是谁" },
    sellerLabel:   { en: "I'm a Seller / Exporter", ar: "أنا بائع / مصدّر", hi: "मैं एक विक्रेता / निर्यातक हूं", ur: "میں ایک بیچنے والا / برآمد کنندہ ہوں", ru: "Я продавец / экспортёр", fr: "Je suis un vendeur / exportateur", zh: "我是卖家/出口商" },
    buyerLabel:    { en: "I'm a Buyer / Importer",  ar: "أنا مشترٍ / مستورد",  hi: "मैं एक खरीदार / आयातक हूं",  ur: "میں ایک خریدار / درآمد کنندہ ہوں",  ru: "Я покупатель / импортёр",  fr: "Je suis un acheteur / importateur",  zh: "我是买家/进口商" },
    sendEnquiry:   { en: "Send Enquiry",  ar: "إرسال الاستفسار", hi: "पूछताछ भेजें", ur: "انکوائری بھیجیں", ru: "Отправить запрос", fr: "Envoyer une demande", zh: "发送询问" },
  },

  // ─── GALLERY ──────────────────────────────────────────────────────────────────
  gallery: {
    eyebrow:       { en: "Gallery",       ar: "معرض الصور",   hi: "गैलरी",          ur: "گیلری",           ru: "Галерея",        fr: "Galerie",         zh: "图库" },
    heroTitle:     { en: "A look inside our operations", ar: "نظرة داخل عملياتنا", hi: "हमारे संचालन के अंदर एक झलक", ur: "ہماری کارروائیوں کے اندر ایک نظر", ru: "Взгляд внутрь наших операций", fr: "Un regard sur nos opérations", zh: "我们运营的内部一瞥" },
  },

  // ─── COMMON ──────────────────────────────────────────────────────────────────
  common: {
    requestQuote:  { en: "Request Quote",  ar: "طلب عرض سعر", hi: "कोटेशन मांगें", ur: "قیمت درخواست کریں", ru: "Запросить цену", fr: "Demander un devis", zh: "询价" },
    learnMore:     { en: "Learn more",     ar: "اعرف أكثر",    hi: "और जानें",      ur: "مزید جانیں",       ru: "Узнать больше",  fr: "En savoir plus",  zh: "了解更多" },
    viewAll:       { en: "View all",       ar: "عرض الكل",     hi: "सभी देखें",     ur: "سب دیکھیں",        ru: "Просмотреть все", fr: "Voir tout",      zh: "查看全部" },
    loading:       { en: "Loading…",       ar: "جار التحميل…", hi: "लोड हो रहा है…", ur: "لوڈ ہو رہا ہے…",  ru: "Загрузка…",      fr: "Chargement…",    zh: "加载中…" },
    back:          { en: "Back",           ar: "رجوع",          hi: "वापस",           ur: "واپس",             ru: "Назад",          fr: "Retour",          zh: "返回" },
    notFound:      { en: "Page not found", ar: "الصفحة غير موجودة", hi: "पृष्ठ नहीं मिला", ur: "صفحہ نہیں ملا", ru: "Страница не найдена", fr: "Page introuvable", zh: "页面未找到" },
    preQualifiedGrowers: { en: "Pre-qualified growers", ar: "مزارعون مؤهلون مسبقاً", hi: "पूर्व-योग्य उत्पादक", ur: "پہلے سے اہل کاشتکار", ru: "Предквалифицированные производители", fr: "Producteurs pré-qualifiés", zh: "预资格种植者" },
    originInspection:    { en: "Origin inspection",     ar: "فحص المنشأ",              hi: "मूल निरीक्षण",     ur: "اصل معائنہ",              ru: "Инспекция на источнике",         fr: "Inspection à l'origine",       zh: "原产地检查" },
    reeferLogistics:     { en: "Reefer logistics",       ar: "لوجستيات التبريد",         hi: "रीफर लॉजिस्टिक्स", ur: "ریفر لاجسٹکس",             ru: "Рефрижераторная логистика",      fr: "Logistique réfrigérée",         zh: "冷藏物流" },
    phytoDocs:           { en: "Phytosanitary docs",     ar: "وثائق نباتية صحية",        hi: "फाइटोसेनेटरी दस्तावेज़", ur: "فائٹو سینیٹری دستاویزات",   ru: "Фитосанитарные документы",       fr: "Documents phytosanitaires",     zh: "植物检疫文件" },
    investPartnership:   { en: "Investment & Partnership", ar: "الاستثمار والشراكة", hi: "निवेश और साझेदारी", ur: "سرمایہ کاری اور شراکت", ru: "Инвестиции и партнёрство", fr: "Investissement & Partenariat", zh: "投资与合作" },
    equityOptions:       { en: "Equity options",         ar: "خيارات الأسهم",            hi: "इक्विटी विकल्प",    ur: "ایکویٹی اختیارات",          ru: "Варианты участия",               fr: "Options en capital",            zh: "股权选项" },
    marketAccess:        { en: "Market access",          ar: "الوصول إلى الأسواق",       hi: "बाज़ार पहुंच",      ur: "بازار تک رسائی",            ru: "Доступ к рынкам",               fr: "Accès au marché",               zh: "市场准入" },
    growthPlans:         { en: "Growth plans",           ar: "خطط النمو",                hi: "विकास योजनाएं",    ur: "ترقی کے منصوبے",            ru: "Планы роста",                    fr: "Plans de croissance",           zh: "增长计划" },
  },

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  footer: {
    tagline:       { en: "Premium import & export of fresh fruits and vegetables from Dubai to the world.", ar: "استيراد وتصدير فاخر للفواكه والخضروات الطازجة من دبي إلى العالم.", hi: "दुबई से दुनिया भर में ताज़े फल और सब्जियों का प्रीमियम आयात और निर्यात।", ur: "دبئی سے دنیا بھر تک تازہ پھلوں اور سبزیوں کی پریمیم درآمد اور برآمد۔", ru: "Премиальный импорт и экспорт свежих фруктов и овощей из Дубая по всему миру.", fr: "Import & export premium de fruits et légumes frais de Dubaï vers le monde.", zh: "从迪拜到世界的优质新鲜水果和蔬菜进出口。" },
    company:       { en: "Company",       ar: "الشركة",      hi: "कंपनी",          ur: "کمپنی",           ru: "Компания",       fr: "Entreprise",      zh: "公司" },
    trade:         { en: "Trade",         ar: "التجارة",      hi: "व्यापार",         ur: "تجارت",           ru: "Торговля",       fr: "Commerce",        zh: "贸易" },
    getInTouch:    { en: "Get in Touch",  ar: "تواصل معنا",   hi: "संपर्क करें",    ur: "رابطہ کریں",      ru: "Связаться",      fr: "Nous contacter",  zh: "联系我们" },
    allRights:     { en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", hi: "सभी अधिकार सुरक्षित।", ur: "تمام حقوق محفوظ ہیں۔", ru: "Все права защищены.", fr: "Tous droits réservés.", zh: "版权所有。" },
    aboutUs:       { en: "About Us",      ar: "من نحن",       hi: "हमारे बारे में",  ur: "ہمارے بارے میں",  ru: "О нас",          fr: "À propos",        zh: "关于我们" },
    qualityAssurance: { en: "Quality Assurance", ar: "ضمان الجودة", hi: "गुणवत्ता आश्वासन", ur: "معیار یقین دہانی", ru: "Гарантия качества", fr: "Assurance qualité", zh: "质量保证" },
    importMarkets: { en: "Import Markets", ar: "أسواق الاستيراد", hi: "आयात बाज़ार",  ur: "درآمد بازار",     ru: "Рынки импорта",  fr: "Marchés d'importation", zh: "进口市场" },
    exportMarkets: { en: "Export Markets", ar: "أسواق التصدير",  hi: "निर्यात बाज़ार", ur: "برآمد بازار",     ru: "Рынки экспорта", fr: "Marchés d'exportation", zh: "出口市场" },
    costEstimator: { en: "Cost Estimator", ar: "تقدير التكلفة",  hi: "लागत अनुमानक",  ur: "لاگت اندازہ",    ru: "Калькулятор",    fr: "Estimateur de coût", zh: "成本估算器" },
    investInUs:    { en: "Invest in Us",   ar: "استثمر معنا",    hi: "हम में निवेश करें", ur: "ہم میں سرمایہ کاری کریں", ru: "Инвестируй в нас", fr: "Investissez en nous", zh: "投资我们" },
    privacy:       { en: "Privacy",        ar: "الخصوصية",       hi: "गोपनीयता",      ur: "رازداری",         ru: "Конфиденциальность", fr: "Confidentialité", zh: "隐私" },
    terms:         { en: "Terms",          ar: "الشروط",         hi: "शर्तें",         ur: "شرائط",           ru: "Условия",        fr: "Conditions",      zh: "条款" },
  },
};

/**
 * Get a translation value.
 * Usage: t("nav.home", lang)
 */
export function t(path, lang = "en") {
  const parts = path.split(".");
  let current = translations;
  for (const part of parts) {
    if (current[part] === undefined) return path;
    current = current[part];
  }
  return current[lang] ?? current["en"] ?? path;
}
