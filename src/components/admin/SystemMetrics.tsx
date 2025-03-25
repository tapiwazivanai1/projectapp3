import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface SystemMetricsProps {
  totalContributions?: number;
  activeProjects?: number;
  totalMembers?: number;
  branchPerformance?: {
    name: string;
    contributions: number;
    target: number;
    memberCount: number;
  }[];
  contributionTrends?: {
    month: string;
    amount: number;
  }[];
  projectCategories?: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

const SystemMetrics = ({
  totalContributions = 125750,
  activeProjects = 12,
  totalMembers = 1250,
  branchPerformance = [
    {
      name: "Harare Central",
      contributions: 35000,
      target: 50000,
      memberCount: 320,
    },
    { name: "Bulawayo", contributions: 28500, target: 40000, memberCount: 280 },
    { name: "Mutare", contributions: 22000, target: 30000, memberCount: 210 },
    { name: "Gweru", contributions: 18000, target: 25000, memberCount: 175 },
    {
      name: "UK Branch",
      contributions: 15000,
      target: 20000,
      memberCount: 150,
    },
    {
      name: "USA Branch",
      contributions: 7250,
      target: 15000,
      memberCount: 115,
    },
  ],
  contributionTrends = [
    { month: "Jan", amount: 15000 },
    { month: "Feb", amount: 18500 },
    { month: "Mar", amount: 22000 },
    { month: "Apr", amount: 19500 },
    { month: "May", amount: 25000 },
    { month: "Jun", amount: 25750 },
  ],
  projectCategories = [
    { category: "Building Fund", amount: 65000, percentage: 52 },
    { category: "Annual Magazine", amount: 25750, percentage: 20 },
    { category: "Youth Programs", amount: 18000, percentage: 14 },
    { category: "Charity Outreach", amount: 12000, percentage: 10 },
    { category: "Other", amount: 5000, percentage: 4 },
  ],
}: SystemMetricsProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">System Metrics</h2>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Contributions
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalContributions.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-gray-500">2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMembers.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">+45 new members</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="branches">Branch Performance</TabsTrigger>
          <TabsTrigger value="trends">Contribution Trends</TabsTrigger>
          <TabsTrigger value="categories">Project Categories</TabsTrigger>
        </TabsList>

        {/* Branch Performance Tab */}
        <TabsContent value="branches" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {branchPerformance.map((branch, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{branch.name}</h3>
                    <span className="text-sm text-gray-500">
                      {branch.memberCount} members
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>${branch.contributions.toLocaleString()}</span>
                      <span>${branch.target.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={(branch.contributions / branch.target) * 100}
                      className="h-2"
                    />
                    <div className="text-xs text-gray-500 text-right">
                      {Math.round((branch.contributions / branch.target) * 100)}
                      % of target
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contribution Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Contribution Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-end justify-between">
                {contributionTrends.map((month, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-12 bg-blue-500 rounded-t-md"
                      style={{
                        height: `${(month.amount / Math.max(...contributionTrends.map((m) => m.amount))) * 250}px`,
                      }}
                    />
                    <div className="mt-2 text-xs">{month.month}</div>
                    <div className="text-xs font-medium">
                      ${month.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium">
                    Overall Growth: +72% YTD
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Projected Annual: $250,000
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Distribution by Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <div className="relative h-60 w-60">
                    {/* Simplified pie chart visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold">
                          ${totalContributions.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total Contributions
                        </div>
                      </div>
                    </div>
                    {/* This would be replaced with an actual chart component in a real implementation */}
                    <PieChart className="h-full w-full text-gray-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  {projectCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{category.category}</span>
                        <span>${category.amount.toLocaleString()}</span>
                      </div>
                      <Progress
                        value={category.percentage}
                        className="h-2"
                        // Different colors for different categories
                        style={{
                          backgroundColor:
                            index === 0
                              ? "#ef4444"
                              : index === 1
                                ? "#f59e0b"
                                : index === 2
                                  ? "#3b82f6"
                                  : index === 3
                                    ? "#10b981"
                                    : "#6b7280",
                        }}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        {category.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMetrics;
