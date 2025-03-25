import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Check,
  Edit,
  Eye,
  FileText,
  Search,
  Trash2,
  Upload,
} from "lucide-react";

interface SubmissionItem {
  id: string;
  title: string;
  author: string;
  branch: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  content: string;
}

interface MagazineSection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
}

const MagazineAdministration = ({
  submissions = mockSubmissions,
  sections = mockSections,
  isPublishing = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionItem | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(true); // Default to open for demo purposes

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.branch.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleViewSubmission = (submission: SubmissionItem) => {
    setSelectedSubmission(submission);
    setViewDialogOpen(true);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Magazine Administration</h1>
          <p className="text-muted-foreground">
            Organize, review, and publish the annual magazine content
          </p>
        </div>
        <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              Publish Magazine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish Annual Magazine</DialogTitle>
              <DialogDescription>
                This will finalize the magazine and make it available to all
                church members. Are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="magazineTitle" className="text-right">
                  Magazine Title
                </label>
                <Input
                  id="magazineTitle"
                  defaultValue="Guta Ra Mwari 2023 Annual"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="publishDate" className="text-right">
                  Publish Date
                </label>
                <Input
                  id="publishDate"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPublishDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish Now"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="submissions">
        <TabsList className="mb-6">
          <TabsTrigger value="submissions">Content Submissions</TabsTrigger>
          <TabsTrigger value="organization">Magazine Organization</TabsTrigger>
          <TabsTrigger value="preview">Magazine Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-1/3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="harare">Harare</SelectItem>
                  <SelectItem value="bulawayo">Bulawayo</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="johannesburg">Johannesburg</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {submission.title}
                    </CardTitle>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${submission.status === "approved" ? "bg-green-100 text-green-800" : submission.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {submission.status.charAt(0).toUpperCase() +
                        submission.status.slice(1)}
                    </div>
                  </div>
                  <CardDescription>
                    By {submission.author} from {submission.branch} Branch
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{submission.type}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Submitted on{" "}
                    {new Date(submission.submittedDate).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewSubmission(submission)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Magazine Sections</h2>
            <Button>
              <Upload className="h-4 w-4 mr-2" /> Add New Section
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {section.itemCount} items
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View Items
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Edit Section
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="bg-muted p-8 rounded-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Magazine Preview</h2>
            <div className="w-full max-w-3xl aspect-[3/4] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-8">
              <div className="w-full h-full border-2 border-dashed border-muted-foreground rounded-md flex flex-col items-center justify-center p-6">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold text-center">
                  Guta Ra Mwari Annual Magazine 2023
                </h3>
                <p className="text-muted-foreground text-center mt-2">
                  Preview will be available once content organization is
                  complete
                </p>
                <Button className="mt-6">Generate Preview</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Submission Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedSubmission?.title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedSubmission?.author} from{" "}
              {selectedSubmission?.branch} Branch
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 border rounded-md p-4 max-h-[400px] overflow-y-auto">
            <p className="whitespace-pre-line">{selectedSubmission?.content}</p>
          </div>
          <DialogFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-amber-600 border-amber-600"
              >
                Request Revisions
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Approve Submission
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock data
const mockSubmissions: SubmissionItem[] = [
  {
    id: "1",
    title: "The Power of Faith in Modern Times",
    author: "Pastor Chiweshe",
    branch: "Harare",
    type: "Article",
    status: "approved",
    submittedDate: "2023-05-15",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\nNullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  },
  {
    id: "2",
    title: "Youth Ministry Success Stories",
    author: "Sister Mavis",
    branch: "Bulawayo",
    type: "Testimony",
    status: "pending",
    submittedDate: "2023-06-02",
    content:
      "Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  },
  {
    id: "3",
    title: "Building Strong Families Through Prayer",
    author: "Elder Moyo",
    branch: "London",
    type: "Article",
    status: "rejected",
    submittedDate: "2023-05-28",
    content:
      "Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  },
  {
    id: "4",
    title: "My Journey to Salvation",
    author: "Brother Takunda",
    branch: "Johannesburg",
    type: "Testimony",
    status: "approved",
    submittedDate: "2023-06-10",
    content:
      "Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  },
  {
    id: "5",
    title: "The Importance of Tithing",
    author: "Deacon Sibanda",
    branch: "Harare",
    type: "Article",
    status: "pending",
    submittedDate: "2023-06-05",
    content:
      "Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  },
  {
    id: "6",
    title: "Church Outreach Program Results",
    author: "Sister Ruth",
    branch: "Bulawayo",
    type: "Report",
    status: "approved",
    submittedDate: "2023-05-20",
    content:
      "Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
  },
];

const mockSections: MagazineSection[] = [
  {
    id: "1",
    title: "Pastoral Messages",
    description: "Messages and articles from church leadership",
    itemCount: 5,
  },
  {
    id: "2",
    title: "Testimonies",
    description: "Personal stories of faith and transformation",
    itemCount: 12,
  },
  {
    id: "3",
    title: "Branch Updates",
    description: "News and developments from church branches",
    itemCount: 8,
  },
  {
    id: "4",
    title: "Youth Corner",
    description: "Content created by and for the youth ministry",
    itemCount: 6,
  },
];

export default MagazineAdministration;
