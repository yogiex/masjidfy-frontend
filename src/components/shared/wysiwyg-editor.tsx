"use client"

import { useCallback } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import ImageExtension from "@tiptap/extension-image"
import LinkExtension from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code,
  Image, Link, Table as TableIcon,
  Undo, Redo,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"

interface WysiwygEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function MenuButton({ editor, icon: Icon, action, isActive, title }: {
  editor: Editor
  icon: React.ElementType
  action: () => void
  isActive: () => boolean
  title: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={(e) => { e.preventDefault(); action() }}
      className={`rounded p-1 hover:bg-accent ${isActive() ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function Divider() {
  return <Separator orientation="vertical" className="mx-1 h-5" />
}

export function WysiwygEditor({ content, onChange, placeholder = "Mulai menulis..." }: WysiwygEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      ImageExtension.configure({ inline: false }),
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[400px] px-4 py-3",
      },
    },
  })

  const addImage = useCallback(() => {
    const url = window.prompt("Masukkan URL gambar:")
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    const url = window.prompt("Masukkan URL link:")
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/30 px-2 py-1.5">
        <MenuButton editor={editor} icon={Bold} action={() => editor.chain().focus().toggleBold().run()} isActive={() => editor.isActive("bold")} title="Bold" />
        <MenuButton editor={editor} icon={Italic} action={() => editor.chain().focus().toggleItalic().run()} isActive={() => editor.isActive("italic")} title="Italic" />
        <MenuButton editor={editor} icon={UnderlineIcon} action={() => editor.chain().focus().toggleUnderline().run()} isActive={() => editor.isActive("underline")} title="Underline" />
        <MenuButton editor={editor} icon={Strikethrough} action={() => editor.chain().focus().toggleStrike().run()} isActive={() => editor.isActive("strike")} title="Strikethrough" />
        <Divider />
        <MenuButton editor={editor} icon={Heading1} action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={() => editor.isActive("heading", { level: 1 })} title="Heading 1" />
        <MenuButton editor={editor} icon={Heading2} action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={() => editor.isActive("heading", { level: 2 })} title="Heading 2" />
        <MenuButton editor={editor} icon={Heading3} action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={() => editor.isActive("heading", { level: 3 })} title="Heading 3" />
        <Divider />
        <MenuButton editor={editor} icon={List} action={() => editor.chain().focus().toggleBulletList().run()} isActive={() => editor.isActive("bulletList")} title="Bullet List" />
        <MenuButton editor={editor} icon={ListOrdered} action={() => editor.chain().focus().toggleOrderedList().run()} isActive={() => editor.isActive("orderedList")} title="Ordered List" />
        <MenuButton editor={editor} icon={Quote} action={() => editor.chain().focus().toggleBlockquote().run()} isActive={() => editor.isActive("blockquote")} title="Quote" />
        <MenuButton editor={editor} icon={Code} action={() => editor.chain().focus().toggleCodeBlock().run()} isActive={() => editor.isActive("codeBlock")} title="Code Block" />
        <Divider />
        <MenuButton editor={editor} icon={Image} action={addImage} isActive={() => false} title="Insert Image" />
        <MenuButton editor={editor} icon={Link} action={addLink} isActive={() => editor.isActive("link")} title="Insert Link" />
        <MenuButton editor={editor} icon={TableIcon} action={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} isActive={() => editor.isActive("table")} title="Insert Table" />
        <Divider />
        <MenuButton editor={editor} icon={Undo} action={() => editor.chain().focus().undo().run()} isActive={() => false} title="Undo" />
        <MenuButton editor={editor} icon={Redo} action={() => editor.chain().focus().redo().run()} isActive={() => false} title="Redo" />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
