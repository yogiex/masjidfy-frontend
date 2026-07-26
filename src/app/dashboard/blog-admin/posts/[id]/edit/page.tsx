import EditPostForm from "./edit-post-form"

const draftData: Record<string, {
  title: string; slug: string; excerpt: string; content: string
  category: string; tags: string[]; featuredImage: string
  status: string; scheduledAt: string; author: string
}> = {
  "1": {
    title: "Keutamaan Berkurban di Hari Raya",
    slug: "keutamaan-berkurban",
    excerpt: "Artikel ini membahas keutamaan dan hikmah berkurban di hari raya Idul Adha",
    content: "<h2>Keutamaan Berkurban</h2><p>Berkurban merupakan salah satu ibadah yang sangat dianjurkan dalam Islam. Allah SWT berfirman dalam Al-Qur&rsquo;an...</p>",
    category: "keislaman", tags: ["qurban", "ibadah"], featuredImage: "",
    status: "published", scheduledAt: "",     author: "contoh_author_01",
  },
}

export function generateStaticParams() {
  return Object.keys(draftData).map((id) => ({ id }))
}

export default function EditPostPage() {
  return <EditPostForm draftData={draftData} />
}
