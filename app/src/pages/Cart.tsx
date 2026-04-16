import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';
import { useCart } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EmptyState } from '@/components/common';
import { formatPrice } from '@/utils';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          title="السلة فارغة"
          description="لم تقم بإضافة أي منتجات للسلة بعد"
          actionLabel="تصفح الكتب"
          onAction={() => navigate('/books')}
          icon={ShoppingCart}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">سلة التسوق</h1>
        <Button variant="outline" onClick={clearCart}>
          <Trash2 className="ml-2 h-4 w-4" />
          إفراغ السلة
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.book._id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                    {item.book.coverImage ? (
                      <img 
                        src={item.book.coverImage} 
                        alt={item.book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      <Link to={`/books/${item.book.slug}`} className="hover:text-primary">
                        {item.book.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.book.author}</p>
                    <p className="font-bold text-primary mb-4">{formatPrice(item.book.price)}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border rounded-lg">
                        <button 
                          className="px-3 py-1 hover:bg-muted"
                          onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-muted"
                          onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove */}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.book._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد المنتجات</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>الإجمالي</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                إتمام الشراء
              </Button>

              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate('/books')}
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                مواصلة التسوق
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
