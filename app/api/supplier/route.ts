import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET all suppliers
export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany(); // Fetch all suppliers
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}

// POST (Create) a new supplier
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supplier = await prisma.supplier.create({
      data: {
        name: body.name,
        contactInfo: body.contactInfo,
        terms: body.terms,
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 }
    );
  }
}

// PUT (Update) an existing supplier
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supplier = await prisma.supplier.update({
      where: { id: body.id },
      data: {
        name: body.name,
        contactInfo: body.contactInfo,
        terms: body.terms,
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { error: "Failed to update supplier" },
      { status: 500 }
    );
  }
}

// DELETE a supplier by ID
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.supplier.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { error: "Failed to delete supplier" },
      { status: 500 }
    );
  }
}
