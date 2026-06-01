import { BlogCard } from "@/components/shared/blog-card"

const articles = [
  { slug: "keutamaan-berkurban", category: "Keislaman", title: "Keutamaan Berkurban di Hari Raya", excerpt: "Qurban adalah ibadah yang sangat dianjurkan dalam Islam. Allah SWT berfirman dalam Al-Qur'an tentang keutamaan berkurban...", author: "Ahmad Fauzi", date: "01/06/2026" },
  { slug: "panduan-shalat-idul-adha", category: "Ibadah", title: "Panduan Shalat Idul Adha", excerpt: "Shalat Idul Adha merupakan salah satu ibadah yang dilakukan pada hari raya kurban. Berikut tata caranya...", author: "Budi Santoso", date: "28/05/2026" },
  { slug: "cara-menghitung-zakat-maal", category: "Zakat", title: "Cara Menghitung Zakat Maal", excerpt: "Zakat maal adalah kewajiban bagi setiap muslim yang memiliki harta mencapai nisab. Berikut cara menghitungnya...", author: "Citra Dewi", date: "20/05/2026" },
  { slug: "hikmah-ibadah-haji", category: "Keislaman", title: "Hikmah Ibadah Haji bagi Umat Islam", excerpt: "Haji merupakan rukun Islam kelima yang wajib dilaksanakan bagi yang mampu. Banyak hikmah yang bisa dipetik...", author: "Deni Pratama", date: "15/05/2026" },
  { slug: "keistimewaan-bulan-ramadhan", category: "Keislaman", title: "Keistimewaan Bulan Ramadhan", excerpt: "Bulan Ramadhan adalah bulan yang penuh berkah. Di dalamnya terdapat malam Lailatul Qadar yang lebih baik dari seribu bulan...", author: "Ahmad Fauzi", date: "10/05/2026" },
  { slug: "panduan-zakat-fitrah", category: "Zakat", title: "Panduan Zakat Fitrah", excerpt: "Zakat fitrah wajib dikeluarkan setiap muslim menjelang Idul Fitri. Berikut panduan lengkapnya...", author: "Budi Santoso", date: "05/05/2026" },
  { slug: "doa-doa-dzulhijjah", category: "Ibadah", title: "Doa-doa Mustajab di Bulan Dzulhijjah", excerpt: "Bulan Dzulhijjah memiliki banyak keutamaan. Berikut doa-doa yang mustajab diamalkan di bulan ini...", author: "Citra Dewi", date: "28/04/2026" },
  { slug: "pentingnya-silaturahmi", category: "Keislaman", title: "Pentingnya Silaturahmi dalam Islam", excerpt: "Silaturahmi merupakan amalan yang sangat dianjurkan dalam Islam. Rasulullah SAW bersabda tentang keutamaan menyambung tali silaturahmi...", author: "Deni Pratama", date: "20/04/2026" },
  { slug: "tips-menjaga-kekhusyukan-shalat", category: "Ibadah", title: "Tips Menjaga Kekhusyukan Shalat", excerpt: "Shalat yang khusyuk adalah dambaan setiap muslim. Berikut tips-tips praktis untuk menjaga kekhusyukan dalam shalat...", author: "Ahmad Fauzi", date: "15/04/2026" },
]

export const metadata = {
  title: "Blog - Masjidfy",
  description: "Artikel dan kajian Islami untuk menambah wawasan dan keimanan",
}

export default function BlogListPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center sm:p-12">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          📰 Artikel &amp; Kajian Islami
        </h1>
        <p className="mt-2 text-muted-foreground">
          Membaca, memahami, dan mengamalkan ajaran Islam
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article.slug} {...article} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span className="rounded-md border px-3 py-1.5 font-medium text-foreground bg-accent">1</span>
        <span className="rounded-md border px-3 py-1.5 hover:bg-accent cursor-pointer">2</span>
        <span className="rounded-md border px-3 py-1.5 hover:bg-accent cursor-pointer">3</span>
        <span className="text-muted-foreground/50">...</span>
        <span className="rounded-md border px-3 py-1.5 hover:bg-accent cursor-pointer">5</span>
      </div>
    </div>
  )
}
