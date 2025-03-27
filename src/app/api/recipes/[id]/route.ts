import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const recipeId = params.id;
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recette non trouvée" }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
