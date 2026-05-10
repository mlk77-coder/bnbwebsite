import {
  fetcher,
  type FetcherResponse,
} from "@/lib/fetcher";
import type { ApiCategory } from "@/types/categories";
import type { ApiResponse } from "@/types/index";

type CategoryApiPayload = ApiResponse & { data?: ApiCategory | null };

/**
 * GET categories/{id-or-slug}.
 * Some backends return HTTP 200 with `{ success: false }` or missing `data`;
 * we normalize that to ok: false so callers never see ok:true with undefined data.
 */
export const getCategory = async (
  categoryIdOrSlug: string,
  locale: string,
  request?: Request,
): Promise<FetcherResponse<ApiCategory>> => {
  const response = await fetcher<CategoryApiPayload>(
    `categories/${categoryIdOrSlug}`,
    locale,
    undefined,
    false,
    request,
  );

  if (!response.ok) return response;

  const body = response.data;
  if (
    !body ||
    body.success === false ||
    body.data == null ||
    typeof body.data !== "object"
  ) {
    return {
      ok: false,
      status: 404,
      data: undefined,
      error: {
        message:
          typeof body?.message === "string" ? body.message : "Category not found",
        status: 404,
      },
    };
  }

  return {
    status: response.status,
    ok: true,
    error: undefined,
    data: body.data,
  };
};
