import { useState } from 'react';
import { Eye, Search, Filter } from 'lucide-react';
import { useOrders, useUpdateOrderStatus } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoadingSpinner, Pagination, StatusBadge } from '@/components/common';
import { formatPrice, formatDateTime, ORDER_STATUS } from '@/utils';
import type { Order } from '@/types';
import { toast } from 'sonner';

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: ordersData, isLoading } = useOrders({ 
    page, 
    limit: 10,
    search: search || undefined,
    status: statusFilter || undefined
  });

  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus });
      toast.success('تم تحديث حالة الطلب');
    } catch (error) {
      toast.error('حدث خطأ أثناء التحديث');
    }
  };

  if (isLoading) return <LoadingSpinner className="py-20" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">الطلبات</h1>
        <p className="text-muted-foreground">إدارة طلبات العملاء</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث برقم الطلب أو اسم العميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 ml-2" />
            <SelectValue placeholder="جميع الحالات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">جميع الحالات</SelectItem>
            {Object.entries(ORDER_STATUS).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الطلب</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersData?.data.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium font-mono">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(order.finalAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} type="order" />
                  </TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
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
      {ordersData?.pagination && ordersData.pagination.pages > 1 && (
        <Pagination
          currentPage={ordersData.pagination.currentPage}
          totalPages={ordersData.pagination.pages}
          onPageChange={setPage}
        />
      )}

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Status Update */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">تحديث الحالة:</span>
                <Select 
                  value={selectedOrder.status} 
                  onValueChange={(value) => handleStatusChange(selectedOrder._id, value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ORDER_STATUS).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Info */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">معلومات العميل</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="text-muted-foreground">الاسم:</span> {selectedOrder.customer.name}</p>
                  <p><span className="text-muted-foreground">الهاتف:</span> {selectedOrder.customer.phone}</p>
                  <p><span className="text-muted-foreground">الولاية:</span> {selectedOrder.customer.wilaya}</p>
                  <p><span className="text-muted-foreground">البلدية:</span> {selectedOrder.customer.city}</p>
                </div>
                <p className="text-sm mt-2">
                  <span className="text-muted-foreground">العنوان:</span> {selectedOrder.customer.address}
                </p>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-semibold mb-2">المنتجات</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.book.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رسوم التوصيل</span>
                    <span>{formatPrice(selectedOrder.deliveryFee)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الخصم</span>
                      <span>-{formatPrice(selectedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span>{formatPrice(selectedOrder.finalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
