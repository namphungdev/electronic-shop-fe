import { productService, productServiceHHB } from '@/services/product.service';
import useQuery from './useQuery';

export const useCategories = (dependencyList = [], enabled = true) => {
  const { data: { data: categoryList = [] } = {}, loading: loadingCategory } =
    useQuery({
      queryFn: ({ signal }) => productService.getCategories(signal),
      queryKey: 'categories',
      storage: 'redux',
      enabled: enabled,
      dependencyList: dependencyList,
      keepPreviousData: true,
    });

  return { categoryList, loadingCategory };
};

export const useCategory = (id, ...rest) => {
  // ==== rest gồm dependencyList và enabled ====
  const { categoryList } = useCategories(...rest);

  return categoryList.find((e) => e?.id === id);
};

export const useCategoriesHHB = (dependencyList = [], enabled = true) => {
  const {
    data: { data: categoryListHHB = [] } = {},
    loading: loadingCategoryHHB,
  } = useQuery({
    queryFn: ({ signal }) => productServiceHHB.getCategoriesHHB(signal),
    queryKey: 'categoriesHHB',
    storage: 'redux',
    enabled: enabled,
    dependencyList: dependencyList,
    keepPreviousData: true,
  });

  return { categoryListHHB, loadingCategoryHHB };
};

export const getCategoryTitleBySlug = (categoryListHHB, slug) => {
  const category = categoryListHHB.find((e) => e.slug === slug);
  return category ? category.title : null;
};
