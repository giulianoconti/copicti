/**
 * Centralized API service for backend communication
 */

import { Painting } from "src/utils/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

// ============================================
// Types
// ============================================

export interface PaintingsResponse {
  totalPages: number;
  currentPage: number;
  paintings: Painting[];
}

export interface GetPaintingsParams {
  categories?: string;
  page?: number;
  limit?: number;
}

// ============================================
// API Methods
// ============================================

export const api = {
  /**
   * Health check endpoint - used for pre-warming the server
   */
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },

  /**
   * Get paginated list of paintings with optional filters
   */
  getPaintings: async (params: GetPaintingsParams = {}): Promise<PaintingsResponse> => {
    const searchParams = new URLSearchParams();

    if (params.categories) {
      searchParams.set("categories", params.categories);
    }
    if (params.page) {
      searchParams.set("page", params.page.toString());
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }

    const queryString = searchParams.toString();
    const url = queryString ? `${API_URL}/paintings?${queryString}` : `${API_URL}/paintings`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch paintings");
    }

    return response.json();
  },

  /**
   * Get a single painting by ID
   */
  getPainting: async (id: number | string): Promise<Painting> => {
    const response = await fetch(`${API_URL}/paintings/${id}`);

    if (!response.ok) {
      throw new Error("Painting not found");
    }

    return response.json();
  },
};
