'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Fabric = {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
};

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

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    setAuthorized(!!token);
  }, []);

  const fetchFabrics = async () => {
    try {
      const res = await fetch('/api/fabrics');
      const data = await res.json();
      setFabrics(data);
    } catch (error) {
      console.error('Failed to fetch fabrics:', error);
    }
  };

  useEffect(() => {
    if (authorized) fetchFabrics();
  }, [authorized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFabric = async () => {
    const token = localStorage.getItem('admin-token');
    const res = await fetch('/api/fabrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        name: '',
        title: '',
        category: '',
        description: '',
        image: '',
        color: '',
      });
      fetchFabrics();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/');
  };

  if (authorized === null) return null;

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4 text-black">You are logged out.</h2>
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
        <div className="lg:col-span-1 bg-white text-black p-4 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Add New Fabric</h2>
          <div className="grid grid-cols-1 gap-3">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded" />
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="p-2 border rounded" />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-2 border rounded" />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-2 border rounded" />
            <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded" rows={3} />
            <button onClick={handleAddFabric} className="bg-black text-white py-2 rounded hover:bg-gray-800">
              Add Fabric
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white  text-black p-4 rounded shadow overflow-y-auto max-h-[80vh]">
          <h2 className="font-semibold text-lg mb-4">Fabrics</h2>
          <ul className="space-y-4">
            {fabrics.map((fabric) => (
              <li key={fabric._id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{fabric.name}</p>
                    <p className="text-sm text-gray-600">
                      {fabric.category} – {fabric.description}
                    </p>
                  </div>
                  <button className="text-sm text-red-500 hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
