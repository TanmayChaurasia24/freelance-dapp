import { Request, Response } from "express";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

export async function completeWithAI(req: Request, res: Response): Promise<any> {
  const { prompt }: any = req.body;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if(!prompt) {
      res.status(300).json({
        message: "prompt not received properly"
      })
    }
  
    console.log("your prompt is: ", prompt);
  
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    res.status(201).json({
      success: true,
      message: "AI generated text successfully",
      data: result.response.text
    })
  } catch(error: any){

  }

}
