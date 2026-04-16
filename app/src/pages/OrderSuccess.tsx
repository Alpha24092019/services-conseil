import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_INFO } from '@/utils';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
        <p className="text-muted-foreground mb-6">
          شكراً لطلبك. سنتواصل معك قريباً لتأكيد الطلب وترتيب التوصيل.
        </p>

        {orderNumber && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">رقم الطلب</p>
              <p className="text-2xl font-bold font-mono">{orderNumber}</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>للاستفسار: {SITE_INFO.phone}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>يمكنك تتبع طلبك باستخدام رقم الطلب</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Package className="ml-2 h-4 w-4" />
              العودة للرئيسية
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/books">
              مواصلة التسوق
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
