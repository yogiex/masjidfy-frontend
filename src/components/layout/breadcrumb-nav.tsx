"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const labelMap: Record<string, string> = {
  dashboard: "Beranda",
  qurban: "Qurban",
  registrations: "Pendaftaran",
  "my-registrations": "Pendaftaran Saya",
  animals: "Hewan",
  payments: "Pembayaran",
  distributions: "Penyaluran",
  zakat: "Zakat",
  transactions: "Transaksi",
  muzakkis: "Muzakki",
  mustahiqs: "Mustahiq",
  reports: "Laporan",
  "blog-admin": "Blog",
  posts: "Postingan",
  categories: "Kategori",
  tags: "Tag",
  comments: "Komentar",
  users: "Pengguna",
  roles: "Role",
  permissions: "Permission",
  profil: "Profil",
  new: "Tambah",
  edit: "Edit",
};

function getLabel(segment: string): string {
  return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const filtered = segments.filter((s) => !s.startsWith("(") && !s.endsWith(")"));

  if (filtered.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filtered.map((segment, index) => {
          const href = "/" + filtered.slice(0, index + 1).join("/");
          const isLast = index === filtered.length - 1;
          const label = getLabel(segment);

          return (
            <Fragment key={segment}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
