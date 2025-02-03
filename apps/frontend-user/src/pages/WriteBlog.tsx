"use client"

import RichTextEditor from "@/components/RichTextEditor"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Header } from "@/components/Header"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import axios from "axios"

function extractTextFromHTML(html: any) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  return doc.body.textContent?.trim() || ""
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  post: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5
    },
    {
      message: "The text must be at least 5 characters long after trimming",
    },
  ),
})

const imageformschema = z.object({
  prompt: z.string().min(1, "prompt is required"),
})

export default function Home() {
  const [content, setContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usingaicontent, setusingaicontent] = useState(false)

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      post: "",
    },
  })
  const imageform = useForm({
    mode: "onTouched",
    resolver: zodResolver(imageformschema),
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("blog content: ", data.post)
  }

  const GenerateContent = async () => {
    try {
      console.log("prompt sending to backend is: ", imageform.watch().prompt)
      setIsLoading(true)
      const answer: any = await axios.post("http://localhost:3000/api/image/generate", {
        prompt: imageform.watch().prompt,
      })
      setIsLoading(false)
      console.log(answer)

      if (!answer.data) {
        console.log("no data: ", answer)
      }

      console.log("response from backend is: ", answer.data.data.result.response)
      setContent(answer.data.data.result.response)
    } catch (error) {
      console.log(error)
    }
  }

  const useGeneratedContent = () => {
    if (content) {
      setusingaicontent(true)
      const currentContent = form.getValues("post")
      const newContent = currentContent ? `${currentContent}\n\n${content}` : content
      form.setValue("post", newContent)
     // Clear the generated content after using it
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
              <CardTitle>Generate Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...imageform}>
                <form onSubmit={imageform.handleSubmit(GenerateContent)} className="space-y-4">
                  <FormField
                    control={imageform.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Enter your prompt here to generate content..."
                            className="resize-none text-black placeholder-slate-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate Content"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              {content ? (
                <div className="prose max-w-none">{content}</div>
              ) : (
                <p className="text-gray-500 text-center">No content generated yet.</p>
              )}
            </CardContent>
            {content && (
              <CardFooter>
                <Button onClick={useGeneratedContent} className="w-full">
                  Use Content
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Create Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blog Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your blog title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blog Content</FormLabel>
                        <FormControl>
                          <RichTextEditor content={usingaicontent == true ? content : field.value} onChange={(value: any) => field.onChange(value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit Blog Post</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

