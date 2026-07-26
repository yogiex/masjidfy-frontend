"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CommentItem } from "./comment-item"

interface Comment {
  id: number
  author: string
  date: string
  content: string
  likes: number
  isAuthor?: boolean
  replies?: Comment[]
}

const dummyComments: Comment[] = [
  {
    id: 1,
    author: "Contoh_Nama_02",
    date: "02 Juni 2026",
    content: "Alhamdulillah, artikel yang sangat bermanfaat. Mohon izin untuk share ustadz.",
    likes: 3,
    replies: [
      {
        id: 2,
        author: "Contoh_Nama_01",
        date: "02 Juni 2026",
        content: "Wa'alaikumsalam, silakan dishare. Jazakallah khair.",
        likes: 1,
        isAuthor: true,
      },
    ],
  },
  {
    id: 3,
    author: "Contoh_Nama_03",
    date: "03 Juni 2026",
    content: "Kapan pendaftaran qurban tahun ini dibuka?",
    likes: 0,
  },
]

export function CommentSection() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">💬 Komentar ({dummyComments.length})</h3>

      <div className="space-y-4">
        {dummyComments.map((comment) => (
          <CommentItem key={comment.id} {...comment}>
            {comment.replies?.map((reply) => (
              <CommentItem key={reply.id} {...reply} />
            ))}
          </CommentItem>
        ))}
      </div>

      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
            A
          </span>
          <span className="font-medium">Contoh_Nama_01</span>
        </div>
        <Textarea placeholder="Tulis komentar..." className="min-h-[80px]" />
        <div className="flex justify-end">
          <Button size="sm">Kirim Komentar</Button>
        </div>
      </div>
    </div>
  )
}
