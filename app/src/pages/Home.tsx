import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Scale, FileText, ShoppingCart } from 'lucide-react';
import { useArticles, useFeaturedBooks, useLaws } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { formatDate, truncateText } from '@/utils';

const Home = () => {
  const { data: articlesData, isLoading: articlesLoading, error: articlesError } = useArticles({ limit: 3 });
  const { data: booksData, isLoading: booksLoading, error: booksError } = useFeaturedBooks();
  const { data: lawsData, isLoading: lawsLoading, error: lawsError } = useLaws({ limit: 4 });

  const features = [
    {
      icon: FileText,
      title: 'مقالات قانونية',
      description: 'اقرأ أحدث المقالات والتحليلات القانونية من خبراء في المجال',
      link: '/articles',
      color: 'bg-blue-500',
    },
    {
      icon: Scale,
      title: 'مكتبة قانونية',
      description: 'تصفح وحمّل مختلف القوانين الجزائرية بصيغة PDF',
      link: '/laws',
      color: 'bg-green-500',
    },
    {
      icon: BookOpen,
      title: 'متجر الكتب',
      description: 'اشتري الكتب القانونية مع الدفع عند الاستلام',
      link: '/books',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              المدونة القانونية الجزائرية
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              منصة شاملة للقوانين الجزائرية، المقالات القانونية، ومتجر الكتب. 
              مصدرك الموثوق للمعلومات القانونية.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/laws">
                  <Scale className="ml-2 h-5 w-5" />
                  تصفح القوانين
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/books">
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  تسوق الكتب
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  اكتشف المزيد
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">أحدث المقالات</h2>
          <Link to="/articles" className="text-primary hover:underline flex items-center">
            عرض الكل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </div>

        {articlesLoading ? (
          <LoadingSpinner />
        ) : articlesError ? (
          <ErrorMessage onRetry={() => window.location.reload()} />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{article.category.name}</span>
                    <span>•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    <Link to={`/articles/${article.slug}`} className="hover:text-primary">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {truncateText(article.excerpt, 100)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Latest Laws */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">أحدث القوانين</h2>
          <Link to="/laws" className="text-primary hover:underline flex items-center">
            عرض الكل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </div>

        {lawsLoading ? (
          <LoadingSpinner />
        ) : lawsError ? (
          <ErrorMessage onRetry={() => window.location.reload()} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lawsData?.data.map((law) => (
              <Card key={law._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Scale className="h-4 w-4" />
                    <span>{law.category.name}</span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    <Link to={`/laws/${law.slug}`} className="hover:text-primary">
                      {law.title}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      رقم: {law.number}
                    </span>
                    <span className="text-muted-foreground">
                      سنة: {law.year}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">كتب مميزة</h2>
          <Link to="/books" className="text-primary hover:underline flex items-center">
            عرض الكل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </div>

        {booksLoading ? (
          <LoadingSpinner />
        ) : booksError ? (
          <ErrorMessage onRetry={() => window.location.reload()} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {booksData?.data.map((book) => (
              <Card key={book._id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
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
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                    <Link to={`/books/${book.slug}`} className="hover:text-primary">
                      {book.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <p className="font-bold text-primary">{book.price} د.ج</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
