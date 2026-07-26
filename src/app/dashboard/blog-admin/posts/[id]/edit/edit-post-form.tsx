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

interface DraftData {
  title: string; slug: string; excerpt: string; content: string
  category: string; tags: string[]; featuredImage: string
  status: string; scheduledAt: string; author: string
}

export default function EditPostForm({ draftData }: { draftData: Record<string, DraftData> }) {
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
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const data = draftData[id]
    if (data) {
      setTitle(data.title); setSlug(data.slug); setExcerpt(data.excerpt)
      setContent(data.content); setCategory(data.category); setTags(data.tags)
      setFeaturedImage(data.featuredImage); setStatus(data.status)
      setScheduledAt(data.scheduledAt); setAuthor(data.author)
    }
  }, [id, draftData])

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugManual) setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))
  }

  async function handleSave() {
    setSaving(true); setSaved(false)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handlePublish() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    router.push("/dashboard/blog-admin/posts")
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/blog-admin/posts"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-xl font-bold tracking-tight">Edit Postingan</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
            {saving ? "Menyimpan..." : saved ? "Tersimpan" : "Simpan"}
          </Button>
          <Button size="sm" onClick={handlePublish} disabled={saving}>
            {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4" />}
            Publikasikan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Masukkan judul artikel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true) }} placeholder="slug-artikel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Kutipan</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Tulis kutipan singkat artikel..." />
          </div>

          <div className="space-y-2">
            <Label>Konten</Label>
            <WysiwygEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <PostMetabox
            category={category} onCategoryChange={setCategory}
            tags={tags} onTagsChange={setTags}
            featuredImage={featuredImage} onFeaturedImageChange={setFeaturedImage}
            author={author} onAuthorChange={setAuthor}
            status={status} onStatusChange={setStatus}
            scheduledAt={scheduledAt} onScheduledAtChange={setScheduledAt}
          />
        </div>
      </div>
    </div>
  )
}
