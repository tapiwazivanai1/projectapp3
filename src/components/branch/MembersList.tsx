import React from "react";
import { Mail, Bell, MoreVertical, Filter, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface MembersListProps {
  members?: Member[];
  onSendNotification?: (memberId: string) => void;
  onViewContributions?: (memberId: string) => void;
}

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalContributions: number;
  lastContribution?: string;
  status: "active" | "inactive";
  projects: number;
}

const MembersList = ({
  members = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      totalContributions: 1250,
      lastContribution: "2023-05-15",
      status: "active",
      projects: 3,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      totalContributions: 850,
      lastContribution: "2023-05-10",
      status: "active",
      projects: 2,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      totalContributions: 2100,
      lastContribution: "2023-05-18",
      status: "active",
      projects: 5,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      totalContributions: 500,
      lastContribution: "2023-04-30",
      status: "inactive",
      projects: 1,
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      totalContributions: 1750,
      lastContribution: "2023-05-12",
      status: "active",
      projects: 4,
    },
  ],
  onSendNotification = (id) => console.log(`Send notification to member ${id}`),
  onViewContributions = (id) =>
    console.log(`View contributions for member ${id}`),
}: MembersListProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Branch Members</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Contributions</TableHead>
              <TableHead>Last Contribution</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === "active" ? "default" : "secondary"
                    }
                    className={
                      member.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {member.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    ${member.totalContributions.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  {member.lastContribution ? (
                    new Date(member.lastContribution).toLocaleDateString()
                  ) : (
                    <span className="text-gray-400">No contributions</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{member.projects}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSendNotification(member.id)}
                      title="Send notification"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewContributions(member.id)}
                      title="View contributions"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewContributions(member.id)}
                        >
                          View Contributions
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onSendNotification(member.id)}
                        >
                          Send Notification
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {members.length} members
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembersList;
