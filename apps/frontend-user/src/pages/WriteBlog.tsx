"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Wand2, PenLine, Sparkles, Send } from "lucide-react";
import toast from "react-hot-toast";

function extractTextFromHTML(html: any) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  post: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: "The text must be at least 5 characters long after trimming",
    }
  ),
  thumbnail: z.string(),
});

const imageformschema = z.object({
  prompt: z.string().min(1, "prompt is required"),
});

export default function BlogEditor() {
  const [content, setContent] = useState<string | null>(null);
  const [contentOnEditor, setContentOnEditor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      post: "",
      thumbnail: "",
    },
  });

  const imageform = useForm({
    mode: "onTouched",
    resolver: zodResolver(imageformschema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("blog content: ", data.post);
  };

  const GenerateContent = async () => {
    try {
      setIsLoading(true);
      const answer: any = await axios.post(
        "http://localhost:3000/api/image/generate",
        {
          prompt: imageform.watch().prompt,
        }
      );

      if (answer.data?.data?.result?.response) {
        setContent(answer.data.data.result.response);
        setContentOnEditor(answer.data.data.result.response);
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const useGeneratedContent = () => {
    console.log("content on editor is: ", contentOnEditor);

    if (contentOnEditor) {
      navigator.clipboard.writeText(contentOnEditor);
      console.log("content copied");

      toast.success("content copied!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <PenLine className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Create Your Blog Post
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Write engaging content with the help of AI or craft your story from
            scratch
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Content Generator */}
          <Card className="col-span-1 lg:col-span-1 border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                AI Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Let AI help you generate content ideas
              </p>
            </CardHeader>
            <CardContent>
              <Form {...imageform}>
                <form
                  onSubmit={imageform.handleSubmit(GenerateContent)}
                  className="space-y-4"
                >
                  <FormField
                    control={imageform.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Describe what you'd like to write about..."
                            className="resize-none text-black placeholder-slate-400 border-gray-200 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isLoading}
                  >
                    <Sparkles className="w-4 h-4" />
                    {isLoading ? "Generating..." : "Generate Content"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Generated Content Preview */}
          <Card className="col-span-1 lg:col-span-2 border-0 shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Generated Content</CardTitle>
              <p className="text-sm text-muted-foreground">
                Preview and use the generated content in your blog
              </p>
            </CardHeader>
            <CardContent>
              {content ? (
                <div className="prose max-w-none bg-white p-6 rounded-lg border border-gray-100">
                  {content}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Generated content will appear here
                  </p>
                </div>
              )}
            </CardContent>
            {content && (
              <CardFooter>
                <Button
                  onClick={useGeneratedContent}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4" />
                  Copy Content
                </Button>
              </CardFooter>
            )}
          </Card>

          {/* Blog Editor */}
          <Card className="col-span-1 lg:col-span-3 border-0 shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <PenLine className="w-5 h-5 text-primary" />
                Write Your Blog
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Craft your story with our rich text editor
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Thumbnail Image
                        </FormLabel>
                        <FormControl>
                          <button className="ml-3 bg-gradient-to-tr from-black to-blue-500 text-transparent bg-clip-text font-semibold">
                            Upload
                          </button>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Blog Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter an engaging title for your blog"
                            className="text-lg py-6 border-gray-200 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="post"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Blog Content
                        </FormLabel>
                        <FormControl>
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <RichTextEditor
                              content={contentOnEditor}
                              onChange={(value: string) => {
                                setContentOnEditor(value); // Update local state
                                field.onChange(value); // Update react-hook-form state
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="gap-2">
                    <Send className="w-4 h-4" />
                    Publish Blog Post
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
