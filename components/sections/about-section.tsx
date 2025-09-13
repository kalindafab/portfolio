"use client";

import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import { getSkills } from "@/lib/config";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function AboutSection() {
  const skills = getSkills();
  const frontendSkills = skills.filter(skill => skill.category === "frontend");
  const backendSkills = skills.filter(skill => skill.category === "backend");
  const otherSkills = skills.filter(skill => skill.category !== "frontend" && skill.category !== "backend");

  return (
    <SectionContainer id="about">
      <SectionHeading 
        title="About Me" 
        subtitle="I'm a passionate web developer with a focus on creating beautiful, functional, and user-friendly experiences."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl font-semibold mb-4">My Background</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I specialize in building modern web applications using the latest technologies. My journey in web development started over 5 years ago, and I&apos;ve been passionate about creating intuitive and performant digital experiences ever since.
            </p>
            <p>
              With a strong foundation in both frontend and backend technologies, I enjoy working across the full stack. I&apos;m constantly learning and staying up to date with the latest web development trends and best practices.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community engagement.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold mb-4">Frontend Skills</h3>
            <div className="space-y-4">
              {frontendSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold mb-4">Backend Skills</h3>
            <div className="space-y-4">
              {backendSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {otherSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-4">Other Skills</h3>
              <div className="space-y-4">
                {otherSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
  };
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: 0.1 * index }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Progress value={skill.level} className="h-2" />
      </motion.div>
    </div>
  );
}