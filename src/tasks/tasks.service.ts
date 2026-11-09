import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  descricao: string;
  inicio: number;
  fim: number;
  status?: string;
  resultado?: number[] | null;
}

@Injectable()
export class TasksService {
  private readonly filePath = join(process.cwd(), 'data', 'tasks.json');

  private async readTasks(): Promise<Task[]> {
    try {
      const content = await readFile(this.filePath, 'utf8');
      return JSON.parse(content) as Task[];
    } catch (error) {
      // Se o arquivo ainda não existir ou estiver vazio, inicia uma lista.
      return [];
    }
  }

  private async saveTasks(tasks: Task[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(tasks, null, 2), 'utf8');
  }

  async findAll(): Promise<Task[]> {
    return this.readTasks();
  }

  async findOne(id: number): Promise<Task> {
    const tasks = await this.readTasks();
    const task = tasks.find((item) => item.id === id);
    if (!task) throw new NotFoundException(`Tarefa ${id} não encontrada`);
    return task;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const tasks = await this.readTasks();
    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const task: Task = { id: nextId, ...dto, status: 'pendente' };
    tasks.push(task);
    await this.saveTasks(tasks);
    return task;
  }

  // PUT: substitui os campos principais da tarefa.
  async update(id: number, dto: CreateTaskDto): Promise<Task> {
    const tasks = await this.readTasks();
    const index = tasks.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Tarefa ${id} não encontrada`);

    tasks[index] = {
      ...tasks[index],
      descricao: dto.descricao,
      inicio: dto.inicio,
      fim: dto.fim,
    };
    await this.saveTasks(tasks);
    return tasks[index];
  }

  // PATCH: altera somente os campos enviados.
  async patch(id: number, dto: UpdateTaskDto): Promise<Task> {
    const tasks = await this.readTasks();
    const index = tasks.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Tarefa ${id} não encontrada`);

    tasks[index] = { ...tasks[index], ...dto };
    await this.saveTasks(tasks);
    return tasks[index];
  }

  async remove(id: number): Promise<void> {
    const tasks = await this.readTasks();
    const filtered = tasks.filter((item) => item.id !== id);
    if (filtered.length === tasks.length) {
      throw new NotFoundException(`Tarefa ${id} não encontrada`);
    }
    await this.saveTasks(filtered);
  }
}
