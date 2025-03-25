import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, FileText, Image, Check, AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100),
  contentType: z.string(),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  authorName: z.string().min(2, { message: "Author name is required" }),
  branch: z.string(),
  attachments: z.any().optional(),
});

interface ContentUploadFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  branches?: { id: string; name: string }[];
  isSubmitting?: boolean;
}

const ContentUploadForm = ({
  onSubmit = () => {},
  branches = [
    { id: "1", name: "Harare Central" },
    { id: "2", name: "Bulawayo" },
    { id: "3", name: "Mutare" },
    { id: "4", name: "Gweru" },
    { id: "5", name: "London" },
    { id: "6", name: "Johannesburg" },
  ],
  isSubmitting = false,
}: ContentUploadFormProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contentType: "article",
      content: "",
      authorName: "",
      branch: "",
      attachments: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Simulate form submission
    setSubmitStatus("success");
    onSubmit({ ...data, attachments: uploadedFiles });

    // In a real implementation, you would handle the file upload here
    // and reset the form after successful submission
    setTimeout(() => {
      setSubmitStatus("idle");
      form.reset();
      setUploadedFiles([]);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-md border border-border">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Annual Magazine Content Submission
        </h2>
        <p className="text-muted-foreground">
          Share your testimonies, articles, and creative works for the Guta Ra
          Mwari annual magazine
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700">
          <Check className="h-5 w-5" />
          <p>
            Your content has been submitted successfully! Thank you for your
            contribution.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>There was an error submitting your content. Please try again.</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title of your content"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your submission a meaningful title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="testimony">Testimony</SelectItem>
                      <SelectItem value="poem">Poem</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="artwork">Artwork</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    What type of content are you submitting?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your content here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Share your testimony, article, poem, or other written content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name as it should appear"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>How you want to be credited</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Your church branch</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="file-upload">
                Attachments (Optional)
              </FormLabel>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md">
                <div className="space-y-2 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                    >
                      <span>Upload files</span>
                      <Input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, PDF up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center">
                        {file.type.includes("image") ? (
                          <Image className="h-5 w-5 mr-2 text-muted-foreground" />
                        ) : (
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        )}
                        <span className="text-sm truncate max-w-[250px]">
                          {file.name}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Content"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContentUploadForm;
