import React, { useState, useEffect } from "react";
import axios from "axios";

interface Superhero {
  id: string;
  name: string;
  superpower: string;
  humilityScore: number;
}

export default function App() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [form, setForm] = useState({ name: "", superpower: "", humilityScore: "" });

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/superheroes");
      setSuperheroes(response.data.data);
    } catch (error) {
      console.error("Error fetching superheroes", error);
    }
  };

  const addSuperhero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/superheroes", {
        name: form.name,
        superpower: form.superpower,
        humilityScore: Number(form.humilityScore),
      });
      setForm({ name: "", superpower: "", humilityScore: "" });
      fetchSuperheroes();
    } catch (error) {
      console.error("Error adding superhero", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Humble Superheroes</h1>
      <form onSubmit={addSuperhero} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded w-1/3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Superpower"
          className="border p-2 rounded w-1/3"
          value={form.superpower}
          onChange={(e) => setForm({ ...form, superpower: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Humility (1-10)"
          className="border p-2 rounded w-1/6"
          value={form.humilityScore}
          onChange={(e) => setForm({ ...form, humilityScore: e.target.value })}
          min="1"
          max="10"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul className="border rounded p-4">
        {superheroes.map((hero) => (
          <li key={hero.id} className="p-2 border-b last:border-0">
            <span className="font-bold">{hero.name}</span> - {hero.superpower} (Humility: {hero.humilityScore})
          </li>
        ))}
      </ul>
    </div>
  );
}
