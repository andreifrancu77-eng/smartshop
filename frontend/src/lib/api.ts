const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://smartshop-backend.fly.dev/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: unknown,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Map common HTTP status codes to user-friendly Romanian messages
    let friendlyMessage = errorData.message || "A aparut o eroare. Te rugam sa incerci din nou.";
    
    // Translate common error messages to Romanian
    if (errorData.message) {
      if (errorData.message.includes("Email already exists") || errorData.message.toLowerCase().includes("duplicate")) {
        friendlyMessage = "Acest email este deja inregistrat. Te rugam sa folosesti alt email sau sa te conectezi.";
      } else if (errorData.message.includes("Email sau parola incorecta") || errorData.message.toLowerCase().includes("bad credentials")) {
        friendlyMessage = "Email sau parola incorecta. Te rugam sa incerci din nou.";
      } else if (errorData.message.includes("User not found")) {
        friendlyMessage = "Contul nu a fost gasit. Te rugam sa verifici email-ul sau sa te inregistrezi.";
      } else if (errorData.message.includes("Eroare Stripe") || errorData.message.includes("Stripe")) {
        // Keep Stripe errors as they are (they're already user-friendly from backend)
        friendlyMessage = errorData.message;
      }
    }
    
    // Log full error for debugging (only in development)
    if (process.env.NODE_ENV === 'development' && errorData.message) {
      console.error('API Error:', errorData);
    }
    
    throw new Error(friendlyMessage);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

  const text = await response.text();
  if (!text || text.trim() === '') {
    return {} as T;
  }

  return JSON.parse(text);
}

interface AuthResponse {
  token: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  specification: ProductSpecification | null;
  createdAt: string;
}

export interface ProductSpecification {
  id: number;
  screenSize: string;
  screenType: string;
  resolution: string;
  processor: string;
  ram: string;
  storage: string;
  batteryCapacity: string;
  cameraMain: string;
  cameraFront: string;
  osVersion: string;
  connectivity: string;
  weight: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  iconName: string;
}

export interface Brand {
  id: number;
  name: string;
  logoUrl: string;
  description: string;
}

export interface OrderResponse {
  id: number;
  orderCode: string;
  total: number;
  status: string;
  createdAt: string;
  deliveryName: string;
  deliveryEmail: string;
  deliveryPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryCounty: string;
  deliveryPostalCode: string;
  deliveryCountry: string;
  deliveryNotes: string;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export const api = {
  auth: {
    register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
      request<AuthResponse>("/auth/register", "POST", data),
    login: (data: { email: string; password: string }) =>
      request<AuthResponse>("/auth/authenticate", "POST", data),
  },
  products: {
    getAll: () => request<ProductDTO[]>("/products"),
    getById: (id: string) => request<ProductDTO>(`/products/${id}`),
    getByCategory: (categoryId: string) => request<ProductDTO[]>(`/products/category/${categoryId}`),
    getByBrand: (brandId: string) => request<ProductDTO[]>(`/products/brand/${brandId}`),
    search: (query: string) => request<ProductDTO[]>(`/products/search?q=${encodeURIComponent(query)}`),
  },
  categories: {
    getAll: () => request<Category[]>("/categories"),
    getById: (id: string) => request<Category>(`/categories/${id}`),
  },
  brands: {
    getAll: () => request<Brand[]>("/brands"),
    getById: (id: string) => request<Brand>(`/brands/${id}`),
  },
  orders: {
    create: (data: unknown, token: string) => request<OrderResponse>("/orders", "POST", data, token),
    getMyOrders: (token: string) => request<OrderResponse[]>("/orders", "GET", undefined, token),
    getById: (id: number, token: string) => request<OrderResponse>(`/orders/${id}`, "GET", undefined, token),
    getByCode: (orderCode: string, token: string) => request<OrderResponse>(`/orders/code/${orderCode}`, "GET", undefined, token),
  },
  payments: {
    createPaymentIntent: (data: { orderId?: number; amount: number; currency?: string }, token?: string) =>
      request<{ clientSecret: string; paymentIntentId: string }>("/payments/create-payment-intent", "POST", data, token),
    confirmSuccess: (paymentIntentId: string, token: string) =>
      request(`/payments/success?paymentIntentId=${paymentIntentId}`, "POST", undefined, token),
    confirmFailure: (paymentIntentId: string, token: string) =>
      request(`/payments/failure?paymentIntentId=${paymentIntentId}`, "POST", undefined, token),
  },
};

// Map product names to image files in public folder
export function getProductImageUrl(product: ProductDTO): string {
  const name = product.name.toLowerCase();
  const brand = product.brandName?.toLowerCase() || "";

  // Create a mapping of product names to image files
  const imageMap: Record<string, string> = {
    "iphone 15 pro max": "/apple_iphone_15_pro_max_black_1_7416a980.webp",
    "iphone 15 pro": "/apple_iphone_15_pro_blue_1_38e3a2b7.avif",
    "iphone 15": "/apple_iphone_15_pink_1_b6e24474.avif",
    "samsung galaxy s24 ultra": "/telefon_samsung_galaxy_s24_ultra_5g_titanium_black_01_0b110de8.avif",
    "samsung galaxy s24+": "/telefon_samsung_galaxy_s24_plus_cobalt_violet_01_1762ecd2.avif",
    "samsung galaxy s24": "/telefon_samsung_galaxy_s24+_5g_onyx_black_01_e743bbe1.avif",
    "samsung galaxy z fold5": "/samsung galaxy Z fold5.webp",
    "google pixel 8 pro": "/google pixel 8 pro.webp",
    "google pixel 8": "/google pixel 8.avif",
    "oneplus 12": "/oneplus 12.avif",
    "oneplus 12r": "/oneplus12r.avif",
    "xiaomi 14 ultra": "/xiaomi 14 ultra.webp",
    "xiaomi 14": "/xiaomi14.webp",
    "xiaomi redmi note 13 pro+": "/xiaomi redmi note 13 pro+.jpg",
    "ipad pro 12.9\" m4": "/ipad pro 12.9 m4.png",
    "samsung galaxy tab s9 ultra": "/galaxy tab s9 ultra.jpg",
    "apple watch ultra 2": "/apple watch ultra 2.avif",
    "samsung galaxy watch 6 classic": "/galaxy watch 6 classic.png",
    "airpods pro 2": "/airpods pro 2.webp",
    "samsung galaxy buds2 pro": "/galaxy vuds 2 pro.jpg",
    "magsafe charger": "/magsafe charger.webp",
    "samsung 45w super fast charger": "/samsung super fast charger.webp",
    "xiaomi 120w hypercharge": "/xiaomi hypercharge.avif",
  };

  // Try exact match first
  if (imageMap[name]) {
    return imageMap[name];
  }

  // Try partial matching for variations
  for (const [key, value] of Object.entries(imageMap)) {
    if (name.includes(key) || key.includes(name)) {
      return value;
    }
  }

  // Fallback to product's imageUrl if available, or placeholder
  return product.imageUrl || "/placeholder-product.jpg";
}