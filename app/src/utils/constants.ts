// Order Status
export const ORDER_STATUS = {
  pending: { label: 'معلق', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  confirmed: { label: 'مؤكد', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  processing: { label: 'قيد المعالجة', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  shipped: { label: 'تم الشحن', color: 'indigo', bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' },
  delivered: { label: 'تم التسليم', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  cancelled: { label: 'ملغي', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' },
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  pending: { label: 'معلق', color: 'yellow' },
  paid: { label: 'مدفوع', color: 'green' },
  failed: { label: 'فاشل', color: 'red' },
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  cash_on_delivery: { label: 'الدفع عند الاستلام', icon: 'Banknote' },
  bank_transfer: { label: 'تحويل بنكي', icon: 'Building2' },
} as const;

// User Roles
export const USER_ROLES = {
  user: { label: 'مستخدم', color: 'blue' },
  moderator: { label: 'مشرف', color: 'purple' },
  admin: { label: 'مدير', color: 'red' },
} as const;

// Algerian Wilayas (States)
export const WILAYAS = [
  { code: '01', name: 'أدرار' },
  { code: '02', name: ' الشلف' },
  { code: '03', name: 'الأغواط' },
  { code: '04', name: 'أم البواقي' },
  { code: '05', name: 'باتنة' },
  { code: '06', name: 'بجاية' },
  { code: '07', name: 'بسكرة' },
  { code: '08', name: 'بشار' },
  { code: '09', name: 'البليدة' },
  { code: '10', name: 'البويرة' },
  { code: '11', name: 'تمنراست' },
  { code: '12', name: 'تبسة' },
  { code: '13', name: 'تلمسان' },
  { code: '14', name: 'تيارت' },
  { code: '15', name: 'تيزي وزو' },
  { code: '16', name: 'الجزائر' },
  { code: '17', name: 'الجلفة' },
  { code: '18', name: 'جيجل' },
  { code: '19', name: 'سطيف' },
  { code: '20', name: 'سعيدة' },
  { code: '21', name: 'سكيكدة' },
  { code: '22', name: 'سيدي بلعباس' },
  { code: '23', name: 'عنابة' },
  { code: '24', name: 'قالمة' },
  { code: '25', name: 'قسنطينة' },
  { code: '26', name: 'المدية' },
  { code: '27', name: 'مستغانم' },
  { code: '28', name: 'المسيلة' },
  { code: '29', name: 'معسكر' },
  { code: '30', name: 'ورقلة' },
  { code: '31', name: 'وهران' },
  { code: '32', name: 'البيض' },
  { code: '33', name: 'إليزي' },
  { code: '34', name: 'برج بوعريريج' },
  { code: '35', name: 'بومرداس' },
  { code: '36', name: 'الطارف' },
  { code: '37', name: 'تندوف' },
  { code: '38', name: 'تيسمسيلت' },
  { code: '39', name: 'الوادي' },
  { code: '40', name: 'خنشلة' },
  { code: '41', name: 'سوق أهراس' },
  { code: '42', name: 'تيبازة' },
  { code: '43', name: 'ميلة' },
  { code: '44', name: 'عين الدفلى' },
  { code: '45', name: 'النعامة' },
  { code: '46', name: 'عين تموشنت' },
  { code: '47', name: 'غرداية' },
  { code: '48', name: 'غليزان' },
  { code: '49', name: 'تيميمون' },
  { code: '50', name: 'برج باجي مختار' },
  { code: '51', name: 'أولاد جلال' },
  { code: '52', name: 'بني عباس' },
  { code: '53', name: 'عين صالح' },
  { code: '54', name: 'عين قزام' },
  { code: '55', name: 'تقرت' },
  { code: '56', name: 'جانت' },
  { code: '57', name: 'المغير' },
  { code: '58', name: 'المنيعة' },
];

// Delivery Fees by Wilaya
export const DELIVERY_FEES: Record<string, number> = {
  '16': 400, // Algiers
  '31': 500, // Oran
  '25': 500, // Constantine
  '09': 400, // Blida
  default: 600,
};

// Site Info
export const SITE_INFO = {
  name: 'المدونة القانونية الجزائرية',
  description: 'منصة شاملة للقوانين الجزائرية والمقالات القانونية والكتب',
  phone: '+213 555 123 456',
  email: 'contact@legalblog.dz',
  address: 'الجزائر العاصمة',
  social: {
    facebook: 'https://facebook.com/legalblogdz',
    twitter: 'https://twitter.com/legalblogdz',
    instagram: 'https://instagram.com/legalblogdz',
    youtube: 'https://youtube.com/legalblogdz',
  },
};
