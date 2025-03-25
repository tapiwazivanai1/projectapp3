import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface Contribution {
  id: string;
  date: string;
  amount: number;
  project: string;
  status: "completed" | "pending" | "failed";
  projectProgress: number;
}

interface ContributionHistoryProps {
  contributions?: Contribution[];
  title?: string;
  description?: string;
}

const ContributionHistory = ({
  contributions = [
    {
      id: "1",
      date: "2023-10-15",
      amount: 50.0,
      project: "Church Building Fund",
      status: "completed",
      projectProgress: 75,
    },
    {
      id: "2",
      date: "2023-09-28",
      amount: 25.0,
      project: "Annual Magazine",
      status: "completed",
      projectProgress: 45,
    },
    {
      id: "3",
      date: "2023-08-12",
      amount: 100.0,
      project: "Youth Ministry",
      status: "completed",
      projectProgress: 90,
    },
    {
      id: "4",
      date: "2023-07-05",
      amount: 30.0,
      project: "Missionary Support",
      status: "pending",
      projectProgress: 60,
    },
    {
      id: "5",
      date: "2023-06-20",
      amount: 75.0,
      project: "Community Outreach",
      status: "completed",
      projectProgress: 85,
    },
  ],
  title = "Your Contribution History",
  description = "Track your donations and see the impact you're making",
}: ContributionHistoryProps) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[350px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell>{formatDate(contribution.date)}</TableCell>
                  <TableCell className="font-medium">
                    {contribution.project}
                  </TableCell>
                  <TableCell>{formatCurrency(contribution.amount)}</TableCell>
                  <TableCell>{getStatusBadge(contribution.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={contribution.projectProgress}
                        className="h-2 w-24"
                      />
                      <span className="text-xs text-gray-500">
                        {contribution.projectProgress}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-500">
            Total Contributions:{" "}
            {formatCurrency(
              contributions.reduce((sum, item) => sum + item.amount, 0),
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionHistory;
