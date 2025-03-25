import React, { useState } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  ChevronRight,
  Calendar,
  Users,
  Target,
  Clock,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  deadline: string;
  status: "active" | "pending" | "completed";
  createdAt: string;
  category: string;
}

interface ProjectManagementProps {
  projects?: Project[];
  onCreateProject?: (
    project: Omit<Project, "id" | "raised" | "createdAt">,
  ) => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

const ProjectManagement = ({
  projects = [
    {
      id: "1",
      title: "Church Building Renovation",
      description:
        "Fundraising for the renovation of the main sanctuary building.",
      goal: 50000,
      raised: 15000,
      deadline: "2023-12-31",
      status: "active",
      createdAt: "2023-01-15",
      category: "Infrastructure",
    },
    {
      id: "2",
      title: "Youth Ministry Camp",
      description: "Annual youth camp for spiritual growth and fellowship.",
      goal: 10000,
      raised: 3500,
      deadline: "2023-08-15",
      status: "active",
      createdAt: "2023-02-20",
      category: "Youth",
    },
    {
      id: "3",
      title: "Community Outreach Program",
      description: "Providing food and essentials to the local community.",
      goal: 5000,
      raised: 4200,
      deadline: "2023-06-30",
      status: "pending",
      createdAt: "2023-03-10",
      category: "Outreach",
    },
  ],
  onCreateProject = () => {},
  onEditProject = () => {},
  onDeleteProject = () => {},
}: ProjectManagementProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const createForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      goal: 0,
      deadline: "",
      category: "",
      status: "pending" as const,
    },
  });

  const editForm = useForm({
    defaultValues: {
      id: "",
      title: "",
      description: "",
      goal: 0,
      raised: 0,
      deadline: "",
      category: "",
      status: "pending" as const,
      createdAt: "",
    },
  });

  const handleCreateSubmit = (data: any) => {
    onCreateProject(data);
    setIsCreateDialogOpen(false);
    createForm.reset();
  };

  const handleEditSubmit = (data: any) => {
    onEditProject(data);
    setIsEditDialogOpen(false);
    setSelectedProject(null);
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    editForm.reset(project);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      onDeleteProject(projectId);
    }
  };

  const activeProjects = projects.filter((p) => p.status === "active");
  const pendingProjects = projects.filter((p) => p.status === "pending");
  const completedProjects = projects.filter((p) => p.status === "completed");

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  return (
    <div className="w-full p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new fundraising project.
              </DialogDescription>
            </DialogHeader>
            <Form {...createForm}>
              <form
                onSubmit={createForm.handleSubmit(handleCreateSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={createForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={createForm.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fundraising Goal ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={createForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Infrastructure">
                              Infrastructure
                            </SelectItem>
                            <SelectItem value="Youth">Youth</SelectItem>
                            <SelectItem value="Outreach">Outreach</SelectItem>
                            <SelectItem value="Missions">Missions</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Create Project</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active" className="flex items-center gap-2">
            Active Projects{" "}
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
              {activeProjects.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending Approval{" "}
            <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full text-xs">
              {pendingProjects.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed{" "}
            <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full text-xs">
              {completedProjects.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-xs">
                        Created on{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">
                          ${project.raised} of ${project.goal}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${calculateProgress(project.raised, project.goal)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Due: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <Target className="h-3 w-3" />
                        <span>
                          {calculateProgress(project.raised, project.goal)}%
                          Complete
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(project)}
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(project.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {activeProjects.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No active projects found. Create a new project to get started.
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden border-amber-500/20"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-xs">
                        Created on{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <span className="text-xs font-medium bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>Goal: ${project.goal}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Due: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(project)}
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(project.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {pendingProjects.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No pending projects found.
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden border-green-500/20"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-xs">
                        Created on{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <span className="text-xs font-medium bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Final Result</span>
                        <span className="font-medium">
                          ${project.raised} of ${project.goal}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${calculateProgress(project.raised, project.goal)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(project.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Archive
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {completedProjects.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No completed projects found.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the details of your fundraising project.
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(handleEditSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fundraising Goal ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Infrastructure">
                              Infrastructure
                            </SelectItem>
                            <SelectItem value="Youth">Youth</SelectItem>
                            <SelectItem value="Outreach">Outreach</SelectItem>
                            <SelectItem value="Missions">Missions</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {selectedProject.status === "active" && (
                  <FormField
                    control={editForm.control}
                    name="raised"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount Raised ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Update the current amount raised for this project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
