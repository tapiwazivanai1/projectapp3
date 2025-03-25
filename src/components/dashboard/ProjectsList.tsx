import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { CalendarDays, Clock, DollarSign, Users } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  contributors: number;
  imageUrl: string;
}

interface ProjectsListProps {
  projects?: Project[];
  onProjectSelect?: (projectId: string) => void;
}

const ProjectsList = ({
  projects = [
    {
      id: "1",
      title: "Church Building Renovation",
      description:
        "Fundraising for essential repairs and upgrades to our main sanctuary.",
      goalAmount: 50000,
      currentAmount: 32500,
      deadline: "2023-12-31",
      category: "Infrastructure",
      contributors: 78,
      imageUrl:
        "https://images.unsplash.com/photo-1545414585-8c552bb9719c?w=800&q=80",
    },
    {
      id: "2",
      title: "Annual Magazine Publication",
      description:
        "Support the creation and distribution of our annual church magazine featuring testimonies and articles.",
      goalAmount: 15000,
      currentAmount: 9750,
      deadline: "2023-10-15",
      category: "Publication",
      contributors: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1603706585928-6ae28d54f60b?w=800&q=80",
    },
    {
      id: "3",
      title: "Youth Camp Sponsorship",
      description:
        "Help send underprivileged youth to our annual spiritual retreat and leadership camp.",
      goalAmount: 25000,
      currentAmount: 10000,
      deadline: "2023-11-30",
      category: "Youth",
      contributors: 32,
      imageUrl:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    },
    {
      id: "4",
      title: "Community Outreach Program",
      description:
        "Funding for our monthly food distribution and community service initiatives.",
      goalAmount: 12000,
      currentAmount: 7800,
      deadline: "2023-12-15",
      category: "Outreach",
      contributors: 56,
      imageUrl:
        "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80",
    },
  ],
  onProjectSelect = (id) => console.log(`Project ${id} selected`),
}: ProjectsListProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Active Fundraising Projects
        </h2>
        <p className="text-gray-600">
          Support our church initiatives by contributing to these projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-amber-50 text-amber-700 border-amber-200"
                  >
                    {project.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Progress</span>
                  <span className="text-gray-600">
                    ${project.currentAmount.toLocaleString()} of $
                    {project.goalAmount.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={(project.currentAmount / project.goalAmount) * 100}
                  className="h-2 bg-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                  <span>
                    Ends: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{project.contributors} Contributors</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-gray-100 pt-4">
              <Button
                onClick={() => onProjectSelect(project.id)}
                className="w-full bg-red-700 hover:bg-red-800 text-white"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Contribute Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
