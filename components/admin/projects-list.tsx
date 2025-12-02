"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export default function ProjectsList({ projects, onUpdate }: { projects: any[]; onUpdate?: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      alert("Error deleting project")
      return
    }

    onUpdate?.()
  }

  const handleEdit = (project: any) => {
    setEditingId(project.id)
    setEditData(project)
  }

  const handleUpdate = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("projects")
      .update({
        title: editData.title,
        description: editData.description,
        image_url: editData.image_url,
        status: editData.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      alert("Error updating project")
      return
    }

    setEditingId(null)
    onUpdate?.()
  }

  if (projects.length === 0) {
    return <p className="text-gray-500">No projects yet.</p>
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
          {editingId === project.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                rows={3}
              />
              <input
                type="text"
                value={editData.image_url || ""}
                onChange={(e) => setEditData({ ...editData, image_url: e.target.value })}
                placeholder="Image URL"
                className="w-full px-3 py-2 border rounded"
              />
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="planned">Planned</option>
              </select>
              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(project.id)} size="sm" className="bg-teal-600">
                  Save
                </Button>
                <Button onClick={() => setEditingId(null)} size="sm" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-gray-600 mt-1">{project.description}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-teal-100 text-teal-700 rounded text-sm">
                {project.status}
              </span>
              <div className="flex gap-2 mt-3">
                <Button onClick={() => handleEdit(project)} size="sm" variant="outline">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(project.id)} size="sm" variant="outline" className="text-red-600">
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
