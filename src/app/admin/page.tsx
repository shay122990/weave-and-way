'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

type FabricForm = Omit<Fabric, '_id'>;

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [form, setForm] = useState<FabricForm>({
    name: '',
    title: '',
    category: '',
    description: '',
    image: '',
    color: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    setAuthorized(!!token);
  }, []);

  const fetchFabrics = async () => {
    const res = await fetch('/api/fabrics');
    const data = await res.json();
    setFabrics(data);
  };

  useEffect(() => {
    if (authorized) fetchFabrics();
  }, [authorized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateFabric = async () => {
    const token = localStorage.getItem('admin-token');
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/fabrics/${editingId}` : '/api/fabrics';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: '', title: '', category: '', description: '', image: '', color: '' });
      setEditingId(null);
      fetchFabrics();
    }
  };

  const handleDeleteFabric = async (id: string) => {
    const token = localStorage.getItem('admin-token');
    if (!confirm('Are you sure you want to delete this fabric?')) return;

    const res = await fetch(`/api/fabrics/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchFabrics();
  };

  const handleDeleteAll = async () => {
    const token = localStorage.getItem('admin-token');
    if (!confirm('Delete ALL fabrics?')) return;

    const res = await fetch('/api/fabrics', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchFabrics();
  };

  const handleEdit = (fabric: Fabric) => {
    setEditingId(fabric._id);
    setForm({
      name: fabric.name,
      title: fabric.title,
      category: fabric.category,
      description: fabric.description,
      image: fabric.image || '',
      color: fabric.color || '',
    });
  };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem('admin-token');
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const fabricsFromFile: FabricForm[] = JSON.parse(text);

    for (const fabric of fabricsFromFile) {
        await fetch('/api/fabrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fabric),
        });
    }

    fetchFabrics();
    };


  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/');
  };

  if (authorized === null) return null;

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white  text-black p-6 rounded shadow text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">You are logged out.</h2>
          <p className="mb-4 text-gray-600">Admin access is restricted.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white text-black p-4 rounded shadow space-y-4">
          <h2 className="font-semibold text-lg">{editingId ? 'Edit Fabric' : 'Add Fabric'}</h2>
          <input name="name" placeholder="ex: Silk Essence 1" value={form.name} onChange={handleChange} className="p-2 border rounded w-full" />
          <input name="title" placeholder="ex: Silk Essence #1" value={form.title} onChange={handleChange} className="p-2 border rounded w-full" />
          <input name="category" placeholder="ex: silk" value={form.category} onChange={handleChange} className="p-2 border rounded w-full" />
          <input name="image" placeholder="/fabrics/your-image.jpg" value={form.image} onChange={handleChange} className="p-2 border rounded w-full"/>
          <input name="color" placeholder="ex: white" value={form.color} onChange={handleChange} className="p-2 border rounded w-full" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded w-full" rows={3} />
          <button onClick={handleAddOrUpdateFabric} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            {editingId ? 'Update Fabric' : 'Add Fabric'}
          </button>
          <hr />
          <button onClick={handleDeleteAll} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Delete All Fabrics
          </button>
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Upload all fabric data</p>
            <p className="text-xs text-gray-500 mb-2">Choose a `.json` file formatted with fabric objects</p>
            <input type="file" accept=".json" onChange={handleFileUpload} className="block bg-black text-white p-4 rounded" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white text-black p-4 rounded shadow overflow-y-auto max-h-[80vh]">
          <h2 className="font-semibold text-lg mb-4">Fabrics</h2>
          <ul className="space-y-4">
            {fabrics.map((fabric) => (
              <li key={fabric._id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{fabric.name}</p>
                    <p className="text-sm text-gray-600">{fabric.category} – {fabric.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(fabric)} className="text-blue-500 text-sm hover:underline">Edit</button>
                    <button onClick={() => handleDeleteFabric(fabric._id)} className="text-red-500 text-sm hover:underline">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}