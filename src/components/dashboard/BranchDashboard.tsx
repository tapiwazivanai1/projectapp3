import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  BookOpen,
  Bell,
  ChevronRight,
  PieChart,
} from "lucide-react";
import ProjectManagement from "../projects/ProjectManagement";
import MembersList from "../branch/MembersList";
import SubmissionReview from "../magazine/SubmissionReview";

interface BranchDashboardProps {
  branchName?: string;
  branchId?: string;
  memberCount?: number;
  totalContributions?: number;
  activeProjects?: number;
  pendingSubmissions?: number;
}

const BranchDashboard = ({
  branchName = "Harare Central",
  branchId = "branch-123",
  memberCount = 45,
  totalContributions = 12500,
  activeProjects = 3,
  pendingSubmissions = 4,
}: BranchDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full min-h-screen bg-background p-6">
      <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {branchName} Branch
            </h1>
            <p className="text-muted-foreground">
              Manage your branch projects, members, and magazine submissions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button>Generate Report</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{memberCount}</div>
                <Users className="h-8 w-8 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                +2 new members this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  ${totalContributions.toLocaleString()}
                </div>
                <BarChart3 className="h-8 w-8 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                +$1,200 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{activeProjects}</div>
                <PieChart className="h-8 w-8 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                1 pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Magazine Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{pendingSubmissions}</div>
                <BookOpen className="h-8 w-8 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {pendingSubmissions} pending review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your branch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "New member joined",
                        description: "John Doe joined your branch",
                        time: "2 hours ago",
                      },
                      {
                        title: "Project update",
                        description: "Youth Ministry Camp reached 35% of goal",
                        time: "5 hours ago",
                      },
                      {
                        title: "Magazine submission",
                        description: "New article submitted for review",
                        time: "1 day ago",
                      },
                      {
                        title: "Contribution received",
                        description:
                          "$500 contributed to Church Building Renovation",
                        time: "2 days ago",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 pb-3 border-b last:border-0"
                      >
                        <div className="w-full">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Magazine Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Magazine Submissions</CardTitle>
                  <CardDescription>
                    Recent content for the annual magazine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "The Power of Faith",
                        author: "John Doe",
                        status: "pending",
                      },
                      {
                        title: "My Testimony",
                        author: "Jane Smith",
                        status: "approved",
                      },
                      {
                        title: "Youth Ministry Update",
                        author: "Sarah Williams",
                        status: "pending",
                      },
                    ].map((submission, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between pb-3 border-b last:border-0"
                      >
                        <div>
                          <p className="font-medium">{submission.title}</p>
                          <p className="text-sm text-muted-foreground">
                            By {submission.author}
                          </p>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${submission.status === "approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                        >
                          {submission.status === "approved"
                            ? "Approved"
                            : "Pending"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setActiveTab("magazine")}
                  >
                    View All Submissions
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Project Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>
                  Overview of your branch projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Church Building Renovation",
                      goal: 50000,
                      raised: 15000,
                      deadline: "2023-12-31",
                    },
                    {
                      title: "Youth Ministry Camp",
                      goal: 10000,
                      raised: 3500,
                      deadline: "2023-08-15",
                    },
                    {
                      title: "Community Outreach Program",
                      goal: 5000,
                      raised: 4200,
                      deadline: "2023-06-30",
                    },
                  ].map((project, index) => {
                    const progress = Math.min(
                      Math.round((project.raised / project.goal) * 100),
                      100,
                    );
                    return (
                      <div key={index} className="pb-4 border-b last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Due:{" "}
                              {new Date(project.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm font-medium">
                            ${project.raised.toLocaleString()} of $
                            {project.goal.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab("projects")}
                >
                  Manage Projects
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="members">
            <MembersList />
          </TabsContent>

          <TabsContent value="magazine">
            <SubmissionReview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BranchDashboard;
