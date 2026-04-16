import { Link } from 'react-router-dom';
import { 
  Scale, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { SITE_INFO } from '@/utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { to: '/', label: 'الرئيسية' },
      { to: '/articles', label: 'المقالات القانونية' },
      { to: '/laws', label: 'المكتبة القانونية' },
      { to: '/books', label: 'متجر الكتب' },
      { to: '/about', label: 'من نحن' },
      { to: '/contact', label: 'اتصل بنا' },
    ],
    legal: [
      { to: '/privacy', label: 'سياسة الخصوصية' },
      { to: '/terms', label: 'شروط الاستخدام' },
      { to: '/faq', label: 'الأسئلة الشائعة' },
    ],
  };

  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">المدونة القانونية</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              منصة شاملة للقوانين الجزائرية والمقالات القانونية والكتب. نسعى لتوفير 
              مصدر موثوق للمعلومات القانونية.
            </p>
            <div className="flex gap-4">
              <a 
                href={SITE_INFO.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={SITE_INFO.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={SITE_INFO.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={SITE_INFO.social.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">قانوني</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {SITE_INFO.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {SITE_INFO.email}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {SITE_INFO.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>جميع الحقوق محفوظة &copy; {currentYear} المدونة القانونية الجزائرية</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
