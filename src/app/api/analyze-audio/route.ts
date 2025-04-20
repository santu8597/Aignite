// app/api/analyze-audio/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { systemPrompt } from "./prompt";
const genAI = new GoogleGenerativeAI("AIzaSyAVQpop5MJZpJg2x3DhEfWs4nCFmOQ-Op0");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const question = formData.get("question") as string;

    if (!file || !question) {
      return NextResponse.json({ error: "Missing file or question" }, { status: 400 });
    }

    // Read the file as a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    const result = await model.generateContent({
      contents: [
        {
            role: "user",
            parts: [
              { text: systemPrompt },
            ],
          },
        {
          role: "user",
          parts: [
            { text: question },
            {
              inlineData: {
                mimeType: file.type || "audio/mp3", // Ensure correct MIME type
                data: base64Audio,
              },
            },
          ],
        },
      ],
    });

    const text = result.response.text();
    return NextResponse.json({ result: text });
  } catch (err) {
    console.error("Error analyzing audio:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
