"use client";

import RichTextEditor from "@/components/RichTextEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Header } from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

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
});

const imageformschema = z.object({
  prompt: z.string().min(1, "prompt is required"),
});

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      post: "",
    },
  });
  const imageform = useForm({
    mode: "onTouched",
    resolver: zodResolver(imageformschema),
    defaultValues: {
      prompt: "Enter the Prompt to generate the image",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const GenerateImage = () => {
    console.log("working!");
  };

  return (
    <>
      <Header />
      <div className="flex justify-between">
        <div className="flex flex-col h-screen">
          <div className="w-full lg:w-[30vw] p-8 overflow-y-auto">
            <Form {...imageform}>
              <form
                onSubmit={imageform.handleSubmit(GenerateImage)}
                className="space-y-6"
              >
                <FormField
                  control={imageform.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="Enter your prompt here to generate an image..."
                          className="resize-none text-black placeholder-slate-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate Image"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex-1 p-8 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Generated Image</h1>
            {imageUrl ? (
              <Card>
                <CardContent className="p-4">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Generated image"
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
            ) : (
              <p className="text-gray-500">
                No image generated yet.
              </p>
            )}
          </div>
        </div>
        <div className="w-[70vw] mx-auto px-24 py-4">
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
                      <RichTextEditor
                        content={field.value}
                        onChange={(value: any) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
