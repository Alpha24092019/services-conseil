import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, Heart, Share2 } from 'lucide-react';
import { useArticle, useRelatedArticles } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { formatDate } from '@/utils';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: articleData, isLoading, error } = useArticle(slug || '');
  const { data: relatedData } = useRelatedArticles(slug || '');

  if (isLoading) return <LoadingSpinner className="py-20" />;
  if (error) return <ErrorMessage onRetry={() => window.location.reload()} />;
  if (!articleData?.data) return <ErrorMessage message="المقال غير موجود" />;

  const article = articleData.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">الرئيسية</Link>
        <span>/</span>
        <Link to="/articles" className="hover:text-foreground">المقالات</Link>
        <span>/</span>
        <span className="text-foreground">{article.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="bg-card rounded-lg shadow-sm">
            {article.featuredImage && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge>{article.category.name}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {article.author.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold mb-6">{article.title}</h1>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Heart className="ml-2 h-4 w-4" />
                    {article.likes.length}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="ml-2 h-4 w-4" />
                    {article.views}
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="ml-2 h-4 w-4" />
                  مشاركة
                </Button>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">الكاتب</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">كاتب قانوني</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedData?.data && relatedData.data.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">مقالات ذات صلة</h3>
                <div className="space-y-4">
                  {relatedData.data.map((related) => (
                    <Link 
                      key={related._id} 
                      to={`/articles/${related.slug}`}
                      className="block group"
                    >
                      <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(related.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Back Button */}
          <Button asChild variant="outline" className="w-full">
            <Link to="/articles">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة للمقالات
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
