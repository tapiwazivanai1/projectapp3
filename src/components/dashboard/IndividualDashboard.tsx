import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  DollarSign,
  FileText,
  PieChart,
  Users,
} from "lucide-react";
import ProjectsList from "./ProjectsList";
import ContributionHistory from "./ContributionHistory";
import ContentUploadForm from "../magazine/ContentUploadForm";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface UserStats {
  totalContributed: number;
  projectsSupported: number;
  upcomingEvents: number;
  magazineSubmissions: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "contribution" | "project" | "magazine" | "event";
}

interface IndividualDashboardProps {
  userName?: string;
  userStats?: UserStats;
  notifications?: Notification[];
  onProjectSelect?: (projectId: string) => void;
}

const IndividualDashboard = ({
  userName = "John Doe",
  userStats = {
    totalContributed: 280,
    projectsSupported: 5,
    upcomingEvents: 3,
    magazineSubmissions: 1,
  },
  notifications = [
    {
      id: "1",
      title: "Contribution Received",
      message:
        "Thank you for your $50 contribution to the Church Building Fund!",
      date: "2023-10-15",
      read: false,
      type: "contribution",
    },
    {
      id: "2",
      title: "Magazine Submission Update",
      message:
        "Your article 'Faith in Action' has been approved for the annual magazine.",
      date: "2023-10-12",
      read: true,
      type: "magazine",
    },
    {
      id: "3",
      title: "New Project Launched",
      message:
        "Youth Camp Sponsorship project has been launched. Consider supporting!",
      date: "2023-10-10",
      read: false,
      type: "project",
    },
  ],
  onProjectSelect = (id) => console.log(`Project ${id} selected`),
}: IndividualDashboardProps) => {
  const [activeTab, setActiveTab] = useState("projects");
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.filter((n) => !n.read).length,
  );

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0);
    // In a real app, you would update the notifications in the database
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "contribution":
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case "magazine":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "project":
        return <FileText className="h-4 w-4 text-amber-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {userName}
            </h1>
            <p className="text-gray-600">
              Your personal dashboard for Guta Ra Mwari fundraising activities
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Button variant="outline" className="mr-2 relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <Button className="bg-red-700 hover:bg-red-800 text-white">
              <DollarSign className="h-5 w-5 mr-2" />
              Make a Contribution
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Contributed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-2xl font-bold">
                  ${userStats.totalContributed}
                </span>
              </div>
              <Progress value={70} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Projects Supported
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">
                  {userStats.projectsSupported}
                </span>
              </div>
              <Progress value={50} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-purple-500 mr-2" />
                <span className="text-2xl font-bold">
                  {userStats.upcomingEvents}
                </span>
              </div>
              <Progress value={30} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Magazine Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">
                  {userStats.magazineSubmissions}
                </span>
              </div>
              <Progress value={20} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area with Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Tabs
            defaultValue="projects"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b border-gray-200">
              <TabsList className="bg-transparent h-14 p-0">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:text-red-700 rounded-none h-14 px-6"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="contributions"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:text-red-700 rounded-none h-14 px-6"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  My Contributions
                </TabsTrigger>
                <TabsTrigger
                  value="magazine"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:text-red-700 rounded-none h-14 px-6"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Magazine Submission
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:text-red-700 rounded-none h-14 px-6 relative"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                  {unreadNotifications > 0 && (
                    <span className="absolute top-3 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="projects" className="p-0 m-0">
              <ProjectsList onProjectSelect={onProjectSelect} />
            </TabsContent>

            <TabsContent value="contributions" className="p-6 m-0">
              <ContributionHistory />
            </TabsContent>

            <TabsContent value="magazine" className="p-6 m-0">
              <ContentUploadForm />
            </TabsContent>

            <TabsContent value="notifications" className="p-6 m-0">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Your Notifications
                  </h2>
                  {unreadNotifications > 0 && (
                    <Button
                      variant="outline"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-amber-50 border-amber-100"}`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900">
                                {notification.title}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  notification.date,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-500">
                        No notifications
                      </h3>
                      <p className="text-gray-400">You're all caught up!</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;
