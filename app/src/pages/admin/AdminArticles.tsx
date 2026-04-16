import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useArticles, useDeleteArticle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LoadingSpinner, Pagination } from '@/components/common';
import { formatDate } from '@/utils';
import { toast } from 'sonner';

const AdminArticles = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: articlesData, isLoading } = useArticles({ 
    page, 
    limit: 10,
    search: search || undefined
  });

  const deleteArticle = useDeleteArticle();

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteArticle.mutateAsync(deleteId);
      toast.success('تم حذف المقال بنجاح');
      setDeleteId(null);
    } catch (error) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  if (isLoading) return <LoadingSpinner className="py-20" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">المقالات</h1>
          <p className="text-muted-foreground">إدارة المقالات القانونية</p>
        </div>
        <Button asChild>
          <Link to="/admin/articles/new">
            <Plus className="ml-2 h-4 w-4" />
            مقال جديد
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في المقالات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Articles Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>الكاتب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المشاهدات</TableHead>
                <TableHead>تاريخ النشر</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articlesData?.data.map((article) => (
                <TableRow key={article._id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate">{article.title}</div>
                  </TableCell>
                  <TableCell>{article.category.name}</TableCell>
                  <TableCell>{article.author.name}</TableCell>
                  <TableCell>
                    <Badge variant={article.isPublished ? 'default' : 'secondary'}>
                      {article.isPublished ? 'منشور' : 'مسودة'}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>{formatDate(article.publishedAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/articles/${article.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/articles/edit/${article._id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setDeleteId(article._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {articlesData?.pagination && articlesData.pagination.pages > 1 && (
        <Pagination
          currentPage={articlesData.pagination.currentPage}
          totalPages={articlesData.pagination.pages}
          onPageChange={setPage}
        />
      )}

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف هذا المقال نهائياً. لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminArticles;
