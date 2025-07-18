import { NextResponse } from "next/server";
import tasks from "@/data/tasks.json"

export async function GET() {
  return NextResponse.json(tasks);
}