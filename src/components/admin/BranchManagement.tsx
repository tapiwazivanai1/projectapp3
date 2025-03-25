import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  BarChart2,
  Users,
  MapPin,
} from "lucide-react";

interface Branch {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  coordinatorName: string;
  coordinatorEmail: string;
  totalContributions: number;
  activeProjects: number;
  status: "active" | "inactive";
}

interface Coordinator {
  id: string;
  name: string;
  email: string;
  branch: string;
  role: string;
  status: "active" | "pending" | "inactive";
  joinDate: string;
}

const BranchManagement = () => {
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(true);
  const [isAddCoordinatorOpen, setIsAddCoordinatorOpen] = useState(true);

  // Mock data for branches
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "Harare Central",
      location: "Harare, Zimbabwe",
      memberCount: 120,
      coordinatorName: "Tatenda Moyo",
      coordinatorEmail: "tatenda@example.com",
      totalContributions: 5600,
      activeProjects: 3,
      status: "active",
    },
    {
      id: "2",
      name: "Bulawayo Main",
      location: "Bulawayo, Zimbabwe",
      memberCount: 85,
      coordinatorName: "Chipo Ndlovu",
      coordinatorEmail: "chipo@example.com",
      totalContributions: 3200,
      activeProjects: 2,
      status: "active",
    },
    {
      id: "3",
      name: "London Assembly",
      location: "London, UK",
      memberCount: 65,
      coordinatorName: "David Mutasa",
      coordinatorEmail: "david@example.com",
      totalContributions: 7800,
      activeProjects: 4,
      status: "active",
    },
    {
      id: "4",
      name: "Johannesburg Fellowship",
      location: "Johannesburg, South Africa",
      memberCount: 95,
      coordinatorName: "Sarah Dube",
      coordinatorEmail: "sarah@example.com",
      totalContributions: 4500,
      activeProjects: 2,
      status: "inactive",
    },
  ]);

  // Mock data for coordinators
  const [coordinators, setCoordinators] = useState<Coordinator[]>([
    {
      id: "1",
      name: "Tatenda Moyo",
      email: "tatenda@example.com",
      branch: "Harare Central",
      role: "Branch Coordinator",
      status: "active",
      joinDate: "2022-03-15",
    },
    {
      id: "2",
      name: "Chipo Ndlovu",
      email: "chipo@example.com",
      branch: "Bulawayo Main",
      role: "Branch Coordinator",
      status: "active",
      joinDate: "2022-05-22",
    },
    {
      id: "3",
      name: "David Mutasa",
      email: "david@example.com",
      branch: "London Assembly",
      role: "Branch Coordinator",
      status: "active",
      joinDate: "2021-11-08",
    },
    {
      id: "4",
      name: "Sarah Dube",
      email: "sarah@example.com",
      branch: "Johannesburg Fellowship",
      role: "Branch Coordinator",
      status: "inactive",
      joinDate: "2023-01-30",
    },
    {
      id: "5",
      name: "John Zimuto",
      email: "john@example.com",
      branch: "Pending Assignment",
      role: "Branch Coordinator",
      status: "pending",
      joinDate: "2023-06-12",
    },
  ]);

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Branch Management</h1>
          <p className="text-gray-500">
            Manage church branches and coordinators
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Branch</DialogTitle>
                <DialogDescription>
                  Create a new branch for the church. Fill in all the required
                  details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="branch-name">Branch Name</label>
                    <Input id="branch-name" placeholder="Enter branch name" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="branch-location">Location</label>
                    <Input id="branch-location" placeholder="City, Country" />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="coordinator">Assign Coordinator</label>
                  <Input
                    id="coordinator"
                    placeholder="Search for coordinator"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="branch-description">Description</label>
                  <Input
                    id="branch-description"
                    placeholder="Brief description of the branch"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddBranchOpen(false)}
                >
                  Cancel
                </Button>
                <Button>Create Branch</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isAddCoordinatorOpen}
            onOpenChange={setIsAddCoordinatorOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" /> Add Coordinator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Coordinator</DialogTitle>
                <DialogDescription>
                  Assign a new branch coordinator. They will be able to manage
                  branch projects and members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="coordinator-name">Full Name</label>
                    <Input
                      id="coordinator-name"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="coordinator-email">Email</label>
                    <Input
                      id="coordinator-email"
                      type="email"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="branch-assignment">Assign to Branch</label>
                  <Input id="branch-assignment" placeholder="Select branch" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="coordinator-role">Role</label>
                  <Input
                    id="coordinator-role"
                    placeholder="Branch Coordinator"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddCoordinatorOpen(false)}
                >
                  Cancel
                </Button>
                <Button>Add Coordinator</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search branches or coordinators..."
            className="max-w-md"
          />
        </div>
      </div>

      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="coordinators">Coordinators</TabsTrigger>
          <TabsTrigger value="performance">Branch Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Coordinator</TableHead>
                <TableHead>Active Projects</TableHead>
                <TableHead>Total Contributions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">{branch.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {branch.location}
                    </div>
                  </TableCell>
                  <TableCell>{branch.memberCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${branch.coordinatorName}`}
                        />
                        <AvatarFallback>
                          {branch.coordinatorName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {branch.coordinatorName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {branch.coordinatorEmail}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{branch.activeProjects}</TableCell>
                  <TableCell>
                    ${branch.totalContributions.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        branch.status === "active" ? "default" : "secondary"
                      }
                    >
                      {branch.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="coordinators" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coordinators.map((coordinator) => (
                <TableRow key={coordinator.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${coordinator.name}`}
                        />
                        <AvatarFallback>
                          {coordinator.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{coordinator.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{coordinator.email}</TableCell>
                  <TableCell>{coordinator.branch}</TableCell>
                  <TableCell>{coordinator.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        coordinator.status === "active"
                          ? "default"
                          : coordinator.status === "pending"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {coordinator.status.charAt(0).toUpperCase() +
                        coordinator.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(coordinator.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch) => (
              <Card key={branch.id}>
                <CardHeader>
                  <CardTitle>{branch.name}</CardTitle>
                  <CardDescription>{branch.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Total Contributions
                      </span>
                      <span className="text-lg font-bold">
                        ${branch.totalContributions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Active Projects
                      </span>
                      <span className="text-lg font-bold">
                        {branch.activeProjects}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Members</span>
                      <span className="text-lg font-bold">
                        {branch.memberCount}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${(branch.totalContributions / 10000) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>Target: $10,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    View Detailed Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BranchManagement;
