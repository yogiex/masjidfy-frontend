// ===================== Auth =====================
export interface LoginRequest {
  username: string; // username atau email
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthMeResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: {
    role: {
      id: string;
      name: string;
    };
  }[];
}

// ===================== User =====================
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone?: string | null;
  address?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  roles: { role: { id: string; name: string } }[];
}

export interface UserListItem {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string | null;
  isActive: boolean;
  createdAt: string;
}

// ===================== Role & Permission =====================
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    permission: {
      id: string;
      name: string;
    };
  }[];
  _count: { users: number };
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  createdAt: string;
}

// ===================== Qurban =====================
export interface QurbanRegistration {
  id: string;
  participant_name: string;
  group_name?: string | null;
  contact_phone: string;
  animal_type: 'cow' | 'goat';
  amount: number;
  method: 'cash' | 'transfer';
  status: 'pending' | 'verified' | 'cancelled';
  created_at: string;
  payment?: QurbanPayment;
}

export interface Animal {
  id: string;
  type: 'cow' | 'goat';
  estimated_weight: number;
  price: number;
  source: 'donation' | 'self_funded';
  slaughter_date?: string | null;
  slaughter_location?: string | null;
}

export interface QurbanPayment {
  id: string;
  amount: number;
  method: 'cash' | 'transfer';
  status: 'dp' | 'lunas';
  payment_date: string;
}

export interface QurbanDistribution {
  id: string;
  recipient_name: string;
  coupon_count: number;
  distribution_date: string;
}

// ===================== Zakat =====================
export interface ZakatTransaction {
  id: string;
  type: 'zakat_fitrah' | 'zakat_maal' | 'infaq' | 'sedekah' | 'fidyah';
  amount: number;
  transactionDate: string;
  method: 'cash' | 'transfer';
  muzakkiId?: string | null;
  recordedById: string;
  notes?: string | null;
  createdAt: string;
  muzakki?: Muzakki | null;
  recordedBy?: { id: string; username: string };
}

export interface Muzakki {
  id: string;
  name: string;
  phone?: string | null;
  address?: string | null;
  isAnonymous: boolean;
  createdAt: string;
}

export interface Mustahiq {
  id: string;
  name: string;
  asnaf_category: 'fakir' | 'miskin' | 'amil' | 'muallaf' | 'riqab' | 'gharimin' | 'fi_sabilillah' | 'ibnu_sabil';
  verified: boolean;
}

export interface ZakatDistribution {
  id: string;
  amount: number;
  distribution_date: string;
  mustahiqId: string;
  mustahiq?: Mustahiq;
}

export interface ZakatCalculatorRequest {
  gold_grams: number;
  silver_grams: number;
  cash_idr: number;
  trade_goods_idr: number;
  receivables_idr: number;
  debts_idr: number;
}

export interface ZakatCalculatorResponse {
  nisab_idr: number;
  total_assets: number;
  total_debts: number;
  net_assets: number;
  zakat_due: number;
  is_obliged: boolean;
  calculation_date: string;
}

// ===================== Blog =====================
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featured_image_url?: string | null;
  status: 'draft' | 'published' | 'archived';
  category?: Category | null;
  tags: Tag[];
  author: { full_name: string };
  published_at?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  is_approved: boolean;
  user: { full_name: string };
  replies?: Comment[];
  created_at: string;
}

// ===================== Pagination =====================
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
}

export interface DeleteResponse {
  deleted: boolean;
}