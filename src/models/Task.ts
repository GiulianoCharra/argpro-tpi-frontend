// interface for Task

export interface Task {
  id?: number;
  titulo: string;
  descripcion: string;
  tiempo: number;
  imagen: string;
  responsable: string;
  estado: TaskEstado;
}

export enum TaskEstado {
  POR_HACER = "PORHACER",
  EN_PRODUCCION = "ENPRODUCCION",
  POR_TESTEAR = "PORTESTEAR",
  COMPLETADA = "COMPLETADA",
}
