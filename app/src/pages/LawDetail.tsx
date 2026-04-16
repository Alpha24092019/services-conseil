import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Scale, Calendar, Download, FileText } from 'lucide-react';
import { useLaw } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { formatDate, formatFileSize } from '@/utils';
import { lawService } from '@/services';

const LawDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: lawData, isLoading, error } = useLaw(slug || '');

  const handleDownload = async () => {
    if (!lawData?.data) return;
    
    try {
      const blob = await lawService.downloadLaw(lawData.data._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${lawData.data.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      alert('حدث خطأ أثناء التحميل');
    }
  };

  if (isLoading) return <LoadingSpinner className="py-20" />;
  if (error) return <ErrorMessage onRetry={() => window.location.reload()} />;
  if (!lawData?.data) return <ErrorMessage message="القانون غير موجود" />;

  const law = lawData.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">الرئيسية</Link>
        <span>/</span>
        <Link to="/laws" className="hover:text-foreground">المكتبة القانونية</Link>
        <span>/</span>
        <span className="text-foreground">{law.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className="mb-3">{law.category.name}</Badge>
                  <h1 className="text-2xl md:text-3xl font-bold">{law.title}</h1>
                </div>
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">الرقم</p>
                  <p className="font-semibold">{law.number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">السنة</p>
                  <p className="font-semibold">{law.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">عدد الصفحات</p>
                  <p className="font-semibold">{law.pages || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حجم الملف</p>
                  <p className="font-semibold">{law.pdfSize > 0 ? formatFileSize(law.pdfSize) : '-'}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">الوصف</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {law.description}
                </p>
              </div>

              {/* Content */}
              {law.content && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">المحتوى</h2>
                  <div 
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: law.content }}
                  />
                </div>
              )}

              {/* Download Button */}
              <div className="pt-6 border-t">
                <Button onClick={handleDownload} size="lg" className="w-full md:w-auto">
                  <Download className="ml-2 h-5 w-5" />
                  تحميل القانون (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">إحصائيات</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Download className="h-4 w-4" />
                    عدد التحميلات
                  </span>
                  <span className="font-semibold">{law.downloadCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    تاريخ النشر
                  </span>
                  <span className="font-semibold">{formatDate(law.publishedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PDF Preview */}
          {law.pdfFile && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">معاينة الملف</h3>
                <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">ملف PDF</p>
                  <p className="text-sm text-muted-foreground">
                    {law.pdfSize > 0 && formatFileSize(law.pdfSize)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Back Button */}
          <Button asChild variant="outline" className="w-full">
            <Link to="/laws">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة للقوانين
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LawDetail;
