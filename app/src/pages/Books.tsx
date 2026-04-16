import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, Filter } from 'lucide-react';
import { useBooks, useCategories } from '@/hooks';
import { useCartStore } from '@/stores';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner, ErrorMessage, Pagination, SearchBar } from '@/components/common';
import { formatPrice } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Books = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const { data: booksData, isLoading, error } = useBooks({ 
    page, 
    limit: 12,
    search: search || undefined,
    category: selectedCategory || undefined,
    sort: sortBy
  });

  const { data: categoriesData } = useCategories('book');
  const addToCart = useCartStore((state) => state.addToCart);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  if (isLoading) return <LoadingSpinner className="py-20" />;
  if (error) return <ErrorMessage onRetry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">متجر الكتب</h1>
        <p className="text-muted-foreground">
          اشتري الكتب القانونية مع الدفع عند الاستلام
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar 
            placeholder="البحث في الكتب..."
            onSearch={handleSearch}
            className="flex-1"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 ml-2" />
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">الأحدث</SelectItem>
              <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
              <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
              <SelectItem value="popular">الأكثر مبيعاً</SelectItem>
              <SelectItem value="rating">الأعلى تقييماً</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('')}
          >
            جميع التصنيفات
          </Button>
          {categoriesData?.data.map((category) => (
            <Button
              key={category._id}
              variant={selectedCategory === category._id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category._id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {booksData?.data.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">لا توجد كتب</h3>
          <p className="text-muted-foreground">لم يتم العثور على كتب مطابقة لبحثك</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {booksData?.data.map((book) => (
              <Card key={book._id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {book.oldPrice > 0 && book.oldPrice > book.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      خصم {Math.round((1 - book.price / book.oldPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {book.category.name}
                  </Badge>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                    <Link to={`/books/${book.slug}`} className="hover:text-primary">
                      {book.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-primary">{formatPrice(book.price)}</span>
                      {book.oldPrice > 0 && (
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          {formatPrice(book.oldPrice)}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => addToCart(book, 1)}
                      disabled={book.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {booksData?.pagination && booksData.pagination.pages > 1 && (
            <Pagination
              currentPage={booksData.pagination.currentPage}
              totalPages={booksData.pagination.pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Books;
