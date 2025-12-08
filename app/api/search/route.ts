import { NextResponse } from "next/server"
import search from "@/utils/tmdb/search"

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const q = searchParams.get("q")?.trim()

	if (!q) return NextResponse.json([])

	const results = await search(q)
	return NextResponse.json(results)
}
