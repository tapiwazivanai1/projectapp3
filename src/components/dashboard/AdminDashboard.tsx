import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Settings, LogOut } from "lucide-react";
import SystemMetrics from "@/components/admin/SystemMetrics";
import BranchManagement from "@/components/admin/BranchManagement";
import MagazineAdministration from "@/components/magazine/MagazineAdministration";

interface AdminDashboardProps {
  userName?: string;
  userRole?: string;
  notifications?: number;
  activeTab?: string;
}

const AdminDashboard = ({
  userName = "Pastor Chiweshe",
  userRole = "System Administrator",
  notifications = 5,
  activeTab = "overview",
}: AdminDashboardProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Welcome back, {userName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="mb-8 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="text-base py-2 px-4">
              Overview
            </TabsTrigger>
            <TabsTrigger value="branches" className="text-base py-2 px-4">
              Branch Management
            </TabsTrigger>
            <TabsTrigger value="magazine" className="text-base py-2 px-4">
              Magazine Administration
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-base py-2 px-4">
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-base py-2 px-4">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <SystemMetrics />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          action: "New project created",
                          user: "Harare Branch",
                          time: "2 hours ago",
                        },
                        {
                          action: "Magazine content approved",
                          user: "You",
                          time: "5 hours ago",
                        },
                        {
                          action: "New coordinator added",
                          user: "You",
                          time: "Yesterday",
                        },
                        {
                          action: "Contribution goal reached",
                          user: "Bulawayo Branch",
                          time: "2 days ago",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0"
                        >
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500">
                              by {activity.user}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full justify-start">
                        Create New Project
                      </Button>
                      <Button className="w-full justify-start">
                        Add Branch Coordinator
                      </Button>
                      <Button className="w-full justify-start">
                        Review Magazine Content
                      </Button>
                      <Button className="w-full justify-start">
                        Generate Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Branch Management Tab */}
          <TabsContent value="branches">
            <BranchManagement />
          </TabsContent>

          {/* Magazine Administration Tab */}
          <TabsContent value="magazine">
            <MagazineAdministration />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">Reports Module</h3>
                  <p className="text-gray-500 mb-4">
                    Generate and view detailed financial and activity reports
                  </p>
                  <Button>Generate New Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">Settings Module</h3>
                  <p className="text-gray-500 mb-4">
                    Configure system preferences and user permissions
                  </p>
                  <Button>Update Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
