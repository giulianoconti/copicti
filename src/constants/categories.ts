/**
 * Product category constants
 */

export const BROWSE_ART_CATEGORIES = ["paintings", "prints", "onSale", "newArrivals", "popular"] as const;

export const SUBJECT_CATEGORIES = ["abstract", "landscape", "nature", "people", "animals"] as const;

export const SHAPE_CATEGORIES = ["polyptych", "polyptychSh", "triptych", "triptychSquare", "triptychCircle"] as const;

export const SIZE_CATEGORIES = ["exLarge", "large", "medium", "small", "multiPanel"] as const;

// Helper to format category name for display
export const formatCategoryName = (category: string): string => {
  return category.replace(/([A-Z])/g, " $1").toUpperCase();
};
