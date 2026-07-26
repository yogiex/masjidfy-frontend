import Link from "next/link"

import { BlogCard } from "@/components/shared/blog-card"

const articles = [
  {
    slug: "keutamaan-berkurban",
    category: "Keislaman",
    title: "Keutamaan Berkurban di Hari Raya",
    excerpt:
      "Qurban adalah ibadah yang sangat dianjurkan dalam Islam. Allah SWT berfirman dalam Al-Qur'an tentang keutamaan berkurban...",
    author: "Contoh_Nama_01",
    date: "01/06/2026",
  },
  {
    slug: "panduan-shalat-idul-adha",
    category: "Ibadah",
    title: "Panduan Shalat Idul Adha",
    excerpt:
      "Shalat Idul Adha merupakan salah satu ibadah yang dilakukan pada hari raya kurban. Berikut tata caranya...",
    author: "Contoh_Nama_02",
    date: "28/05/2026",
  },
  {
    slug: "cara-menghitung-zakat-maal",
    category: "Zakat",
    title: "Cara Menghitung Zakat Maal",
    excerpt:
      "Zakat maal adalah kewajiban bagi setiap muslim yang memiliki harta mencapai nisab. Berikut cara menghitungnya...",
    author: "Contoh_Nama_03",
    date: "20/05/2026",
  },
]

function LatestArticles() {
  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-16">
      <div>
        <div className="mb-8 flex items-center justify-between">
      <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Artikel &amp; Kajian Terbaru
            </h2>
            <p className="mt-1 text-muted-foreground">
              Baca artikel dan kajian Islami pilihan
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-sm font-medium text-primary hover:underline sm:inline-block"
          >
            Lihat Semua &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} {...article} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:underline"
          >
            Lihat Semua &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

export { LatestArticles }
