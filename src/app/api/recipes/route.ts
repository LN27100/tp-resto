import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";

export async function POST(req: Request) {
  try {
    const { name, description, difficulty, time, userId, ingredients, steps } = await req.json();

    const userStringId = userId.toString();

    if (!name || !description || !difficulty || !time || !userStringId || !ingredients || !steps) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 });
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        difficulty,
        time,
        userId: userStringId, 
        ingredients: { create: ingredients },
        steps: { create: steps },
      },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: true,
        steps: true,
      },
    });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

