const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT as string;

const makeHeaders = (token?: string): Record<string, string> => {
    const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
};

export const makeRequest = async (
    method: "GET" | "POST" | "DELETE" | "PUT",
    path: string,
    data?: Record<string, any> | FormData,
    token?: string | null,
    responseType: "json" | "blob" = "json"
): Promise<{ success: boolean, error?: any, message?: any, data?: any }> => {
    try {
        let params = "";
        const config: RequestInit = {
            method,
            headers: makeHeaders(token ?? ""),
            credentials: "include"
        };
        const isFormData = data instanceof FormData;
        if (isFormData) {
            const headers = config.headers as Record<string, string>;
            delete headers["Content-Type"];
            config.body = data;
        } else if (method !== "GET" && data != null) {
            config.body = JSON.stringify(data);
        }

        if (method === "GET" && data != null && !(data instanceof FormData)) {
            const queryParams = new URLSearchParams(
                Object.entries(data).map(([k, v]) => [k, String(v)])
            );
            params = `?${queryParams.toString()}`;
        }

        // start req
        const res = await fetch(`${BACKEND_ENDPOINT}${path}${params}`, config);

        if (responseType === "blob") {
            const contentType = res.headers.get("Content-Type") ?? "";
            if (contentType.includes("application/json")) {
                const res_data = await res.json();
                return res_data;
            }
            const blob = await res.blob();
            return { success: true, message: "File bytes downloaded", data: blob };
        }

        const res_data = await safeJson(res);
        return res_data;

    } catch (err) {
        return {
            success: false, error: true, message: err
        }
    }
};

const safeJson = async (res: Response) => {
    // I have made this method as a way to fallback if the response from the backend is not json for whatever reason
    try {
        return await res.json();

    } catch (err) {
        return {
            success: false, message: "Invalid response, not JSON", data: []
        }
    }
};
