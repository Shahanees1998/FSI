type Primitive = string | number | boolean | null | undefined;

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

class ApiClient {
    constructor(private baseURL = "/api") {}

    private buildUrl(endpoint: string, params?: Record<string, Primitive>) {
        const url = new URL(`${this.baseURL}${endpoint}`, "http://localhost");
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            });
        }
        return `${url.pathname}${url.search}`;
    }

    private async request<T>(
        endpoint: string,
        init: RequestInit = {},
        params?: Record<string, Primitive>
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(this.buildUrl(endpoint, params), {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(init.headers ?? {}),
                },
                ...init,
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                return { error: payload.error || "Request failed" };
            }

            return { data: payload };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : "Network error",
            };
        }
    }

    get<T>(endpoint: string, params?: Record<string, Primitive>) {
        return this.request<T>(endpoint, { method: "GET" }, params);
    }

    post<T>(endpoint: string, body?: unknown) {
        return this.request<T>(endpoint, {
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    put<T>(endpoint: string, body?: unknown) {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}

export const apiClient = new ApiClient();
