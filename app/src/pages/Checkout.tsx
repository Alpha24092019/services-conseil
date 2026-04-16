import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, MapPin } from 'lucide-react';
import { useCart, useCreateOrder } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingSpinner } from '@/components/common';
import { formatPrice, WILAYAS, DELIVERY_FEES } from '@/utils';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wilaya: '',
    city: '',
    address: '',
    notes: '',
  });

  const deliveryFee = DELIVERY_FEES[formData.wilaya] || DELIVERY_FEES.default;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">السلة فارغة</h2>
        <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات للسلة</p>
        <Button onClick={() => navigate('/books')}>
          تصفح الكتب
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || 
        !formData.wilaya || !formData.city || !formData.address) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          wilaya: WILAYAS.find(w => w.code === formData.wilaya)?.name || formData.wilaya,
          city: formData.city,
          address: formData.address,
        },
        items: items.map(item => ({
          bookId: item.book._id,
          quantity: item.quantity,
        })),
        deliveryFee,
        notes: formData.notes,
      };

      const response = await createOrder.mutateAsync(orderData);
      
      toast.success('تم إنشاء الطلب بنجاح!');
      clearCart();
      navigate(`/order-success?orderNumber=${response.data.orderNumber}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الطلب');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => navigate('/cart')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">إتمام الشراء</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  معلومات العميل
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05XX XXX XXX"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  عنوان التوصيل
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wilaya">الولاية *</Label>
                    <Select 
                      value={formData.wilaya} 
                      onValueChange={(value) => setFormData({ ...formData, wilaya: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الولاية" />
                      </SelectTrigger>
                      <SelectContent>
                        {WILAYAS.map((wilaya) => (
                          <SelectItem key={wilaya.code} value={wilaya.code}>
                            {wilaya.code} - {wilaya.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">البلدية *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="أدخل البلدية"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">العنوان التفصيلي *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="أدخل العنوان الكامل مع الرمز البريدي"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">ملاحظات (اختياري)</h2>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أي ملاحظات خاصة بالطلب..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.book._id} className="flex justify-between text-sm">
                      <span className="line-clamp-1">
                        {item.book.title} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.book.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رسوم التوصيل</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>الإجمالي</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>الدفع عند الاستلام</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'تأكيد الطلب'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
