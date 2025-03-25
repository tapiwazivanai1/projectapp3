import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  HeartIcon,
  ImageIcon,
  MessageSquareIcon,
  ShareIcon,
  UsersIcon,
} from "lucide-react";

interface ProjectDetailProps {
  id?: string;
  title?: string;
  description?: string;
  goal?: number;
  raised?: number;
  startDate?: string;
  endDate?: string;
  coverImage?: string;
  updates?: Array<{
    id: string;
    date: string;
    content: string;
    images?: string[];
  }>;
  contributors?: Array<{
    id: string;
    name: string;
    amount: number;
    date: string;
    avatar?: string;
  }>;
}

const ProjectDetail = ({
  id = "project-1",
  title = "Annual Church Magazine 2023",
  description = "Help us create and publish our annual church magazine showcasing testimonies, articles, and creative works from our members across all branches.",
  goal = 5000,
  raised = 3250,
  startDate = "2023-01-15",
  endDate = "2023-12-15",
  coverImage = "https://images.unsplash.com/photo-1603486002664-a7319421e133?w=800&q=80",
  updates = [
    {
      id: "update-1",
      date: "2023-10-15",
      content:
        "We've received over 50 submissions for the magazine so far! Keep them coming as we approach our deadline.",
      images: [
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
      ],
    },
    {
      id: "update-2",
      date: "2023-09-01",
      content:
        "Our design team has started working on the magazine layout. Here's a sneak peek of some of the pages.",
      images: [
        "https://images.unsplash.com/photo-1603486002664-a7319421e133?w=600&q=80",
        "https://images.unsplash.com/photo-1571331627305-b3603ee4cdac?w=600&q=80",
      ],
    },
  ],
  contributors = [
    {
      id: "user-1",
      name: "Sarah Johnson",
      amount: 100,
      date: "2023-10-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "user-2",
      name: "Michael Thompson",
      amount: 250,
      date: "2023-10-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: "user-3",
      name: "Rebecca Williams",
      amount: 75,
      date: "2023-09-28",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rebecca",
    },
  ],
}: ProjectDetailProps) => {
  const [contributionAmount, setContributionAmount] = useState<number>(50);
  const progressPercentage = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Project Header */}
        <div className="mb-8">
          <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-6">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {startDate} - {endDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {contributors.length} contributors
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Info */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About This Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{description}</p>

                  <div className="mt-6">
                    <Tabs defaultValue="updates">
                      <TabsList className="w-full">
                        <TabsTrigger value="updates" className="flex-1">
                          Updates
                        </TabsTrigger>
                        <TabsTrigger value="contributors" className="flex-1">
                          Contributors
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="updates">
                        <div className="space-y-6 mt-4">
                          {updates.map((update) => (
                            <Card key={update.id}>
                              <CardHeader>
                                <CardTitle className="text-base">
                                  {new Date(update.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  )}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{update.content}</p>
                                {update.images && update.images.length > 0 && (
                                  <div className="grid grid-cols-2 gap-2 mt-4">
                                    {update.images.map((image, index) => (
                                      <div
                                        key={index}
                                        className="relative h-40 rounded-md overflow-hidden"
                                      >
                                        <img
                                          src={image}
                                          alt={`Update ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="contributors">
                        <div className="space-y-4 mt-4">
                          {contributors.map((contributor) => (
                            <div
                              key={contributor.id}
                              className="flex items-center p-3 border rounded-lg"
                            >
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                <img
                                  src={
                                    contributor.avatar ||
                                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.id}`
                                  }
                                  alt={contributor.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  {contributor.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(
                                    contributor.date,
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="font-semibold">
                                  ${contributor.amount}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contribution Card */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Support This Project</CardTitle>
                  <CardDescription>
                    Help us reach our fundraising goal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        ${raised} raised
                      </span>
                      <span className="text-sm font-medium">${goal} goal</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-sm text-center mt-2">
                      {progressPercentage}% Complete
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium mb-1"
                      >
                        Contribution Amount
                      </label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          id="amount"
                          type="number"
                          value={contributionAmount}
                          onChange={(e) =>
                            setContributionAmount(Number(e.target.value))
                          }
                          className="w-full pl-9 pr-4 py-2 border rounded-md"
                          min="5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[25, 50, 100].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => setContributionAmount(amount)}
                          className={
                            contributionAmount === amount
                              ? "border-primary"
                              : ""
                          }
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Contribute Now
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <HeartIcon className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
