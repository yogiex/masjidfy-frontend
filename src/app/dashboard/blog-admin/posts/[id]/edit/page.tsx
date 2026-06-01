"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Send, Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { WysiwygEditor } from "@/components/shared/wysiwyg-editor"
import { PostMetabox } from "@/components/shared/post-metabox"

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
    status: "published", scheduledAt: "", author: "ahmad",
  },
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugManual, setSlugManual] = useState(false)
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [featuredImage, setFeaturedImage] = useState("")
  const [status, setStatus] = useState("draft")
  const [scheduledAt, setScheduledAt] = useState("")
  const [author, setAuthor] = useState("")
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!id) return
    const data = draftData[id]
    if (data) {
      setTitle(data.title)
      setSlug(data.slug)
      setSlugManual(true)
      setExcerpt(data.excerpt)
      setContent(data.content)
      setCategory(data.category)
      setTags(data.tags)
      setFeaturedImage(data.featuredImage)
      setStatus(data.status)
      setScheduledAt(data.scheduledAt)
      setAuthor(data.author)
    }
    setLoaded(true)
  }, [id])

  function toSlug(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  function handleSave(publish: boolean) {
    setSaving(true)
    const payload = { title, slug: slug || toSlug(title), excerpt, content, category, tags, featuredImage, status: publish ? "published" : "draft", scheduledAt, author }
    setTimeout(() => {
      setSaving(false)
      router.push("/dashboard/blog-admin/posts")
    }, 500)
  }

  if (!loaded) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/blog-admin/posts">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold tracking-tight">Edit Postingan</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={saving} onClick={() => handleSave(false)}>
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
            Simpan Draft
          </Button>
          <Button size="sm" disabled={saving} onClick={() => handleSave(true)}>
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4" />}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!slugManual) setSlug(toSlug(e.target.value))
              }}
              placeholder="Masukkan judul postingan..."
              className="text-lg font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>/blog/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManual(true) }}
                className="h-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="h-20 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Konten</Label>
            <WysiwygEditor content={content} onChange={setContent} placeholder="Mulai menulis konten..." />
          </div>
        </div>

        <div className="rounded-md border p-4">
          <PostMetabox
            category={category}
            onCategoryChange={setCategory}
            tags={tags}
            onTagsChange={setTags}
            featuredImage={featuredImage}
            onFeaturedImageChange={setFeaturedImage}
            status={status}
            onStatusChange={setStatus}
            scheduledAt={scheduledAt}
            onScheduledAtChange={setScheduledAt}
            author={author}
            onAuthorChange={setAuthor}
          />
        </div>
      </div>
    </div>
  )
}
