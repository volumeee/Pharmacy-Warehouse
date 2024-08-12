import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET all medicines
export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany();
    return NextResponse.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return NextResponse.json(
      { error: "Failed to fetch medicines" },
      { status: 500 }
    );
  }
}

// POST (Create) a new medicine
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const medicine = await prisma.medicine.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity,
        minStock: body.minStock,
        reorderLevel: body.reorderLevel,
        supplierId: body.supplierId, // Use supplierId instead of supplier
      },
    });

    return NextResponse.json(medicine);
  } catch (error) {
    console.error("Error creating medicine:", error);
    return NextResponse.json(
      { error: "Failed to create medicine" },
      { status: 500 }
    );
  }
}

// PUT (Update) an existing medicine
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const medicine = await prisma.medicine.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity,
        minStock: body.minStock,
        reorderLevel: body.reorderLevel,
        supplierId: body.supplierId, // Use supplierId instead of supplier
      },
    });

    return NextResponse.json(medicine);
  } catch (error) {
    console.error("Error updating medicine:", error);
    return NextResponse.json(
      { error: "Failed to update medicine" },
      { status: 500 }
    );
  }
}

// DELETE a medicine by ID
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.medicine.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return NextResponse.json(
      { error: "Failed to delete medicine" },
      { status: 500 }
    );
  }
}
