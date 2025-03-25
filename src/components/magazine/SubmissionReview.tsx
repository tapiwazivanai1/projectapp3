import React, { useState } from "react";
import {
  Check,
  X,
  MessageSquare,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface SubmissionItem {
  id: string;
  title: string;
  author: string;
  branch: string;
  type: string;
  submittedDate: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  thumbnail?: string;
}

interface SubmissionReviewProps {
  submissions?: SubmissionItem[];
  onApprove?: (id: string) => void;
  onReject?: (id: string, feedback: string) => void;
  onForwardToAdmin?: (id: string) => void;
}

const SubmissionReview = ({
  submissions = [
    {
      id: "1",
      title: "The Power of Faith",
      author: "John Doe",
      branch: "Harare Central",
      type: "Article",
      submittedDate: "2023-05-15",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
      status: "pending",
      thumbnail:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&q=80",
    },
    {
      id: "2",
      title: "My Testimony",
      author: "Jane Smith",
      branch: "Bulawayo",
      type: "Testimony",
      submittedDate: "2023-05-10",
      content:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.",
      status: "approved",
      thumbnail:
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=500&q=80",
    },
    {
      id: "3",
      title: "Church History",
      author: "Robert Johnson",
      branch: "London",
      type: "Article",
      submittedDate: "2023-05-05",
      content:
        "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
      status: "rejected",
      thumbnail:
        "https://images.unsplash.com/photo-1501877008226-4fca48ee50c1?w=500&q=80",
    },
    {
      id: "4",
      title: "Youth Ministry Update",
      author: "Sarah Williams",
      branch: "Harare Central",
      type: "Update",
      submittedDate: "2023-05-01",
      content:
        "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.",
      status: "pending",
      thumbnail:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
    },
  ],
  onApprove = () => {},
  onReject = () => {},
  onForwardToAdmin = () => {},
}: SubmissionReviewProps) => {
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionItem | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  const pendingSubmissions = submissions.filter(
    (sub) => sub.status === "pending",
  );
  const approvedSubmissions = submissions.filter(
    (sub) => sub.status === "approved",
  );
  const rejectedSubmissions = submissions.filter(
    (sub) => sub.status === "rejected",
  );

  const handleViewSubmission = (submission: SubmissionItem) => {
    setSelectedSubmission(submission);
    setDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    onApprove(id);
    setDialogOpen(false);
  };

  const handleReject = (id: string) => {
    onReject(id, feedbackText);
    setFeedbackText("");
    setDialogOpen(false);
  };

  const handleForwardToAdmin = (id: string) => {
    onForwardToAdmin(id);
    setDialogOpen(false);
  };

  const renderSubmissionCard = (submission: SubmissionItem) => (
    <Card
      key={submission.id}
      className="mb-4 bg-card hover:bg-accent/10 transition-colors"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{submission.title}</CardTitle>
            <CardDescription className="mt-1">
              By {submission.author} from {submission.branch}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded-full">
            <span>{submission.type}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {submission.thumbnail && (
          <div className="mb-3 overflow-hidden rounded-md">
            <img
              src={submission.thumbnail}
              alt={submission.title}
              className="w-full h-32 object-cover"
            />
          </div>
        )}
        <p className="text-sm line-clamp-2">{submission.content}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Submitted on {submission.submittedDate}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewSubmission(submission)}
        >
          <Eye className="mr-1 h-4 w-4" />
          View
        </Button>
        <div className="flex space-x-2">
          {submission.status === "pending" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-green-500 border-green-500 hover:bg-green-500/10"
                onClick={() => handleApprove(submission.id)}
              >
                <Check className="mr-1 h-4 w-4" />
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-500/10"
                onClick={() => handleViewSubmission(submission)}
              >
                <X className="mr-1 h-4 w-4" />
                Reject
              </Button>
            </>
          )}
          {submission.status === "approved" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleForwardToAdmin(submission.id)}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              Forward to Admin
            </Button>
          )}
          {submission.status === "rejected" && (
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              Rejected
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Magazine Submission Review</h1>
        <p className="text-muted-foreground">
          Review and manage content submissions from branch members
        </p>
      </div>

      <Tabs
        defaultValue="pending"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingSubmissions.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingSubmissions.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingSubmissions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No pending submissions to review
            </div>
          ) : (
            pendingSubmissions.map(renderSubmissionCard)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedSubmissions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No approved submissions yet
            </div>
          ) : (
            approvedSubmissions.map(renderSubmissionCard)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedSubmissions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No rejected submissions
            </div>
          ) : (
            rejectedSubmissions.map(renderSubmissionCard)
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSubmission.title}</DialogTitle>
                <DialogDescription>
                  Submitted by {selectedSubmission.author} from{" "}
                  {selectedSubmission.branch} on{" "}
                  {selectedSubmission.submittedDate}
                </DialogDescription>
              </DialogHeader>

              <div className="my-4">
                {selectedSubmission.thumbnail && (
                  <div className="mb-4 overflow-hidden rounded-md">
                    <img
                      src={selectedSubmission.thumbnail}
                      alt={selectedSubmission.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="bg-muted p-4 rounded-md">
                  <p className="whitespace-pre-line">
                    {selectedSubmission.content}
                  </p>
                </div>
              </div>

              {selectedSubmission.status === "pending" && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">
                    Feedback (optional for rejection)
                  </h4>
                  <Textarea
                    placeholder="Enter feedback for the author..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}

              <DialogFooter className="mt-4">
                {selectedSubmission.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedSubmission.id)}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedSubmission.id)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
                {selectedSubmission.status === "approved" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="default"
                      onClick={() =>
                        handleForwardToAdmin(selectedSubmission.id)
                      }
                    >
                      Forward to Admin
                    </Button>
                  </>
                )}
                {selectedSubmission.status === "rejected" && (
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionReview;
