// بيانات المنتجات
const products = [
    {
        id: 1,
        title: "عطر فلورال الفخامة",
        category: "عطور",
        brand: "شانيل",
        price: 349,
        oldPrice: 499,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "جديد",
        description: "عطر فلورال يجمع بين أنوثة الزهور ونضارة الفواكه، برائحة تدوم طويلاً."
    },
    {
        id: 2,
        title: "طقم مكياج كامل",
        category: "مكياج",
        brand: "ماك",
        price: 599,
        oldPrice: 799,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "الأكثر مبيعًا",
        description: "طقم مكياج كامل يحتوي على كل ما تحتاجينه لإطلالة ساحرة."
    },
    {
        id: 3,
        title: "سيروم فيتامين سي",
        category: "عناية بالبشرة",
        brand: "لا روش بوزيه",
        price: 249,
        oldPrice: 0,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "",
        description: "سيروم فيتامين سي لتوحيد لون البشرة وتفتيح البقع الداكنة."
    },
    {
        id: 4,
        title: "أقراط لؤلؤ أنيقة",
        category: "إكسسوارات",
        brand: "سواروفسكي",
        price: 199,
        oldPrice: 299,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "خصم 30%",
        description: "أقراط لؤلؤية أنيقة تناسب جميع المناسبات."
    },
    {
        id: 5,
        title: "أحمر شفاه مات طويل الأمد",
        category: "مكياج",
        brand: "هودا بيوتي",
        price: 129,
        oldPrice: 0,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1586495985090-2b16b8383fce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "جديد",
        description: "أحمر شفاه مات طويل الأمد مع ترطيب دائم."
    },
    {
        id: 6,
        title: "علبة عطور فاخرة",
        category: "عطور",
        brand: "ديور",
        price: 899,
        oldPrice: 1199,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1615634262417-5c121329e633?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "عرض خاص",
        description: "علبة عطور فاخرة تحتوي على 5 عطور مصغرة من أشهر موديلات ديور."
    },
    {
        id: 7,
        title: "فرش مكياج احترافية",
        category: "مكياج",
        brand: "مورفي",
        price: 349,
        oldPrice: 499,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "",
        description: "مجموعة فرش مكياج احترافية من شعر طبيعي."
    },
    {
        id: 8,
        title: "ساعة يد أنيقة",
        category: "إكسسوارات",
        brand: "مايكل كورس",
        price: 799,
        oldPrice: 999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        badge: "الأكثر مبيعًا",
        description: "ساعة يد أنيقة من مايكل كورس بتصميم عصري."
    }
];

// تصنيفات المنتجات
const categories = [
    { id: 1, name: "عطور", count: 12 },
    { id: 2, name: "مكياج", count: 24 },
    { id: 3, name: "عناية بالبشرة", count: 18 },
    { id: 4, name: "عناية بالشعر", count: 10 },
    { id: 5, name: "إكسسوارات", count: 15 }
];

// العلامات التجارية
const brands = [
    { id: 1, name: "شانيل" },
    { id: 2, name: "ديور" },
    { id: 3, name: "ماك" },
    { id: 4, name: "هودا بيوتي" },
    { id: 5, name: "لا روش بوزيه" },
    { id: 6, name: "سواروفسكي" },
    { id: 7, name: "مايكل كورس" }
];

// العروض الخاصة
const hotDeals = products.filter(product => product.oldPrice > 0);

// أحدث المنتجات
const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 4);

// الأكثر مبيعًا
const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

// اختيارات شخصية (عشوائية)
const forYou = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);