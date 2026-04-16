import { 
  FileText, 
  Scale, 
  BookOpen, 
  ShoppingCart, 
  Users, 
  TrendingUp
} from 'lucide-react';
import { useDashboardStats, useRecentActivity } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner, ErrorMessage } from '@/components/common';
import { formatPrice, formatRelativeTime } from '@/utils';

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: activityData, isLoading: activityLoading } = useRecentActivity();

  if (statsLoading) return <LoadingSpinner className="py-20" />;
  if (statsError) return <ErrorMessage onRetry={() => window.location.reload()} />;

  const stats = statsData?.data;

  const statCards = [
    { 
      title: 'المقالات', 
      value: stats?.counts.totalArticles || 0, 
      published: stats?.counts.publishedArticles || 0,
      icon: FileText, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'القوانين', 
      value: stats?.counts.totalLaws || 0, 
      active: stats?.counts.activeLaws || 0,
      icon: Scale, 
      color: 'bg-green-500' 
    },
    { 
      title: 'الكتب', 
      value: stats?.counts.totalBooks || 0, 
      active: stats?.counts.activeBooks || 0,
      icon: BookOpen, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'الطلبات', 
      value: stats?.counts.totalOrders || 0, 
      pending: stats?.counts.pendingOrders || 0,
      icon: ShoppingCart, 
      color: 'bg-orange-500' 
    },
    { 
      title: 'المستخدمين', 
      value: stats?.counts.totalUsers || 0, 
      icon: Users, 
      color: 'bg-pink-500' 
    },
    { 
      title: 'الإيرادات', 
      value: formatPrice(stats?.counts.totalRevenue || 0), 
      icon: TrendingUp, 
      color: 'bg-emerald-500' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على أداء الموقع</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                  {card.published !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.published} منشورة
                    </p>
                  )}
                  {card.active !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.active} نشطة
                    </p>
                  )}
                  {card.pending !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.pending} معلقة
                    </p>
                  )}
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">{formatPrice(order.finalAmount)}</p>
                      <p className="text-xs text-muted-foreground">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">لا توجد طلبات</p>
            )}
          </CardContent>
        </Card>

        {/* Popular Books */}
        <Card>
          <CardHeader>
            <CardTitle>الكتب الأكثر مبيعاً</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.popularBooks && stats.popularBooks.length > 0 ? (
              <div className="space-y-4">
                {stats.popularBooks.map((book) => (
                  <div key={book._id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium line-clamp-1">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">{formatPrice(book.price)}</p>
                      <p className="text-xs text-muted-foreground">{book.salesCount} مبيع</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">لا توجد كتب</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <LoadingSpinner />
          ) : activityData?.data && activityData.data.length > 0 ? (
            <div className="space-y-3">
              {activityData.data.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'article' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatRelativeTime(activity.date)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">لا يوجد نشاط</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
