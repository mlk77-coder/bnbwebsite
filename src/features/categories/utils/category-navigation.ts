import { CategoryMainInfo, CategorySlugs } from "@/types/categories";

export const getBreadcrumbLinks = (category: CategoryMainInfo) => {
  const links = [];
  const buildSlug = (cat: CategorySlugs): string => {
    if (!cat.parent) {
      return cat.slug;
    }
    return `${buildSlug(cat.parent)}/${cat.slug}`;
  };

  let currentCategory: CategorySlugs | null = category;

  while (currentCategory?.parent) {
    links.unshift({
      name: currentCategory.name,
      slug: `/category/${buildSlug(currentCategory)}`,
    });
    currentCategory = currentCategory.parent;
  }

  if (currentCategory) {
    links.unshift({
      name: currentCategory.name,
      slug: `/category/${currentCategory.slug}`,
    });
  }

  if (links.length > 0) {
    links.pop();
  }

  return links;
};

export const getAllSlugs = (category: CategorySlugs | null): string[] => {
  const slugs = [];
  let currentCategory = category;

  while (currentCategory) {
    slugs.unshift(currentCategory.slug);
    currentCategory = currentCategory.parent || null;
  }

  return slugs;
};
