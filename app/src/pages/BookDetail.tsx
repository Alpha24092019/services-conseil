import { useParams, Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, Star, Check, X } from 'lucide-react';
import { useBook, useRelatedBooks } from '@/hooks';
import { useCartStore } from '@/stores';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { formatPrice } from '@/utils';
import { useState } from 'react';

const BookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: bookData, isLoading, error } = useBook(slug || '');
  const { data: relatedData } = useRelatedBooks(slug || '');
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <LoadingSpinner className="py-20" />;
  if (error) return <ErrorMessage onRetry={() => window.location.reload()} />;
  if (!bookData?.data) return <ErrorMessage message="الكتاب غير موجود" />;

  const book = bookData.data;

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">الرئيسية</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-foreground">متجر الكتب</Link>
        <span>/</span>
        <span className="text-foreground">{book.title}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-muted rounded-lg overflow-hidden">
          {book.coverImage ? (
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-24 w-24 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-3">{book.category.name}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-muted-foreground">{book.author}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-muted-foreground">({book.reviewsCount} تقييم)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">{formatPrice(book.price)}</span>
            {book.oldPrice > 0 && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(book.oldPrice)}
              </span>
            )}
          </div>

          <Separator />

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">الناشر</p>
              <p className="font-medium">{book.publisher || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">سنة النشر</p>
              <p className="font-medium">{book.year}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">عدد الصفحات</p>
              <p className="font-medium">{book.pages || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">اللغة</p>
              <p className="font-medium">{book.language}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ISBN</p>
              <p className="font-medium">{book.isbn || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المخزون</p>
              <p className={`font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {book.stock > 0 ? `متوفر (${book.stock})` : 'غير متوفر'}
              </p>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">الوصف</h3>
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Add to Cart */}
          {book.stock > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button 
                  className="px-4 py-2 hover:bg-muted"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  className="px-4 py-2 hover:bg-muted"
                  onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingCart className="ml-2 h-5 w-5" />
                إضافة للسلة
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Related Books */}
      {relatedData?.data && relatedData.data.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">كتب ذات صلة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedData.data.map((relatedBook) => (
              <Card key={relatedBook._id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  {relatedBook.coverImage ? (
                    <img 
                      src={relatedBook.coverImage} 
                      alt={relatedBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                    <Link to={`/books/${relatedBook.slug}`} className="hover:text-primary">
                      {relatedBook.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{relatedBook.author}</p>
                  <p className="font-bold text-primary">{formatPrice(relatedBook.price)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
