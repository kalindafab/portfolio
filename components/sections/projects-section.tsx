"use client";

import { useState } from "react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/config/types";

export function ProjectsSection() {
  const allProjects = getProjects();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.tags))
  ).sort();
  
  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? allProjects.filter(project => project.tags.includes(selectedTag))
    : allProjects;
    
  return (
    <SectionContainer id="projects">
      <SectionHeading 
        title="My Projects" 
        subtitle="Here are some of my recent projects. I've worked on a variety of applications from e-commerce to data visualization."
      />
      
      <motion.div 
        className="flex flex-wrap gap-2 justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Button 
          variant={selectedTag === null ? "default" : "outline"} 
          className="rounded-full" 
          onClick={() => setSelectedTag(null)}
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button 
            key={tag} 
            variant={selectedTag === tag ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<AnimatePresence>
  {filteredProjects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      layout
    >
      <ProjectCard 
        project={project} 
        onSelect={() => setSelectedProject(project)} 
      />
    </motion.div>
  ))}
</AnimatePresence>
      </div>
      
      <ProjectDialog 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </SectionContainer>
  );
}

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline">+{project.tags.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" onClick={onSelect}>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
        </Dialog>
        
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  if (!project) return null;
  
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        
        <div className="relative h-64 md:h-80 mt-4 rounded-md overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">About this project</h4>
          <p className="text-muted-foreground">
            {project.longDescription || project.description}
          </p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View Live Demo <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub Repository <Github className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}