from rest_framework import routers
from .api import ExpenseViewSet, CategoryViewSet, LocationViewSet, SourceViewSet

router = routers.DefaultRouter()
router.register('api/expenses', ExpenseViewSet, 'expenses')
router.register('api/categories', CategoryViewSet, 'categories')
router.register('api/locations', LocationViewSet, 'locations')
router.register('api/sources', SourceViewSet, 'sources')

urlpatterns = router.urls