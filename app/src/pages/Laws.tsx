import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Download, FileText, Calendar } from 'lucide-react';
import { useLaws, useCategories, useLawYears } from '@/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner, ErrorMessage, Pagination, SearchBar } from '@/components/common';
import { formatFileSize } from '@/utils';

const Laws = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const { data: lawsData, isLoading, error } = useLaws({ 
    page, 
    limit: 12,
    search: search || undefined,
    category: selectedCategory || undefined,
    year: selectedYear ? Number(selectedYear) : undefined
  });

  const { data: categoriesData } = useCategories('law');
  const { data: yearsData } = useLawYears();

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
        <h1 className="text-3xl font-bold mb-4">المكتبة القانونية</h1>
        <p className="text-muted-foreground">
          تصفح وحمّل مختلف القوانين الجزائرية بصيغة PDF
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <SearchBar 
          placeholder="البحث في القوانين..."
          onSearch={handleSearch}
          className="max-w-xl"
        />
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
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedYear === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedYear('')}
          >
            جميع السنوات
          </Button>
          {yearsData?.data.map((year) => (
            <Button
              key={year}
              variant={selectedYear === String(year) ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedYear(String(year))}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      {/* Laws Grid */}
      {lawsData?.data.length === 0 ? (
        <div className="text-center py-16">
          <Scale className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">لا توجد قوانين</h3>
          <p className="text-muted-foreground">لم يتم العثور على قوانين مطابقة لبحثك</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lawsData?.data.map((law) => (
              <Card key={law._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{law.category.name}</Badge>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    <Link to={`/laws/${law.slug}`} className="hover:text-primary">
                      {law.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {law.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {law.year}
                    </span>
                    <span>رقم: {law.number}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      {law.pdfSize > 0 && formatFileSize(law.pdfSize)}
                      {law.pages > 0 && ` • ${law.pages} صفحة`}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/laws/${law.slug}`}>
                        <Download className="ml-2 h-4 w-4" />
                        تحميل
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {lawsData?.pagination && lawsData.pagination.pages > 1 && (
            <Pagination
              currentPage={lawsData.pagination.currentPage}
              totalPages={lawsData.pagination.pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Laws;
