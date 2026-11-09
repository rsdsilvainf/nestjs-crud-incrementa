import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export interface Project {
  id: number;
  nome: string;
  descricao: string;
  status: string;
}

@Injectable()
export class ProjectsService {
  private readonly filePath = join(process.cwd(), 'data', 'projects.json');

  private async readProjects(): Promise<Project[]> {
    try {
      const content = await readFile(this.filePath, 'utf8');
      return JSON.parse(content) as Project[];
    } catch {
      return [];
    }
  }

  private async saveProjects(projects: Project[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(projects, null, 2), 'utf8');
  }

  async findAll(): Promise<Project[]> {
    return this.readProjects();
  }

  async findOne(id: number): Promise<Project> {
    const projects = await this.readProjects();
    const project = projects.find((item) => item.id === id);
    if (!project) throw new NotFoundException(`Projeto ${id} não encontrado`);
    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const projects = await this.readProjects();
    const nextId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const project: Project = { id: nextId, ...dto };
    projects.push(project);
    await this.saveProjects(projects);
    return project;
  }

  async update(id: number, dto: CreateProjectDto): Promise<Project> {
    const projects = await this.readProjects();
    const index = projects.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Projeto ${id} não encontrado`);
    projects[index] = { id, ...dto };
    await this.saveProjects(projects);
    return projects[index];
  }

  async patch(id: number, dto: UpdateProjectDto): Promise<Project> {
    const projects = await this.readProjects();
    const index = projects.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Projeto ${id} não encontrado`);
    projects[index] = { ...projects[index], ...dto };
    await this.saveProjects(projects);
    return projects[index];
  }

  async remove(id: number): Promise<void> {
    const projects = await this.readProjects();
    const filtered = projects.filter((item) => item.id !== id);
    if (filtered.length === projects.length) {
      throw new NotFoundException(`Projeto ${id} não encontrado`);
    }
    await this.saveProjects(filtered);
  }
}
