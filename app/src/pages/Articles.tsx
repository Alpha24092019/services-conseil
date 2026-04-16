import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Eye, Heart } from 'lucide-react';
import { useArticles, useCategories } from '@/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner, ErrorMessage, Pagination, SearchBar } from '@/components/common';
import { formatDate, truncateText } from '@/utils';

const Articles = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: articlesData, isLoading, error } = useArticles({ 
    page, 
    limit: 9,
    search: search || undefined,
    category: selectedCategory || undefined
  });

  const { data: categoriesData } = useCategories('article');

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
        <h1 className="text-3xl font-bold mb-4">المقالات القانونية</h1>
        <p className="text-muted-foreground">
          اقرأ أحدث المقالات والتحليلات القانونية من خبراء في المجال
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar 
          placeholder="البحث في المقالات..."
          onSearch={handleSearch}
          className="flex-1"
        />
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('')}
          >
            الكل
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

      {/* Articles Grid */}
      {articlesData?.data.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">لا توجد مقالات</h3>
          <p className="text-muted-foreground">لم يتم العثور على مقالات مطابقة لبحثك</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData?.data.map((article) => (
              <Card key={article._id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                {article.featuredImage && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.featuredImage} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{article.category.name}</Badge>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link to={`/articles/${article.slug}`} className="hover:text-primary">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {truncateText(article.excerpt, 150)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes.length}
                      </span>
                    </div>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link 
                      to={`/articles/${article.slug}`}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      قراءة المزيد
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {articlesData?.pagination && articlesData.pagination.pages > 1 && (
            <Pagination
              currentPage={articlesData.pagination.currentPage}
              totalPages={articlesData.pagination.pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Articles;
