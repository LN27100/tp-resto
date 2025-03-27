"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import '@/app/styles/global.css';

interface Ingredient {
  name: string;
  quantity: string;
}

interface Step {
  instruction: string;
  ingredients: string;
}

interface AddRecipeModalProps {
  closeModal: () => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ closeModal }) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [time, setTime] = useState(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState<Step[]>([{ instruction: "", ingredients: "" }]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleAddStep = () => {
    setSteps([...steps, { instruction: "", ingredients: "" }]);
  };

  const handleIngredientChange = (index: number, field: "name" | "quantity", value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, field: "instruction" | "ingredients", value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userId = session?.user?.id;
    console.log("User ID:", userId);
  
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
  
    const recipeData = {
      name,
      description,
      difficulty,
      time,
      userId,
      ingredients,
      steps,
    };
  
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
  
      if (response.ok) {
        closeModal();
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'ajout de la recette:", errorData);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };
  
  
  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-50 flex justify-center items-center">
      <div className="border-emerald-600 border bg-gray-700 p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="flex justify-center text-xl font-bubblegum font-bold mb-4">Ajouter une recette</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold text-emerald-500">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-emerald-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-emerald-600">Difficulté (1-5)</label>
            <input
              type="number"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-emerald-600">Temps (en minutes)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-emerald-600">Ingrédients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                  placeholder="Nom"
                  className="w-full px-4 py-2 border rounded mr-2"
                  required
                />
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                  placeholder="Quantité"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="text-emerald-300">
              Ajouter un ingrédient
            </button>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-emerald-600">Étapes</label>
            {steps.map((step, index) => (
              <div key={index} className="mb-2">
                <textarea
                  value={step.instruction}
                  onChange={(e) => handleStepChange(index, "instruction", e.target.value)}
                  placeholder="Instruction"
                  className="w-full px-4 py-2 border rounded mb-2"
                  required
                />
                <input
                  type="text"
                  value={step.ingredients}
                  onChange={(e) => handleStepChange(index, "ingredients", e.target.value)}
                  placeholder="Ingrédients utilisés"
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddStep} className="text-emerald-300">
              Ajouter une étape
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="cursor-pointer bg-gray-300 hover:bg-emerald-200 text-emerald-500 hover:text-red-500 px-4 py-2 rounded mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-emerald-700 hover:bg-emerald-500 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;
