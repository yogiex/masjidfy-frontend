import Link from "next/link"
import { ArrowLeft, User, Calendar, Eye } from "lucide-react"

import { BlogCard } from "@/components/shared/blog-card"
import { ShareButtons } from "@/components/shared/share-buttons"
import { CommentSection } from "../_components/comment-section"

const articleData: Record<string, {
  title: string; category: string; author: string; date: string; reads: number
  image?: string; content: string; tags: string[]
}> = {
  "keutamaan-berkurban": {
    title: "Keutamaan Berkurban di Hari Raya",
    category: "Keislaman",
    author: "Ahmad Fauzi",
    date: "01 Juni 2026",
    reads: 234,
    content: `
      <h2>Keutamaan Berkurban</h2>
      <p>Berkurban merupakan salah satu ibadah yang sangat dianjurkan dalam Islam. Allah SWT berfirman dalam QS. Al-Kautsar ayat 1-2: "Sesungguhnya Kami telah memberikan kepadamu nikmat yang banyak. Maka dirikanlah shalat karena Tuhanmu dan berkurbanlah."</p>
      <p>Berkurban memiliki banyak keutamaan, di antaranya:</p>
      <ol>
        <li>Mendekatkan diri kepada Allah SWT</li>
        <li>Meneladani Nabi Ibrahim AS yang rela mengorbankan putranya</li>
        <li>Berbagi kebahagiaan dengan sesama, terutama fakir miskin</li>
        <li>Menjadi sarana penghapus dosa</li>
      </ol>
      <h2>Hukum Berkurban</h2>
      <p>Hukum berkurban adalah sunnah muakkad (sangat dianjurkan) bagi muslim yang mampu. Para ulama sepakat bahwa berkurban merupakan salah satu syiar Islam yang agung.</p>
      <h2>Waktu Pelaksanaan</h2>
      <p>Penyembelihan hewan kurban dilaksanakan setelah shalat Idul Adha pada tanggal 10 Dzulhijjah hingga akhir hari Tasyrik (13 Dzulhijjah).</p>
    `,
    tags: ["Qurban", "Ibadah", "Idul Adha"],
  },
  "panduan-shalat-idul-adha": {
    title: "Panduan Shalat Idul Adha",
    category: "Ibadah",
    author: "Budi Santoso",
    date: "28 Mei 2026",
    reads: 189,
    content: "<h2>Tata Cara Shalat Idul Adha</h2><p>Shalat Idul Adha dikerjakan pada pagi hari tanggal 10 Dzulhijjah. Berikut tata caranya...</p>",
    tags: ["Shalat", "Ibadah", "Idul Adha"],
  },
  "cara-menghitung-zakat-maal": {
    title: "Cara Menghitung Zakat Maal",
    category: "Zakat",
    author: "Citra Dewi",
    date: "20 Mei 2026",
    reads: 156,
    content: "<h2>Zakat Maal</h2><p>Zakat maal adalah zakat yang dikeluarkan dari harta yang dimiliki. Nisab zakat maal setara dengan 85 gram emas...</p>",
    tags: ["Zakat", "Harta"],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articleData[slug]
  if (!article) return { title: "Artikel Tidak Ditemukan - Masjidfy" }
  return { title: `${article.title} - Masjidfy`, description: article.content.replace(/<[^>]*>/g, "").slice(0, 160) }
}

const relatedArticles = [
  { slug: "panduan-zakat-fitrah", category: "Zakat", title: "Panduan Zakat Fitrah", excerpt: "Zakat fitrah wajib dikeluarkan setiap muslim...", author: "Budi Santoso", date: "05/05/2026" },
  { slug: "keistimewaan-bulan-ramadhan", category: "Keislaman", title: "Keistimewaan Bulan Ramadhan", excerpt: "Bulan Ramadhan adalah bulan yang penuh berkah...", author: "Ahmad Fauzi", date: "10/05/2026" },
  { slug: "hikmah-ibadah-haji", category: "Keislaman", title: "Hikmah Ibadah Haji bagi Umat Islam", excerpt: "Haji merupakan rukun Islam kelima...", author: "Deni Pratama", date: "15/05/2026" },
]

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articleData[slug]

  if (!article) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Artikel Tidak Ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Artikel yang Anda cari tidak tersedia.</p>
        <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
        </Link>
      </div>
    )
  }

  const url = `${process.env.NEXT_PUBLIC_URL || "https://masjidfy.app"}/blog/${slug}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/blog" className="hover:text-foreground">Blog</Link>
        <span className="mx-2">›</span>
        <span>{article.category}</span>
        <span className="mx-2">›</span>
        <span className="text-foreground">{article.title}</span>
      </div>

      <article className="mx-auto max-w-3xl">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            {article.category}
          </span>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {article.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {article.reads} kali dibaca</span>
          </div>

          <ShareButtons url={url} title={article.title} />
        </div>

        <div
          className="mt-8 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        <hr className="my-10" />

        <CommentSection />

        <hr className="my-10" />

        <div className="space-y-4">
          <h3 className="font-semibold">Artikel Terkait</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <BlogCard key={a.slug} {...a} />
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
